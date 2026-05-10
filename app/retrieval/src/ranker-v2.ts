/**
 * @module ranker-v2
 * Intent-aware atom ranker — Phase 7 Task K.
 *
 * rankAtomsByIntent scores candidate atoms across five dimensions:
 *   1. token_overlap     — brief ↔ atom description lexical overlap
 *   2. axis_affinity     — atom kind/id fitness for the requested axis
 *   3. school_match      — persona-school alignment from register_candidates
 *   4. vibe_alignment    — match intent.vibe[] against atom description/tags
 *   5. density_alignment — match intent.density to atom's implied density
 *
 * Weights (see scoring rubric in ARCHITECTURE-FINAL.md §2.4):
 *   total = 1.0 * token_overlap
 *         + 2.0 * axis_affinity      // strongest signal
 *         + 1.5 * school_match       // strong for persona axis
 *         + 0.8 * vibe_alignment
 *         + 0.5 * density_alignment
 */

import type { IntentObject } from "@prime-lang/intent";
import type { Axis, AtomRef } from "./types.ts";

// ─── Public interfaces ───────────────────────────────────────────────────────

export interface RankInput {
  atoms: AtomRef[];        // candidate atoms (already loaded from index)
  intent: IntentObject;
  axis: Axis;
  forbidden?: string[];    // atom ids to drop before scoring
}

export interface ScoredAtom extends AtomRef {
  score: number;
  score_breakdown: {
    token_overlap: number;
    axis_affinity: number;
    school_match: number;
    vibe_alignment: number;
    density_alignment: number;
  };
}

// ─── Stopwords ───────────────────────────────────────────────────────────────

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "it", "its", "be", "as", "are", "was",
  "were", "has", "have", "had", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "that", "this", "these", "those",
  "not", "no", "can", "if", "so", "than", "then", "into", "over",
]);

// ─── Scoring weights ─────────────────────────────────────────────────────────

const W = {
  token_overlap: 1.0,
  axis_affinity: 2.0,
  school_match: 1.5,
  vibe_alignment: 0.8,
  density_alignment: 0.5,
} as const;

// ─── Main export ─────────────────────────────────────────────────────────────

export function rankAtomsByIntent(input: RankInput): ScoredAtom[] {
  const { atoms, intent, axis, forbidden = [] } = input;
  const forbiddenSet = new Set(forbidden);

  // Pre-compute brief tokens once
  const briefText = [
    intent.task_type,
    intent.sub_type,
    intent.domain,
    ...intent.vibe,
    ...intent.register_candidates.map(c => c.school),
    ...intent.ambiguity_flags,
  ].join(" ");
  const briefTokens = tokenize(briefText);

  const scored: ScoredAtom[] = [];

  for (const atom of atoms) {
    // Drop forbidden atoms
    if (forbiddenSet.has(atom.id)) continue;

    const token_overlap = scoreTokenOverlap(atom, briefTokens);
    const axis_affinity = scoreAxisAffinity(atom, axis);
    const school_match = scoreSchoolMatch(atom, intent, axis);
    const vibe_alignment = scoreVibeAlignment(atom, intent.vibe);
    const density_alignment = scoreDensityAlignment(atom, intent.density);

    const score =
      W.token_overlap * token_overlap +
      W.axis_affinity * axis_affinity +
      W.school_match * school_match +
      W.vibe_alignment * vibe_alignment +
      W.density_alignment * density_alignment;

    scored.push({
      ...atom,
      score,
      score_breakdown: {
        token_overlap,
        axis_affinity,
        school_match,
        vibe_alignment,
        density_alignment,
      },
    });
  }

  // Sort descending by total score
  scored.sort((a, b) => b.score - a.score);
  return scored;
}

// ─── Dimension scorers ───────────────────────────────────────────────────────

/**
 * token_overlap (0.0–1.0)
 * Count token matches between brief and atom.description after stopword removal.
 * Normalized by min(brief_token_count, atom_token_count).
 */
function scoreTokenOverlap(atom: AtomRef, briefTokens: Set<string>): number {
  const atomText = [atom.description, ...(atom.tags ?? [])].join(" ");
  const atomTokens = tokenize(atomText);

  if (briefTokens.size === 0 || atomTokens.size === 0) return 0;

  let matches = 0;
  for (const t of briefTokens) {
    if (atomTokens.has(t)) matches++;
  }

  const norm = Math.min(briefTokens.size, atomTokens.size);
  return Math.min(1.0, matches / norm);
}

/**
 * axis_affinity (0.0–1.0)
 * Lookup table keyed by axis — rewards atom kinds and id patterns that
 * naturally fit the requested design dimension.
 */
function scoreAxisAffinity(atom: AtomRef, axis: Axis): number {
  const kind = atom.kind.toLowerCase();
  const id = atom.id.toLowerCase();

  switch (axis) {
    case "register":
      if (kind === "persona") return 1.0;
      if (kind === "voice") return 0.5;
      return 0;

    case "pattern":
      if (kind === "pattern" || kind === "template") return 1.0;
      if (kind === "example") return 0.6;
      return 0;

    case "motion": {
      const motionRe = /motion|easing|spring|stagger|fade|slide/;
      if (motionRe.test(id)) return 1.0;
      // template/pattern with a motion-related tag
      if ((kind === "template" || kind === "pattern") && atom.tags?.some(t => motionRe.test(t.toLowerCase()))) {
        return 0.8;
      }
      return 0;
    }

    case "typography": {
      const typoRe = /font|typo|text|heading|line/;
      if (typoRe.test(id)) return 1.0;
      return 0;
    }

    case "color": {
      const colorRe = /color|palette|hue|gradient|dark-mode/;
      if (colorRe.test(id)) return 1.0;
      return 0;
    }

    case "rules":
      if (["rule", "check", "constraint", "anti-pattern"].includes(kind)) return 1.0;
      return 0;

    default:
      return 0;
  }
}

/**
 * school_match (0.0–1.0)
 * For axis="register": checks whether the atom id encodes a persona school
 * that appears in intent.register_candidates, weighted by that candidate's weight.
 *
 * For other axes: checks whether the atom's edges reference a persona id that
 * matches any register_candidate school.
 */
function scoreSchoolMatch(atom: AtomRef, intent: IntentObject, axis: Axis): number {
  const { register_candidates } = intent;
  if (!register_candidates || register_candidates.length === 0) return 0;

  if (axis === "register") {
    const idLower = atom.id.toLowerCase();
    for (const candidate of register_candidates) {
      const schoolSlug = candidate.school.toLowerCase();
      // Atom id must contain "persona-{school}" as a segment
      if (idLower.includes(`persona-${schoolSlug}`)) {
        // Clamp to [0, 1] — weights are typically 0.3–0.5
        return Math.min(1.0, candidate.weight);
      }
    }
    return 0;
  }

  // Non-register axes: slight boost if edges point to a matched persona
  for (const edge of atom.edges) {
    const edgeLower = edge.target.toLowerCase();
    for (const candidate of register_candidates) {
      const schoolSlug = candidate.school.toLowerCase();
      if (edgeLower.includes(`persona-${schoolSlug}`)) {
        // Modest boost proportional to the candidate weight
        return Math.min(0.5, candidate.weight * 0.8);
      }
    }
  }

  return 0;
}

/**
 * vibe_alignment (0.0–1.0)
 * Per-token overlap between intent.vibe[] and the atom's description + tags.
 */
function scoreVibeAlignment(atom: AtomRef, vibe: string[]): number {
  if (!vibe || vibe.length === 0) return 0;

  const atomText = [atom.description, ...(atom.tags ?? [])].join(" ").toLowerCase();
  const atomTokens = tokenize(atomText);
  const vibeTokens = new Set(vibe.flatMap(v => tokenize(v)));

  if (vibeTokens.size === 0) return 0;

  let matches = 0;
  for (const t of vibeTokens) {
    if (atomTokens.has(t)) matches++;
  }

  return Math.min(1.0, matches / vibeTokens.size);
}

/**
 * density_alignment (0.0–1.0)
 * Match intent.density ("tight" | "comfy" | "loose") against density cues
 * in the atom description. Match → 1.0, explicit mismatch → 0, no signal → 0.3.
 */
function scoreDensityAlignment(atom: AtomRef, density: "tight" | "comfy" | "loose"): number {
  const text = atom.description.toLowerCase();

  const hasTight = /tight|compact|dense|condensed/.test(text);
  const hasComfy = /comfy|comfortable|balanced|moderate/.test(text);
  const hasLoose = /loose|spacious|airy|generous|open/.test(text);

  const hasAnyCue = hasTight || hasComfy || hasLoose;

  if (!hasAnyCue) {
    // No density signal — neutral, small partial credit
    return 0.3;
  }

  switch (density) {
    case "tight":
      if (hasTight) return 1.0;
      if (hasLoose) return 0.0;
      return 0.3; // comfy is mid-range
    case "comfy":
      if (hasComfy) return 1.0;
      if (hasTight || hasLoose) return 0.3;
      return 0.3;
    case "loose":
      if (hasLoose) return 1.0;
      if (hasTight) return 0.0;
      return 0.3;
    default:
      return 0.3;
  }
}

// ─── Utilities ───────────────────────────────────────────────────────────────

/**
 * Tokenize text: split on whitespace/punctuation, lowercase, remove stopwords,
 * discard tokens shorter than 3 chars.
 */
function tokenize(text: string): Set<string> {
  return new Set(
    text
      .split(/[\s,\-_/+.()'"@]+/)
      .map(w => w.toLowerCase().trim())
      .filter(w => w.length >= 3 && !STOPWORDS.has(w))
  );
}
