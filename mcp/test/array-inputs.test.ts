/**
 * `severity` and `sources` as real arrays (L14-D).
 *
 * They were comma-separated strings only because `model-schema`'s `Field.typeRef`
 * had no array form, so the emitted JSON Schema said `string` while the handler
 * split on commas — a delimiter no schema described. `typeRef: string[]` now emits
 * `{"type":"array","items":{"type":"string"}}` and the handler reads an array.
 *
 * The assertion that matters is the refusal: a client still sending `"block,critical"`
 * must be told, not silently given the default selection and a success.
 */

import { describe, expect, test } from "bun:test";
import { createDesignToolset, emitDesignToolDocument } from "../src/index.ts";
import { createScoutSourceAdapter, resolveDataRoot } from "../../adapters/scout-catalog/src/index.ts";

const document = emitDesignToolDocument();

function schemaOf(tool: string, input: string): Record<string, unknown> {
  const found = document.tools.find(t => t.name === tool);
  if (found === undefined) throw new Error(`no tool ${tool}`);
  const properties = (found.inputSchema as { properties: Record<string, Record<string, unknown>> }).properties;
  const property = properties[input];
  if (property === undefined) throw new Error(`no input ${input} on ${tool}`);
  return property;
}

describe("the list-valued inputs are declared as arrays", () => {
  test("mandate.severity is an array of strings, not a string", () => {
    const schema = schemaOf("aoe_design_mandate", "severity");
    expect(schema.type).toBe("array");
    expect(schema.items).toEqual({ type: "string" });
  });

  test("scout.sources is an array of strings", () => {
    const schema = schemaOf("aoe_design_scout", "sources");
    expect(schema.type).toBe("array");
    expect(schema.items).toEqual({ type: "string" });
  });

  /**
   * No enum on either. `severity`'s vocabulary is unnormalised in the corpus and
   * L14-E owns declaring it; `sources`' 18 ids are catalogue data. An enum here
   * would be a second authority that goes stale, which is worse than an open
   * `string[]`.
   */
  test("neither declares a value set, and the model says why", () => {
    expect(schemaOf("aoe_design_mandate", "severity").enum).toBeUndefined();
    expect(schemaOf("aoe_design_scout", "sources").enum).toBeUndefined();
  });

  test("the enums that ARE declared are the runtime-enforced ones", () => {
    const intent = document.$defs.DesignIntent as { properties: Record<string, Record<string, unknown>> };
    expect(intent.properties.motion_priority!.enum).toEqual(["low", "med", "high"]);
    expect(intent.properties.density!.enum).toEqual(["tight", "comfy", "loose"]);
    // `task_type` is NOT enumerated: repairIntent accepts any string an LLM returns,
    // so an enum would be a promise the runtime does not keep.
    expect(intent.properties.task_type!.enum).toBeUndefined();
    expect(intent.properties.task_type!.type).toBe("string");
  });

  test("a list-valued output field is an array too, so `unknown` no longer stands in for one", () => {
    const scout = document.$defs.ScoutReferences as { properties: Record<string, Record<string, unknown>> };
    expect(scout.properties.items).toMatchObject({ type: "array", items: {} });
    const mandates = document.$defs.MandateSet as { properties: Record<string, Record<string, unknown>> };
    expect(mandates.properties.severities).toMatchObject({ type: "array", items: { type: "string" } });
  });
});

describe("the handler reads an array and refuses the old delimiter", () => {
  const bound = () => createDesignToolset({ scout: createScoutSourceAdapter({ dataRoot: resolveDataRoot(undefined) }) });

  test("scout accepts a real array", async () => {
    // No payload root here, so the answer is zero hits plus a diagnostic; what is
    // under test is that the array argument was ACCEPTED rather than rejected.
    const result = (await bound().invoke("aoe_design_scout", { query: "hero", sources: ["godly"] })) as {
      diagnostics: readonly { code: string }[];
    };
    expect(result.diagnostics.map(d => d.code)).toContain("SCOUT_DATA_ROOT_ABSENT");
  });

  test("a comma-separated string is refused rather than split", async () => {
    await expect(bound().invoke("aoe_design_scout", { query: "hero", sources: "godly,awwwards" }))
      .rejects.toThrow(/TOOL_INPUT_INVALID|array of strings/);
  });

  test("an array holding a non-string is refused", async () => {
    await expect(bound().invoke("aoe_design_scout", { query: "hero", sources: ["godly", 7] }))
      .rejects.toThrow(/TOOL_INPUT_INVALID|array of strings/);
  });

  test("mandate refuses the old delimiter once a corpus is bound", async () => {
    // The corpus check runs BEFORE the argument reader in this handler, so an
    // unbound toolset throws `CORPUS_NOT_BOUND` and would prove nothing about the
    // reader. Bound to an empty graph, the reader is what answers.
    const empty = createDesignToolset({
      corpus: {
        graph: { units: [], edges: [] } as never,
        profile: {} as never,
        projections: {},
        readProjection: () => undefined,
      },
    });
    await expect(empty.invoke("aoe_design_mandate", { severity: "block,critical" }))
      .rejects.toThrow(/TOOL_INPUT_INVALID|array of strings/);
    // …and the same call with an array gets past the reader.
    await expect(empty.invoke("aoe_design_mandate", { severity: ["block"] })).resolves.toBeDefined();
  });
});
