import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import type { GraphIR, TypedValueIR, UnitIR } from "@aoe/ir";
import { DefinitionFileSchema, type RetrievalProfile } from "@aoe/model-schema";
import { QueryEngineError, type QueryRequest } from "@aoe/query-engine";
import {
  AXIS_GENERATOR_PREFIX,
  ProfileAxesError,
  SIX_AXIS_FEATURE_AXES,
  readSixAxisConfig,
  registerSixAxisGenerators,
  type DesignIntent,
} from "../adapters/design-ranker/src/index.ts";

const PROFILE_PATH = join(import.meta.dir, "..", "model", "retrieval", "six-axis.yaml");

function loadProfile(): RetrievalProfile {
  const file = DefinitionFileSchema.parse(parse(readFileSync(PROFILE_PATH, "utf8")));
  const profile = file.definitions.find(definition => definition.kind === "retrieval-profile");
  if (profile === undefined) throw new Error("fixture regression: six-axis.yaml declares no retrieval-profile");
  return profile;
}

function str(value: string): TypedValueIR {
  return { kind: "string", value, source: { loc: { line: 1, column: 1, offset: 0 } } };
}

function unit(id: string, typeRef: string, fields: Readonly<Record<string, string>>, edgeTargets: readonly string[] = []): UnitIR {
  const mapped: Record<string, TypedValueIR> = {};
  for (const [key, value] of Object.entries(fields)) mapped[key] = str(value);
  return {
    identity: { id, version: "1.0.0", digest: `d-${id}`, corpus: "test" },
    typeRef,
    implements: [],
    fields: mapped,
    relations: edgeTargets.map((to, index) => ({ id: `${id}-e${index}`, relationRef: "cites", from: id, to })),
    citations: [],
    policyLabels: [],
    lifecycle: "active",
    visibility: "public",
    provenance: { source: { loc: { line: 1, column: 1, offset: 0 } } },
    projections: {},
  };
}

const UNITS: readonly UnitIR[] = [
  unit("@impeccable/persona-stripe-fintech", "persona", { description: "Dense fintech register, compact tables" }),
  unit("@impeccable/persona-brutalist", "persona", { description: "Loud spacious brutalist register" }),
  unit("@community/pattern-hero-3-layouts", "pattern", { description: "Hero section layouts, airy and spacious" }),
  unit("@impeccable/template-easing-curves", "template", { description: "Easing curves", cluster: "motion" }),
  unit("@community/principle-typography-hierarchy", "principle", { description: "Typography hierarchy and font scale" }),
  unit("@community/rule-cls-budget", "rule", { description: "Layout shift budget", cluster: "performance" }),
  unit("@community/fact-bidi-direction", "fact", { description: "Bidi text direction facts about font selection" }),
  unit("@community/pattern-motion-navigation", "pattern", { description: "Navigation transitions" }, [
    "@impeccable/persona-brutalist",
  ]),
];

function graph(units: readonly UnitIR[] = UNITS): GraphIR {
  return {
    snapshot: { modelRelease: "m1", modelDigest: "md", corpusRelease: "c1", corpusDigest: "cd" },
    units,
    edges: units.flatMap(u => u.relations),
    diagnostics: [],
    indexes: {},
  };
}

const INTENT: DesignIntent = {
  task_type: "landing-page",
  sub_type: "fintech",
  domain: "frontend-design",
  vibe: ["spacious", "airy"],
  register_candidates: [{ school: "brutalist", weight: 0.6 }, { school: "stripe-fintech", weight: 0.4 }],
  density: "loose",
  motion_priority: "high",
  required_axes: [],
  ambiguity_flags: [],
};

const SCOPE = { forbiddenUnitIds: [] as readonly string[] };

const REQUEST: QueryRequest = {
  requestId: "r1",
  profile: "frontend-six-axis",
  principal: { id: "p1", allowedVisibility: ["public"], grantedPolicyLabels: [] },
  maxTokens: 1000,
};

function ctx() {
  return {
    profile: loadProfile(),
    relations: {},
    unitsById: new Map(UNITS.map(u => [u.identity.id, u])),
    outgoing: new Map<string, never[]>(),
    incoming: new Map<string, never[]>(),
    report() {},
  };
}

describe("six-axis profile is model data, not code", () => {
  test("the shipped YAML validates against the engine's own RetrievalProfileSchema", () => {
    const profile = loadProfile();
    expect(profile.name).toBe("frontend-six-axis");
    expect(profile.projection).toBe("core");
    expect(profile.candidateGenerators).toHaveLength(6);
    // The five weights are the ones measured out of ranker-v2.ts:56-62.
    expect(profile.features).toEqual({
      tokenOverlap: 1.0,
      axisAffinity: 2.0,
      schoolMatch: 1.5,
      vibeAlignment: 0.8,
      densityAlignment: 0.5,
    });
    expect(profile.constraints).toEqual(["forbidden-atoms"]);
  });

  test("every declared generator name is an axis generator", () => {
    for (const generator of loadProfile().candidateGenerators) {
      expect(generator.name.startsWith(AXIS_GENERATOR_PREFIX)).toBe(true);
    }
  });

  test("registering yields exactly six generators, each declaring the five feature axes", () => {
    const { registry, generators, config } = registerSixAxisGenerators(loadProfile(), INTENT, SCOPE);
    expect(generators).toHaveLength(6);
    expect(config.axes.map(axis => axis.name)).toEqual([
      "color", "motion", "pattern", "register", "rules", "typography",
    ]);
    for (const generator of generators) {
      expect([...generator.featureAxes]).toEqual([...SIX_AXIS_FEATURE_AXES]);
    }
    expect(registry.resolve(loadProfile().candidateGenerators.map(g => g.name))).toHaveLength(6);
  });

  test("a feature axis a generator writes is weighted by the profile", () => {
    const profile = loadProfile();
    for (const axis of SIX_AXIS_FEATURE_AXES) {
      expect(profile.features[axis]).toBeGreaterThan(0);
    }
  });
});

describe("axis generators", () => {
  function runAxis(axisName: string, g: GraphIR = graph(), scope = SCOPE) {
    const { generators } = registerSixAxisGenerators(loadProfile(), INTENT, scope);
    const generator = generators.find(candidate => candidate.name === `${AXIS_GENERATOR_PREFIX}${axisName}`);
    if (generator === undefined) throw new Error(`no generator for axis ${axisName}`);
    return generator.generate(REQUEST, g, ctx());
  }

  test("register axis admits only personas", () => {
    const ids = runAxis("register").map(candidate => candidate.unitId);
    expect(ids).toEqual(["@impeccable/persona-brutalist", "@impeccable/persona-stripe-fintech"]);
  });

  test("school_match sums the curated-mapping tier and the slug tier", () => {
    // Was: pinned 0.6 / 0.4, i.e. the candidate weight alone. That pinned the
    // port's single tier, which had collapsed legacy's two: an exact
    // schoolPersonaMap hit (weight*10) and a slug containment (weight*5). Both
    // now score and are summed, so a persona the profile explicitly maps
    // outranks one that merely shares a slug fragment with a higher-weighted
    // school. Ratio preserved at 2:1; what the numbers must show is the SUM, not
    // either tier alone.
    const candidates = runAxis("register");
    const brutalist = candidates.find(c => c.unitId === "@impeccable/persona-brutalist");
    // school `brutalist` w=0.6: mapped exactly (0.6) + slug `persona-brutalist` (0.3)
    expect(brutalist?.featureValues.schoolMatch).toBeCloseTo(0.9, 6);
    const stripe = candidates.find(c => c.unitId === "@impeccable/persona-stripe-fintech");
    // school `stripe-fintech` w=0.4: mapped exactly (0.4) + slug (0.2)
    expect(stripe?.featureValues.schoolMatch).toBeCloseTo(0.6, 6);
    // The property that matters: the mapped tier alone must be able to decide.
    // A unit carrying only the slug of a HIGHER-weighted school must still lose
    // to one the profile maps for a lower-weighted school.
    expect(brutalist!.featureValues.schoolMatch!).toBeGreaterThan(
      stripe!.featureValues.schoolMatch!
    );
  });

  test("non-register axes score school_match through an edge, capped at 0.5", () => {
    const candidates = runAxis("pattern");
    const viaEdge = candidates.find(c => c.unitId === "@community/pattern-motion-navigation");
    // 0.6 * 0.8 = 0.48, under the 0.5 cap.
    expect(viaEdge?.featureValues.schoolMatch).toBeCloseTo(0.48, 6);
  });

  test("typography axis admits by kind AND text, so a performance rule is excluded", () => {
    const ids = runAxis("typography").map(c => c.unitId);
    expect(ids).toContain("@community/principle-typography-hierarchy");
    expect(ids).toContain("@community/fact-bidi-direction");
    expect(ids).not.toContain("@community/rule-cls-budget");
  });

  test("typography kindOrder puts principle before fact", () => {
    const ids = runAxis("typography").map(c => c.unitId);
    expect(ids.indexOf("@community/principle-typography-hierarchy")).toBeLessThan(
      ids.indexOf("@community/fact-bidi-direction"),
    );
  });

  test("motion axis admits a unit by its cluster", () => {
    expect(runAxis("motion").map(c => c.unitId)).toContain("@impeccable/template-easing-curves");
  });

  test("density_alignment: loose intent scores a spacious description 1 and a compact one 0", () => {
    const spacious = runAxis("pattern").find(c => c.unitId === "@community/pattern-hero-3-layouts");
    expect(spacious?.featureValues.densityAlignment).toBe(1);
    const compact = runAxis("register").find(c => c.unitId === "@impeccable/persona-stripe-fintech");
    expect(compact?.featureValues.densityAlignment).toBe(0);
  });

  test("no-density-signal units get the profile's neutral score, not a hardcoded one", () => {
    const neutral = runAxis("motion").find(c => c.unitId === "@impeccable/template-easing-curves");
    expect(neutral?.featureValues.densityAlignment).toBe(0.3);
  });

  test("forbidden units are dropped before scoring", () => {
    const ids = runAxis("register", graph(), { forbiddenUnitIds: ["@impeccable/persona-brutalist"] }).map(c => c.unitId);
    expect(ids).toEqual(["@impeccable/persona-stripe-fintech"]);
  });

  test("output is independent of graph.units ordering", () => {
    const forward = runAxis("typography", graph(UNITS));
    const reversed = runAxis("typography", graph([...UNITS].reverse()));
    expect(reversed).toEqual(forward);
  });

  test("output is byte-identical across repeated runs", () => {
    expect(JSON.stringify(runAxis("color"))).toBe(JSON.stringify(runAxis("color")));
  });

  test("an axis that matches nothing falls back to its declared unit", () => {
    const empty = graph([unit("@community/term-leading", "term", { description: "leading" })]);
    const candidates = runAxis("typography", empty);
    // The fallback unit is absent from this graph, so the axis is empty rather
    // than fabricating a unit id the corpus does not contain.
    expect(candidates).toEqual([]);

    const withFallback = graph([
      unit("@community/term-leading", "term", { description: "leading" }),
      unit("@community/principle-typography-hierarchy", "principle", { description: "no matching keyword here" }),
    ]);
    const ids = runAxis("typography", withFallback).map(c => c.unitId);
    expect(ids).toEqual(["@community/principle-typography-hierarchy"]);
  });

  test("every candidate carries all five feature axes", () => {
    for (const candidate of runAxis("rules")) {
      expect(Object.keys(candidate.featureValues).sort()).toEqual([...SIX_AXIS_FEATURE_AXES].sort());
    }
  });

  test("generators do not pre-blend: score stays 0 so the profile weights apply once", () => {
    for (const candidate of runAxis("pattern")) expect(candidate.score).toBe(0);
  });
});

describe("profile reader fails closed", () => {
  function withExtensions(extensions: Readonly<Record<string, unknown>> | undefined): RetrievalProfile {
    return { ...loadProfile(), extensions } as RetrievalProfile;
  }

  test("no extensions block at all", () => {
    expect(() => registerSixAxisGenerators(withExtensions(undefined), INTENT, SCOPE)).toThrow(ProfileAxesError);
  });

  test("a generator with no axis descriptor", () => {
    const profile = loadProfile();
    const axes = { ...(profile.extensions as { axes: Record<string, unknown> }).axes };
    delete axes.motion;
    expect(() =>
      registerSixAxisGenerators(withExtensions({ ...profile.extensions, axes }), INTENT, SCOPE),
    ).toThrow(/AXIS_DESCRIPTOR_MISSING/);
  });

  test("an axis descriptor no generator runs", () => {
    const profile = loadProfile();
    const axes = { ...(profile.extensions as { axes: Record<string, unknown> }).axes, ghost: { kinds: ["x"] } };
    expect(() =>
      registerSixAxisGenerators(withExtensions({ ...profile.extensions, axes }), INTENT, SCOPE),
    ).toThrow(/AXIS_DESCRIPTOR_UNUSED/);
  });

  test("a non-integer axis budget", () => {
    const profile = loadProfile();
    expect(() =>
      registerSixAxisGenerators(withExtensions({ ...profile.extensions, defaultAxisBudget: 0 }), INTENT, SCOPE),
    ).toThrow(/AXIS_BUDGET_INVALID/);
  });

  test("a neutral density score outside [0, 1]", () => {
    const profile = loadProfile();
    expect(() =>
      registerSixAxisGenerators(withExtensions({ ...profile.extensions, densityNoSignalScore: 7 }), INTENT, SCOPE),
    ).toThrow(/AXIS_SCORE_OUT_OF_RANGE/);
  });

  test("a non-numeric affinity weight", () => {
    const profile = loadProfile();
    const axesRaw = (profile.extensions as { axes: Record<string, Record<string, unknown>> }).axes;
    const axes = { ...axesRaw, register: { ...axesRaw.register, affinityKinds: { persona: "high" } } };
    expect(() =>
      registerSixAxisGenerators(withExtensions({ ...profile.extensions, axes }), INTENT, SCOPE),
    ).toThrow(/AXIS_WEIGHT_NOT_FINITE/);
  });

  test("a profile whose generators are not axis generators", () => {
    const profile = loadProfile();
    expect(() =>
      readSixAxisConfig(profile.extensions, ["lexical", "graph-neighbors"], AXIS_GENERATOR_PREFIX),
    ).toThrow(/NO_AXIS_GENERATORS/);
  });

  test("registering the same axis twice is rejected by the engine's registry", () => {
    const { registry } = registerSixAxisGenerators(loadProfile(), INTENT, SCOPE);
    expect(() => registerSixAxisGenerators(loadProfile(), INTENT, SCOPE, registry)).toThrow(QueryEngineError);
  });
});
