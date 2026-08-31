/**
 * @module scout-catalog/types
 *
 * The `SourceAdapter` contract, declared **domain-side**.
 *
 * ## Why this interface lives here and not in the kernel
 *
 * Plan §4.4 names Source Adapter as one of the two adapter families
 * ("Skill、Markdown、OpenAPI、JSON Schema、代码图、远程 API"), but the kernel has
 * no such SPI: grepping every kernel package's `src` for `interface *Adapter`
 * finds exactly one hit, `AtomLoaderAdapterOptions` in `projection-engine`, which
 * is an options bag for a projection loader and not an ingestion contract. The
 * only pluggable retrieval SPI the kernel exports is
 * `CandidateGenerator` (`query-engine/src/types.ts:100`).
 *
 * A domain package may not write the kernel (§15.4 is one-directional), so the
 * contract is declared here and reported upward as a kernel gap. Nothing in this
 * file is frontend-design specific — if the kernel later grows a `SourceAdapter`,
 * this is the shape to lift.
 *
 * ## Why `SourceAdapter` and not `CandidateGenerator`
 *
 * Four reasons, in decreasing order of how hard they are to work around:
 *
 * 1. **`SelectionCandidateIR` is unit-keyed.** Its only identity field is
 *    `unitId` (`ir/src/index.ts:90`), and every downstream stage resolves it
 *    against the graph: `expandSelection` walks adjacency by unit id, `planBudget`
 *    prices a `(unitId, projectionRef)` pair, and `planSelection` does
 *    `survivorsById.get(assignment.unitId)!` before emitting `projectionLoads`.
 *    A candidate whose id is not a unit yields a plan that points at nothing.
 *    Routing scout through `CandidateGenerator` therefore *requires* the 61590
 *    entries to be units — the one thing this lane forbids, and a 68x overshoot
 *    of the 900–10,000 unit scale §9.3 targets.
 *
 * 2. **`SelectionCandidateIR` has no payload slot.** The whole product value of
 *    scout is the reference itself: title, URL, thumbnail. `unitId` + `score` +
 *    `featureValues` + `reasons` cannot carry a thumbnail URL, so even a scout
 *    generator over the 18 *catalog* units (which do fit in the graph) would
 *    return "consult Godly" and never a link. That restores a pointer to the
 *    capability, not the capability.
 *
 * 3. **Scout's job is normalisation, which is what a source adapter is for.**
 *    The 18 payloads are heterogeneous third-party JSON with a per-source field
 *    mapping table (`catalog.fields`, see `sources.yaml`) — `title`/`name`/`slug`
 *    for the title, `url`/`demo_url`/`media`/`image_url` for the URL. Mapping
 *    foreign records onto one shape is §4.4's definition of the family.
 *
 * 4. **Scout is not a unit-selection decision at all.** Its two legacy consumers
 *    were `prime_query scope=scout` (return references) and
 *    `buildReferencesSection` (inject four thumbnails into a compile result,
 *    `mcp-server/index.ts:476-518`). Neither one budgets projections or expands
 *    relations, which is everything `planSelection` exists to do.
 *
 * What this adapter *does* borrow from §9.3 is its **explainability discipline**:
 * every hit carries a feature breakdown and a `selectedBecause` list, and scores
 * are `quantize`d on the kernel's own grid so two runs serialise identically.
 * §9.3's discipline applies; its unit-keyed Candidate type does not.
 */

import type { DiagnosticIR } from "@skill-wiki/ir";

/** Which key of a foreign record supplies which normalised field. `null` = absent. */
export interface FieldMapping {
  readonly title: string | null;
  readonly url: string | null;
  readonly category: string | null;
  readonly thumbnail: string | null;
  readonly description: string | null;
}

/**
 * What the manifest records about one payload file. `bytes`/`sha256` are the
 * measurement that makes "the data you loaded is the data we measured" checkable
 * for a payload that git does not track.
 */
export interface PayloadDescriptor {
  /** Path relative to the configured data root, never absolute in the manifest. */
  readonly path: string;
  readonly bytes: number;
  readonly sha256: string;
  /** What the source claims to hold. */
  readonly declaredEntryCount: number;
  /** What normalisation actually keeps. Differs when records lack title *and* url. */
  readonly loadableEntryCount: number;
}

/** One external source: its provenance, its licence, and how to read its payload. */
export interface ExternalSourceDescriptor {
  readonly id: string;
  /** The legacy `scout-catalog` atom this descriptor was extracted from. */
  readonly legacyAtomId: string;
  readonly sourceName: string;
  readonly sourceUrl: string;
  /** Verbatim from the source atom. §4.3 requires a corpus to declare this. */
  readonly license: string;
  /** Legacy `CURATED_SOURCES` membership, now data instead of a hardcoded set. */
  readonly curated: boolean;
  readonly usefulFor: readonly string[];
  readonly personaLean: readonly string[];
  readonly fields: FieldMapping;
  readonly payload: PayloadDescriptor;
}

/** Feature weights and result limits, declared in `sources.yaml`. */
export interface ScoutRetrievalConfig {
  readonly weights: Readonly<Record<string, number>>;
  readonly defaultLimit: number;
  readonly maxLimit: number;
  readonly minTokenLength: number;
}

export interface ScoutManifest {
  readonly protocol: "prime/scout-catalog/v1";
  readonly adapter: string;
  readonly retrieval: ScoutRetrievalConfig;
  readonly sources: readonly ExternalSourceDescriptor[];
}

/**
 * One normalised external reference.
 *
 * `id` is a content digest, not a load-order index. The legacy `ScoutEntry.id`
 * was `` `${sourceSlug}:${count}` `` (`mcp-server/data.ts:513`), so re-generating
 * a payload renumbered every reference and no id could be cited across two
 * loads. `<sourceId>#<16 hex of sha256(url \0 title)>` is stable under
 * reordering and under unrelated rows being added or removed.
 */
export interface ExternalReference {
  readonly id: string;
  readonly sourceId: string;
  readonly sourceName: string;
  readonly title: string;
  readonly url: string;
  readonly category?: string;
  readonly description?: string;
  readonly thumbnail?: string;
}

/**
 * A scored reference. The `features`/`selectedBecause` pair is §9.3's contract
 * ("每个 Candidate 返回 feature breakdown") expressed over references rather than
 * units — see this module's header for why the two cannot be the same type.
 */
export interface ExternalCandidate {
  readonly reference: ExternalReference;
  readonly score: number;
  readonly features: Readonly<Record<string, number>>;
  readonly selectedBecause: readonly string[];
}

/** Where the adapter is allowed to read payloads from. */
export type ScoutDataRoot =
  /** No payload available. The adapter still constructs and still answers. */
  | { readonly kind: "absent"; readonly reason: string }
  | { readonly kind: "directory"; readonly path: string };

export interface ScoutSearchRequest {
  readonly text: string;
  /** Restrict to these source ids. Empty/absent means every loaded source. */
  readonly sourceIds?: readonly string[];
  /** Only references that carry a thumbnail. What `## References` needs. */
  readonly requireThumbnail?: boolean;
  readonly limit?: number;
}

export interface ScoutSearchResult {
  readonly count: number;
  readonly items: readonly ExternalCandidate[];
  /** Non-fatal problems: unknown source id, query with no usable token, … */
  readonly diagnostics: readonly DiagnosticIR[];
}

/**
 * The adapter contract. Loading is explicit and separate from construction so a
 * host can decide *when* 12.45 MiB enters memory, and so an adapter over an
 * absent payload is a first-class state rather than a constructor throw.
 */
export interface SourceAdapter<TRequest, TResult> {
  readonly name: string;
  /** Provenance and licence of every declared source, payload present or not. */
  describeSources(): readonly ExternalSourceDescriptor[];
  /** True once `load()` has run. `search` on an unloaded adapter is a diagnostic. */
  readonly loaded: boolean;
  load(): Promise<readonly DiagnosticIR[]>;
  search(request: TRequest): TResult;
}

export type ScoutSourceAdapter = SourceAdapter<ScoutSearchRequest, ScoutSearchResult>;

/** Diagnostic codes this adapter emits. Exported so tests assert on them. */
export const SCOUT_DATA_ROOT_ABSENT = "SCOUT_DATA_ROOT_ABSENT";
export const SCOUT_SOURCE_PAYLOAD_MISSING = "SCOUT_SOURCE_PAYLOAD_MISSING";
export const SCOUT_SOURCE_PAYLOAD_UNREADABLE = "SCOUT_SOURCE_PAYLOAD_UNREADABLE";
export const SCOUT_SOURCE_DIGEST_MISMATCH = "SCOUT_SOURCE_DIGEST_MISMATCH";
export const SCOUT_ENTRY_COUNT_DRIFT = "SCOUT_ENTRY_COUNT_DRIFT";
export const SCOUT_ENTRY_DISCARDED = "SCOUT_ENTRY_DISCARDED";
export const SCOUT_ENTRY_ID_COLLISION = "SCOUT_ENTRY_ID_COLLISION";
export const SCOUT_NOT_LOADED = "SCOUT_NOT_LOADED";
export const SCOUT_SOURCE_UNKNOWN = "SCOUT_SOURCE_UNKNOWN";
export const SCOUT_QUERY_NO_TOKENS = "SCOUT_QUERY_NO_TOKENS";

export class ScoutManifestError extends Error {
  constructor(readonly code: string, message: string) {
    super(message);
    this.name = "ScoutManifestError";
  }
}

export function diagnostic(
  code: string,
  message: string,
  severity: DiagnosticIR["severity"],
  path?: readonly string[],
): DiagnosticIR {
  return path === undefined ? { code, message, severity } : { code, message, severity, path };
}
