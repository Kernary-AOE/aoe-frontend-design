/**
 * Acceptance for the four legacy `aoe_query` scopes restored in round 13
 * (`related` with depth, `mandate`, `checklist`, `scout`) and for the two retired
 * ones staying retired.
 *
 * Each restored scope gets the shape the work order asks for — "given this query,
 * expect this back" — plus the property that motivated restoring it at all:
 *
 *   related    depth 2 reaches strictly further than depth 1, and 4 is refused
 *   mandate    selects on the corpus's declared severity, not on an id list
 *   checklist  an unknown task still yields the non-negotiables
 *   scout      the adapter is reachable, and its licences come back with the hits
 *
 * Fixtures are synthetic for the same reason `test/domain-finish.test.ts` gives:
 * the compiled bundle is a 900-unit artifact, and a test that read it would be
 * asserting the corpus. The ONE thing taken from the real bundle is the *shape* of
 * a rendered projection — `## Severity` with the value on the next line — because
 * that shape is the contract `design-standards` parses, and inventing it here
 * would let the parser and the emitter drift apart silently.
 */

import { describe, expect, test } from "bun:test";
import type { GraphEdgeIR, GraphIR, TypedValueIR, UnitIR } from "@skill-wiki/ir";

import {
  RELATED_DEPTH_MAX,
  RELATED_DEPTH_MIN,
  REVERSE_RELATION_LABEL,
  findRelatedUnits,
} from "../../adapters/corpus-graph/src/index.ts";
import {
  NON_NEGOTIABLE_SEVERITIES,
  buildChecklist,
  parseProjectionSections,
  sectionValue,
  selectMandates,
  type ProjectionReader,
} from "../../adapters/design-standards/src/index.ts";
import { createScoutSourceAdapter, resolveDataRoot } from "../../adapters/scout-catalog/src/index.ts";
import { createDesignToolset, emitDesignToolDocument } from "../src/index.ts";

// ── Fixtures ────────────────────────────────────────────────────────────────

function scalar(value: string): TypedValueIR {
  return { typeRef: "string", value } as unknown as TypedValueIR;
}

function unit(id: string, kind: string, description: string, domain = "visual-design"): UnitIR {
  return {
    identity: { id, version: "1.0.0", digest: `sha256:${id}`, corpus: "test" },
    typeRef: kind,
    implements: [],
    fields: { description: scalar(description), domain: scalar(domain) },
    relations: [],
    citations: [],
    policyLabels: [],
    lifecycle: "active",
    visibility: "public",
    provenance: {} as UnitIR["provenance"],
    projections: { core: "chunks/core.md" },
  };
}

function edge(from: string, relationRef: string, to: string): GraphEdgeIR {
  return { id: `${from}-${relationRef}-${to}`, relationRef, from, to };
}

function graph(units: readonly UnitIR[], edges: readonly GraphEdgeIR[]): GraphIR {
  return {
    snapshot: { modelRelease: "1", modelDigest: "d", corpusRelease: "1", corpusDigest: "d" },
    // `relations` on each unit is what the kernel's one-hop `related` walks; the
    // domain walk goes through `buildAdjacency(graph)`, i.e. `graph.edges`. Both
    // are populated so a fixture cannot pass one path while breaking the other.
    units: units.map(u => ({ ...u, relations: edges.filter(e => e.from === u.identity.id) })),
    edges,
    diagnostics: [],
    indexes: {},
  };
}

/** A three-hop chain plus one `requires` edge pointing back at the subject. */
const CHAIN = graph(
  [
    unit("@t/a", "persona", "the subject"),
    unit("@t/b", "pattern", "one hop out"),
    unit("@t/c", "template", "two hops out"),
    unit("@t/d", "example", "three hops out"),
    unit("@t/needs-a", "rule", "requires the subject"),
  ],
  [
    edge("@t/a", "related", "@t/b"),
    edge("@t/b", "related", "@t/c"),
    edge("@t/c", "related", "@t/d"),
    edge("@t/needs-a", "requires", "@t/a"),
    // A dangling target, which the real bundle has 160 of.
    edge("@t/a", "related", "@t/nowhere"),
  ],
);

/**
 * A rendered projection in the emitter's real shape. Copied structurally from
 * `compiled-v3-final/@community/check-contrast-aa/chunks/core.md`.
 */
function projection(kind: string, severity: string, extra = ""): string {
  return [
    `# Thing [${kind}] v1.0.0`,
    "A description line.",
    "domain: accessibility",
    "",
    "## Severity",
    severity,
    "",
    "## Failure Message",
    "It failed: {reason}.",
    "",
    "## Exemptions",
    "- Decorative content.",
    "",
    extra,
  ].join("\n");
}

const STANDARDS = graph(
  [
    unit("@t/check-blocking", "check", "blocks the ship", "accessibility"),
    unit("@t/check-critical", "check", "critical contrast rule", "accessibility"),
    unit("@t/check-mild", "check", "a mobile touch target nicety", "layout"),
    unit("@t/rule-blocking", "rule", "a blocking rule that is not a check", "typography"),
    unit("@t/fact-plain", "fact", "declares no severity at all"),
  ],
  [],
);

const SEVERITY_BY_ID: Readonly<Record<string, string>> = {
  "@t/check-blocking": "block",
  "@t/check-critical": "critical",
  "@t/check-mild": "medium",
  "@t/rule-blocking": "block",
};

const readProjection: ProjectionReader = unitId => {
  const severity = SEVERITY_BY_ID[unitId];
  if (severity === undefined) {
    // `@t/fact-plain` renders, but declares no `## Severity`.
    return unitId === "@t/fact-plain" ? "# Plain [fact] v1.0.0\nno severity here\n" : undefined;
  }
  return projection("check", severity);
};

function toolset() {
  return createDesignToolset({
    corpus: {
      graph: STANDARDS,
      profile: { kind: "retrieval-profile", name: "p", version: "1.0.0", projection: "core", axes: [] } as never,
      projections: {},
      readProjection,
    },
    scout: createScoutSourceAdapter({ dataRoot: resolveDataRoot(undefined) }),
  });
}

// ── The projected tool surface ──────────────────────────────────────────────

describe("the model projects seven tools, not three", () => {
  test("every restored scope appears as a projected tool name", () => {
    const names = emitDesignToolDocument().tools.map(tool => tool.name).sort();
    expect(names).toEqual([
      "aoe_design_checklist",
      "aoe_design_mandate",
      "aoe_design_plan",
      "aoe_design_related",
      "aoe_design_resolve",
      "aoe_design_scout",
      "aoe_design_validate",
    ]);
  });

  test("construction still refuses a handler set that disagrees with the model", () => {
    // The guard that makes the projection authoritative must survive the four new
    // actions: if it did not, a fifth action could ship with no handler.
    expect(() => toolset()).not.toThrow();
    expect(toolset().tools).toHaveLength(7);
  });

  test("related declares depth as an integer input, which is the whole regression", () => {
    const tool = emitDesignToolDocument().tools.find(t => t.name === "aoe_design_related");
    const properties = (tool!.inputSchema as { properties: Record<string, { type?: string }> }).properties;
    expect(properties["depth"]!.type).toBe("integer");
    expect((tool!.inputSchema as { required: string[] }).required).toEqual(["id"]);
  });

  test("the retired scopes' parameters are absent from every tool", () => {
    // `variables` (template) and `section` (gallery) must not reappear as inputs:
    // both scopes were retired on measurement, not deferred.
    const inputs = emitDesignToolDocument().tools.flatMap(tool =>
      Object.keys((tool.inputSchema as { properties: Record<string, unknown> }).properties),
    );
    expect(inputs).not.toContain("variables");
    expect(inputs).not.toContain("section");
  });
});

// ── related, with depth ─────────────────────────────────────────────────────

describe("related restores bounded-depth traversal", () => {
  test("depth 1 gives direct neighbours only — the production status quo", () => {
    const result = findRelatedUnits({ graph: CHAIN, id: "@t/a", depth: 1 });
    expect(result.units.map(u => u.id).sort()).toEqual(["@t/b", "@t/needs-a"]);
    expect(result.depth).toBe(1);
  });

  test("depth 2 reaches strictly further, which depth 1 cannot", () => {
    const one = findRelatedUnits({ graph: CHAIN, id: "@t/a", depth: 1 }).units.map(u => u.id);
    const two = findRelatedUnits({ graph: CHAIN, id: "@t/a", depth: 2 }).units.map(u => u.id);
    expect(two).toEqual(expect.arrayContaining(one));
    expect(two).toContain("@t/c");
    expect(one).not.toContain("@t/c");
  });

  test("depth 3 reaches the end of the chain and the subject is never returned", () => {
    const result = findRelatedUnits({ graph: CHAIN, id: "@t/a", depth: RELATED_DEPTH_MAX });
    expect(result.units.map(u => u.id)).toContain("@t/d");
    expect(result.units.map(u => u.id)).not.toContain("@t/a");
    expect(result.units.find(u => u.id === "@t/d")!.depth).toBe(3);
  });

  test("an incoming `requires` edge is walked and reported as required-by", () => {
    const hit = findRelatedUnits({ graph: CHAIN, id: "@t/a", depth: 1 }).units.find(
      u => u.id === "@t/needs-a",
    );
    expect(hit!.relation).toBe(REVERSE_RELATION_LABEL);
  });

  test("out-of-range depth is clamped with a diagnostic, not silently accepted", () => {
    const high = findRelatedUnits({ graph: CHAIN, id: "@t/a", depth: 4 });
    expect(high.depth).toBe(RELATED_DEPTH_MAX);
    expect(high.diagnostics.map(d => d.code)).toContain("RELATED_DEPTH_OUT_OF_RANGE");
    const low = findRelatedUnits({ graph: CHAIN, id: "@t/a", depth: 0 });
    expect(low.depth).toBe(RELATED_DEPTH_MIN);
  });

  test("a dangling edge target is reported rather than counted as a neighbour", () => {
    const result = findRelatedUnits({ graph: CHAIN, id: "@t/a", depth: 1 });
    expect(result.units.map(u => u.id)).not.toContain("@t/nowhere");
    expect(result.diagnostics.map(d => d.code)).toContain("RELATED_TARGET_DANGLING");
  });

  test("kind filters the result but not the frontier", () => {
    // `@t/c` is a template two hops out, reachable only through the pattern
    // `@t/b`, which the filter excludes. A filter applied to the frontier would
    // return nothing here.
    const result = findRelatedUnits({ graph: CHAIN, id: "@t/a", depth: 2, kind: "template" });
    expect(result.units.map(u => u.id)).toEqual(["@t/c"]);
  });

  test("an unknown subject is a diagnostic, not an empty success", () => {
    const result = findRelatedUnits({ graph: CHAIN, id: "@t/missing" });
    expect(result.units).toHaveLength(0);
    expect(result.diagnostics.map(d => d.code)).toContain("RELATED_SUBJECT_UNKNOWN");
  });

  test("count reports the untruncated total when limit cuts the page", () => {
    const result = findRelatedUnits({ graph: CHAIN, id: "@t/a", depth: 3, limit: 1 });
    expect(result.units).toHaveLength(1);
    expect(result.count).toBeGreaterThan(1);
    expect(result.diagnostics.map(d => d.code)).toContain("RELATED_TRUNCATED");
  });
});

// ── projection section parsing ──────────────────────────────────────────────

describe("severity is read out of the rendered projection", () => {
  test("sections split on `## ` and the value is the first non-blank line", () => {
    const sections = parseProjectionSections(projection("check", "block"));
    expect(sectionValue(sections, "Severity")).toBe("block");
    expect(sectionValue(sections, "Failure Message")).toBe("It failed: {reason}.");
  });

  test("an absent section reads as undefined rather than as an empty string", () => {
    const sections = parseProjectionSections("# X [fact] v1.0.0\nno sections\n");
    expect(sectionValue(sections, "Severity")).toBeUndefined();
  });
});

// ── mandate ─────────────────────────────────────────────────────────────────

describe("mandate selects on declared severity, not on a literal id list", () => {
  test("default selection is exactly the corpus's non-negotiable words", () => {
    const result = selectMandates({ graph: STANDARDS, readProjection });
    expect(result.severities).toEqual([...NON_NEGOTIABLE_SEVERITIES].sort());
    // Both blocking units AND the critical one; the `medium` check is excluded.
    expect(result.mandates.map(m => m.id)).toEqual([
      "@t/check-blocking",
      "@t/rule-blocking",
      "@t/check-critical",
    ]);
  });

  test("a mandate is not restricted to `check` units", () => {
    // The legacy list was 8 hand-picked ids across three legacy modules; the
    // replacement must not quietly become "checks only".
    const kinds = new Set(selectMandates({ graph: STANDARDS, readProjection }).mandates.map(m => m.kind));
    expect(kinds).toContain("rule");
    expect(kinds).toContain("check");
  });

  test("each mandate carries its carve-outs, because a mandate without them gets broken", () => {
    const first = selectMandates({ graph: STANDARDS, readProjection }).mandates[0]!;
    expect(first.exceptions).toEqual(["- Decorative content."]);
    expect(first.failureMessage).toBe("It failed: {reason}.");
  });

  test("asking for a severity nobody declares is a diagnostic, not an empty win", () => {
    const result = selectMandates({ graph: STANDARDS, readProjection, severities: ["catastrophic"] });
    expect(result.count).toBe(0);
    expect(result.diagnostics.map(d => d.code)).toContain("SEVERITY_UNDECLARED");
  });

  test("units whose projection cannot be read are counted, not skipped in silence", () => {
    const result = selectMandates({ graph: STANDARDS, readProjection: () => undefined });
    expect(result.diagnostics.map(d => d.code)).toContain("PROJECTION_UNREADABLE");
  });
});

// ── checklist ───────────────────────────────────────────────────────────────

describe("checklist is built from `check` units, non-negotiables first", () => {
  test("only check units appear, so a blocking rule does not leak in", () => {
    const result = buildChecklist({ graph: STANDARDS, readProjection, task: "accessibility audit" });
    expect(result.items.map(i => i.id)).not.toContain("@t/rule-blocking");
    expect(result.items.every(i => i.kind === "check")).toBe(true);
  });

  test("a task the corpus never mentions still yields the non-negotiables", () => {
    // This is the behaviour the legacy enum could not have: `No checklist for
    // "zzz". Available: …` was the entire answer.
    const result = buildChecklist({ graph: STANDARDS, readProjection, task: "zzzz-unknown-archetype" });
    expect(result.items.filter(i => i.nonNegotiable).map(i => i.id).sort()).toEqual([
      "@t/check-blocking",
      "@t/check-critical",
    ]);
    expect(result.diagnostics.map(d => d.code)).toContain("CHECKLIST_TASK_UNMATCHED");
  });

  test("a matching task raises relevance without demoting a non-negotiable", () => {
    const result = buildChecklist({ graph: STANDARDS, readProjection, task: "mobile touch target" });
    const mild = result.items.find(i => i.id === "@t/check-mild")!;
    expect(mild.taskRelevance).toBeGreaterThan(0);
    // Relevant but only `medium`: it must still sort behind the blockers.
    expect(result.items.filter(i => i.nonNegotiable).length).toBe(2);
    expect(result.items.indexOf(mild)).toBeGreaterThan(1);
  });

  test("every item says why it is on the list", () => {
    const result = buildChecklist({ graph: STANDARDS, readProjection, task: "contrast" });
    expect(result.items.every(i => i.selectedBecause.length > 0)).toBe(true);
  });
});

// ── scout ───────────────────────────────────────────────────────────────────

describe("scout is reachable through the toolset", () => {
  test("the tool exists and answers instead of throwing when no payload is deployed", async () => {
    const result = (await toolset().invoke("aoe_design_scout", { query: "dark minimal footer" })) as {
      count: number;
      items: readonly unknown[];
      sources: readonly { id: string; license: string }[];
      diagnostics: readonly { code: string }[];
    };
    // No payload root is configured in this environment, so the honest answer is
    // zero hits plus a diagnostic naming the reason — which is what makes the
    // absent-payload deployment mistake diagnosable at all.
    expect(result.count).toBe(0);
    expect(result.diagnostics.map(d => d.code)).toContain("SCOUT_DATA_ROOT_ABSENT");
  });

  test("provenance and licence come back with every answer", async () => {
    const result = (await toolset().invoke("aoe_design_scout", { query: "hero" })) as {
      sources: readonly { id: string; license: string; sourceUrl: string }[];
    };
    // 18 declared catalogues, each with a verbatim licence — a caller that got a
    // thumbnail URL without them could not honour the terms.
    expect(result.sources).toHaveLength(18);
    expect(result.sources.every(s => s.license.length > 0)).toBe(true);
    expect(result.sources.every(s => s.sourceUrl.length > 0)).toBe(true);
  });

  test("a toolset built with no scout refuses rather than returning nothing", async () => {
    const bare = createDesignToolset({});
    await expect(bare.invoke("aoe_design_scout", { query: "x" })).rejects.toThrow(/SCOUT_NOT_BOUND|scout catalogue/);
  });
});

// ── the corpus-bound tools refuse honestly when unbound ─────────────────────

describe("the restored tools refuse rather than fabricate", () => {
  test("related/mandate/checklist need a corpus", async () => {
    const bare = createDesignToolset({});
    await expect(bare.invoke("aoe_design_related", { id: "@t/a" })).rejects.toThrow(/CORPUS_NOT_BOUND|corpus binding/);
    await expect(bare.invoke("aoe_design_mandate", {})).rejects.toThrow(/CORPUS_NOT_BOUND|corpus binding/);
  });

  test("mandate/checklist need a projection reader, and say so by name", async () => {
    const noReader = createDesignToolset({
      corpus: {
        graph: STANDARDS,
        profile: { kind: "retrieval-profile", name: "p", version: "1.0.0", projection: "core", axes: [] } as never,
        projections: {},
      },
    });
    await expect(noReader.invoke("aoe_design_checklist", { task: "x" })).rejects.toThrow(
      /PROJECTION_READER_NOT_BOUND|readProjection/,
    );
  });

  test("a non-integer depth is rejected, not coerced", async () => {
    await expect(toolset().invoke("aoe_design_related", { id: "@t/a", depth: "2" })).rejects.toThrow(
      /TOOL_INPUT_INVALID|integer/,
    );
  });
});
