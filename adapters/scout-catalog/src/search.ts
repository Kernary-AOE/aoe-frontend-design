/**
 * @module scout-catalog/search
 *
 * Retrieval over normalised references, with a §9.3 feature breakdown.
 *
 * The legacy implementation (`mcp-server/index.ts:899-907`) was
 * `haystack.includes(query.toLowerCase())` over `title + description +
 * source_name`, sliced to `limit`. Three properties it did not have, and this one
 * does, in the order they matter:
 *
 * 1. **Every hit is explainable.** `features` names each axis and its value, and
 *    `selectedBecause` says which axis carried it. §9.3 requires exactly this of
 *    a candidate; the legacy path returned a bare record with no score at all.
 * 2. **It ranks.** `.filter().slice(0, cap)` returned whichever 10 entries the
 *    file happened to list first, so relevance was file order. Ordering here is
 *    score-then-id, both total, so the same query returns the same bytes.
 * 3. **A multi-word query can partially match.** A single substring test means
 *    "dark minimal footer" matches only a title containing that exact phrase.
 *    Token coverage is what makes the 93% of references that carry nothing but a
 *    title reachable at all (only 7% have a description — see the catalogue
 *    analysis §3).
 *
 * `sourceIds` closes a documented contract break rather than adding a feature:
 * the catalogue atoms document calls like `prime_scout("3D scroll", "godly", 8)`,
 * but `aoe_query scope=scout` never accepted a source parameter.
 */

import type { DiagnosticIR } from "@aoe/ir";
import { quantize } from "@aoe/query-engine";
import {
  SCOUT_QUERY_NO_TOKENS,
  SCOUT_SOURCE_UNKNOWN,
  diagnostic,
  type ExternalCandidate,
  type ExternalReference,
  type ExternalSourceDescriptor,
  type ScoutRetrievalConfig,
  type ScoutSearchRequest,
  type ScoutSearchResult,
} from "./types.ts";

/** `mcp-server/index.ts:487` tokenisation, with the floor read from the manifest. */
export function tokenize(text: string, minTokenLength: number): readonly string[] {
  const seen = new Set<string>();
  for (const token of text.toLowerCase().split(/[^a-z0-9]+/)) {
    if (token.length >= minTokenLength) seen.add(token);
  }
  return [...seen].sort();
}

function coverage(tokens: readonly string[], haystack: string): number {
  if (tokens.length === 0) return 0;
  const lowered = haystack.toLowerCase();
  let hits = 0;
  for (const token of tokens) if (lowered.includes(token)) hits += 1;
  return hits / tokens.length;
}

function compareStrings(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

export interface ScoutSearchIndex {
  readonly references: readonly ExternalReference[];
  readonly sourcesById: ReadonlyMap<string, ExternalSourceDescriptor>;
  readonly retrieval: ScoutRetrievalConfig;
}

/**
 * Score one reference against a tokenised query.
 *
 * `sourceAffinity` reads the *descriptor* rather than the reference: `usefulFor`
 * and `personaLean` are the source's own statement of what it is good for
 * ("scroll animation", "brutalist-expressive"), which is the only signal that can
 * pull a well-suited source up for a query no individual title spells out.
 */
function scoreReference(
  reference: ExternalReference,
  source: ExternalSourceDescriptor | undefined,
  tokens: readonly string[],
  weights: Readonly<Record<string, number>>,
): ExternalCandidate | undefined {
  const titleMatch = coverage(tokens, reference.title);
  const textMatch = coverage(tokens, `${reference.description ?? ""} ${reference.category ?? ""}`);
  const sourceAffinity = source === undefined
    ? 0
    : coverage(tokens, [source.sourceName, ...source.usefulFor, ...source.personaLean].join(" "));
  const assetPresence = reference.thumbnail !== undefined ? 1 : 0;
  const curatedSource = source?.curated === true ? 1 : 0;

  // A reference matched by no query token is not a weak hit, it is not a hit:
  // `assetPresence` and `curatedSource` are query-independent, so scoring on them
  // alone would return the same curated thumbnails for every query.
  if (titleMatch === 0 && textMatch === 0 && sourceAffinity === 0) return undefined;

  const features: Record<string, number> = {
    assetPresence: quantize(assetPresence),
    curatedSource: quantize(curatedSource),
    sourceAffinity: quantize(sourceAffinity),
    textMatch: quantize(textMatch),
    titleMatch: quantize(titleMatch),
  };
  let score = 0;
  for (const axis of Object.keys(features).sort(compareStrings)) {
    score += (weights[axis] ?? 0) * features[axis]!;
  }

  const selectedBecause: string[] = [];
  if (titleMatch > 0) {
    selectedBecause.push(`title covers ${Math.round(titleMatch * tokens.length)}/${tokens.length} query token(s)`);
  }
  if (textMatch > 0) selectedBecause.push("description or category matches the query");
  if (sourceAffinity > 0) selectedBecause.push(`source '${reference.sourceId}' declares affinity for the query`);
  if (assetPresence === 1) selectedBecause.push("carries a thumbnail, so it can be shown as a visual anchor");
  if (curatedSource === 1) selectedBecause.push(`source '${reference.sourceId}' is manifest-curated`);

  return { reference, score: quantize(score), features, selectedBecause };
}

export function searchReferences(index: ScoutSearchIndex, request: ScoutSearchRequest): ScoutSearchResult {
  const diagnostics: DiagnosticIR[] = [];
  const { retrieval } = index;
  const tokens = tokenize(request.text, retrieval.minTokenLength);
  if (tokens.length === 0) {
    diagnostics.push(
      diagnostic(
        SCOUT_QUERY_NO_TOKENS,
        `Query '${request.text}' yields no token of at least ${retrieval.minTokenLength} character(s), so nothing could match`,
        "warning",
        ["text"],
      ),
    );
    return { count: 0, items: [], diagnostics };
  }

  let allowed: ReadonlySet<string> | undefined;
  if (request.sourceIds !== undefined && request.sourceIds.length > 0) {
    const unknown = request.sourceIds.filter(id => !index.sourcesById.has(id));
    if (unknown.length > 0) {
      diagnostics.push(
        diagnostic(
          SCOUT_SOURCE_UNKNOWN,
          `Unknown source id(s) [${[...unknown].sort(compareStrings).join(", ")}]; declared: [${[...index.sourcesById.keys()].sort(compareStrings).join(", ")}]`,
          "warning",
          ["sourceIds"],
        ),
      );
    }
    allowed = new Set(request.sourceIds.filter(id => index.sourcesById.has(id)));
    if (allowed.size === 0) return { count: 0, items: [], diagnostics };
  }

  const scored: ExternalCandidate[] = [];
  for (const reference of index.references) {
    if (allowed !== undefined && !allowed.has(reference.sourceId)) continue;
    if (request.requireThumbnail === true && reference.thumbnail === undefined) continue;
    const candidate = scoreReference(reference, index.sourcesById.get(reference.sourceId), tokens, retrieval.weights);
    if (candidate !== undefined) scored.push(candidate);
  }

  scored.sort((a, b) =>
    b.score !== a.score ? b.score - a.score : compareStrings(a.reference.id, b.reference.id),
  );

  const requested = request.limit ?? retrieval.defaultLimit;
  const limit = Math.max(1, Math.min(requested, retrieval.maxLimit));
  return { count: scored.length, items: scored.slice(0, limit), diagnostics };
}

/**
 * The `## References` block, as a domain renderer.
 *
 * This is scout's second legacy consumer (`mcp-server/index.ts:476-518`,
 * reachable from `prime_compile`). It is reproduced here so that retiring the old
 * server does not silently drop it, and it is a *renderer* — a pure function of a
 * search result — rather than a branch inside a tool handler, so the tool that
 * eventually calls it does not re-implement the ranking.
 *
 * Returns the empty string when nothing qualifies, matching the legacy contract
 * that an empty references section is omitted rather than rendered as a heading
 * with no content.
 */
export function renderReferences(items: readonly ExternalCandidate[]): string {
  if (items.length === 0) return "";
  const lines = [
    "## References",
    `Concrete visual anchors (${items.length} picks · describe what you observe, don't verbatim-clone):`,
  ];
  for (const { reference } of items) {
    const byline = `${reference.sourceName} · ${reference.title.slice(0, 70)}`;
    const thumbnail = reference.thumbnail ?? "";
    lines.push(`- ![ref](${thumbnail}) ${byline}${reference.url.length > 0 ? ` — ${reference.url}` : ""}`);
  }
  lines.push("");
  return lines.join("\n");
}
