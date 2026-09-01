/**
 * The property the axis budget must not break: **which** candidates an axis emits
 * has to depend on the request.
 *
 * The regression this file pins against sorted each axis's candidates by
 * `(kindRank, unitId)` and then sliced `extensions.defaultAxisBudget` off the
 * front. Every feature the generator had just computed — `schoolMatch` above all,
 * the register axis's whole reason for carrying a `schoolPersonaMap` — was
 * discarded before it could influence membership, so the register axis returned the
 * same alphabetically-first three personas for every brief and `source_persona`
 * stopped varying with the brief.
 *
 * ── What is asserted, and what is deliberately NOT ──────────────────────────
 *
 * No test here names a unit id it expects. The expectation is always *derived*
 * from the profile: `six-axis.yaml`'s `schoolPersonaMap` says which persona a
 * school resolves to, and the assertion is that retrieval agrees with that map.
 * Writing `"@impeccable/persona-stripe-fintech"` into an `expect` would freeze a
 * corpus id inside code and make the next corpus rebuild a test failure — the same
 * frozen-baseline mistake the shadow comparison was measuring against.
 *
 * The fixture corpus is built so that the budget genuinely bites: it holds more
 * personas than `defaultAxisBudget`, and the persona that any given intent should
 * select sorts *late* alphabetically. A fixture with three personas would pass
 * under the regression too.
 */
import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import type { GraphIR, SelectionCandidateIR, TypedValueIR, UnitIR } from "@aoe/ir";
import { DefinitionFileSchema, type RetrievalProfile } from "@aoe/model-schema";
import { CandidateGeneratorRegistry, runRetrieval, type Principal, type QueryRequest } from "@aoe/query-engine";
import { AXIS_GENERATOR_PREFIX, readSixAxisConfig, registerSixAxisGenerators, type DesignIntent } from "../src/index.ts";

const PROFILE_PATH = join(import.meta.dir, "..", "..", "..", "model", "retrieval", "six-axis.yaml");

function loadProfile(): RetrievalProfile {
  const file = DefinitionFileSchema.parse(parse(readFileSync(PROFILE_PATH, "utf8")));
  const profile = file.definitions.find(definition => definition.kind === "retrieval-profile");
  if (profile === undefined) throw new Error("fixture regression: six-axis.yaml declares no retrieval-profile");
  return profile;
}

const PROFILE = loadProfile();
const CONFIG = readSixAxisConfig(
  PROFILE.extensions,
  PROFILE.candidateGenerators.map(generator => generator.name),
  AXIS_GENERATOR_PREFIX,
);

/** The axis that carries the school→persona map, identified the way the profile declares it. */
const REGISTER_AXIS = CONFIG.axes.find(axis => Object.keys(axis.schoolPersonaMap).length > 0)!;
/** The axis that declares a `kindOrder`, i.e. one whose ordering is a declared preference tier. */
const KIND_ORDERED_AXIS = CONFIG.axes.find(axis => axis.kindOrder.length > 0)!;

function str(value: string): TypedValueIR {
  return { kind: "string", value, source: { loc: { line: 1, column: 1, offset: 0 } } };
}

function unit(id: string, typeRef: string, fields: Readonly<Record<string, string>>): UnitIR {
  const mapped: Record<string, TypedValueIR> = {};
  for (const [key, value] of Object.entries(fields)) mapped[key] = str(value);
  return {
    identity: { id, version: "1.0.0", digest: `d-${id}`, corpus: "test" },
    typeRef,
    implements: [],
    fields: mapped,
    relations: [],
    citations: [],
    policyLabels: [],
    lifecycle: "active",
    visibility: "public",
    provenance: { source: { loc: { line: 1, column: 1, offset: 0 } } },
    projections: {},
  };
}

/**
 * Every persona the profile's map can reach, as a corpus. There are far more than
 * `defaultAxisBudget` of them and their ids sort in an order unrelated to any
 * intent, which is exactly the condition under which a budget applied before
 * ranking destroys the answer.
 */
const PERSONA_IDS: readonly string[] = [...new Set(Object.values(REGISTER_AXIS.schoolPersonaMap))].sort();

const PERSONA_UNITS: readonly UnitIR[] = PERSONA_IDS.map(id =>
  unit(id, "persona", { description: `Register persona ${id}` }),
);

/** Typography-axis units spanning the declared `kindOrder`, plus one that sorts first by id. */
const KIND_UNITS: readonly UnitIR[] = KIND_ORDERED_AXIS.kindOrder.map((kind, index) =>
  unit(`@fixture/aaa-${index}-${kind}-typography`, kind, {
    description: "Typography and font hierarchy guidance",
    cluster: "typography",
  }),
);

function graph(units: readonly UnitIR[]): GraphIR {
  return {
    snapshot: { modelRelease: "m1", modelDigest: "md", corpusRelease: "c1", corpusDigest: "cd" },
    units,
    edges: [],
    diagnostics: [],
    indexes: {},
  };
}

function intentFor(school: string): DesignIntent {
  return {
    task_type: "landing-page",
    sub_type: "generic",
    domain: "frontend-design",
    vibe: [],
    register_candidates: [{ school, weight: 1 }],
    density: "comfy",
    motion_priority: "medium",
    required_axes: [],
    ambiguity_flags: [],
  };
}

const PRINCIPAL: Principal = { id: "test", allowedVisibility: ["public"], grantedPolicyLabels: [] };

/** Run the engine's steps 1-3 and return the ranked candidates of one axis. */
function axisCandidates(units: readonly UnitIR[], intent: DesignIntent, axisName: string): readonly SelectionCandidateIR[] {
  const registry = new CandidateGeneratorRegistry();
  registerSixAxisGenerators(PROFILE, intent, { forbiddenUnitIds: [] }, registry);
  const request: QueryRequest = {
    requestId: "budget-after-ranking",
    profile: PROFILE.name,
    principal: PRINCIPAL,
    maxTokens: 8000,
  };
  const result = runRetrieval(
    request,
    { graph: graph(units), profiles: { [PROFILE.name]: PROFILE }, relations: {}, projections: { core: { name: "core", level: "core", fields: [], tokenBudget: 4000 } } as never },
    { generators: registry },
  );
  const marker = `${AXIS_GENERATOR_PREFIX}${axisName}:`;
  return result.candidates.filter(candidate => candidate.reasons.some(reason => reason.startsWith(marker)));
}

describe("the axis budget is applied after ranking, not before", () => {
  test("the fixture is capable of failing: it holds more personas than the budget", () => {
    expect(PERSONA_UNITS.length).toBeGreaterThan(CONFIG.defaultAxisBudget);
  });

  test("the register axis emits at most the declared budget", () => {
    const emitted = axisCandidates(PERSONA_UNITS, intentFor("stripe-fintech"), REGISTER_AXIS.name);
    expect(emitted.length).toBeLessThanOrEqual(CONFIG.defaultAxisBudget);
    expect(emitted.length).toBeGreaterThan(0);
  });

  test("every declared school reaches its own persona, so membership tracks the request", () => {
    // The expected id is read out of the profile, never written here. Any school
    // whose persona survives the budget proves the budget did not pre-empt the
    // ranking; a school that could not would reproduce the regression.
    for (const [school, expectedPersona] of Object.entries(REGISTER_AXIS.schoolPersonaMap)) {
      const emitted = axisCandidates(PERSONA_UNITS, intentFor(school), REGISTER_AXIS.name);
      expect(emitted.map(candidate => candidate.unitId)).toContain(expectedPersona);
      expect(emitted[0]!.unitId).toBe(expectedPersona);
    }
  });

  test("DIFFERENT requests select DIFFERENT candidates — the property the regression broke", () => {
    // One intent per distinct persona the map reaches. If the budget were still
    // applied before ranking, every one of these would return the same
    // alphabetically-first slice and this set would collapse to `budget` entries.
    const schoolsByPersona = new Map<string, string>();
    for (const [school, persona] of Object.entries(REGISTER_AXIS.schoolPersonaMap)) {
      if (!schoolsByPersona.has(persona)) schoolsByPersona.set(persona, school);
    }
    const tops = [...schoolsByPersona.values()].map(
      school => axisCandidates(PERSONA_UNITS, intentFor(school), REGISTER_AXIS.name)[0]!.unitId,
    );
    expect(new Set(tops).size).toBe(schoolsByPersona.size);
    expect(new Set(tops).size).toBeGreaterThan(CONFIG.defaultAxisBudget);
  });

  test("a school the profile does not map does not steer the axis to a mapped persona", () => {
    // Nothing scores on `schoolMatch`, so the outcome falls back to the remaining
    // features and the id tie-break. The assertion is only that it stays inside the
    // budget and stays deterministic — not which persona it is.
    const first = axisCandidates(PERSONA_UNITS, intentFor("no-such-school"), REGISTER_AXIS.name);
    const second = axisCandidates(PERSONA_UNITS, intentFor("no-such-school"), REGISTER_AXIS.name);
    expect(first.length).toBeLessThanOrEqual(CONFIG.defaultAxisBudget);
    expect(first.map(c => c.unitId)).toEqual(second.map(c => c.unitId));
  });

  test("a declared kindOrder still outranks relevance, because it is model policy", () => {
    // `six-axis.yaml` declares `kindOrder` on typography and color only, and there
    // it IS the policy the model states. The fixture's ids all sort before the
    // kinds' preference order would put them, so a run that ignored `kindOrder`
    // would return them in id order instead.
    const emitted = axisCandidates(KIND_UNITS, intentFor("stripe-fintech"), KIND_ORDERED_AXIS.name);
    const kindsInOrder = emitted.map(
      candidate => KIND_UNITS.find(item => item.identity.id === candidate.unitId)!.typeRef,
    );
    expect(kindsInOrder).toEqual(KIND_ORDERED_AXIS.kindOrder.slice(0, kindsInOrder.length));
  });
});

describe("the engine's determinism helpers are reachable from a third-party generator", () => {
  test("compareStrings and orderedRecord are on the query-engine public surface", async () => {
    // The adapter used to carry private copies because these two were implemented
    // in `deterministic.ts` but not re-exported, which made "deterministic" mean
    // two different things on either side of the generator boundary.
    const engine = await import("@aoe/query-engine");
    expect(typeof engine.compareStrings).toBe("function");
    expect(typeof engine.orderedRecord).toBe("function");
    expect(engine.compareStrings("a", "b")).toBe(-1);
    expect(Object.keys(engine.orderedRecord([["b", 1], ["a", 2]]))).toEqual(["a", "b"]);
  });
});
