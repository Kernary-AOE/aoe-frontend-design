/**
 * @module design-ranker
 *
 * The six frontend-design retrieval axes, as `CandidateGenerator`s registered
 * against `@skill-wiki/query-engine`.
 *
 * This is the shape plan §5.6 asks for: the engine holds the retrieval mechanism
 * and the profile holds the policy. `CandidateGeneratorRegistry` registers nothing
 * by default, so the axis *names* only exist because this domain package supplies
 * them and the `frontend-six-axis` profile asks for them by name. Nothing in the
 * engine mentions `register`, `motion`, `typography` or `color`.
 *
 * Dependency direction (§15.4): this file imports `@skill-wiki/*` and nothing
 * imports it from there.
 */

import type { GraphIR, SelectionCandidateIR, UnitIR } from "@skill-wiki/ir";
import type { RetrievalProfile } from "@skill-wiki/model-schema";
import {
  CandidateGeneratorRegistry,
  compareStrings,
  linearScore,
  orderedRecord,
  quantize,
  type CandidateGenerator,
  type GeneratorContext,
  type QueryRequest,
} from "@skill-wiki/query-engine";
import type { DesignIntent, RetrievalScope } from "./intent.ts";
import { readSixAxisConfig, type AxisDescriptor, type SixAxisConfig } from "./profile-axes.ts";
import {
  FEATURE_AXIS_AFFINITY,
  FEATURE_DENSITY_ALIGNMENT,
  FEATURE_SCHOOL_MATCH,
  FEATURE_TOKEN_OVERLAP,
  FEATURE_VIBE_ALIGNMENT,
  SIX_AXIS_FEATURE_AXES,
  intentTokens,
  readUnitText,
  scoreAxisAffinity,
  scoreDensityAlignment,
  scoreSchoolMatch,
  scoreSchoolMatchByEdge,
  scoreTokenOverlap,
  scoreVibeAlignment,
  type UnitText,
} from "./scoring.ts";

export { ProfileAxesError, readSixAxisConfig } from "./profile-axes.ts";
export type { AxisDescriptor, SixAxisConfig } from "./profile-axes.ts";
export type { DesignIntent, Density, RegisterCandidate, RetrievalScope } from "./intent.ts";
export { SIX_AXIS_FEATURE_AXES } from "./scoring.ts";

/** Generator names in the profile are `<prefix><axis>`. */
export const AXIS_GENERATOR_PREFIX = "frontend-axis-";

/**
 * Determinism helpers come from the engine.
 *
 * `@skill-wiki/query-engine` exports `compareStrings` (byte-order tie-break, never
 * `localeCompare`) and `orderedRecord` (sorted key insertion) alongside `quantize`.
 * This adapter used to carry private copies of both; they are gone, because a
 * generator whose idea of "stable" differs from the engine's produces a plan the
 * engine then re-sorts, and the disagreement is invisible until two machines
 * serialize the same request differently.
 */
function featureRecord(entries: readonly (readonly [string, number])[]): Readonly<Record<string, number>> {
  return orderedRecord(entries);
}

/** Does the unit belong to this axis at all? `multi-axis.ts` per-axis candidate filter. */
function admitsUnit(unit: UnitText, axis: AxisDescriptor): boolean {
  if (axis.cluster !== undefined && unit.cluster === axis.cluster) return true;

  const kindOk = axis.kinds.length === 0 || axis.kinds.includes(unit.kind);
  const hasTextTest = axis.textIncludes.length > 0 || axis.idIncludes.length > 0;
  if (!hasTextTest) return kindOk;

  const id = unit.id.toLowerCase();
  if (axis.idIncludes.some(needle => id.includes(needle.toLowerCase()))) {
    // `multi-axis.ts:172-176` (motion) tests the id without any kind filter.
    return axis.kinds.length === 0 || kindOk;
  }
  if (!kindOk) return false;
  const haystack = `${unit.id} ${unit.description} ${unit.cluster ?? ""}`.toLowerCase();
  return axis.textIncludes.some(needle => haystack.includes(needle.toLowerCase()));
}

/** `multi-axis.ts` preference ordering. A kind absent from `kindOrder` sorts last. */
function kindRank(unit: UnitText, axis: AxisDescriptor): number {
  const index = axis.kindOrder.indexOf(unit.kind);
  return index < 0 ? axis.kindOrder.length : index;
}

export interface AxisGeneratorOptions {
  readonly axis: AxisDescriptor;
  readonly config: SixAxisConfig;
  readonly intent: DesignIntent;
  readonly scope: RetrievalScope;
}

export function createAxisGenerator(options: AxisGeneratorOptions): CandidateGenerator {
  const { axis, config, intent, scope } = options;
  const forbidden = new Set(scope.forbiddenUnitIds);
  const briefTokens = intentTokens(intent, config);

  return {
    name: `${AXIS_GENERATOR_PREFIX}${axis.name}`,
    featureAxes: SIX_AXIS_FEATURE_AXES,
    generate(_request: QueryRequest, graph: GraphIR, ctx: GeneratorContext): readonly SelectionCandidateIR[] {
      const scored: { readonly unit: UnitIR; readonly text: UnitText; readonly candidate: SelectionCandidateIR }[] = [];

      for (const unit of graph.units) {
        // `multi-axis.ts:68-70` excludeForbidden — applied before scoring, on
        // every axis. This is the profile's `forbidden-atoms` constraint.
        if (forbidden.has(unit.identity.id)) continue;
        const text = readUnitText(unit);
        if (!admitsUnit(text, axis)) continue;

        const isRegisterAxis = Object.keys(axis.schoolPersonaMap).length > 0;
        const schoolMatch = isRegisterAxis
          ? scoreSchoolMatch(text, intent, axis)
          : scoreSchoolMatchByEdge(unit, intent);

        const featureValues = featureRecord([
          [FEATURE_TOKEN_OVERLAP, quantize(scoreTokenOverlap(text, briefTokens, config))],
          [FEATURE_AXIS_AFFINITY, quantize(scoreAxisAffinity(text, axis))],
          [FEATURE_SCHOOL_MATCH, quantize(schoolMatch)],
          [FEATURE_VIBE_ALIGNMENT, quantize(scoreVibeAlignment(text, intent, config))],
          [FEATURE_DENSITY_ALIGNMENT, quantize(scoreDensityAlignment(text, intent, config))],
        ]);

        scored.push({
          unit,
          text,
          // `score` is left at 0: the engine's weighted scorer owns the blend, and
          // a generator that pre-blends would apply the profile weights twice.
          candidate: {
            unitId: unit.identity.id,
            score: 0,
            featureValues,
            reasons: [`${AXIS_GENERATOR_PREFIX}${axis.name}: admitted by axis predicate`],
          },
        });
      }

      // ── The budget is applied to a RANKED list, not to an alphabetical one ──
      //
      // The regression this replaces sorted by `(kindRank, unitId)` and sliced
      // `defaultAxisBudget` off the front, so every feature computed above —
      // `schoolMatch` included, the whole reason the register axis carries a
      // `schoolPersonaMap` — had no say in which candidates survived. The bundle
      // holds 31 units of kind `persona` (`grep -c 'kind="persona"' _index.xml`),
      // so the register axis returned the same alphabetically-first three on every
      // brief, and `source_persona` therefore did not vary with the brief at all.
      //
      // Ordering is now, in precedence order:
      //
      //   1. `axis.kindOrder`, when the profile declares one. It is a hard
      //      preference tier, not a tie-break: `six-axis.yaml` declares it only on
      //      typography (`principle > rule > fact > check`) and color
      //      (`template > principle > rule > check > fact`), and on those two axes
      //      the tier IS the declared policy. Demoting it below relevance would
      //      silently retire model data. The four axes that declare no `kindOrder`
      //      put every candidate in one tier, so relevance decides outright.
      //   2. Descending relevance under the profile's own weights, via the
      //      engine's `linearScore` — the same function `scoreCandidates` uses to
      //      publish the total, so the generator cannot rank by one model while the
      //      engine scores by another.
      //   3. `unitId`, so the cut is reproducible when two candidates genuinely
      //      tie.
      //
      // `candidateGenerators[].weight` is deliberately not applied here: the engine
      // multiplies it in during scoring, and a single uniform positive factor
      // cannot reorder one generator's own output. Applying it would only risk
      // double-counting.
      const relevance = new Map(
        scored.map(entry => [entry.candidate.unitId, linearScore(entry.candidate.featureValues, ctx.profile.features)]),
      );
      scored.sort((a, b) => {
        const byKind = kindRank(a.text, axis) - kindRank(b.text, axis);
        if (byKind !== 0) return byKind;
        const byScore = relevance.get(b.candidate.unitId)! - relevance.get(a.candidate.unitId)!;
        if (byScore !== 0) return byScore > 0 ? 1 : -1;
        return compareStrings(a.candidate.unitId, b.candidate.unitId);
      });

      const budget = config.defaultAxisBudget;
      const admitted = scored.slice(0, budget).map(entry => entry.candidate);

      // `multi-axis.ts:207/243/284` fallback: an axis that matched nothing still
      // contributes its declared fallback unit, if that unit exists and is not
      // forbidden. An absent fallback yields an empty axis rather than a throw —
      // the engine reports "axis produced no candidate" downstream.
      if (admitted.length === 0 && axis.fallbackUnit !== undefined && !forbidden.has(axis.fallbackUnit)) {
        const fallback = graph.units.find(unit => unit.identity.id === axis.fallbackUnit);
        if (fallback !== undefined) {
          return [
            {
              unitId: fallback.identity.id,
              score: 0,
              featureValues: featureRecord(SIX_AXIS_FEATURE_AXES.map(name => [name, 0] as const)),
              reasons: [`${AXIS_GENERATOR_PREFIX}${axis.name}: declared fallback, axis matched nothing`],
            },
          ];
        }
      }
      return admitted;
    },
  };
}

export interface SixAxisRegistration {
  readonly registry: CandidateGeneratorRegistry;
  readonly config: SixAxisConfig;
  readonly generators: readonly CandidateGenerator[];
}

/**
 * Build and register one generator per axis declared by the profile.
 *
 * The profile is the single source of the axis list: `readSixAxisConfig` fails if
 * `candidateGenerators` and `extensions.axes` disagree, so a sixth axis cannot be
 * added in code without adding it to the model, and vice versa.
 */
export function registerSixAxisGenerators(
  profile: RetrievalProfile,
  intent: DesignIntent,
  scope: RetrievalScope,
  registry: CandidateGeneratorRegistry = new CandidateGeneratorRegistry(),
): SixAxisRegistration {
  const config = readSixAxisConfig(
    profile.extensions,
    profile.candidateGenerators.map(generator => generator.name),
    AXIS_GENERATOR_PREFIX,
  );
  const generators = config.axes.map(axis => createAxisGenerator({ axis, config, intent, scope }));
  for (const generator of generators) registry.register(generator);
  return { registry, config, generators };
}
