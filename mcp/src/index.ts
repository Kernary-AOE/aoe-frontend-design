/**
 * @module mcp
 *
 * The three domain MCP tools of plan §4.5, as a *projection* of the Model Package
 * in the domain's single `model/` package — never a hand-written tool list.
 *
 * §11.2: "这些只是 ActionDef/QueryProfile 的投影，不在 Core 手写". Concretely:
 *
 *   - every tool NAME comes from `emitMcpTools`
 *     (`snakeCase(model.name)_snakeCase(action.name)`), so `aoe_design_plan`
 *     appears nowhere as a literal in this package's source;
 *   - every inputSchema / outputSchema / annotation comes from the same emitter;
 *   - this module supplies only the three HANDLERS, and it refuses to start if the
 *     handler set and the projected tool set disagree.
 *
 * That last check is the whole point. A hand-written wrapper drifts from its model
 * silently; here a model that declares a fourth action, or a renamed action, fails
 * `createDesignToolset` at construction with `TOOL_HANDLER_MISMATCH` instead of
 * serving a tool nobody implemented.
 */

import { readFileSync } from "node:fs";
import { dirname, join, resolve as resolvePath } from "node:path";
import type { GraphIR } from "@aoe/ir";
import { loadModelOrThrow, type ProjectionDefinition, type RelationDefinition, type RetrievalProfile } from "@aoe/model-schema";
import { buildCodegenSchema, emitMcpTools, type McpToolDocument, type McpToolSchema } from "@aoe/sdk-codegen";
import type { Principal } from "@aoe/query-engine";
import {
  classifyDesignBrief,
  type BriefCompletionModel,
} from "../../adapters/intent-classifier/src/index.ts";
import {
  readPersonaContract,
  resolveDesign,
  type ResolvedDesign,
} from "../../adapters/design-resolver/src/index.ts";
import {
  EMPTY_CONTRACT,
  validateHtml,
  type AestheticJudgeModel,
  type DesignContract,
  type ValidationReport,
} from "../../adapters/html-validator/src/index.ts";
import type { DesignIntent, RetrievalScope } from "../../adapters/design-ranker/src/intent.ts";
import {
  RELATED_LIMIT_DEFAULT,
  findRelatedUnits,
  type RelatedResult,
} from "../../adapters/corpus-graph/src/index.ts";
import {
  buildChecklist,
  selectMandates,
  type ChecklistResult,
  type MandateResult,
  type ProjectionReader,
} from "../../adapters/design-standards/src/index.ts";
import type {
  ExternalSourceDescriptor,
  ScoutSearchResult,
  ScoutSourceAdapter,
} from "../../adapters/scout-catalog/src/index.ts";

/** The model root this toolset projects. Resolved from this file, not from cwd. */
export const TOOL_MODEL_ROOT = resolvePath(join(dirname(new URL(import.meta.url).pathname), "..", "..", "model"));

/** The generator id stamped into the emitted document, so an artifact says what produced it. */
export const TOOL_GENERATOR_ID = "aoe-design/mcp@0.2.0";

export class DesignToolsetError extends Error {
  constructor(readonly code: string, message: string) {
    super(message);
    this.name = "DesignToolsetError";
  }
}

/**
 * What a tool call needs beyond its own arguments.
 *
 * The corpus is the host's: `aoe_design_plan` runs without one, and
 * `aoe_design_resolve` / the composition layer of `aoe_design_validate` need
 * one. A toolset built without a corpus still serves all three tools and refuses
 * the corpus-backed paths with `CORPUS_NOT_BOUND` — which is the honest answer,
 * where returning an empty design would be a silent wrong one.
 */
export interface DesignCorpusBinding {
  readonly graph: GraphIR;
  readonly profile: RetrievalProfile;
  readonly projections: Readonly<Record<string, ProjectionDefinition>>;
  readonly relations?: Readonly<Record<string, RelationDefinition>>;
  readonly principal?: Principal;
  readonly maxTokens?: number;
  readonly scope?: RetrievalScope;
  /**
   * Reads a unit's rendered projection off the bundle. Required by `mandate` and
   * `checklist` and by nothing else: severity is declared in the rendered
   * markdown's `## Severity` section and is absent from `atom.yaml`, so it is not
   * in `UnitIR.fields` — `buildCorpusGraph` puts only the metadata keys there, and
   * `UnitIR.projections` holds bundle-relative *paths*. Supplied by the host
   * because the domain does not own the bundle path.
   */
  readonly readProjection?: ProjectionReader;
}

export interface DesignToolsetOptions {
  readonly corpus?: DesignCorpusBinding;
  /** Optional LLM seam for the classifier. Absent means the deterministic classifier. */
  readonly classifierModel?: BriefCompletionModel;
  /** Optional LLM seam for the aesthetic check. Absent means L2 reports `skipped`. */
  readonly aestheticModel?: AestheticJudgeModel;
  /** Injected so the validator stays testable without a temp file. Defaults to `readFileSync`. */
  readonly readFile?: (path: string) => string;
  readonly modelRoot?: string;
  /**
   * The scout catalogue, unloaded. `scout` loads it on first call rather than at
   * construction, which is what keeps 12.45 MiB of third-party payload out of a
   * process that never asks for a reference — the adapter's own stated reason for
   * separating `load()` from construction.
   */
  readonly scout?: ScoutSourceAdapter;
}

/**
 * A handler shaped like `action-runtime`'s `ActionProvider`
 * (`execute(input, context)` returning a promise). The interface is declared
 * structurally rather than imported so this package does not take a dependency on
 * the runtime before there is a runtime to register into; a host that has one can
 * pass these handlers straight to `ActionProviderRegistry.register` because the
 * shape already matches.
 */
export interface DesignToolHandler {
  execute(input: Readonly<Record<string, unknown>>): Promise<unknown>;
}

export interface DesignTool {
  readonly schema: McpToolSchema;
  readonly handler: DesignToolHandler;
}

export interface DesignToolset {
  /** The emitted document, digest and all, exactly as codegen produced it. */
  readonly document: McpToolDocument;
  readonly tools: readonly DesignTool[];
  /** Call a tool by its projected name. */
  invoke(name: string, input: Readonly<Record<string, unknown>>): Promise<unknown>;
}

// ── Argument readers ────────────────────────────────────────────────────────

function requireString(input: Readonly<Record<string, unknown>>, key: string, tool: string): string {
  const value = input[key];
  if (typeof value !== "string" || value.length === 0) {
    throw new DesignToolsetError("TOOL_INPUT_INVALID", `${tool} requires a non-empty string '${key}'`);
  }
  return value;
}

function requireCorpus(options: DesignToolsetOptions, tool: string): DesignCorpusBinding {
  if (options.corpus === undefined) {
    throw new DesignToolsetError(
      "CORPUS_NOT_BOUND",
      `${tool} needs a corpus binding (graph + retrieval profile + projections); the toolset was built without one`,
    );
  }
  return options.corpus;
}

/**
 * An optional integer. A present-but-wrong value is an error rather than a
 * silently-ignored one: `depth: "2"` from a client that stringified its arguments
 * would otherwise walk one hop and report success.
 */
function optionalInteger(
  input: Readonly<Record<string, unknown>>,
  key: string,
  tool: string,
): number | undefined {
  const value = input[key];
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "number" || !Number.isInteger(value)) {
    throw new DesignToolsetError("TOOL_INPUT_INVALID", `${tool} requires '${key}' to be an integer when present`);
  }
  return value;
}

function optionalBoolean(
  input: Readonly<Record<string, unknown>>,
  key: string,
  tool: string,
): boolean | undefined {
  const value = input[key];
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "boolean") {
    throw new DesignToolsetError("TOOL_INPUT_INVALID", `${tool} requires '${key}' to be a boolean when present`);
  }
  return value;
}

function optionalString(
  input: Readonly<Record<string, unknown>>,
  key: string,
  tool: string,
): string | undefined {
  const value = input[key];
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "string") {
    throw new DesignToolsetError("TOOL_INPUT_INVALID", `${tool} requires '${key}' to be a string when present`);
  }
  return value === "" ? undefined : value;
}

/**
 * A declared `string[]` input.
 *
 * This replaces the `commaList` reader, which existed only because
 * `model-schema`'s `Field.typeRef` had no array form: an input holding a list had
 * to arrive as `"a,b"` and be split here, so the emitted JSON Schema said `string`
 * where the handler wanted a list. `typeRef: string[]` now emits
 * `{"type":"array","items":{"type":"string"}}` and this reader enforces the same
 * thing at the door. A present-but-wrong value is an error rather than a silently
 * ignored one, for the reason `optionalInteger` gives: a client that passed
 * `"block,critical"` to a field declared as an array would otherwise get the
 * default selection and a success.
 */
function optionalStringArray(
  input: Readonly<Record<string, unknown>>,
  key: string,
  tool: string,
): readonly string[] | undefined {
  const value = input[key];
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value) || value.some(item => typeof item !== "string")) {
    throw new DesignToolsetError("TOOL_INPUT_INVALID", `${tool} requires '${key}' to be an array of strings when present`);
  }
  const parts = (value as readonly string[]).map(part => part.trim()).filter(part => part !== "");
  return parts.length === 0 ? undefined : parts;
}

function requireProjectionReader(corpus: DesignCorpusBinding, tool: string): ProjectionReader {
  if (corpus.readProjection === undefined) {
    throw new DesignToolsetError(
      "PROJECTION_READER_NOT_BOUND",
      `${tool} reads the '## Severity' section of each unit's rendered projection, which is not in UnitIR; the corpus binding supplied no readProjection`,
    );
  }
  return corpus.readProjection;
}

function requireScout(options: DesignToolsetOptions, tool: string): ScoutSourceAdapter {
  if (options.scout === undefined) {
    throw new DesignToolsetError(
      "SCOUT_NOT_BOUND",
      `${tool} needs the scout catalogue adapter; the toolset was built without one`,
    );
  }
  return options.scout;
}

// ── The three handlers ──────────────────────────────────────────────────────

/**
 * The one place the domain composes classify -> retrieve -> read persona. Shared
 * by `resolve` and `validate` so the contract the validator checks is the contract
 * the resolver produced, rather than two independently derived contracts (the
 * donor's `mcp-server/index.ts:940-975` rebuilt it a second way and swallowed the
 * difference in a `try`).
 */
async function planAndResolve(
  brief: string,
  options: DesignToolsetOptions,
  tool: string,
): Promise<{ readonly intent: DesignIntent; readonly resolved: ResolvedDesign; readonly contract: DesignContract }> {
  const corpus = requireCorpus(options, tool);
  const intent = await classifyIntent(brief, options);
  const request = {
    intent,
    graph: corpus.graph,
    profile: corpus.profile,
    projections: corpus.projections,
    ...(corpus.relations === undefined ? {} : { relations: corpus.relations }),
    ...(corpus.principal === undefined ? {} : { principal: corpus.principal }),
    ...(corpus.maxTokens === undefined ? {} : { maxTokens: corpus.maxTokens }),
    ...(corpus.scope === undefined ? {} : { scope: corpus.scope }),
  };
  const resolved = resolveDesign(request);
  const persona = corpus.graph.units.find(unit => unit.identity.id === resolved.source_persona);
  const contract = persona === undefined ? EMPTY_CONTRACT : readPersonaContract(persona);
  return { intent, resolved, contract };
}

function classifyIntent(brief: string, options: DesignToolsetOptions): Promise<DesignIntent> {
  return classifyDesignBrief(
    brief,
    options.classifierModel === undefined ? {} : { model: options.classifierModel },
  );
}

function buildHandlers(options: DesignToolsetOptions): Readonly<Record<string, DesignToolHandler>> {
  const readFile = options.readFile ?? ((path: string) => readFileSync(path, "utf8"));
  return {
    // Action `plan`. Output is the `DesignIntent` itself, which is byte-comparable
    // with the frozen `aoe_intent` payload (W9-A §1). Retrieval belongs to
    // `resolve`; a `plan` that also returned candidates would have no v1 baseline
    // to be compared against.
    plan: {
      async execute(input) {
        return classifyIntent(requireString(input, "brief", "plan"), options);
      },
    },
    resolve: {
      async execute(input) {
        const brief = requireString(input, "brief", "resolve");
        const { resolved } = await planAndResolve(brief, options, "resolve");
        return resolved;
      },
    },
    validate: {
      async execute(input): Promise<ValidationReport> {
        const htmlPath = requireString(input, "html_path", "validate");
        const brief = requireString(input, "brief", "validate");
        const html = readFile(htmlPath);
        // The contract is optional on purpose: with no corpus bound, L1 and the
        // retry prompt still work and L3 has nothing to check. The donor did the
        // same thing by catching its contract failure and passing empty sets
        // (`mcp-server/index.ts:958-975`); here it is a declared branch.
        let intent: DesignIntent;
        let contract: DesignContract = EMPTY_CONTRACT;
        if (options.corpus === undefined) {
          intent = await classifyIntent(brief, options);
        } else {
          const composed = await planAndResolve(brief, options, "validate");
          intent = composed.intent;
          contract = composed.contract;
        }
        return validateHtml({
          html,
          intent,
          contract,
          ...(options.aestheticModel === undefined ? {} : { model: options.aestheticModel }),
        });
      },
    },

    // ── The four restored legacy scopes ───────────────────────────────────
    //
    // Each one delegates to an adapter and reshapes nothing: the handler's whole
    // job is argument reading plus the corpus/scout binding. A handler that also
    // ranked or filtered would be a second policy authority next to the adapter,
    // which is the drift `TOOL_HANDLER_MISMATCH` cannot catch.

    related: {
      async execute(input): Promise<RelatedResult> {
        const corpus = requireCorpus(options, "related");
        const depth = optionalInteger(input, "depth", "related");
        const kind = optionalString(input, "kind", "related");
        return findRelatedUnits({
          graph: corpus.graph,
          id: requireString(input, "id", "related"),
          ...(depth === undefined ? {} : { depth }),
          limit: optionalInteger(input, "limit", "related") ?? RELATED_LIMIT_DEFAULT,
          ...(kind === undefined ? {} : { kind }),
        });
      },
    },

    mandate: {
      async execute(input): Promise<MandateResult> {
        const corpus = requireCorpus(options, "mandate");
        const severities = optionalStringArray(input, "severity", "mandate");
        const limit = optionalInteger(input, "limit", "mandate");
        return selectMandates({
          graph: corpus.graph,
          readProjection: requireProjectionReader(corpus, "mandate"),
          ...(severities === undefined ? {} : { severities }),
          ...(limit === undefined ? {} : { limit }),
        });
      },
    },

    checklist: {
      async execute(input): Promise<ChecklistResult> {
        const corpus = requireCorpus(options, "checklist");
        const limit = optionalInteger(input, "limit", "checklist");
        return buildChecklist({
          graph: corpus.graph,
          readProjection: requireProjectionReader(corpus, "checklist"),
          task: requireString(input, "task", "checklist"),
          ...(limit === undefined ? {} : { limit }),
        });
      },
    },

    scout: {
      async execute(input) {
        const adapter = requireScout(options, "scout");
        const query = requireString(input, "query", "scout");
        const sourceIds = optionalStringArray(input, "sources", "scout");
        const requireThumbnail = optionalBoolean(input, "require_thumbnail", "scout");
        const limit = optionalInteger(input, "limit", "scout");

        // Loaded here, not at construction. `load()` is idempotent from the
        // caller's side because `loaded` gates it, and its diagnostics are merged
        // into the first response rather than dropped — an absent payload root is
        // the single most likely deployment mistake and it must reach the caller.
        const loadDiagnostics = adapter.loaded ? [] : await adapter.load();

        const result: ScoutSearchResult = adapter.search({
          text: query,
          ...(sourceIds === undefined ? {} : { sourceIds }),
          ...(requireThumbnail === undefined ? {} : { requireThumbnail }),
          ...(limit === undefined ? {} : { limit }),
        });
        return {
          query,
          count: result.count,
          items: result.items,
          // Provenance and licence travel with every answer. `sources.yaml` records
          // 18 verbatim licences including `metadata-only` ones, and a caller that
          // received a thumbnail URL without them cannot honour the terms.
          sources: adapter.describeSources().map((source: ExternalSourceDescriptor) => ({
            id: source.id,
            sourceName: source.sourceName,
            sourceUrl: source.sourceUrl,
            license: source.license,
            curated: source.curated,
          })),
          diagnostics: [...loadDiagnostics, ...result.diagnostics],
        };
      },
    },
  };
}

// ── Construction ────────────────────────────────────────────────────────────

/** Project the Model Package into MCP tool schemas. No handler involved. */
export function emitDesignToolDocument(modelRoot: string = TOOL_MODEL_ROOT): McpToolDocument {
  return emitMcpTools(buildCodegenSchema(loadModelOrThrow(modelRoot)), TOOL_GENERATOR_ID);
}

/**
 * Build the toolset.
 *
 * The projected tool set is the authority: a handler with no projected tool, or a
 * projected tool with no handler, is a construction-time error. Both directions
 * are checked because only one of them is the drift people expect — a model that
 * gained an action is far more common than a handler nobody declared, and the
 * second one is the more dangerous because it looks like working code.
 */
export function createDesignToolset(options: DesignToolsetOptions = {}): DesignToolset {
  const document = emitDesignToolDocument(options.modelRoot ?? TOOL_MODEL_ROOT);
  const handlers = buildHandlers(options);
  const prefix = `${document.model.name.replace(/[^A-Za-z0-9]+/g, "_")}_`;

  const tools: DesignTool[] = [];
  const unmatched = new Set(Object.keys(handlers));
  const missing: string[] = [];
  for (const schema of document.tools) {
    // The action name is recovered by stripping the model prefix the emitter
    // added, so the handler keys are action names and this file never spells a
    // tool name.
    const action = schema.name.startsWith(prefix) ? schema.name.slice(prefix.length) : schema.name;
    const handler = handlers[action];
    if (handler === undefined) {
      missing.push(schema.name);
      continue;
    }
    unmatched.delete(action);
    tools.push({ schema, handler });
  }

  if (missing.length > 0 || unmatched.size > 0) {
    const parts: string[] = [];
    if (missing.length > 0) parts.push(`projected tools with no handler: [${missing.sort().join(", ")}]`);
    if (unmatched.size > 0) parts.push(`handlers with no projected tool: [${[...unmatched].sort().join(", ")}]`);
    throw new DesignToolsetError("TOOL_HANDLER_MISMATCH", `${TOOL_MODEL_ROOT}: ${parts.join("; ")}`);
  }

  const byName = new Map(tools.map(tool => [tool.schema.name, tool] as const));
  return {
    document,
    tools,
    async invoke(name, input) {
      const tool = byName.get(name);
      if (tool === undefined) {
        throw new DesignToolsetError(
          "TOOL_NOT_FOUND",
          `No tool '${name}'; projected: [${[...byName.keys()].sort().join(", ")}]`,
        );
      }
      return tool.handler.execute(input);
    },
  };
}
