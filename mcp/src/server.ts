#!/usr/bin/env bun
/**
 * @module mcp/server
 *
 * The production stdio entry for the three domain tools. `mcp/src/index.ts` builds
 * the toolset; this file is the only thing that turns it into a process, and it is
 * separate for the same reason `mcp-server-core` keeps `runStdioServer` out of
 * `createAoeMcpServer`: importing the toolset must stay side-effect free.
 *
 * ── Why a SECOND `.mcp.json` server rather than six tools on one ─────────────
 *
 * §15.4 is one-way: the domain depends on the kernel, never the reverse. So
 * `mcp-server-core` cannot register `aoe_design_*`, and the only way to serve
 * all six from one process is for a DOMAIN package to own the generic
 * `aoe_query`/`aoe_plan`/`aoe_resource` surface — which inverts ownership of
 * the kernel's public API — or for a third composition-host package to exist,
 * which round 12 explicitly does not add. Two servers also fail independently
 * (`TOOL_HANDLER_MISMATCH` here would otherwise take `aoe_query` down with it)
 * and compose linearly to N domains, where aggregation needs a new host per
 * combination. The tool names are already disjoint by construction
 * (`aoe_` vs `aoe_design_`), so aggregation would buy no namespacing either.
 *
 * The cost of two servers is that the bundle is loaded twice. A sub-second local
 * boot over the 797-unit release does not justify a cross-domain aggregation layer.
 *
 * ── Why the kernel is imported by source path ────────────────────────────────
 *
 * `@aoe/mcp-server-core` is the one kernel package whose `exports` points
 * at `dist/index.js` instead of `src/index.ts`, and that `dist` is a stale build
 * artifact no repo gate rebuilds. Production already boots the source rather than
 * the bundle — `.mcp.json` runs `packages/mcp-server-core/src/index.ts` — so this
 * host resolves the same way. Every other kernel import below goes through its
 * package specifier because those packages already resolve to `src`.
 */

import { readFileSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import type { SnapshotRef as IrSnapshotRef } from "@aoe/ir";
import type { Principal } from "@aoe/query-engine";
import { loadAtomMeta, loadCorpusSnapshot, loadIndex, resolveProjection, verifyCorpusSignature, type ProjectionLevel } from "@aoe/runtime";
import {
  buildCorpusGraph,
  loadServeModel,
  resolveModelRoot,
  verifyModelLock,
} from "../../../aoe-engine/packages/mcp-server-core/src/index.ts";
import {
  createScoutSourceAdapter,
  resolveDataRoot,
  type ScoutCatalogAdapter,
} from "../../adapters/scout-catalog/src/index.ts";
import type { ProjectionReader } from "../../adapters/design-standards/src/index.ts";
import { createDesignToolset, type DesignToolset } from "./index.ts";

const SERVER_NAME = "aoe-design";
const SERVER_VERSION = "0.2.0";
const MAX_TOKENS_ENV = "AOE_MAX_TOKENS";
const DEFAULT_MAX_TOKENS = 8000;
/**
 * Where scout payloads live. Separate from `AOE_CORPUS_DIR` on purpose: the 18
 * catalogues are third-party data that git does not track and that are explicitly
 * not corpus units, and the legacy loader's habit of deriving the payload root by
 * walking one level up from the corpus root (`mcp-server/data.ts:445`) is exactly
 * the coupling `adapters/scout-catalog` was written to remove. Unset means the
 * `scout` tool answers with `SCOUT_DATA_ROOT_ABSENT` and a reason, not a crash.
 */
const SCOUT_DATA_ROOT_ENV = "AOE_SCOUT_DATA_ROOT";
const SCOUT_VERIFY_DIGEST_ENV = "AOE_SCOUT_VERIFY_DIGEST";

/**
 * Read a unit's rendered projection off the bundle.
 *
 * `mandate` and `checklist` need the `## Severity` section, which exists only in
 * the rendered markdown: no `atom.yaml` carries
 * a severity key, so it is absent from `UnitIR.fields`, and `UnitIR.projections`
 * holds bundle-relative *paths* rather than content. `resolveProjection` is the
 * kernel's own resolver, so this host reads the same file `aoe_query scope=show`
 * would serve. A missing or unreadable file becomes `undefined`, which the adapter
 * turns into a counted diagnostic — a throw here would take a whole-corpus sweep
 * down over one bad file.
 */
function createProjectionReader(corpusDir: string): ProjectionReader {
  return (unitId, level) => {
    try {
      return readFileSync(resolveProjection(corpusDir, unitId, level as ProjectionLevel), "utf8");
    } catch {
      return undefined;
    }
  };
}

/**
 * The domain's own retrieval profile, read from the shipped YAML.
 *
 * It is NOT taken from `ServeModel.profiles`: the compiled bundle resolves to the
 * v1 compatibility model, whose single `default` profile is the kernel's generic
 * two-axis one. The six-axis profile is domain data and lives in this package;
 * loading it from anywhere else would serve `aoe_design_resolve` a ranking the
 * domain never declared.
 */
/**
 * Local stdio principal, identical in reasoning to `mcp-server-core`'s: there is
 * no authentication on a stdio transport, and the caller already holds the bundle
 * on disk. Stated rather than defaulted so it is visible as a declared gap.
 */
function localPrincipal(): Principal {
  return { id: "local", allowedVisibility: ["private", "shared", "public"], grantedPolicyLabels: [] };
}

function readPositiveInt(raw: string | undefined, fallback: number): number {
  if (raw === undefined) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export interface DesignServerOptions {
  readonly corpusDir: string;
  readonly environment?: Record<string, string | undefined>;
  readonly stderr?: Pick<Console, "error">;
}

export interface DesignServerInstance {
  readonly server: McpServer;
  readonly toolset: DesignToolset;
  readonly snapshotLabel: string;
}

/**
 * Bind the toolset to a compiled bundle and register the projected tools.
 *
 * The corpus binding is assembled from the kernel's own loaders, not re-derived:
 * `loadCorpusSnapshot`/`loadIndex`/`loadAtomMeta` for the artifact reads and
 * `buildCorpusGraph` for the `GraphIR`, so this host and `aoe_query` see the
 * identical graph over the identical snapshot. The only thing the domain
 * contributes is its retrieval profile.
 */
export function createDesignServer(options: DesignServerOptions): DesignServerInstance {
  const stderr = options.stderr ?? console;
  const environment = options.environment ?? process.env;

  const loaded = loadCorpusSnapshot(options.corpusDir);
  verifyCorpusSignature(options.corpusDir);
  for (const diagnostic of loaded.diagnostics) {
    stderr.error(`[aoe-design] ${diagnostic.severity} ${diagnostic.code}: ${diagnostic.message}`);
  }
  const index = loadIndex(options.corpusDir);
  const model = loadServeModel(resolveModelRoot(options.corpusDir, environment));
  verifyModelLock({
    bundleRoot: options.corpusDir,
    model: model.model,
    manifestModels: loaded.manifest?.models,
    manifestSchemaDigest: loaded.manifest?.schemaDigest,
  });
  const sixAxisProfile = model.profiles["frontend-six-axis"];
  if (sixAxisProfile === undefined) throw new Error("Model Package declares no frontend-six-axis retrieval profile");

  const irSnapshot: IrSnapshotRef = {
    modelRelease: model.model.manifest.version,
    modelDigest: loaded.snapshot.schemaDigest,
    corpusRelease: loaded.snapshot.release,
    corpusDigest: loaded.snapshot.contentDigest,
  };
  const corpusGraph = buildCorpusGraph({
    atoms: index.atoms,
    loadMeta: (id: string) => loadAtomMeta(options.corpusDir, id),
    snapshot: irSnapshot,
    corpus: loaded.snapshot.corpus,
  });

  const toolset = createDesignToolset({
    corpus: {
      graph: corpusGraph.graph,
      profile: sixAxisProfile,
      projections: model.projections,
      relations: model.relations,
      principal: localPrincipal(),
      maxTokens: readPositiveInt(environment[MAX_TOKENS_ENV], DEFAULT_MAX_TOKENS),
      readProjection: createProjectionReader(options.corpusDir),
    },
    scout: createScoutSourceAdapter({
      dataRoot: resolveDataRoot(environment[SCOUT_DATA_ROOT_ENV]),
      // Digest verification is off by default because a mismatch would be
      // reported as a diagnostic either way and hashing 12.45 MiB on the first
      // `scout` call is a latency the operator should opt into.
      verifyDigest: environment[SCOUT_VERIFY_DIGEST_ENV] === "1",
    }) satisfies ScoutCatalogAdapter,
  });

  const server = new McpServer({ name: SERVER_NAME, version: SERVER_VERSION }, { capabilities: { tools: {} } });

  // The low-level handlers are used deliberately. `McpServer.registerTool` takes a
  // Zod shape and derives the advertised JSON Schema from it, which would mean
  // hand-writing a Zod mirror of `emitMcpTools`' `inputSchema` — a second schema
  // authority next to the model, and exactly the drift this package refuses
  // elsewhere. Here the projected JSON Schema goes on the wire byte-for-byte.
  server.server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: toolset.tools.map((tool) => ({
      name: tool.schema.name,
      description: tool.schema.description,
      inputSchema: tool.schema.inputSchema,
      outputSchema: tool.schema.outputSchema,
      annotations: {
        readOnlyHint: tool.schema.annotations.readOnlyHint,
        destructiveHint: tool.schema.annotations.destructiveHint,
        idempotentHint: tool.schema.annotations.idempotentHint,
      },
    })),
  }));

  server.server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const output = await toolset.invoke(request.params.name, request.params.arguments ?? {});
      return { content: [{ type: "text" as const, text: JSON.stringify(output, null, 2) }] };
    } catch (error) {
      // Reported as a tool error rather than a protocol error: `CORPUS_NOT_BOUND`
      // and `TOOL_INPUT_INVALID` are answers about the call, and a JSON-RPC error
      // would hide the code from a client that only renders content.
      const code = error instanceof Error && "code" in error ? String((error as { code: unknown }).code) : "TOOL_FAILED";
      const message = error instanceof Error ? error.message : String(error);
      return { content: [{ type: "text" as const, text: `${code}: ${message}` }], isError: true };
    }
  });

  const snapshotLabel = `${loaded.snapshot.corpus}@${loaded.snapshot.release}`;
  stderr.error(
    `[aoe-design] model ${model.model.manifest.name}@${model.model.manifest.version} · ` +
      `profile ${toolset.document.model.name}@${toolset.document.model.version} · ` +
      `${index.total} units · snapshot ${snapshotLabel}`,
  );
  return { server, toolset, snapshotLabel };
}

/** Production stdio entry point. */
export async function runDesignStdioServer(
  environment: Record<string, string | undefined> = process.env,
): Promise<void> {
  const corpusDir = environment.AOE_CORPUS_DIR;
  if (!corpusDir) throw new Error("AOE_CORPUS_DIR is required and must point to a compiled corpus.");
  const instance = createDesignServer({ corpusDir, environment });
  await instance.server.connect(new StdioServerTransport());
  console.error(
    `[aoe-design] ready · tools: ${instance.toolset.tools.map((tool) => tool.schema.name).join(", ")} · ` +
      `snapshot ${instance.snapshotLabel} · stdio active`,
  );
}

const isEntrypoint =
  Boolean(process.argv[1]) && import.meta.url === new URL(`file://${resolvePath(process.argv[1]!)}`).href;
if (isEntrypoint) {
  runDesignStdioServer().catch((error: unknown) => {
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? String((error as { code: unknown }).code)
        : "BOOT_FAILED";
    console.error(`[aoe-design] error ${code}: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
