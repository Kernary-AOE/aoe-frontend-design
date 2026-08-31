/**
 * @module design-resolver
 *
 * `intent + corpus -> ResolvedDesign`. Plan §4.5 `adapters/design-resolver/`.
 *
 * ── Why this is the one that really had to be rewritten ──────────────────────
 *
 * The donor is `packages/retrieval/src/resolver.ts` (547 lines). Its pipeline was:
 *
 *   1. `classifyBrief` from `@prime-lang/intent`
 *   2. `multiAxisRetrieve` from its own sibling
 *   3. `buildPersonaPath(id, primeRoot)` -> `<root>/primes-v3/sources/@scope/name.prime`
 *   4. `parse()` from `../../parser/src/index.ts`, then hand-walk the AST
 *   5. `extractContract(personaPath)` from `../../composition/src/index.ts`
 *
 * Steps 3-5 are the reason this is not a file move. Reading a persona by
 * *recomputing a source path from an atom id* and re-parsing `.prime` at request
 * time is exactly what plan §16 Phase 0's acceptance forbids ("Runtime 不读取源
 * `.prime`"), and it is a second corpus authority besides the compiled snapshot.
 * Here the persona is a `UnitIR` that arrived in the `GraphIR` the host already
 * loaded, and its `implies`/`composition` blocks are read out of
 * `UnitIR.fields` — the compiler's own normalised output — through the engine's
 * own `resolvePath`. There is no path building, no parser and no `fs` in this
 * file.
 *
 * Steps 1-2 are inverted the same way. The intent arrives as an argument (the
 * `intent-classifier` adapter produces it), and retrieval is the engine's
 * `runRetrieval`, driven by the six-axis generators the `design-ranker` adapter
 * registers from the profile. This adapter therefore contains *no* retrieval logic
 * of its own: if it did, that would be the second ranker the lane brief warns
 * about.
 *
 * What is left here is the only thing the donor had that is genuinely
 * frontend-design: turning persona prose ("compact — 4–8px radius only, 1080px
 * max-width") into typed CSS-ready values. That is domain vocabulary and it stays
 * in the domain package.
 */

import type { GraphIR, SelectionCandidateIR, TypedValueIR, UnitIR } from "@skill-wiki/ir";
import type { ProjectionDefinition, RelationDefinition, RetrievalProfile } from "@skill-wiki/model-schema";
import {
  CandidateGeneratorRegistry,
  runRetrieval,
  resolvePath,
  type Principal,
  type QueryRequest,
} from "@skill-wiki/query-engine";
import { registerSixAxisGenerators } from "../../design-ranker/src/index.ts";
import type { DesignIntent, RetrievalScope } from "../../design-ranker/src/intent.ts";
import type { DesignContract } from "../../html-validator/src/index.ts";

// ── Output contract (resolver.ts:38-91, key for key) ────────────────────────

export interface ResolvedTypography {
  display: string;
  body: string;
  monospace?: string;
  weight_signature?: number | string;
  opentype_features?: string;
  line_height?: string;
  base_size?: string;
  extra?: Record<string, string>;
}

export interface ResolvedColor {
  background: string;
  heading?: string;
  body?: string;
  accent: string;
  shadow_style?: string;
  temperature?: string;
  palette_summary?: string;
  extra?: Record<string, string>;
}

export interface ResolvedDensity {
  radius?: string;
  gap?: string;
  max_width?: string;
  row_height?: string;
  description?: string;
}

export interface ResolvedMotion {
  ease?: string;
  duration_ms?: number;
  spring_config?: string;
  stagger_ms?: number;
  notes?: string;
}

export interface ResolvedLayout {
  description: string;
  grid?: string;
  max_width?: string;
}

export interface ResolvedDesign {
  readonly intent: DesignIntent;
  readonly typography: ResolvedTypography;
  readonly color: ResolvedColor;
  readonly density: ResolvedDensity;
  readonly motion: ResolvedMotion;
  readonly layout: ResolvedLayout;
  readonly must_include_patterns: readonly string[];
  readonly must_include_templates: readonly string[];
  readonly must_avoid_atoms: readonly string[];
  readonly recommended_motion: readonly string[];
  readonly rules_to_honor: readonly string[];
  readonly source_persona: string;
  readonly source_atoms: readonly string[];
}

// ── Request ─────────────────────────────────────────────────────────────────

/**
 * Everything the engine needs, supplied by the host. `projections` and
 * `relations` are the host's because `runRetrieval` resolves the profile's
 * projection chain against them — a domain adapter that declared its own `core`
 * projection to satisfy that lookup would be a second authority for a projection
 * the corpus already renders.
 */
export interface DesignCorpusContext {
  readonly graph: GraphIR;
  readonly profile: RetrievalProfile;
  readonly projections: Readonly<Record<string, ProjectionDefinition>>;
  readonly relations?: Readonly<Record<string, RelationDefinition>>;
  readonly principal?: Principal;
  readonly maxTokens?: number;
}

export interface ResolveDesignRequest extends DesignCorpusContext {
  readonly intent: DesignIntent;
  readonly scope?: RetrievalScope;
  readonly requestId?: string;
}

export class DesignResolverError extends Error {
  constructor(readonly code: string, message: string) {
    super(message);
    this.name = "DesignResolverError";
  }
}

/** `mcp-server/index.ts` served a public, unlabelled principal; the same default is stated once here. */
const PUBLIC_PRINCIPAL: Principal = { id: "prime-design", allowedVisibility: ["public"], grantedPolicyLabels: [] };
/** `resolver.ts` had no budget at all. A positive integer is required by `runRetrieval`, so one is declared rather than smuggled in as 0. */
const DEFAULT_MAX_TOKENS = 4000;

// ── UnitIR field readers ────────────────────────────────────────────────────

/**
 * Read a nested field as a string.
 *
 * `resolvePath` is the engine's own accessor for `UnitIR.fields`; using it rather
 * than a local walker means an `implies.font.display` that the compiler recorded
 * as a `number` is coerced the same way everywhere in the system. The donor's
 * `valueToString` accepted String/Ident/EnumValue/Number/Boolean AST nodes
 * (`resolver.ts:247-262`); the same five collapse to `string`/`number`/`boolean`
 * in `TypedValueIR`, so the set is preserved.
 */
function scalar(value: TypedValueIR): string | undefined {
  if (value.kind === "string") return value.value;
  if (value.kind === "number" || value.kind === "boolean") return String(value.value);
  return undefined;
}

/**
 * `resolvePath` returns a LIST, because a path through a repeated field addresses
 * one value per element (`values.ts:13-17`). Every path this adapter walks is
 * single-valued in the corpus, so the first element is taken — and taking the
 * first rather than joining means a persona that unexpectedly declared
 * `implies.font.display` twice yields one font instead of a concatenation that
 * would reach the CSS.
 */
function readString(unit: UnitIR, path: readonly string[]): string | undefined {
  for (const value of resolvePath(unit.fields, path)) {
    const text = scalar(value);
    if (text !== undefined) return text;
  }
  return undefined;
}

/** Read an object field's scalar members as `Record<string, string>` (donor `extractStringRecord`, `resolver.ts:288-297`). */
function readStringRecord(unit: UnitIR, path: readonly string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const value of resolvePath(unit.fields, path)) {
    if (value.kind !== "object") continue;
    for (const key of Object.keys(value.fields).sort()) {
      if (key in out) continue;
      const text = scalar(value.fields[key]!);
      if (text !== undefined) out[key] = text;
    }
  }
  return out;
}

/** Read an array field's scalar items (donor `extractStringArray`, `resolver.ts:275-285`). */
function readStringArray(unit: UnitIR, path: readonly string[]): readonly string[] {
  const out: string[] = [];
  for (const value of resolvePath(unit.fields, path)) {
    // A path that ends at an array is returned as the array node itself; a path
    // that passed THROUGH an array is already flattened to its elements
    // (`values.ts:28-41`). Both shapes reach here, so both are handled.
    if (value.kind === "array") {
      for (const item of value.items) {
        const text = scalar(item);
        if (text !== undefined) out.push(text);
      }
    } else {
      const text = scalar(value);
      if (text !== undefined) out.push(text);
    }
  }
  return out;
}

// ── Prose -> typed values (resolver.ts:398-546) ─────────────────────────────

/** `resolver.ts:403-425`. */
export function parseDensity(raw: string): ResolvedDensity {
  const result: ResolvedDensity = raw.length > 0 ? { description: raw } : {};
  if (raw.length === 0) return result;
  const radius = raw.match(/(\d+(?:[–-]\d+)?px)\s*radius/i);
  if (radius !== null) result.radius = radius[1];
  const maxWidth = raw.match(/(\d+px)\s*max-width/i);
  if (maxWidth !== null) result.max_width = maxWidth[1];
  const rowHeight = raw.match(/(\d+(?:[–-]\d+)?px)\s*row\s*height/i);
  if (rowHeight !== null) result.row_height = rowHeight[1];
  const gap = raw.match(/(\d+px)\s*(?:base\s*spacing|gap)/i);
  if (gap !== null) result.gap = gap[1];
  return result;
}

/** `resolver.ts:436-464`. */
export function parseMotion(raw: string): ResolvedMotion {
  const result: ResolvedMotion = raw.length > 0 ? { notes: raw } : {};
  if (raw.length === 0) return result;
  const duration = raw.match(/(\d+)(?:[–-]\d+)?ms/i);
  if (duration !== null) result.duration_ms = Number(duration[1]);
  const cubic = raw.match(/cubic-bezier\([^)]+\)/i);
  if (cubic !== null) result.ease = cubic[0];
  else {
    const ease = raw.match(/\b(ease-out|ease-in-out|ease-in|linear|ease)\b/i);
    if (ease !== null) result.ease = ease[1];
  }
  const stagger = raw.match(/(?:stagger[^\d]*)(\d+)ms|(\d+)ms\s*stagger/i);
  if (stagger !== null) result.stagger_ms = Number(stagger[1] ?? stagger[2]);
  if (/spring/i.test(raw)) result.spring_config = raw.match(/spring[^,;.]+/i)?.[0] ?? "spring";
  return result;
}

/** `resolver.ts:471-484`. */
export function parseLayout(raw: string): ResolvedLayout {
  const result: ResolvedLayout = { description: raw };
  if (raw.length === 0) return result;
  const maxWidth = raw.match(/(?:centered\s+)?(\d+)px(?:\s+max-width)?/i);
  if (maxWidth !== null) result.max_width = `${maxWidth[1]}px`;
  const grid = raw.match(/(\d+-col\s+grid|[a-z]+-\w+\s+grid)/i);
  if (grid !== null) result.grid = grid[1];
  return result;
}

/** `resolver.ts:495-521`. */
export function extractAccentFromPalette(palette: string): string {
  if (palette.length === 0) return "currentColor";
  const cta =
    palette.match(/#([0-9a-fA-F]{6})\s+(?:brand|cta)/i) ?? palette.match(/(?:brand|cta)[^#]*#([0-9a-fA-F]{6})/i);
  if (cta !== null) return `#${cta[1]}`;
  const oklch = palette.match(/oklch\([^)]+\)/i);
  if (oklch !== null) return oklch[0];
  for (const hex of palette.match(/#[0-9a-fA-F]{6}/g) ?? []) {
    const normalised = hex.toLowerCase();
    if (normalised !== "#ffffff" && normalised !== "#000000") return hex;
  }
  return palette.split(/[,;]/)[0]?.trim() ?? "currentColor";
}

/** `resolver.ts:330-377` — `composition.typography-required` overrides `implies.font.*`. */
export function mergeTypography(
  base: { readonly display: string; readonly body: string; readonly monospace?: string },
  required: Readonly<Record<string, string>>,
): ResolvedTypography {
  const result: ResolvedTypography = { display: base.display, body: base.body };
  if (base.monospace !== undefined) result.monospace = base.monospace;
  const extra: Record<string, string> = {};
  for (const [key, value] of Object.entries(required)) {
    switch (key) {
      case "display": result.display = value; break;
      case "body": result.body = value; break;
      case "monospace": result.monospace = value; break;
      case "weight-signature": result.weight_signature = Number.isNaN(Number(value)) ? value : Number(value); break;
      case "opentype-features": result.opentype_features = value; break;
      case "line-height": result.line_height = value; break;
      case "base-size": result.base_size = value; break;
      default: extra[key] = value;
    }
  }
  if (Object.keys(extra).length > 0) result.extra = extra;
  return result;
}

/** `resolver.ts:388-433` — `composition.color-required` overrides `implies.color.*`. */
export function mergeColor(
  base: { readonly background: string; readonly accent: string; readonly palette_summary?: string; readonly temperature?: string },
  required: Readonly<Record<string, string>>,
): ResolvedColor {
  const result: ResolvedColor = { background: base.background, accent: base.accent };
  if (base.palette_summary !== undefined) result.palette_summary = base.palette_summary;
  if (base.temperature !== undefined) result.temperature = base.temperature;
  const extra: Record<string, string> = {};
  for (const [key, value] of Object.entries(required)) {
    switch (key) {
      case "background": result.background = value; break;
      case "heading": result.heading = value; break;
      case "body": result.body = value; break;
      case "accent": result.accent = value; break;
      case "shadow-style": result.shadow_style = value; break;
      default: extra[key] = value;
    }
  }
  if (Object.keys(extra).length > 0) result.extra = extra;
  return result;
}

// ── Contract extraction ─────────────────────────────────────────────────────

/**
 * The persona's own composition contract, read from `UnitIR.fields.composition`.
 *
 * The donor got this twice — once by hand-walking the AST (`resolver.ts:162-171`)
 * and once by calling `extractContract(personaPath)` from the composition package
 * inside a `try`, silently falling back to the hand-walked copy on any throw
 * (`resolver.ts:176-186`). Two readers of the same block with a swallowed
 * discrepancy is precisely the "second authority" shape; there is one reader here.
 */
export function readPersonaContract(persona: UnitIR): DesignContract {
  return {
    typography_required: readStringRecord(persona, ["composition", "typography-required"]),
    color_required: readStringRecord(persona, ["composition", "color-required"]),
    must_include: readStringArray(persona, ["composition", "must-include"]),
    must_avoid: readStringArray(persona, ["composition", "must-avoid"]),
  };
}

// ── Retrieval ───────────────────────────────────────────────────────────────

export interface DesignRetrieval {
  readonly candidates: readonly SelectionCandidateIR[];
  /** Candidates contributed by one axis generator, in the engine's ranked order. */
  readonly byAxis: Readonly<Record<string, readonly string[]>>;
}

/**
 * Run the engine's steps 1-3 with the six-axis generators registered.
 *
 * `runRetrieval` merges every generator's output into one ranked list, so the
 * per-axis grouping the donor's `result.axes` gave is recovered from each
 * candidate's `reasons` — the axis generators stamp `frontend-axis-<axis>: ...`
 * into `reasons` (`design-ranker/src/index.ts`), which is the only place that
 * information survives scoring. Recomputing it by re-running a generator would
 * make two answers possible.
 */
export function retrieveForIntent(request: ResolveDesignRequest): DesignRetrieval {
  const scope: RetrievalScope = request.scope ?? { forbiddenUnitIds: [] };
  const registry = new CandidateGeneratorRegistry();
  registerSixAxisGenerators(request.profile, request.intent, scope, registry);

  const queryRequest: QueryRequest = {
    requestId: request.requestId ?? `design-resolve-${request.profile.name}`,
    profile: request.profile.name,
    principal: request.principal ?? PUBLIC_PRINCIPAL,
    maxTokens: request.maxTokens ?? DEFAULT_MAX_TOKENS,
  };

  const result = runRetrieval(
    queryRequest,
    {
      graph: request.graph,
      profiles: { [request.profile.name]: request.profile },
      relations: request.relations ?? {},
      projections: request.projections,
    },
    { generators: registry },
  );

  const byAxis: Record<string, string[]> = {};
  for (const candidate of result.candidates) {
    for (const reason of candidate.reasons) {
      const match = reason.match(/^frontend-axis-([a-z0-9-]+):/);
      if (match === null) continue;
      const axis = match[1]!;
      const bucket = byAxis[axis] ?? (byAxis[axis] = []);
      if (!bucket.includes(candidate.unitId)) bucket.push(candidate.unitId);
    }
  }
  return { candidates: result.candidates, byAxis };
}

// ── Main entry ──────────────────────────────────────────────────────────────

/** `resolver.ts:224-227` — pattern/template partitioning is by id substring. */
const PATTERN_MARKER = "pattern-";
const TEMPLATE_MARKER = "template-";

/**
 * Resolve an intent into a typed design spec.
 *
 * Synchronous, unlike the donor's `async`: every `await` in the donor was a
 * dynamic `import()` of another root package or a `classifyBrief` LLM call, and
 * both are gone. A resolver that still returned a promise would be advertising an
 * effect it no longer has.
 */
export function resolveDesign(request: ResolveDesignRequest): ResolvedDesign {
  const retrieval = retrieveForIntent(request);

  // The register axis is named by the profile, not by this file: the axis whose
  // descriptor carries a school->persona map is the register axis (the same
  // data-driven test `design-ranker` uses). Reading a literal "register" here
  // would reintroduce `if (axis === "register")`, which the ranker adapter
  // deliberately removed.
  const registerAxisName = findRegisterAxisName(request.profile);
  const personaId = retrieval.byAxis[registerAxisName]?.[0];
  if (personaId === undefined) {
    throw new DesignResolverError(
      "REGISTER_AXIS_EMPTY",
      `The '${registerAxisName}' axis returned no candidate, so no persona could be resolved. ` +
        `The donor defaulted to '@impeccable/persona-vercel-clean' here (resolver.ts:126); that default is not ` +
        `reproduced because a hard-coded atom id is a corpus authority inside code.`,
    );
  }
  const persona = request.graph.units.find(unit => unit.identity.id === personaId);
  if (persona === undefined) {
    throw new DesignResolverError(
      "PERSONA_UNIT_MISSING",
      `Retrieval returned '${personaId}' but the graph has no unit with that id`,
    );
  }

  const typographyBase = {
    display: readString(persona, ["implies", "font", "display"]) ?? "system-ui",
    body: readString(persona, ["implies", "font", "body"]) ?? "system-ui",
    monospace: readString(persona, ["implies", "font", "monospace"]),
  };
  const palette = readString(persona, ["implies", "color", "palette"]) ?? "";
  const colorBase = {
    background: readString(persona, ["implies", "color", "background"]) ?? "#ffffff",
    palette_summary: palette.length > 0 ? palette : undefined,
    temperature: readString(persona, ["implies", "color", "temperature"]),
    accent: extractAccentFromPalette(palette),
  };

  const contract = readPersonaContract(persona);
  const motionAxisName = findMotionAxisName(request.profile);

  return {
    intent: request.intent,
    typography: mergeTypography(typographyBase, contract.typography_required),
    color: mergeColor(colorBase, contract.color_required),
    density: parseDensity(readString(persona, ["implies", "density"]) ?? ""),
    motion: parseMotion(readString(persona, ["implies", "motion"]) ?? ""),
    layout: parseLayout(readString(persona, ["implies", "layout"]) ?? ""),
    must_include_patterns: contract.must_include.filter(id => id.includes(PATTERN_MARKER)),
    must_include_templates: contract.must_include.filter(id => id.includes(TEMPLATE_MARKER)),
    must_avoid_atoms: contract.must_avoid,
    recommended_motion: motionAxisName === undefined ? [] : retrieval.byAxis[motionAxisName] ?? [],
    // `resolver.ts:231` read `result.task_yaml?.quality_checks`, a taxonomy YAML
    // the donor loaded from `primes-v3/taxonomy/`. Nothing in the compiled
    // snapshot carries it, so it is empty rather than invented — reported as a
    // gap instead of filled with a guess.
    rules_to_honor: [],
    source_persona: personaId,
    source_atoms: retrieval.candidates.map(candidate => candidate.unitId),
  };
}

/**
 * The axis whose descriptor declares a school->persona map. Declared in
 * `model/retrieval/six-axis.yaml` under `extensions.axes.<axis>.schoolPersonaMap`.
 */
function findRegisterAxisName(profile: RetrievalProfile): string {
  const axes = readAxisDescriptors(profile);
  const found = Object.keys(axes)
    .sort()
    .find(name => {
      const descriptor = axes[name];
      return descriptor !== null && typeof descriptor === "object" && "schoolPersonaMap" in descriptor;
    });
  if (found === undefined) {
    throw new DesignResolverError(
      "REGISTER_AXIS_NOT_DECLARED",
      "No axis in the retrieval profile declares a schoolPersonaMap, so the register axis cannot be identified",
    );
  }
  return found;
}

/**
 * The axis that carries `recommended_motion`. Identified by its `cluster`
 * descriptor, which `six-axis.yaml` sets only on the motion axis — the donor used
 * the literal string `"motion"` (`resolver.ts:189`).
 */
function findMotionAxisName(profile: RetrievalProfile): string | undefined {
  const axes = readAxisDescriptors(profile);
  return Object.keys(axes)
    .sort()
    .find(name => {
      const descriptor = axes[name];
      return descriptor !== null && typeof descriptor === "object" && "cluster" in descriptor;
    });
}

function readAxisDescriptors(profile: RetrievalProfile): Readonly<Record<string, unknown>> {
  const axes = profile.extensions?.axes;
  if (axes === null || axes === undefined || typeof axes !== "object" || Array.isArray(axes)) {
    throw new DesignResolverError(
      "PROFILE_AXES_MISSING",
      `Retrieval profile '${profile.name}' declares no extensions.axes block`,
    );
  }
  return axes as Readonly<Record<string, unknown>>;
}
