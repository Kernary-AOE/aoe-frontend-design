# scout-catalog — external design references as a SourceAdapter

18 third-party catalogues, **61590** normalised references (12.45 MiB of JSON),
searchable with a feature breakdown. **Zero corpus units are added.**

This is the frontend-design domain's re-implementation of the capability the old
server exposed as `aoe_query scope=scout` and as the `## References` block in
`prime_compile`. The new kernel's `aoe_query` has no `scout` scope
(`mcp-server-core/src/index.ts:94` — the enum is `["atoms","related","show"]`) and
`compiled-v3-final/` contains 0 scout units, so the capability was lost at the
cutover, not deprecated.

---

## Why `SourceAdapter` and not `CandidateGenerator`

The full argument, with the line references, is the header of `src/types.ts`. The
short version:

| | `CandidateGenerator` (§9.3) | `SourceAdapter` (§4.4) |
|---|---|---|
| identity of a result | `SelectionCandidateIR.unitId` — **must be a graph unit** | free; a reference is not a unit |
| can carry a thumbnail URL | **no** — the type has `unitId`/`score`/`featureValues`/`reasons` and no payload slot | yes |
| downstream | expansion → budget → `projectionLoads`, all resolving `unitId` | none; the result is the answer |
| scale implication | 61590 entries would have to be units; §9.3 targets 900–10,000 | entries stay outside the graph |

Using `CandidateGenerator` therefore *requires* the thing this work is explicitly
not allowed to do, and even then returns a unit id where the product needs a link.
So the adapter implements a source-adapter contract instead — declared in
`src/types.ts` because **the kernel has no `SourceAdapter` SPI to implement**
(see FINDINGS in the lane report; this is a kernel gap, not a design choice).

What it *does* keep from §9.3 is the explainability discipline: every hit carries
`features` (five named axes) and `selectedBecause`, and scores go through the
kernel's own `quantize` so two runs serialise identically.

---

## The payload is not in git. What that means here.

`git ls-files resources/ | wc -l` → **0**. All 18 payloads are gitignored, while
all 18 legacy catalogue atoms are tracked. So there were three options:

1. **Commit the 12.45 MiB.** Rejected. Fifteen of the eighteen licences are some
   form of `metadata-only (screenshots remain copyright of original site owners)`
   — redistributing 61590 third-party records inside a git history is a licensing
   decision this adapter is not entitled to make, and the licence text is the
   argument against it.
2. **Ingest into the corpus package as units/assets.** Rejected for the same
   licensing reason, plus the unit-scale reason above.
3. **Declare in git, acquire the payload. ← chosen.**

Concretely:

- `sources.yaml` is tracked and is the whole declaration face: per source, the
  provenance (`sourceUrl`, `legacyAtomId`), the **licence verbatim**, the field
  mapping, and the measurement (`bytes`, `sha256`, `declaredEntryCount`,
  `loadableEntryCount`). 18 sources, ~390 lines. §4.3 asks a corpus package to
  declare "数据来源与许可证"; for scout this file is that承载物.
- The payload is **optional at load time**. No data root → one
  `SCOUT_DATA_ROOT_ABSENT` warning, zero references, and `describeSources()` still
  answers in full. A missing single payload → one `SCOUT_SOURCE_PAYLOAD_MISSING`
  per source. Nothing throws, and nothing is written to `console.error` (the
  legacy loader printed five distinct failures to stderr and returned normally,
  which is why a source silently vanishing was undetectable).
- Drift is detectable, not silent: `SCOUT_ENTRY_COUNT_DRIFT` when a payload stops
  yielding the recorded count, and `SCOUT_SOURCE_DIGEST_MISMATCH` under
  `verifyDigest: true` (off by default — it costs a second full read).

### Acquiring the payload

`payload.path` is **relative to a caller-supplied data root**, so the same
manifest works two ways without being rewritten:

| deployment | data root | note |
|---|---|---|
| in repo, as today | the repository root | payloads stay where `scripts/build-local-catalogs.ts` writes them |
| staged bundle / sandboxed plugin | `<adapter root>/data` | required for out-of-process use: `plugin-host`'s `resolveInRoot` contains every declared read root **inside the plugin's own root**, so a sandboxed adapter cannot reach the repository-root `resources/` tree |

`data/` is tracked (via its own `.gitignore`) and empty, because
`plugin-host.loadManifest` refuses a manifest whose declared read root does not
exist.

The adapter never fetches. `prime-plugin.yaml` declares exactly one capability,
`filesystem:read`, and an empty `networkAllowlist`: acquisition is an operator
step, and an adapter that could download at query time would need a network grant
covering every query it ever serves.

---

## Registration

In-process (what the domain MCP host uses):

```ts
import { registerScoutSourceAdapter, resolveDataRoot } from "@prime-domain/frontend-design/scout-catalog";

const { adapter, diagnostics } = await registerScoutSourceAdapter({
  dataRoot: resolveDataRoot(process.env.SCOUT_DATA_ROOT),
});
const hits = adapter.search({ text: "3D scroll animation", sourceIds: ["godly"], limit: 8 });
```

Out-of-process: `prime-plugin.yaml` is a §12.1 manifest, verified admissible by
the real loader:

```
cd projects/aoe-engine && bun -e '
  import { loadManifest } from "./packages/plugin-host/src/manifest.ts";
  const r = loadManifest("/Users/houxianchao/Desktop/prime/projects/aoe-frontend-design/adapters/scout-catalog");
  console.log(r.ok ? "OK" : r.diagnostics);'
```

`provides: [source-adapter:scout-catalog, renderer:scout-references]` — two roles
because scout had two consumers, and the `## References` renderer must not be
re-implemented inside whichever tool calls it.

---

## Acceptance criteria — "scout capability restored"

Every row is an executed test in `test/scout-catalog.test.ts`. The last group runs
against the real payload and is **skipped, not passed**, when it is absent
(`describe.skipIf`).

| given | expected |
|---|---|
| the 18 payloads under the repo root | 61590 references, 18 sources, no `error`-severity diagnostic, no count drift; `footer-design` = 646, `lapaninja` = 16525 |
| `verifyDigest: true` | no `SCOUT_SOURCE_DIGEST_MISMATCH` |
| `search({ text: "scroll animation", limit: 10 })` | 10 items, every one with a non-empty `url` and `score > 0` |
| `search({ text: "3D scroll animation", sourceIds: ["godly"], limit: 8 })` | ≥1 item, **all** from `godly`, no diagnostics |
| `renderReferencesFor("linear kanban board dark cards minimal column headers", 4)` | a `## References` block whose every line carries a thumbnail |
| a query matching nothing | `count: 0`, no throw |
| no data root | 0 references, exactly one `SCOUT_DATA_ROOT_ABSENT` warning, `describeSources()` still 18, `declaredReferenceCount` still 61590 |
| `search()` before `load()` | `SCOUT_NOT_LOADED` error diagnostic, not a throw |
| the same query twice on two adapters | byte-identical JSON |
| a query whose tokens are all shorter than `minTokenLength` | `SCOUT_QUERY_NO_TOKENS`, not an empty success |

Run: `cd projects/aoe-frontend-design && bun test`.

---

## Deliberate differences from the legacy loader

Everything in `mcp-server/data.ts:443-533` is reproduced field-for-field — both
flatten shapes, the `catalog.fields` mapping, the array join, the
`description ?? excerpt` fallback, the `if (!title && !url) continue` discard.
Three things changed, each because the original lost information:

1. **Ids are content digests.** Legacy `id` was `` `${slug}:${loadIndex}` ``, so
   regenerating a payload renumbered every reference and no id survived a reload.
   Now `<sourceId>#<16 hex of sha256(url \0 title)>`, with a `~n` suffix for real
   duplicates.
2. **Failures are diagnostics.** Five legacy failure modes went to `console.error`
   and returned normally.
3. **`raw` is dropped.** Legacy kept the entire foreign record on all 61590
   entries — most of the resident 12.45 MiB, re-serialised into every response.

And one contract gap is closed rather than preserved: the catalogue atoms document
`prime_scout(query, source, n)` throughout their prose, but
`aoe_query scope=scout` never accepted a source parameter. `sourceIds` does.
