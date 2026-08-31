/**
 * @module @prime-domain/frontend-design/corpus-graph
 *
 * Bounded-depth relation traversal — the `depth: 1-3` half of legacy
 * `prime_query scope=related` that the production path dropped.
 *
 * ## What was measured before this was written
 *
 * The kernel's own `related` scope walks **exactly one hop** and accepts no depth:
 * `mcp-server-core/src/serve.ts:491 relatedOf` iterates `subject.relations` once,
 * in declaration order, and returns. Its inline comment explains why it does not
 * route through `expandSelection` (relation semantics would drop `informational`
 * edges, which is most of them under the v1 model) — that reasoning is correct and
 * is reused here, so this module walks adjacency directly rather than through the
 * expansion stage too.
 *
 * The legacy implementation is `mcp-server/graph.ts:7 findRelated(atomId, depth,
 * atoms, edges)`. Two properties of it are contractual and are preserved:
 *
 *  1. **Depth is hop count, and the subject is never in the result.** `visited`
 *     starts as `{atomId}` and the loop runs `depth` times.
 *  2. **Outgoing edges of any type, plus INCOMING edges of type `requires`.**
 *     The legacy comment states the reason verbatim: "if B requires A, and we're
 *     at A, show B". A reverse walk restricted to the one relation whose inverse
 *     carries obligation. Reported to the caller as `required-by`, as it was.
 *
 * Two properties of the legacy version are **not** preserved, deliberately:
 *
 *  - It scanned the whole `edges` array once per frontier node — O(depth · |F| ·
 *    |E|). This uses the kernel's `buildAdjacency`, which is the *same* index the
 *    graph generator and relation expansion already build, and which sorts edges
 *    on construction so a traversal does not change when a file is renamed.
 *  - It mutated the returned atoms (`(target as any)._edgeType = …`), so two
 *    concurrent traversals corrupted each other's provenance. Provenance is a
 *    field of the result record here.
 *
 * Dependency direction (§15.4): imports `@skill-wiki/ir` and
 * `@skill-wiki/query-engine`; imports nothing from the repository-root `packages/`
 * tree.
 */

import type { DiagnosticIR, GraphIR, UnitIR } from "@skill-wiki/ir";
import { buildAdjacency, type Adjacency } from "@skill-wiki/query-engine";

/** Legacy `prime_query`'s declared bounds: `z.number().min(1).max(3)`. */
export const RELATED_DEPTH_MIN = 1;
export const RELATED_DEPTH_MAX = 3;
/** Legacy default when `depth` was omitted (`mcp-server/index.ts:850`). */
export const RELATED_DEPTH_DEFAULT = 1;
/** Legacy default `limit` for the `related` scope (`index.ts:849` via `?? 10`). */
export const RELATED_LIMIT_DEFAULT = 10;

/**
 * The one relation whose *inverse* is walked. Named as a constant rather than
 * inlined because it is a policy statement, not a detail: every other relation is
 * followed forwards only.
 */
export const REVERSE_WALKED_RELATION = "requires";
/** How a reverse `requires` hop is reported. Legacy `_edgeType` value. */
export const REVERSE_RELATION_LABEL = "required-by";

export const RELATED_SUBJECT_UNKNOWN = "RELATED_SUBJECT_UNKNOWN";
export const RELATED_DEPTH_OUT_OF_RANGE = "RELATED_DEPTH_OUT_OF_RANGE";
export const RELATED_TARGET_DANGLING = "RELATED_TARGET_DANGLING";
export const RELATED_TRUNCATED = "RELATED_TRUNCATED";

export class CorpusGraphError extends Error {
  constructor(readonly code: string, message: string) {
    super(message);
    this.name = "CorpusGraphError";
  }
}

function diagnostic(
  code: string,
  message: string,
  severity: DiagnosticIR["severity"],
  path?: readonly string[],
): DiagnosticIR {
  return path === undefined ? { code, message, severity } : { code, message, severity, path };
}

/** One unit reached by the walk, with the hop that reached it. */
export interface RelatedUnit {
  readonly id: string;
  /** The unit's `kind`, which `buildCorpusGraph` puts in `typeRef`. */
  readonly kind: string;
  /** Hops from the subject. `1` is a direct neighbour. */
  readonly depth: number;
  /** The relation traversed, or `required-by` for a reverse `requires` hop. */
  readonly relation: string;
  /** Which already-reached unit this one hangs off. The subject at depth 1. */
  readonly from: string;
  readonly description: string;
  /** Projection level -> bundle-relative path, straight off the unit. */
  readonly projections: Readonly<Record<string, string>>;
}

export interface RelatedRequest {
  /** Prebuilt adjacency, or a graph to build one from. */
  readonly graph?: GraphIR;
  readonly adjacency?: Adjacency;
  readonly id: string;
  readonly depth?: number;
  readonly limit?: number;
  /** Keep only units of this `kind`. Filters the RESULT, not the walk — see below. */
  readonly kind?: string;
}

export interface RelatedResult {
  readonly id: string;
  readonly depth: number;
  readonly count: number;
  readonly units: readonly RelatedUnit[];
  readonly diagnostics: readonly DiagnosticIR[];
}

function describe(unit: UnitIR): string {
  const value = unit.fields["description"];
  if (value === undefined) return "";
  const scalar = (value as { readonly value?: unknown }).value;
  return typeof scalar === "string" ? scalar : "";
}

function projectionsOf(unit: UnitIR): Readonly<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const [level, value] of Object.entries(unit.projections)) {
    if (typeof value === "string") out[level] = value;
  }
  return out;
}

/**
 * Walk `depth` hops out from `id`.
 *
 * `kind` filters the emitted set but **not** the frontier: a filtered-out unit is
 * still walked through, so `kind: "template"` at depth 3 can reach a template that
 * only hangs off a persona. The kernel's one-hop `related` cannot tell the
 * difference (at depth 1 the two are identical), so this is a decision that only
 * exists once depth does, and the recall-preserving direction is the one that
 * matches what a caller asking for depth 3 is asking for.
 */
export function findRelatedUnits(request: RelatedRequest): RelatedResult {
  const diagnostics: DiagnosticIR[] = [];
  const adjacency = request.adjacency ?? buildAdjacency(requireGraph(request));

  const requestedDepth = request.depth ?? RELATED_DEPTH_DEFAULT;
  let depth = requestedDepth;
  if (!Number.isInteger(depth) || depth < RELATED_DEPTH_MIN || depth > RELATED_DEPTH_MAX) {
    depth = Math.min(Math.max(Math.trunc(Number.isFinite(depth) ? depth : RELATED_DEPTH_DEFAULT), RELATED_DEPTH_MIN), RELATED_DEPTH_MAX);
    diagnostics.push(
      diagnostic(
        RELATED_DEPTH_OUT_OF_RANGE,
        `depth ${String(requestedDepth)} is outside ${RELATED_DEPTH_MIN}..${RELATED_DEPTH_MAX}; clamped to ${depth}`,
        "warning",
        ["depth"],
      ),
    );
  }

  const subject = adjacency.unitsById.get(request.id);
  if (subject === undefined) {
    diagnostics.push(
      diagnostic(RELATED_SUBJECT_UNKNOWN, `No unit '${request.id}' in the corpus`, "error", ["id"]),
    );
    return { id: request.id, depth, count: 0, units: [], diagnostics };
  }

  const limit = Math.max(1, request.limit ?? RELATED_LIMIT_DEFAULT);
  const visited = new Set<string>([request.id]);
  const emitted: RelatedUnit[] = [];
  let frontier: readonly string[] = [request.id];
  let dangling = 0;

  const reach = (targetId: string, relation: string, from: string, hop: number, next: string[]): void => {
    if (visited.has(targetId)) return;
    visited.add(targetId);
    const target = adjacency.unitsById.get(targetId);
    if (target === undefined) {
      // A dangling target is corpus data, not a traversal failure: 160 of them
      // are catalogued in `compiled-v3-final/diagnostics.json`. Counted and
      // reported once rather than logged per edge.
      dangling += 1;
      return;
    }
    // Walked through even when filtered out of the result — see the doc comment.
    next.push(targetId);
    if (request.kind !== undefined && target.typeRef !== request.kind) return;
    emitted.push({
      id: targetId,
      kind: target.typeRef,
      depth: hop,
      relation,
      from,
      description: describe(target),
      projections: projectionsOf(target),
    });
  };

  for (let hop = 1; hop <= depth && frontier.length > 0; hop += 1) {
    const next: string[] = [];
    for (const currentId of frontier) {
      // Forwards over every relation, then backwards over `requires` only. Both
      // edge lists are in `buildAdjacency`'s canonical order, so the emitted
      // sequence is a function of the graph and not of load order.
      for (const edge of adjacency.outgoing.get(currentId) ?? []) {
        reach(edge.to, edge.relationRef, currentId, hop, next);
      }
      for (const edge of adjacency.incoming.get(currentId) ?? []) {
        if (edge.relationRef !== REVERSE_WALKED_RELATION) continue;
        reach(edge.from, REVERSE_RELATION_LABEL, currentId, hop, next);
      }
    }
    frontier = next;
  }

  if (dangling > 0) {
    diagnostics.push(
      diagnostic(
        RELATED_TARGET_DANGLING,
        `${dangling} edge target(s) reachable from '${request.id}' name no unit in this corpus`,
        "warning",
      ),
    );
  }
  if (emitted.length > limit) {
    diagnostics.push(
      diagnostic(
        RELATED_TRUNCATED,
        `${emitted.length} unit(s) matched within depth ${depth}; returning the first ${limit}`,
        "info",
        ["limit"],
      ),
    );
  }

  return {
    id: request.id,
    depth,
    // `count` is the full match set, `units` the truncated page. Legacy returned
    // `${n} atoms.` for the truncated array, so a caller could not tell a
    // 10-of-10 answer from a 10-of-400 one.
    count: emitted.length,
    units: emitted.slice(0, limit),
    diagnostics,
  };
}

function requireGraph(request: RelatedRequest): GraphIR {
  if (request.graph === undefined) {
    throw new CorpusGraphError(
      "GRAPH_NOT_PROVIDED",
      "findRelatedUnits needs either `adjacency` or `graph`",
    );
  }
  return request.graph;
}
