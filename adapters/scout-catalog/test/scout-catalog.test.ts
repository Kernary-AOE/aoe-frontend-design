/**
 * Tests for the scout catalogue source adapter.
 *
 * Three tiers, deliberately separated:
 *
 * 1. **Fixture tier** — two tiny payloads under `test/fixtures/`, committed, that
 *    exercise every normalisation branch. These must pass on any checkout.
 * 2. **Manifest tier** — the real `sources.yaml` parsed and cross-checked against
 *    the numbers measured in `docs/analysis/corpus-ownership/02-scout-catalog.md`.
 *    Passes on any checkout too, because the manifest is git-tracked even though
 *    the payloads are not.
 * 3. **Live-payload tier** — the acceptance criteria for "scout capability
 *    restored", run against the real 12.45 MiB. `describe.skipIf` marks it SKIPPED
 *    when the payloads are absent; it is never silently turned into a pass.
 */

import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

import {
  ADAPTER_ROOT,
  MANIFEST_PATH,
  SCOUT_ADAPTER_NAME,
  SCOUT_DATA_ROOT_ABSENT,
  SCOUT_ENTRY_COUNT_DRIFT,
  SCOUT_ENTRY_DISCARDED,
  SCOUT_ENTRY_ID_COLLISION,
  SCOUT_FEATURE_AXES,
  SCOUT_NOT_LOADED,
  SCOUT_QUERY_NO_TOKENS,
  SCOUT_SOURCE_PAYLOAD_MISSING,
  SCOUT_SOURCE_UNKNOWN,
  ScoutManifestError,
  SourceAdapterRegistry,
  createScoutSourceAdapter,
  loadScoutManifest,
  loadScoutReferences,
  parseScoutManifest,
  registerScoutSourceAdapter,
  renderReferences,
  resolveDataRoot,
  type ScoutManifest,
} from "../src/index.ts";

const FIXTURE_ROOT = join(ADAPTER_ROOT, "test", "fixtures");
const FIXTURE_MANIFEST_PATH = join(FIXTURE_ROOT, "sources.yaml");
/** Repo root: scout-catalog -> adapters -> prime-frontend-design -> domains -> repo. */
const REPO_ROOT = join(ADAPTER_ROOT, "..", "..", "..", "..");

const fixtureManifest = (): ScoutManifest => loadScoutManifest(FIXTURE_MANIFEST_PATH);

function fixtureAdapter(): ReturnType<typeof createScoutSourceAdapter> {
  return createScoutSourceAdapter({
    manifest: fixtureManifest(),
    dataRoot: resolveDataRoot(FIXTURE_ROOT),
  });
}

// ---------------------------------------------------------------------------
// Manifest tier
// ---------------------------------------------------------------------------

describe("sources.yaml", () => {
  const manifest = loadScoutManifest();

  test("declares the 18 legacy scout-catalog sources", () => {
    expect(manifest.sources).toHaveLength(18);
    expect(manifest.adapter).toBe(SCOUT_ADAPTER_NAME);
    // Every descriptor must trace back to the atom it was extracted from, so the
    // provenance of a manifest entry is checkable rather than asserted.
    for (const source of manifest.sources) {
      expect(source.legacyAtomId).toBe(`@community/scout-catalog-${source.id}`);
    }
  });

  test("reproduces the measured 61590 loadable / 61707 declared split", () => {
    const declared = manifest.sources.reduce((n, s) => n + s.payload.declaredEntryCount, 0);
    const loadable = manifest.sources.reduce((n, s) => n + s.payload.loadableEntryCount, 0);
    expect(declared).toBe(61707);
    expect(loadable).toBe(61590);
    // The entire 117-entry gap is one source. If a second source ever diverges,
    // this assertion is what says so instead of the totals quietly still summing.
    const diverging = manifest.sources.filter(
      s => s.payload.declaredEntryCount !== s.payload.loadableEntryCount,
    );
    expect(diverging.map(s => s.id)).toEqual(["footer-design"]);
    expect(diverging[0]!.payload.declaredEntryCount).toBe(763);
    expect(diverging[0]!.payload.loadableEntryCount).toBe(646);
  });

  test("carries the licence of every source, which the compiled units dropped", () => {
    // §4.3 requires a corpus package to declare data provenance and licence. The
    // 899 compiled `atom.yaml` files carry zero licences; this manifest carries 18.
    for (const source of manifest.sources) {
      expect(source.license.length).toBeGreaterThan(0);
      expect(source.sourceUrl.length).toBeGreaterThan(0);
    }
    // The five names the legacy scorer hardcoded, now data.
    expect(manifest.sources.filter(s => s.curated).map(s => s.sourceName).sort()).toEqual([
      "Collect UI",
      "Godly",
      "HTMLrev",
      "Lapa Ninja",
      "One Page Love",
    ]);
  });

  test("declares payload sizes and digests totalling the measured 12.45 MiB", () => {
    const bytes = manifest.sources.reduce((n, s) => n + s.payload.bytes, 0);
    expect(bytes).toBe(13051079);
    for (const source of manifest.sources) {
      expect(source.payload.sha256).toMatch(/^[0-9a-f]{64}$/);
      // Payload paths stay relative so they resolve against either the legacy
      // repository root or a staged bundle root without being rewritten.
      expect(source.payload.path.startsWith("/")).toBe(false);
    }
  });

  test("weights exactly the feature axes the search stage produces", () => {
    expect(Object.keys(manifest.retrieval.weights).sort()).toEqual([...SCOUT_FEATURE_AXES]);
  });
});

describe("manifest validation", () => {
  const base = readFileSync(FIXTURE_MANIFEST_PATH, "utf8");

  function expectRejection(source: string, code: string): void {
    let thrown: unknown;
    try {
      parseScoutManifest(source);
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeInstanceOf(ScoutManifestError);
    expect((thrown as ScoutManifestError).code).toBe(code);
  }

  test("refuses an unsupported protocol", () => {
    expectRejection(base.replace("prime/scout-catalog/v1", "prime/scout-catalog/v2"), "MANIFEST_PROTOCOL_UNSUPPORTED");
  });

  test("refuses weights that disagree with the produced axes", () => {
    expectRejection(base.replace("titleMatch: 0.45", "titleMatchh: 0.45"), "MANIFEST_AXES_DISAGREE");
  });

  test("refuses a payload path that escapes the data root", () => {
    expectRejection(base.replace('path: "payloads/alpha.json"', 'path: "../../../etc/passwd"'), "MANIFEST_PATH_ESCAPES_ROOT");
  });

  test("refuses a loadable count above the declared count", () => {
    expectRejection(base.replace("loadableEntryCount: 2", "loadableEntryCount: 9"), "MANIFEST_COUNT_INCOHERENT");
  });

  test("refuses a source that maps neither title nor url", () => {
    const broken = base.replace('      title: "title"\n      url: "url"', "      title: null\n      url: null");
    expectRejection(broken, "MANIFEST_SOURCE_UNRETRIEVABLE");
  });

  test("refuses a duplicate source id", () => {
    expectRejection(base.replace("  - id: beta", "  - id: alpha"), "MANIFEST_SOURCE_DUPLICATE");
  });
});

// ---------------------------------------------------------------------------
// Loader tier
// ---------------------------------------------------------------------------

describe("loader with an absent payload root", () => {
  const result = loadScoutReferences({
    manifest: loadScoutManifest(),
    dataRoot: resolveDataRoot(undefined),
  });

  test("degrades to zero references with one warning, and does not throw", () => {
    expect(result.references).toHaveLength(0);
    const codes = result.diagnostics.map(d => d.code);
    // One diagnostic for the whole absent payload set, not eighteen.
    expect(codes).toEqual([SCOUT_DATA_ROOT_ABSENT]);
    expect(result.diagnostics[0]!.severity).toBe("warning");
    expect(Object.keys(result.countsBySource)).toHaveLength(18);
    expect(Object.values(result.countsBySource).every(n => n === 0)).toBe(true);
  });

  test("provenance and licences survive an absent payload", () => {
    // This is the property that makes "declare in git, acquire the payload" work:
    // an operator can audit what the adapter would read before acquiring anything.
    const adapter = createScoutSourceAdapter({ dataRoot: resolveDataRoot(undefined) });
    expect(adapter.describeSources()).toHaveLength(18);
    expect(adapter.declaredReferenceCount).toBe(61590);
    expect(adapter.referenceCount).toBe(0);
  });

  test("a configured-but-missing root is reported differently from an unconfigured one", () => {
    expect(resolveDataRoot(undefined).kind).toBe("absent");
    const missing = resolveDataRoot(join(FIXTURE_ROOT, "no-such-directory"));
    expect(missing.kind).toBe("absent");
    expect(missing.kind === "absent" && missing.reason).toContain("does not exist");
    expect(resolveDataRoot(FIXTURE_ROOT).kind).toBe("directory");
  });

  test("a single missing payload is reported per source, not as a whole-set failure", () => {
    const manifest = fixtureManifest();
    const partial: ScoutManifest = { ...manifest, sources: manifest.sources.filter(s => s.id === "alpha") };
    const result = loadScoutReferences({
      manifest: {
        ...partial,
        sources: partial.sources.map(s => ({ ...s, payload: { ...s.payload, path: "payloads/gone.json" } })),
      },
      dataRoot: resolveDataRoot(FIXTURE_ROOT),
    });
    expect(result.references).toHaveLength(0);
    expect(result.diagnostics.map(d => d.code)).toEqual([SCOUT_SOURCE_PAYLOAD_MISSING]);
  });
});

describe("loader normalisation", () => {
  const result = loadScoutReferences({ manifest: fixtureManifest(), dataRoot: resolveDataRoot(FIXTURE_ROOT) });

  test("flattens both payload shapes", () => {
    // alpha is a top-level array; beta is an object whose array values are
    // concatenated and whose non-array value is skipped.
    expect(result.countsBySource).toEqual({ alpha: 2, beta: 3 });
    expect(result.references).toHaveLength(5);
  });

  test("discards records mapping neither title nor url, and says how many", () => {
    const discarded = result.diagnostics.filter(d => d.code === SCOUT_ENTRY_DISCARDED);
    expect(discarded).toHaveLength(1);
    expect(discarded[0]!.message).toContain("1 record(s)");
  });

  test("joins an array-valued field and applies the excerpt description fallback", () => {
    const footer = result.references.find(r => r.title === "Dark minimal footer study")!;
    expect(footer.category).toBe("footer, dark");
    expect(footer.thumbnail).toBe("https://alpha.example/footer-1.png");
    const hero = result.references.find(r => r.title === "Bright hero section")!;
    // `fields.description` is null, so `description ?? excerpt` applies.
    expect(hero.description).toBe("a bright editorial hero with oversized type");
    expect(hero.thumbnail).toBeUndefined();
  });

  test("ids are content digests, stable across reloads and unique under duplicates", () => {
    const again = loadScoutReferences({ manifest: fixtureManifest(), dataRoot: resolveDataRoot(FIXTURE_ROOT) });
    expect(again.references.map(r => r.id)).toEqual(result.references.map(r => r.id));
    for (const reference of result.references) {
      expect(reference.id).toMatch(new RegExp(`^${reference.sourceId}#[0-9a-f]{16}(~\\d+)?$`));
    }
    expect(new Set(result.references.map(r => r.id)).size).toBe(result.references.length);
    // beta repeats one record across two groups.
    expect(result.references.filter(r => r.id.includes("~")).map(r => r.title)).toEqual([
      "Scroll animation gallery",
    ]);
    expect(result.diagnostics.some(d => d.code === SCOUT_ENTRY_ID_COLLISION)).toBe(true);
  });

  test("a payload whose count no longer matches the manifest is reported", () => {
    const manifest = fixtureManifest();
    const drifted: ScoutManifest = {
      ...manifest,
      sources: manifest.sources.map(s =>
        s.id === "alpha" ? { ...s, payload: { ...s.payload, loadableEntryCount: 1 } } : s,
      ),
    };
    const out = loadScoutReferences({ manifest: drifted, dataRoot: resolveDataRoot(FIXTURE_ROOT) });
    const drift = out.diagnostics.filter(d => d.code === SCOUT_ENTRY_COUNT_DRIFT);
    expect(drift).toHaveLength(1);
    expect(drift[0]!.message).toContain("loaded 2 reference(s), manifest records 1");
  });
});

// ---------------------------------------------------------------------------
// Search tier
// ---------------------------------------------------------------------------

describe("search", () => {
  test("ranks by token coverage and reports every axis on every hit", async () => {
    const adapter = fixtureAdapter();
    await adapter.load();
    const result = adapter.search({ text: "dark minimal footer" });
    expect(result.count).toBeGreaterThan(0);
    expect(result.items[0]!.reference.title).toBe("Dark minimal footer study");
    for (const item of result.items) {
      expect(Object.keys(item.features).sort()).toEqual([...SCOUT_FEATURE_AXES]);
      expect(item.selectedBecause.length).toBeGreaterThan(0);
      expect(item.score).toBeGreaterThan(0);
    }
  });

  test("is deterministic: same query, same bytes", async () => {
    const a = fixtureAdapter();
    const b = fixtureAdapter();
    await a.load();
    await b.load();
    const one = JSON.stringify(a.search({ text: "scroll animation" }));
    const two = JSON.stringify(b.search({ text: "scroll animation" }));
    expect(one).toBe(two);
  });

  test("filters by source id, which the legacy scope=scout could not do", async () => {
    const adapter = fixtureAdapter();
    await adapter.load();
    const only = adapter.search({ text: "scroll animation", sourceIds: ["beta"] });
    expect(only.count).toBeGreaterThan(0);
    expect(only.items.every(item => item.reference.sourceId === "beta")).toBe(true);
    expect(only.diagnostics).toHaveLength(0);
  });

  test("reports an unknown source id instead of silently returning everything", async () => {
    const adapter = fixtureAdapter();
    await adapter.load();
    const result = adapter.search({ text: "footer", sourceIds: ["gamma"] });
    expect(result.diagnostics.map(d => d.code)).toContain(SCOUT_SOURCE_UNKNOWN);
    // Every requested source was unknown, so the honest answer is nothing.
    expect(result.count).toBe(0);
  });

  test("requireThumbnail keeps only references that can be shown", async () => {
    const adapter = fixtureAdapter();
    await adapter.load();
    const result = adapter.search({ text: "footer hero", requireThumbnail: true });
    expect(result.items.every(item => item.reference.thumbnail !== undefined)).toBe(true);
    expect(result.items.map(item => item.reference.title)).toContain("Dark minimal footer study");
  });

  test("a query with no usable token is a diagnostic, not an empty success", async () => {
    const adapter = fixtureAdapter();
    await adapter.load();
    const result = adapter.search({ text: "a !" });
    expect(result.count).toBe(0);
    expect(result.diagnostics.map(d => d.code)).toEqual([SCOUT_QUERY_NO_TOKENS]);
  });

  test("limit is clamped to the manifest's maxLimit", async () => {
    const adapter = fixtureAdapter();
    await adapter.load();
    const result = adapter.search({ text: "scroll animation footer hero kanban", limit: 500 });
    // The fixture manifest sets maxLimit: 5.
    expect(result.items.length).toBeLessThanOrEqual(5);
    expect(result.count).toBeGreaterThanOrEqual(result.items.length);
  });

  test("query-independent axes alone never produce a hit", async () => {
    const adapter = fixtureAdapter();
    await adapter.load();
    // `assetPresence` and `curatedSource` are non-zero for the alpha source, so a
    // query matching no token must still return nothing rather than the curated
    // thumbnails it would otherwise score above zero.
    const result = adapter.search({ text: "zzzz qqqq" });
    expect(result.count).toBe(0);
    expect(result.diagnostics).toHaveLength(0);
  });
});

describe("renderReferences", () => {
  test("renders the legacy `## References` shape", async () => {
    const adapter = fixtureAdapter();
    await adapter.load();
    const block = adapter.renderReferencesFor("dark minimal footer", 4);
    expect(block).toContain("## References");
    expect(block).toContain("Concrete visual anchors (1 picks");
    expect(block).toContain("![ref](https://alpha.example/footer-1.png) Alpha Gallery · Dark minimal footer study");
    expect(block).toContain("— https://alpha.example/footer-1");
  });

  test("omits the section entirely when nothing qualifies", () => {
    expect(renderReferences([])).toBe("");
  });
});

// ---------------------------------------------------------------------------
// Adapter + registration tier
// ---------------------------------------------------------------------------

describe("adapter lifecycle and registration", () => {
  test("searching before load is an error diagnostic, not a throw", () => {
    const adapter = fixtureAdapter();
    expect(adapter.loaded).toBe(false);
    const result = adapter.search({ text: "footer" });
    expect(result.count).toBe(0);
    expect(result.diagnostics.map(d => d.code)).toEqual([SCOUT_NOT_LOADED]);
    expect(result.diagnostics[0]!.severity).toBe("error");
  });

  test("registerScoutSourceAdapter loads and registers under the adapter name", async () => {
    const registration = await registerScoutSourceAdapter({
      manifest: fixtureManifest(),
      dataRoot: resolveDataRoot(FIXTURE_ROOT),
    });
    expect(registration.registry.names()).toEqual([SCOUT_ADAPTER_NAME]);
    expect(registration.adapter.loaded).toBe(true);
    expect(registration.registry.get(SCOUT_ADAPTER_NAME)).toBe(registration.adapter);
  });

  test("registering the same adapter name twice is refused", () => {
    const registry = new SourceAdapterRegistry();
    registry.register(fixtureAdapter());
    expect(() => registry.register(fixtureAdapter())).toThrow(ScoutManifestError);
  });
});

describe("prime-plugin.yaml", () => {
  const manifest = parse(readFileSync(join(ADAPTER_ROOT, "prime-plugin.yaml"), "utf8")) as Record<string, unknown>;

  test("declares the §12.1 fields a host reads before loading any code", () => {
    expect(manifest["protocol"]).toBe("prime/plugin/v1");
    expect(manifest["version"]).toMatch(/^\d+\.\d+\.\d+$/);
    expect(manifest["apiVersion"]).toBe(1);
    expect(manifest["provides"]).toEqual(["source-adapter:scout-catalog", "renderer:scout-references"]);
    // One capability. A `network:*` grant would let a query-time adapter reach the
    // internet; acquisition is an operator step instead.
    expect(manifest["capabilities"]).toEqual(["filesystem:read"]);
  });

  test("entry and every declared read root exist, which is what loadManifest checks", () => {
    // `plugin-host`'s `resolveInRoot` refuses a manifest whose entry or read root
    // is absent (`PATH_NOT_FOUND`), so these two paths existing is a hard
    // precondition for the plugin being admissible at all.
    expect(existsSync(join(ADAPTER_ROOT, manifest["entry"] as string))).toBe(true);
    const sandbox = manifest["sandbox"] as { filesystem: { readRoots: string[] }; networkAllowlist: string[] };
    expect(sandbox.filesystem.readRoots).toEqual(["data"]);
    for (const root of sandbox.filesystem.readRoots) {
      expect(existsSync(join(ADAPTER_ROOT, root))).toBe(true);
    }
    expect(sandbox.networkAllowlist).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Live-payload tier — the acceptance criteria for "scout capability restored"
// ---------------------------------------------------------------------------

const LIVE_ROOT = REPO_ROOT;
const LIVE_AVAILABLE = loadScoutManifest().sources.every(source =>
  existsSync(join(LIVE_ROOT, source.payload.path)),
);

describe.skipIf(!LIVE_AVAILABLE)("acceptance: scout capability over the real payload", () => {
  const manifest = loadScoutManifest();

  test("loads 61590 references from 18 sources with no error diagnostic", async () => {
    const adapter = createScoutSourceAdapter({ manifest, dataRoot: resolveDataRoot(LIVE_ROOT) });
    const diagnostics = await adapter.load();
    expect(diagnostics.filter(d => d.severity === "error")).toEqual([]);
    expect(diagnostics.filter(d => d.code === SCOUT_ENTRY_COUNT_DRIFT)).toEqual([]);
    expect(adapter.referenceCount).toBe(61590);
    expect(Object.keys(adapter.countsBySource)).toHaveLength(18);
    expect(adapter.countsBySource["footer-design"]).toBe(646);
    expect(adapter.countsBySource["lapaninja"]).toBe(16525);
  });

  test("payload digests still match the manifest", async () => {
    const adapter = createScoutSourceAdapter({
      manifest,
      dataRoot: resolveDataRoot(LIVE_ROOT),
      verifyDigest: true,
    });
    const diagnostics = await adapter.load();
    expect(diagnostics.filter(d => d.code === "SCOUT_SOURCE_DIGEST_MISMATCH")).toEqual([]);
  });

  test("query 'scroll animation' returns usable external references", async () => {
    const adapter = createScoutSourceAdapter({ manifest, dataRoot: resolveDataRoot(LIVE_ROOT) });
    await adapter.load();
    const result = adapter.search({ text: "scroll animation", limit: 10 });
    expect(result.count).toBeGreaterThan(0);
    expect(result.items).toHaveLength(10);
    // "Usable" is the acceptance bar the legacy tool set: every hit must carry a
    // URL a human or an agent can actually open.
    expect(result.items.every(item => item.reference.url.length > 0)).toBe(true);
    expect(result.items.every(item => item.score > 0)).toBe(true);
  });

  test("query restricted to 'godly' returns only godly references", async () => {
    // Closes the documented-but-unimplemented `prime_scout(query, source, n)`
    // signature that the catalogue atoms advertise.
    const adapter = createScoutSourceAdapter({ manifest, dataRoot: resolveDataRoot(LIVE_ROOT) });
    await adapter.load();
    const result = adapter.search({ text: "3D scroll animation", sourceIds: ["godly"], limit: 8 });
    expect(result.count).toBeGreaterThan(0);
    expect(result.items.every(item => item.reference.sourceId === "godly")).toBe(true);
    expect(result.diagnostics).toHaveLength(0);
  });

  test("a `## References` block can be rendered for a design brief", async () => {
    const adapter = createScoutSourceAdapter({ manifest, dataRoot: resolveDataRoot(LIVE_ROOT) });
    await adapter.load();
    const block = adapter.renderReferencesFor("linear kanban board dark cards minimal column headers", 4);
    expect(block).toContain("## References");
    expect(block.split("\n").filter(line => line.startsWith("- ![ref](")).length).toBeGreaterThan(0);
    // Every rendered anchor carries a thumbnail, which is the whole point of the
    // block: `requireThumbnail` is applied before ranking, not after slicing.
    expect(block).not.toContain("![ref]() ");
  });

  test("a query nothing matches returns an empty result rather than throwing", async () => {
    const adapter = createScoutSourceAdapter({ manifest, dataRoot: resolveDataRoot(LIVE_ROOT) });
    await adapter.load();
    const result = adapter.search({ text: "zzqqxx7 nonexistenttokenvalue" });
    expect(result.count).toBe(0);
    expect(result.items).toEqual([]);
  });
});
