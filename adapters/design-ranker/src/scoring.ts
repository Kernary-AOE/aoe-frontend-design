/**
 * @module scoring
 *
 * The five scoring dimensions of `packages/retrieval/src/ranker-v2.ts`, ported to
 * read `UnitIR` instead of the old `AtomRef`, and to take every weight, cue list
 * and pattern from the `RetrievalProfile` instead of a module constant.
 *
 * The *weights* are gone from this file entirely — they are `profile.features`,
 * and the engine's own scorer applies them (`scoreCandidates` in
 * `@skill-wiki/query-engine`). What remains is the mechanism: how each feature
 * value in [0, 1] is computed. That split is the point of §5.6.
 */

import type { UnitIR } from "@skill-wiki/ir";
import { collectStrings, resolvePath } from "@skill-wiki/query-engine";
import type { AxisDescriptor, SixAxisConfig } from "./profile-axes.ts";
import type { DesignIntent } from "./intent.ts";

/** Feature axis names. They must match the profile's `features` keys exactly. */
export const FEATURE_TOKEN_OVERLAP = "tokenOverlap";
export const FEATURE_AXIS_AFFINITY = "axisAffinity";
export const FEATURE_SCHOOL_MATCH = "schoolMatch";
export const FEATURE_VIBE_ALIGNMENT = "vibeAlignment";
export const FEATURE_DENSITY_ALIGNMENT = "densityAlignment";

export const SIX_AXIS_FEATURE_AXES = [
  FEATURE_TOKEN_OVERLAP,
  FEATURE_AXIS_AFFINITY,
  FEATURE_SCHOOL_MATCH,
  FEATURE_VIBE_ALIGNMENT,
  FEATURE_DENSITY_ALIGNMENT,
] as const;

/**
 * A unit's searchable surface.
 *
 * The old ranker read `atom.description` and `atom.tags` as named properties. A
 * `UnitIR` has no such properties — it has `fields`, whose names are model data.
 * The field paths are therefore addressed explicitly here rather than harvesting
 * every string in the unit: harvesting everything makes a long `provenance` block
 * outrank a matching description, which is a silent relevance regression.
 */
export interface UnitText {
  readonly id: string;
  readonly kind: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly cluster: string | undefined;
}

function fieldStrings(unit: UnitIR, path: readonly string[]): readonly string[] {
  const out: string[] = [];
  for (const value of resolvePath(unit.fields, path)) collectStrings(value, out);
  return out;
}

export function readUnitText(unit: UnitIR): UnitText {
  const cluster = fieldStrings(unit, ["cluster"])[0];
  return {
    id: unit.identity.id,
    kind: unit.typeRef,
    description: fieldStrings(unit, ["description"]).join(" "),
    tags: fieldStrings(unit, ["tags"]),
    cluster,
  };
}

export function tokenize(text: string, config: SixAxisConfig): ReadonlySet<string> {
  const out = new Set<string>();
  for (const raw of text.split(/[\s,\-_/+.()'"@]+/)) {
    const token = raw.toLowerCase().trim();
    if (token.length < config.minTokenLength) continue;
    if (config.stopwords.has(token)) continue;
    out.add(token);
  }
  return out;
}

/** `ranker-v2.ts:79-88` — the brief surface the intent contributes. */
export function intentTokens(intent: DesignIntent, config: SixAxisConfig): ReadonlySet<string> {
  return tokenize(
    [
      intent.task_type,
      intent.sub_type,
      intent.domain,
      ...intent.vibe,
      ...intent.register_candidates.map(candidate => candidate.school),
      ...intent.ambiguity_flags,
    ].join(" "),
    config,
  );
}

/** `ranker-v2.ts:scoreTokenOverlap` — normalised by the smaller token set. */
export function scoreTokenOverlap(unit: UnitText, briefTokens: ReadonlySet<string>, config: SixAxisConfig): number {
  const unitTokens = tokenize([unit.description, ...unit.tags].join(" "), config);
  if (briefTokens.size === 0 || unitTokens.size === 0) return 0;
  let matches = 0;
  for (const token of briefTokens) if (unitTokens.has(token)) matches++;
  return Math.min(1, matches / Math.min(briefTokens.size, unitTokens.size));
}

/** `ranker-v2.ts:scoreAxisAffinity` — the per-axis lookup table, now profile data. */
export function scoreAxisAffinity(unit: UnitText, axis: AxisDescriptor): number {
  const byKind = axis.affinityKinds[unit.kind];
  if (byKind !== undefined) return byKind;
  if (axis.affinityIdPattern !== undefined) {
    const pattern = new RegExp(axis.affinityIdPattern);
    if (pattern.test(unit.id.toLowerCase())) return 1;
    const tagged = axis.affinityTaggedKinds[unit.kind];
    if (tagged !== undefined && unit.tags.some(tag => pattern.test(tag.toLowerCase()))) return tagged;
  }
  return 0;
}

/**
 * `ranker-v2.ts:scoreSchoolMatch`.
 *
 * An axis is "the register axis" iff its descriptor carries a `schoolPersonaMap`.
 * The old code branched on the literal string `"register"`; keying off the data
 * instead is what lets a second model rename the axis without editing this file.
 */
export function scoreSchoolMatch(unit: UnitText, intent: DesignIntent, axis: AxisDescriptor): number {
  if (intent.register_candidates.length === 0) return 0;
  const isRegisterAxis = Object.keys(axis.schoolPersonaMap).length > 0;
  if (!isRegisterAxis) return 0;

  // Two tiers, summed — the shape legacy `retrieveRegister` had and the port
  // lost. Legacy scored an exact SCHOOL_TO_PERSONA hit at weight*10 and a slug
  // containment at weight*5; the port collapsed both into "first matching
  // candidate in declaration order wins", which made the classifier's
  // top-weighted school win even when a lower-weighted school had an explicit
  // curated mapping. The ratio is what carries the meaning, not the absolute
  // numbers: an entry in `schoolPersonaMap` is a human saying "this school IS
  // this persona", whereas a slug containment is an incidental substring, so the
  // former must outweigh the latter. Kept in 0..1 at the same 2:1 ratio.
  const id = unit.id.toLowerCase();
  let score = 0;
  for (const candidate of intent.register_candidates) {
    const mapped = axis.schoolPersonaMap[candidate.school];
    if (mapped !== undefined && mapped.toLowerCase() === id) score += candidate.weight;
    if (id.includes(`persona-${candidate.school.toLowerCase()}`)) score += candidate.weight * 0.5;
  }
  return Math.min(1, score);
}

/** `ranker-v2.ts:scoreSchoolMatch` non-register branch: a boost via an edge to a matched persona. */
export function scoreSchoolMatchByEdge(unit: UnitIR, intent: DesignIntent): number {
  for (const edge of unit.relations) {
    const target = edge.to.toLowerCase();
    for (const candidate of intent.register_candidates) {
      if (target.includes(`persona-${candidate.school.toLowerCase()}`)) {
        return Math.min(0.5, candidate.weight * 0.8);
      }
    }
  }
  return 0;
}

/** `ranker-v2.ts:scoreVibeAlignment` — normalised by the vibe token count. */
export function scoreVibeAlignment(unit: UnitText, intent: DesignIntent, config: SixAxisConfig): number {
  if (intent.vibe.length === 0) return 0;
  const unitTokens = tokenize([unit.description, ...unit.tags].join(" ").toLowerCase(), config);
  const vibeTokens = new Set<string>();
  for (const vibe of intent.vibe) for (const token of tokenize(vibe, config)) vibeTokens.add(token);
  if (vibeTokens.size === 0) return 0;
  let matches = 0;
  for (const token of vibeTokens) if (unitTokens.has(token)) matches++;
  return Math.min(1, matches / vibeTokens.size);
}

/** `ranker-v2.ts:scoreDensityAlignment` — cue lists and the neutral score are profile data. */
export function scoreDensityAlignment(unit: UnitText, intent: DesignIntent, config: SixAxisConfig): number {
  const text = unit.description.toLowerCase();
  const has = (cues: readonly string[]): boolean => cues.some(cue => text.includes(cue));
  const hasTight = has(config.densityCues.tight);
  const hasComfy = has(config.densityCues.comfy);
  const hasLoose = has(config.densityCues.loose);
  if (!hasTight && !hasComfy && !hasLoose) return config.densityNoSignalScore;

  switch (intent.density) {
    case "tight":
      if (hasTight) return 1;
      if (hasLoose) return 0;
      return config.densityNoSignalScore;
    case "comfy":
      if (hasComfy) return 1;
      return config.densityNoSignalScore;
    case "loose":
      if (hasLoose) return 1;
      if (hasTight) return 0;
      return config.densityNoSignalScore;
  }
}
