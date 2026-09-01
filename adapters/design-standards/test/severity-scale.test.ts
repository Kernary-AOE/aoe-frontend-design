/**
 * The severity scale is model data, and the adapter's ordering follows it.
 *
 * These tests assert RELATIONS, not frozen values, wherever a relation is what
 * matters: that `rank` follows the declared order (proved by reversing the
 * declaration and watching the ranks reverse), that an alias lands on its declared
 * rung, that `gate: blocking` is what feeds the mandate set. The one place a literal
 * is asserted is the model file's own `observed` bookkeeping, where the literal *is*
 * the claim being made about the bundle.
 *
 * Hermetic on purpose: the real `model/retrieval/severity.yaml` is read, but the
 * corpus is synthetic; release conformance separately verifies the generated bundle.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import type { GraphIR, TypedValueIR, UnitIR } from "@aoe/ir";

import {
  NON_NEGOTIABLE_SEVERITIES,
  SEVERITY_ALIAS_INFERRED,
  SEVERITY_REQUIRED_UNDECLARED,
  SEVERITY_SCALE,
  SEVERITY_UNKNOWN_VALUE,
  buildChecklist,
  selectMandates,
  type ProjectionReader,
} from "../src/index.ts";
import { SEVERITY_MODEL_PATH, SeverityModelError, parseSeverityScale } from "../src/severity.ts";

const DOCUMENT = parse(readFileSync(SEVERITY_MODEL_PATH, "utf8")) as Record<string, unknown>;

/** Deep-clone the real document so a mutation test cannot leak into another test. */
function clone(): Record<string, unknown> {
  return JSON.parse(JSON.stringify(DOCUMENT)) as Record<string, unknown>;
}

function extensionBlock(document: Record<string, unknown>): Record<string, unknown> {
  const definitions = document["definitions"] as readonly Record<string, unknown>[];
  const type = definitions.find(entry => entry["kind"] === "type" && entry["name"] === "severity")!;
  return (type["extensions"] as Record<string, unknown>)["severity"] as Record<string, unknown>;
}

// ── The declaration itself ──────────────────────────────────────────────────

describe("the severity scale is declared in the model, not in the adapter", () => {
  test("the real model file parses into a usable scale", () => {
    const scale = parseSeverityScale(DOCUMENT);
    expect(scale.rungs.length).toBeGreaterThan(0);
    expect(scale.rungs.map(rung => rung.name)).toEqual(SEVERITY_SCALE.rungs.map(rung => rung.name));
  });

  test("every rung name is distinct and lower-case", () => {
    const names = SEVERITY_SCALE.rungs.map(rung => rung.name);
    expect(new Set(names).size).toBe(names.length);
    expect(names.every(name => name === name.toLowerCase())).toBe(true);
  });

  test("`observed` counts account for exactly the 185 publishable units that declare a severity", () => {
    // The model file claims 185 of 797 sources declare severity, split across
    // rungs and aliases. If a rung count is edited without editing the total the
    // file is internally inconsistent, which is the failure this catches.
    const rungTotal = SEVERITY_SCALE.rungs.reduce((sum, rung) => sum + rung.observed, 0);
    const aliasTotal = SEVERITY_SCALE.aliases.reduce((sum, alias) => sum + alias.observed, 0);
    expect(rungTotal + aliasTotal).toBe(185);
  });

  test("an alias's target is a rung, and no alias shadows a rung", () => {
    const names = new Set(SEVERITY_SCALE.rungs.map(rung => rung.name));
    for (const alias of SEVERITY_SCALE.aliases) {
      expect(names.has(alias.to)).toBe(true);
      expect(names.has(alias.from)).toBe(false);
    }
  });

  test("`warn` normalises onto `warning` as a spelling variant", () => {
    const folded = SEVERITY_SCALE.normalise("warn");
    expect(folded.value).toBe("warning");
    expect(folded.alias?.basis).toBe("spelling");
    expect(SEVERITY_SCALE.rank("warn")).toBe(SEVERITY_SCALE.rank("warning"));
  });

  test("`error` normalises onto an advisory rung by inference, not into the gate", () => {
    const folded = SEVERITY_SCALE.normalise("error");
    expect(folded.alias?.basis).toBe("inferred");
    expect(folded.alias?.rationale).toBeDefined();
    // The judgement that matters is the GATE membership, not the rung's name: an
    // `error` unit must not become a non-negotiable on the strength of a word the
    // corpus never orders.
    expect(SEVERITY_SCALE.isBlocking(folded.value)).toBe(false);
    expect(folded.rung?.gate).toBe("advisory");
  });

  test("case and surrounding whitespace do not create a second vocabulary", () => {
    expect(SEVERITY_SCALE.normalise("  BLOCK  ").value).toBe("block");
    expect(SEVERITY_SCALE.normalise("Warn").value).toBe("warning");
  });

  test("the non-negotiable set is derived from `gate: blocking`, not written twice", () => {
    expect([...NON_NEGOTIABLE_SEVERITIES]).toEqual(
      SEVERITY_SCALE.rungs.filter(rung => rung.gate === "blocking").map(rung => rung.name),
    );
    expect(NON_NEGOTIABLE_SEVERITIES.every(name => SEVERITY_SCALE.isBlocking(name))).toBe(true);
  });

  test("`check` is the kind that must declare a severity, because it is the gate", () => {
    expect([...SEVERITY_SCALE.requireDeclarationForKinds]).toContain("check");
  });
});

// ── Order comes from the declaration ────────────────────────────────────────

describe("rank follows the declared order rather than a table in code", () => {
  test("rank is the rung's position, so blocking rungs outrank advisory ones", () => {
    SEVERITY_SCALE.rungs.forEach((rung, index) => {
      expect(SEVERITY_SCALE.rank(rung.name)).toBe(index);
    });
    const worstBlocking = Math.max(
      ...SEVERITY_SCALE.rungs.filter(r => r.gate === "blocking").map(r => SEVERITY_SCALE.rank(r.name)),
    );
    const bestAdvisory = Math.min(
      ...SEVERITY_SCALE.rungs.filter(r => r.gate === "advisory").map(r => SEVERITY_SCALE.rank(r.name)),
    );
    expect(worstBlocking).toBeLessThan(bestAdvisory);
  });

  test("reversing the declaration reverses the ranks", () => {
    // The load-bearing proof that the order is DATA. If any ordering survived in
    // code, this would not follow the file.
    const document = clone();
    const block = extensionBlock(document);
    const scale = block["scale"] as unknown[];
    block["scale"] = [...scale].reverse();
    const reversed = parseSeverityScale(document);
    expect(reversed.rungs.map(r => r.name)).toEqual(
      [...SEVERITY_SCALE.rungs.map(r => r.name)].reverse(),
    );
    const last = SEVERITY_SCALE.rungs[SEVERITY_SCALE.rungs.length - 1]!.name;
    expect(reversed.rank(last)).toBe(0);
    expect(SEVERITY_SCALE.rank(last)).toBe(SEVERITY_SCALE.rungs.length - 1);
  });

  test("a word the scale never declares ranks last, never first", () => {
    expect(SEVERITY_SCALE.rank("catastrophic")).toBe(SEVERITY_SCALE.rungs.length);
    expect(SEVERITY_SCALE.rank("catastrophic")).toBeGreaterThan(
      SEVERITY_SCALE.rank(SEVERITY_SCALE.rungs[SEVERITY_SCALE.rungs.length - 1]!.name),
    );
    expect(SEVERITY_SCALE.gateOf("catastrophic")).toBeUndefined();
    expect(SEVERITY_SCALE.isBlocking("catastrophic")).toBe(false);
  });
});

// ── A broken declaration fails loudly ───────────────────────────────────────

describe("a malformed declaration throws instead of falling back to a hardcoded scale", () => {
  function expectRejected(mutate: (block: Record<string, unknown>) => void): void {
    const document = clone();
    mutate(extensionBlock(document));
    expect(() => parseSeverityScale(document)).toThrow(SeverityModelError);
  }

  test("an alias pointing at a non-rung is rejected", () => {
    expectRejected(block => {
      (block["aliases"] as Record<string, unknown>[])[0]!["to"] = "nonesuch";
    });
  });

  test("an alias whose `from` is itself a rung is rejected", () => {
    expectRejected(block => {
      (block["aliases"] as Record<string, unknown>[])[0]!["from"] =
        (block["scale"] as Record<string, unknown>[])[0]!["name"];
    });
  });

  test("a duplicated rung is rejected", () => {
    expectRejected(block => {
      const scale = block["scale"] as Record<string, unknown>[];
      scale.push({ ...scale[0]! });
    });
  });

  test("an empty scale is rejected", () => {
    expectRejected(block => {
      block["scale"] = [];
    });
  });

  test("a gate that is neither blocking nor advisory is rejected", () => {
    expectRejected(block => {
      (block["scale"] as Record<string, unknown>[])[0]!["gate"] = "maybe";
    });
  });

  test("a document with no `severity` type definition is rejected", () => {
    const document = clone();
    document["definitions"] = (document["definitions"] as Record<string, unknown>[]).filter(
      entry => entry["name"] !== "severity",
    );
    expect(() => parseSeverityScale(document)).toThrow(SeverityModelError);
  });

  test("a document that is not a model definition file at all is rejected", () => {
    expect(() => parseSeverityScale({ kind: "nonsense" })).toThrow(SeverityModelError);
  });
});

// ── The adapter honours it ──────────────────────────────────────────────────

function scalar(value: string): TypedValueIR {
  return { typeRef: "string", value } as unknown as TypedValueIR;
}

function unit(id: string, kind: string, description: string): UnitIR {
  return {
    identity: { id, version: "1.0.0" },
    typeRef: kind,
    fields: { description: scalar(description), domain: scalar("frontend-design") },
    projections: {},
    relations: [],
  } as unknown as UnitIR;
}

function graph(units: readonly UnitIR[]): GraphIR {
  return { units, edges: [], diagnostics: [] } as unknown as GraphIR;
}

function projection(severity: string | undefined): string {
  const head = ["# Thing [check] v1.0.0", "A description line.", "domain: frontend-design", ""];
  return severity === undefined
    ? head.join("\n")
    : [...head, "## Severity", severity, ""].join("\n");
}

const SEVERITIES: Readonly<Record<string, string | undefined>> = {
  "@t/check-block": "block",
  "@t/check-warn": "warn",
  "@t/check-warning": "warning",
  "@t/check-error": "error",
  "@t/check-silent": undefined,
  "@t/check-alien": "catastrophic",
};

const GRAPH = graph(Object.keys(SEVERITIES).map(id => unit(id, "check", `text for ${id}`)));

const read: ProjectionReader = id =>
  id in SEVERITIES ? projection(SEVERITIES[id]) : undefined;

describe("the adapter ranks and gates by the declared scale", () => {
  test("`warn` and `warning` become one bucket rather than two", () => {
    const items = buildChecklist({ graph: GRAPH, readProjection: read, task: "text" }).items;
    const warn = items.find(i => i.id === "@t/check-warn")!;
    const warning = items.find(i => i.id === "@t/check-warning")!;
    expect(warn.severity).toBe(warning.severity);
    expect(warn.nonNegotiable).toBe(false);
  });

  test("an `error` unit is not promoted into the mandate gate", () => {
    const result = selectMandates({ graph: GRAPH, readProjection: read });
    expect(result.mandates.map(m => m.id)).toEqual(["@t/check-block"]);
    expect(result.mandates.map(m => m.id)).not.toContain("@t/check-error");
  });

  test("an inferred alias is reported, so the domain's judgement is not silent", () => {
    const result = selectMandates({ graph: GRAPH, readProjection: read });
    const inferred = result.diagnostics.find(d => d.code === SEVERITY_ALIAS_INFERRED)!;
    expect(inferred).toBeDefined();
    expect(inferred.message).toContain("error");
    expect(inferred.severity).toBe("warning");
  });

  test("a check with no severity is excluded, named, and diagnosed as an error", () => {
    // This is the 3-of-36 case. It used to be `continue`d in silence: a check that
    // cannot say whether it blocks was dropped from the gate with no trace.
    const result = buildChecklist({ graph: GRAPH, readProjection: read, task: "text" });
    expect(result.items.map(i => i.id)).not.toContain("@t/check-silent");
    expect(result.ungated).toEqual(["@t/check-silent"]);
    const diagnostic = result.diagnostics.find(d => d.code === SEVERITY_REQUIRED_UNDECLARED)!;
    expect(diagnostic).toBeDefined();
    expect(diagnostic.severity).toBe("error");
    expect(diagnostic.message).toContain("@t/check-silent");
  });

  test("an undeclared severity word is reported and sorted last, not dropped", () => {
    const result = buildChecklist({ graph: GRAPH, readProjection: read, task: "text" });
    expect(result.items.map(i => i.id)).toContain("@t/check-alien");
    expect(result.diagnostics.map(d => d.code)).toContain(SEVERITY_UNKNOWN_VALUE);
    const ranks = result.items.map(i => SEVERITY_SCALE.rank(i.severity));
    expect(Math.max(...ranks)).toBe(SEVERITY_SCALE.rungs.length);
  });

  test("requesting `warn` selects the same units as requesting `warning`", () => {
    const viaAlias = selectMandates({ graph: GRAPH, readProjection: read, severities: ["warn"] });
    const viaRung = selectMandates({ graph: GRAPH, readProjection: read, severities: ["warning"] });
    expect(viaAlias.mandates.map(m => m.id)).toEqual(viaRung.mandates.map(m => m.id));
    expect(viaAlias.mandates.map(m => m.id).sort()).toEqual(["@t/check-warn", "@t/check-warning"]);
  });

  test("checklist ordering is non-negotiables first, then by declared rank", () => {
    const items = buildChecklist({ graph: GRAPH, readProjection: read, task: "nothing-matches-xyz" }).items;
    expect(items[0]!.id).toBe("@t/check-block");
    const ranks = items.map(i => SEVERITY_SCALE.rank(i.severity));
    expect([...ranks]).toEqual([...ranks].sort((a, b) => a - b));
  });
});
