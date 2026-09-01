/**
 * Tests for the three adapters this lane added and for the MCP projection.
 *
 * The fixtures are deliberately *real* where a real thing exists: the `core`
 * projection comes out of `projects/aoe-engine/compat/prime-v1-model` via
 * `loadModelOrThrow`, and the retrieval profile comes out of the shipped
 * `model/retrieval/six-axis.yaml`. Only the corpus units are synthetic, because
 * the compiled snapshot is a 900-unit artifact and a test that depended on it
 * would be asserting the corpus, not the adapter.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import type { GraphIR, TypedValueIR, UnitIR } from "@aoe/ir";
import {
  DefinitionFileSchema,
  loadModelOrThrow,
  type ProjectionDefinition,
  type RetrievalProfile,
} from "@aoe/model-schema";

import {
  DESIGN_SCHOOLS,
  DESIGN_SUB_TYPES,
  DESIGN_TASK_TYPES,
  buildClassifierPrompt,
  classifyDesignBrief,
  classifyDesignBriefHeuristically,
  extractJsonObject,
  repairIntent,
} from "../adapters/intent-classifier/src/index.ts";
import {
  AESTHETIC_PASS_SCORE,
  buildRetryPrompt,
  checkAtomSignature,
  checkComposition,
  checkStructure,
  validateHtml,
  type DesignContract,
} from "../adapters/html-validator/src/index.ts";
import {
  DesignResolverError,
  extractAccentFromPalette,
  mergeColor,
  mergeTypography,
  parseDensity,
  parseLayout,
  parseMotion,
  readPersonaContract,
  resolveDesign,
} from "../adapters/design-resolver/src/index.ts";
import { createDesignToolset, emitDesignToolDocument, DesignToolsetError } from "../mcp/src/index.ts";

// ── Fixtures ────────────────────────────────────────────────────────────────

const ROOT = join(import.meta.dir, "..");
const MODEL_ROOT = join(ROOT, "model");
const NON_ACTION_MODEL_ROOT = join(ROOT, "..", "aoe-engine", "packages", "model-schema", "test", "fixtures", "ticket-model");

function loadProfile(): RetrievalProfile {
  const file = DefinitionFileSchema.parse(parse(readFileSync(join(ROOT, "model", "retrieval", "six-axis.yaml"), "utf8")));
  const profile = file.definitions.find(definition => definition.kind === "retrieval-profile");
  if (profile === undefined) throw new Error("fixture regression: six-axis.yaml declares no retrieval-profile");
  return profile;
}

/** The real `core` projection. Loaded, not transcribed. */
function loadProjections(): Readonly<Record<string, ProjectionDefinition>> {
  const model = loadModelOrThrow(MODEL_ROOT);
  const out: Record<string, ProjectionDefinition> = {};
  for (const definition of model.definitions) if (definition.kind === "projection") out[definition.name] = definition;
  return out;
}

const LOC = { loc: { line: 1, column: 1, offset: 0 } };
const str = (value: string): TypedValueIR => ({ kind: "string", value, source: LOC });
const obj = (fields: Record<string, TypedValueIR>): TypedValueIR => ({ kind: "object", fields, source: LOC });
const arr = (items: readonly string[]): TypedValueIR => ({ kind: "array", items: items.map(str), source: LOC });

function unit(id: string, typeRef: string, fields: Record<string, TypedValueIR>): UnitIR {
  return {
    identity: { id, version: "1.0.0", digest: `d-${id}`, corpus: "test" },
    typeRef,
    implements: [],
    fields,
    relations: [],
    citations: [],
    policyLabels: [],
    lifecycle: "active",
    visibility: "public",
    provenance: { source: LOC.loc === undefined ? LOC : LOC },
    projections: {},
  };
}

/** A persona whose `implies` prose is transcribed from the shapes `resolver.ts` parsed. */
const PERSONA = unit("@impeccable/persona-stripe-fintech", "persona", {
  description: str("Dense fintech register with compact tables and trust-first layout"),
  implies: obj({
    font: obj({ display: str("Söhne | SF Pro"), body: str("Inter"), monospace: str("Geist Mono") }),
    color: obj({
      background: str("#ffffff"),
      palette: str("purple #533afd brand CTA, blue-tinted neutrals"),
      temperature: str("cool-neutral"),
    }),
    density: str("compact — 4–8px radius only, 8px base spacing, 40-44px row height, 1080px max-width"),
    motion: str("subtle — 200-300ms ease-out, fade-in-up on scroll, no bouncy springs"),
    layout: str("white canvas, centered 1080px, 12-col grid"),
  }),
  composition: obj({
    "typography-required": obj({ display: str("Söhne | SF Pro"), "weight-signature": str("560"), "line-height": str("1.5") }),
    "color-required": obj({ accent: str("#533afd"), "shadow-style": str("blue-tinted multi-layer") }),
    "must-include": arr(["@community/pattern-pricing-tiers", "@impeccable/template-trust-badges"]),
    "must-avoid": arr(["@community/pattern-toast-stack"]),
  }),
});

const UNITS: readonly UnitIR[] = [
  PERSONA,
  unit("@impeccable/persona-brutalist", "persona", { description: str("Loud spacious brutalist register") }),
  unit("@community/pattern-pricing-tiers", "pattern", { description: str("Pricing tier cards and plan comparison") }),
  unit("@impeccable/template-easing-curves", "template", { description: str("Easing curves"), cluster: str("motion") }),
  unit("@community/principle-typography-hierarchy", "principle", { description: str("Typography hierarchy and font scale") }),
  unit("@community/rule-contrast-minimum", "rule", { description: str("Colour contrast minimum ratio") }),
];

function graph(): GraphIR {
  return {
    snapshot: { modelRelease: "m1", modelDigest: "md", corpusRelease: "c1", corpusDigest: "cd" },
    units: UNITS,
    edges: [],
    diagnostics: [],
    indexes: {},
  };
}

function corpus() {
  return { graph: graph(), profile: loadProfile(), projections: loadProjections() };
}

// ── intent-classifier ───────────────────────────────────────────────────────

describe("intent-classifier", () => {
  test("the donor's vocabularies are carried in full", () => {
    // classify.ts:16-49 / 51-57 / 61-66 counts.
    expect(DESIGN_SCHOOLS).toHaveLength(31);
    expect(DESIGN_TASK_TYPES).toHaveLength(5);
    expect(DESIGN_SUB_TYPES).toHaveLength(30);
  });

  test("a waitlist brief reproduces the donor's waitlist preset", async () => {
    const intent = await classifyDesignBrief("邮件订阅, 简单就行");
    expect(intent.task_type).toBe("marketing-landing");
    expect(intent.sub_type).toBe("waitlist");
    expect(intent.register_candidates.map(candidate => candidate.school)).toEqual([
      "warm-institutional",
      "vercel-clean",
      "notion-warm",
    ]);
    // `简单` hits the loose density rule and the minimal/clean vibe rule.
    expect(intent.density).toBe("loose");
    expect(intent.vibe).toEqual(["minimal", "clean"]);
    // Under 15 characters, so the donor's short-brief flag fires.
    expect(intent.ambiguity_flags).toEqual(["brief-too-short"]);
  });

  test("motion is escalated to high only by the second rule, not the first", () => {
    expect(classifyDesignBriefHeuristically("add a transition").motion_priority).toBe("med");
    expect(classifyDesignBriefHeuristically("rich motion throughout the page").motion_priority).toBe("high");
    expect(classifyDesignBriefHeuristically("a b2b pricing page").motion_priority).toBe("low");
  });

  test("the motion axis is required only when motion is not low", () => {
    expect(classifyDesignBriefHeuristically("a b2b pricing page").required_axes).not.toContain("motion");
    expect(classifyDesignBriefHeuristically("animated toast notifications").required_axes).toContain("motion");
  });

  test("with no model the classifier is pure: two calls are byte-identical", async () => {
    const first = await classifyDesignBrief("developer CLI dashboard with dense tables");
    const second = await classifyDesignBrief("developer CLI dashboard with dense tables");
    expect(JSON.stringify(first)).toBe(JSON.stringify(second));
  });

  test("a model answer is used when it is well formed", async () => {
    const intent = await classifyDesignBrief("anything", {
      model: {
        async complete() {
          return '```json\n{"task_type":"content","sub_type":"doc-page","register_candidates":[{"school":"mintlify","weight":1,"rationale":"docs"}],"vibe":["airy"],"motion_priority":"low","density":"loose","domain":"developer-tool","required_axes":["typography"],"ambiguity_flags":[]}\n```';
        },
      },
    });
    expect(intent.sub_type).toBe("doc-page");
    expect(intent.register_candidates[0]).toEqual({ school: "mintlify", weight: 1, rationale: "docs" });
  });

  test("a model that returns junk cannot produce a worse intent than no model", async () => {
    const deterministic = classifyDesignBriefHeuristically("B2B SaaS pricing page");
    for (const answer of ["", "I cannot help with that", "[1,2,3]", "{not json"]) {
      const codes: string[] = [];
      const intent = await classifyDesignBrief("B2B SaaS pricing page", {
        model: { async complete() { return answer; } },
        report: code => codes.push(code),
      });
      expect(JSON.stringify(intent)).toBe(JSON.stringify(deterministic));
      expect(codes).toHaveLength(1);
    }
  });

  test("a model that throws is reported, not propagated", async () => {
    const codes: string[] = [];
    const intent = await classifyDesignBrief("dashboard", {
      model: { async complete() { throw new Error("429 quota"); } },
      report: code => codes.push(code),
    });
    expect(codes).toEqual(["CLASSIFIER_MODEL_THREW"]);
    expect(intent.sub_type).toBe("dashboard");
  });

  test("a wrongly typed field falls back instead of type-lying (donor cast it through)", () => {
    const repaired = repairIntent({ vibe: [1, 2], register_candidates: [{ school: "x" }], density: "enormous" }, "dense data table");
    expect(repaired.vibe.every(entry => typeof entry === "string")).toBe(true);
    expect(repaired.register_candidates.every(entry => typeof entry.weight === "number")).toBe(true);
    expect(repaired.density).toBe("tight");
  });

  test("fence stripping keeps the outermost object", () => {
    expect(extractJsonObject('```json\n{"a":{"b":1}}\n```')).toBe('{"a":{"b":1}}');
  });

  test("the prompt is built from the vocabulary tables, not a frozen string", () => {
    const prompt = buildClassifierPrompt("x");
    for (const school of DESIGN_SCHOOLS) expect(prompt).toContain(school);
    expect(prompt.endsWith("Brief:\nx")).toBe(true);
  });
});

// ── html-validator ──────────────────────────────────────────────────────────

const GOOD_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width"><title>Pricing</title>
<style>body{font-family:Söhne,SF Pro,sans-serif;color:#533afd}.pricing{}</style></head>
<body><h1>Pricing</h1><section class="pricing"><p>$29</p></section></body></html>`;

describe("html-validator", () => {
  test("L1 lists every missing requirement, in donor order", () => {
    const result = checkStructure("<div>hello</div>");
    expect(result.pass).toBe(false);
    expect(result.issues).toEqual([
      "missing <html> tag",
      "missing <title>",
      "missing viewport meta",
      "missing charset meta",
      "missing h1",
    ]);
  });

  test("L1 reports the alt count as n/total", () => {
    const result = checkStructure(`${GOOD_HTML}<img src="a.png"><img src="b.png" alt="b">`);
    expect(result.issues).toEqual(["1/2 <img> missing alt"]);
  });

  test("L1 raises the input-label issue once for the whole document", () => {
    const result = checkStructure(`${GOOD_HTML}<input name="a"><input name="b">`);
    expect(result.issues.filter(issue => issue.includes("label"))).toHaveLength(1);
  });

  test("L3 honors a font stack when any alternative is present", () => {
    const contract: DesignContract = {
      typography_required: { display: "Söhne | SF Pro" },
      color_required: { accent: "#533afd" },
      must_include: [],
      must_avoid: [],
    };
    const result = checkComposition(GOOD_HTML, contract);
    expect(result.pass).toBe(true);
    expect(result.honored).toContain("typography.display: Söhne | SF Pro");
  });

  test("L3 leaves a prose colour unjudged but fails a missing hex (donor asymmetry preserved)", () => {
    const prose = checkComposition(GOOD_HTML, {
      typography_required: {}, color_required: { body: "warm neutral ramp" }, must_include: [], must_avoid: [],
    });
    expect(prose.violated).toEqual([]);
    expect(prose.honored).toEqual([]);

    const hex = checkComposition(GOOD_HTML, {
      typography_required: {}, color_required: { body: "#ff0000" }, must_include: [], must_avoid: [],
    });
    expect(hex.violated).toEqual(['color.body: expected "#ff0000", not found']);
  });

  test("must_avoid is violated by a signature that IS present", () => {
    const html = `${GOOD_HTML}<div role="alert" class="toast">saved</div>`;
    const result = checkComposition(html, {
      typography_required: {}, color_required: {}, must_include: [], must_avoid: ["@community/pattern-toast-stack"],
    });
    expect(result.pass).toBe(false);
    expect(result.violated[0]).toContain("must_avoid: @community/pattern-toast-stack");
  });

  test("an atom with a signature table entry and no match is violated, an unknown atom is unverifiable", () => {
    expect(checkAtomSignature("@community/pattern-data-table", GOOD_HTML)).toBe("violated");
    expect(checkAtomSignature("@community/pattern-pricing-tiers", GOOD_HTML)).toBe("honored");
    expect(checkAtomSignature("@community/rule-xyz", GOOD_HTML)).toBe("unverifiable");
  });

  test("with no judge, L2 is skipped and passing, exactly as the donor did with no API key", async () => {
    const report = await validateHtml({ html: GOOD_HTML, intent: classifyDesignBriefHeuristically("pricing page") });
    expect(report.l2).toEqual({ pass: true, alignment_score: 1.0, issues: [], skipped: true });
    expect(report.pass).toBe(true);
    expect(report.feedback).toBe("OK");
  });

  test("a judge below the threshold fails the report and the feedback quotes the score", async () => {
    const report = await validateHtml({
      html: GOOD_HTML,
      intent: classifyDesignBriefHeuristically("pricing page"),
      model: { async judge() { return '{"alignment_score": 0.42, "issues": ["too loud"]}'; } },
    });
    expect(report.l2.pass).toBe(false);
    expect(report.l2.alignment_score).toBe(0.42);
    expect(report.pass).toBe(false);
    expect(report.feedback).toContain(`0.42 / ${AESTHETIC_PASS_SCORE.toFixed(2)} required`);
    expect(report.feedback).toContain("- too loud");
  });

  test("a judge that returns non-JSON is skipped rather than failed (avoids a retry loop)", async () => {
    const report = await validateHtml({
      html: GOOD_HTML,
      intent: classifyDesignBriefHeuristically("pricing page"),
      model: { async judge() { return "looks fine to me"; } },
    });
    expect(report.l2.skipped).toBe(true);
    expect(report.l2.pass).toBe(true);
  });

  test("the retry prompt names only the failing layers", () => {
    const prompt = buildRetryPrompt({
      pass: false,
      l1: { pass: false, issues: ["missing h1"] },
      l2: { pass: true, alignment_score: 1, issues: [] },
      l3: { pass: false, honored: [], violated: ["must_include: x"] },
    });
    expect(prompt).toContain("## Structure / a11y issues:");
    expect(prompt).not.toContain("## Aesthetic alignment");
    expect(prompt).toContain("## Composition contract violations:");
  });
});

// ── design-resolver ─────────────────────────────────────────────────────────

describe("design-resolver", () => {
  const INTENT = classifyDesignBriefHeuristically("B2B SaaS pricing page, trust-first, dense");

  test("the persona is read out of UnitIR.fields — no path building, no parser", () => {
    const resolved = resolveDesign({ intent: INTENT, ...corpus() });
    expect(resolved.source_persona).toBe("@impeccable/persona-stripe-fintech");
    // composition.typography-required overrides implies.font.display; the
    // weight-signature is coerced to a number, and line-height is a named field
    // rather than an `extra` key.
    expect(resolved.typography.display).toBe("Söhne | SF Pro");
    expect(resolved.typography.body).toBe("Inter");
    expect(resolved.typography.weight_signature).toBe(560);
    expect(resolved.typography.line_height).toBe("1.5");
    expect(resolved.typography.extra).toBeUndefined();
  });

  test("the accent comes from the palette's brand CTA, and color-required overrides it", () => {
    expect(extractAccentFromPalette("purple #533afd brand CTA, blue-tinted neutrals")).toBe("#533afd");
    const resolved = resolveDesign({ intent: INTENT, ...corpus() });
    expect(resolved.color.accent).toBe("#533afd");
    expect(resolved.color.shadow_style).toBe("blue-tinted multi-layer");
    expect(resolved.color.temperature).toBe("cool-neutral");
  });

  test("prose becomes typed values", () => {
    const resolved = resolveDesign({ intent: INTENT, ...corpus() });
    expect(resolved.density).toEqual({
      description: "compact — 4–8px radius only, 8px base spacing, 40-44px row height, 1080px max-width",
      radius: "4–8px",
      max_width: "1080px",
      row_height: "40-44px",
      gap: "8px",
    });
    expect(resolved.motion.duration_ms).toBe(200);
    expect(resolved.motion.ease).toBe("ease-out");
    expect(resolved.layout.grid).toBe("12-col grid");
    expect(resolved.layout.max_width).toBe("1080px");
  });

  test("the contract partitions must_include by id marker", () => {
    const resolved = resolveDesign({ intent: INTENT, ...corpus() });
    expect(resolved.must_include_patterns).toEqual(["@community/pattern-pricing-tiers"]);
    expect(resolved.must_include_templates).toEqual(["@impeccable/template-trust-badges"]);
    expect(resolved.must_avoid_atoms).toEqual(["@community/pattern-toast-stack"]);
  });

  test("the persona contract has exactly one reader", () => {
    expect(readPersonaContract(PERSONA)).toEqual({
      typography_required: { display: "Söhne | SF Pro", "line-height": "1.5", "weight-signature": "560" },
      color_required: { accent: "#533afd", "shadow-style": "blue-tinted multi-layer" },
      must_include: ["@community/pattern-pricing-tiers", "@impeccable/template-trust-badges"],
      must_avoid: ["@community/pattern-toast-stack"],
    });
  });

  test("resolution is deterministic: two runs are byte-identical", () => {
    const first = resolveDesign({ intent: INTENT, ...corpus() });
    const second = resolveDesign({ intent: INTENT, ...corpus() });
    expect(JSON.stringify(first)).toBe(JSON.stringify(second));
  });

  test("a forbidden persona is excluded and the next one wins", () => {
    const resolved = resolveDesign({
      intent: INTENT,
      ...corpus(),
      scope: { forbiddenUnitIds: ["@impeccable/persona-stripe-fintech"] },
    });
    expect(resolved.source_persona).toBe("@impeccable/persona-brutalist");
    // The fallback persona declares no composition block, so the base values show
    // through rather than being invented.
    expect(resolved.typography.display).toBe("system-ui");
    expect(resolved.color.accent).toBe("currentColor");
  });

  test("an empty register axis throws instead of substituting a hard-coded persona id", () => {
    const base = corpus();
    const personaless = { ...base, graph: { ...base.graph, units: base.graph.units.filter(u => u.typeRef !== "persona") } };
    expect(() => resolveDesign({ intent: INTENT, ...personaless })).toThrow(DesignResolverError);
  });

  test("rules_to_honor is empty rather than invented", () => {
    expect(resolveDesign({ intent: INTENT, ...corpus() }).rules_to_honor).toEqual([]);
  });

  test("the prose parsers keep the donor's shapes", () => {
    expect(parseDensity("")).toEqual({});
    expect(parseMotion("300-400ms cubic-bezier(.2,0,0,1), 50ms stagger, springy spring 0.8").ease).toBe("cubic-bezier(.2,0,0,1)");
    expect(parseMotion("300-400ms ease, 50ms stagger").stagger_ms).toBe(50);
    // The donor's grid regex requires a hyphen in the qualifier
    // (`/(\d+-col\s+grid|[a-z]+-\w+\s+grid)/i`, resolver.ts:481), so a bare
    // "conservative grid" yields no grid at all. Preserved rather than widened:
    // loosening it here would change what CSS the tool emits.
    expect(parseLayout("centered 1280px, conservative grid")).toEqual({
      description: "centered 1280px, conservative grid",
      max_width: "1280px",
    });
    expect(parseLayout("centered 1280px, 12-col grid").grid).toBe("12-col grid");
    expect(extractAccentFromPalette("")).toBe("currentColor");
    expect(extractAccentFromPalette("OKLCH neutral ramp plus cyan oklch(85% 0.18 200)")).toBe("oklch(85% 0.18 200)");
    expect(extractAccentFromPalette("#ffffff canvas with #1c1e54 sections")).toBe("#1c1e54");
    expect(mergeTypography({ display: "a", body: "b" }, { "letter-spacing": "-0.01em" }).extra).toEqual({ "letter-spacing": "-0.01em" });
    expect(mergeColor({ background: "#fff", accent: "x" }, { system: "oklch" }).extra).toEqual({ system: "oklch" });
  });
});

// ── mcp projection ──────────────────────────────────────────────────────────

describe("mcp tools are a projection of the Model Package", () => {
  test("every tool name is DERIVED by codegen, not written here", () => {
    // Was: three names, from when the domain exposed only plan/resolve/validate.
    // Round 13 added replacements for the legacy query scopes that had no
    // production counterpart, so the projection is now seven. The assertion is
    // kept as a full set rather than a count so that a name appearing WITHOUT a
    // declaration in design-actions.yaml still fails — that is the property
    // under test: these names are a projection of the Model Package, and this
    // file must not be where a tool gets invented.
    const document = emitDesignToolDocument();
    expect(document.model.name).toBe("aoe-design");
    expect(document.tools.map(tool => tool.name).sort()).toEqual([
      "aoe_design_checklist",
      "aoe_design_mandate",
      "aoe_design_plan",
      "aoe_design_related",
      "aoe_design_resolve",
      "aoe_design_scout",
      "aoe_design_validate",
    ]);
    expect(document.generator).toBe("aoe-design/mcp@0.2.0");
    expect(document.model.digest).toMatch(/^sha256:[0-9a-f]{64}$/);
  });

  test("input schemas are key-for-key the frozen v1 tool schemas", () => {
    const document = emitDesignToolDocument();
    const byName = new Map(document.tools.map(tool => [tool.name, tool] as const));
    expect(byName.get("aoe_design_plan")!.inputSchema.required).toEqual(["brief"]);
    expect(byName.get("aoe_design_resolve")!.inputSchema.required).toEqual(["brief"]);
    expect(byName.get("aoe_design_validate")!.inputSchema.required).toEqual(["html_path", "brief"]);
    // A model-schema action rejects an undeclared input key, so the emitted schema
    // must be closed too (emit-mcp.ts:107-109).
    expect(byName.get("aoe_design_plan")!.inputSchema.additionalProperties).toBe(false);
  });

  test("annotations are read from the model's declared traits", () => {
    for (const tool of emitDesignToolDocument().tools) {
      expect(tool.annotations.readOnlyHint).toBe(true);
      expect(tool.annotations.destructiveHint).toBe(false);
      expect(tool.annotations.idempotentHint).toBe(true);
      expect(tool.annotations.approval).toBe("never");
    }
  });

  test("output schemas $ref the declared types", () => {
    const byName = new Map(emitDesignToolDocument().tools.map(tool => [tool.name, tool] as const));
    expect(byName.get("aoe_design_plan")!.outputSchema).toEqual({ $ref: "#/$defs/DesignIntent" });
    expect(byName.get("aoe_design_resolve")!.outputSchema).toEqual({ $ref: "#/$defs/ResolvedDesign" });
    expect(byName.get("aoe_design_validate")!.outputSchema).toEqual({ $ref: "#/$defs/ValidationReport" });
  });

  test("a model whose actions do not match the handlers fails at construction", () => {
    expect(() => createDesignToolset({ modelRoot: NON_ACTION_MODEL_ROOT })).toThrow(DesignToolsetError);
  });

  test("aoe_design_plan really runs and returns the intent payload", async () => {
    const toolset = createDesignToolset();
    const output = await toolset.invoke("aoe_design_plan", { brief: "邮件订阅, 简单就行" });
    expect(output).toEqual(classifyDesignBriefHeuristically("邮件订阅, 简单就行"));
  });

  test("aoe_design_resolve really runs against a bound corpus", async () => {
    const toolset = createDesignToolset({ corpus: corpus() });
    const output = (await toolset.invoke("aoe_design_resolve", { brief: "B2B SaaS pricing page" })) as {
      source_persona: string;
      typography: { display: string };
    };
    expect(output.source_persona).toBe("@impeccable/persona-stripe-fintech");
    expect(output.typography.display).toBe("Söhne | SF Pro");
  });

  test("aoe_design_validate really runs and reads the file through the injected reader", async () => {
    const toolset = createDesignToolset({ corpus: corpus(), readFile: () => GOOD_HTML });
    const report = (await toolset.invoke("aoe_design_validate", {
      html_path: "/tmp/index.html",
      brief: "B2B SaaS pricing page",
    })) as { pass: boolean; l3: { honored: readonly string[]; violated: readonly string[]; unverifiable?: readonly string[] } };
    // The pricing pattern is honored, the trust-badge template is unverifiable and
    // the avoided toast is absent.
    expect(report.l3.honored).toContain("must_include: @community/pattern-pricing-tiers");
    expect(report.l3.honored).toContain("must_avoid: @community/pattern-toast-stack");
    expect(report.l3.unverifiable).toEqual(["must_include: @impeccable/template-trust-badges"]);
    // MEASURED donor behaviour, preserved on purpose: L3 checks EVERY
    // `typography_required` key as if it were a font stack
    // (`l3-composition.ts:135-144`), so `weight-signature: 560` and
    // `line-height: 1.5` are reported as missing fonts. This is a real defect in
    // the donor's check, and fixing it inside a migration lane would change what
    // `aoe_design_validate` reports relative to the frozen `aoe_validate`.
    expect(report.l3.violated).toEqual([
      'typography.line-height: expected "1.5", not found in HTML',
      'typography.weight-signature: expected "560", not found in HTML',
    ]);
    expect(report.pass).toBe(false);
  });

  test("a corpus-backed tool refuses rather than returning an empty design when unbound", async () => {
    const toolset = createDesignToolset();
    const error = await toolset.invoke("aoe_design_resolve", { brief: "x" }).then(
      () => undefined,
      (caught: unknown) => caught,
    );
    expect(error).toBeInstanceOf(DesignToolsetError);
    expect((error as DesignToolsetError).code).toBe("CORPUS_NOT_BOUND");
  });

  test("an unknown tool and a missing argument both refuse", async () => {
    const toolset = createDesignToolset();
    await expect(toolset.invoke("aoe_intent", { brief: "x" })).rejects.toThrow("No tool 'aoe_intent'");
    await expect(toolset.invoke("aoe_design_plan", {})).rejects.toThrow("requires a non-empty string 'brief'");
  });
});
