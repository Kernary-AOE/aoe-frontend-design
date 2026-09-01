/**
 * @module intent
 *
 * The design intent the six-axis generators score against.
 *
 * This lives in the domain package and not in the engine on purpose. Plan §15.4
 * forbids `engine/core → domain`, and "task type", "persona school", "vibe" and
 * "density" are domain vocabulary. Plan §16 Phase 3 action 1 lists an
 * `IntentEnvelope` as an engine concept, but `grep -rn IntentEnvelope
 * aoe-engine packages returns zero hits — it was never built, so
 * there is nothing to depend on and nothing to extend. The shape below is
 * transcribed from `packages/intent/src/types.ts` in the parent repo, which is
 * what `classifyBrief` actually produces today.
 *
 * `QueryRequest` carries no intent field, so the intent is bound at generator
 * construction time rather than smuggled through the request. That keeps the
 * engine's request contract domain-free.
 */

export interface RegisterCandidate {
  readonly school: string;
  readonly weight: number;
  /**
   * The one-sentence justification `packages/intent/src/types.ts:4` declares.
   * Optional because no scorer reads it — it exists so `aoe_design_plan` can
   * reproduce the frozen `aoe_intent` payload byte for byte (W9-A §1), and a
   * caller that builds an intent by hand has nothing to say here.
   */
  readonly rationale?: string;
}

export type Density = "tight" | "comfy" | "loose";

export interface DesignIntent {
  readonly task_type: string;
  readonly sub_type: string;
  readonly domain: string;
  readonly vibe: readonly string[];
  readonly register_candidates: readonly RegisterCandidate[];
  readonly density: Density;
  readonly motion_priority: string;
  readonly required_axes: readonly string[];
  readonly ambiguity_flags: readonly string[];
}

/** Atom ids the task taxonomy forbids. The `forbidden-atoms` profile constraint. */
export interface RetrievalScope {
  readonly forbiddenUnitIds: readonly string[];
}
