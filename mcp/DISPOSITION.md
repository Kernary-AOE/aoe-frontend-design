# Disposition of the five orphaned legacy `prime_query` scopes

Lane L13-D. Input: `docs/analysis/shadow-mcp-2026-08-29.md` §3, which lists five
legacy scopes with no production counterpart and asks for an explicit
**replaced or dropped** decision on each. Reference implementation read but not
modified: `mcp-server/index.ts` (deleted by L13-E) and `mcp-server/compiler.ts`.

| legacy scope | verdict | where it lives now |
|---|---|---|
| `scout` | **replaced** | `prime_design_scout` -> `adapters/scout-catalog` |
| `mandate` | **replaced** (re-derived) | `prime_design_mandate` -> `adapters/design-standards` |
| `checklist` | **replaced** (re-derived) | `prime_design_checklist` -> `adapters/design-standards` |
| `gallery` | **dropped**, capability absorbed by `scout` | `prime_design_scout(require_thumbnail: true)` |
| `template` | **dropped**, fetch already covered | kernel `prime_query scope=show` |
| `related` `depth` | **restored** | `prime_design_related` -> `adapters/corpus-graph` |

Every verdict below is a measurement over `compiled-v3-final/` at
父仓 `53efd397`, not a reading of the legacy source's intent.

---

## `scout` — replaced

L12-E had already landed the adapter; there was no tool. There is now, and it is
reached by the corpus's own instructions: **102 `scout query: …` lines across 34
units** (68 files = 34 units × `core.md` + `full.md`), each under a
`## Screenshot Hint` heading, e.g.
`@community/example-linear-kanban`: `scout query: linear kanban board dark cards
label dots minimal column headers`. Before this action those 102 instructions
named no tool at all.

Verified live against the deployed payload (18 sources, 61590 references): that
exact query returns 39000 matches, top 3 from `collectui` at score 0.325.

`sources` (comma-separated ids) and `require_thumbnail` are new inputs, both
closing documented contract breaks the adapter's own header names — the catalogue
units document `prime_scout("3D scroll", "godly", 8)` and legacy `prime_query`
accepted no source parameter.

Every answer carries the 18 declared source licences. `sources.yaml` records them
verbatim, including `metadata-only` terms, and a caller handed a thumbnail URL
without them cannot honour the terms.

## `mandate` — replaced by re-derivation, because it could not be ported

`compiler.ts:747 compileMandates(atoms)` is eight hardcoded ids plus six lines of
literal prose. **All eight ids are absent from `compiled-v3-final/`** (measured
directory-by-directory): they are legacy `@M01`/`@M02`/`@M10` namespaces the bundle
does not carry. The id list *was* the tool, so there is nothing to port.

The knowledge did survive under different ids —
`@M02/no-pure-white-background` -> `@community/constraint-no-pure-white-bg`,
`@M01/font-blacklist-ai-slop` -> `@impeccable/constraint-font-blacklist`,
`@M10/unforgettable-test` -> `@anthropic-impeccable/principle-unforgettable-one-thing`
— but writing *that* mapping down would just be a second hardcoded list.

The corpus declares the signal instead. **231 of 899 units carry a `## Severity`
section** in their rendered projection: `warning` 66, `high` 59, `medium` 41,
`critical` 32, `block` 27, `warn` 3, `low` 2, `error` 1. `mandate` selects
`block` + `critical` — the corpus's own two words for the legacy tool's own framing
("Non-negotiable. Violating one = task failure"). Verified against the real bundle:
**59 mandates**, spanning `check`, `constraint` and `rule`, ordered
(severity, id).

Each mandate carries its `## Exceptions`/`## Exemptions` verbatim. A mandate
shipped without its carve-outs is a mandate that gets violated deliberately.

Severity lives only in the rendered markdown — no `atom.yaml` carries a severity
key, so it is not in `UnitIR.fields`, and `UnitIR.projections` holds
bundle-relative *paths*. Hence the `readProjection` seam on the corpus binding.

## `checklist` — replaced by re-derivation, because it read no corpus

`compiler.ts:873 compileChecklist(taskType, atoms, tagIndex, edges)` is
`return CHECKLISTS[taskType] || "No checklist for …"` over a
`Record<string, string>` of eight hand-written markdown blobs. Its `atoms`,
`tagIndex` and `edges` parameters are **never read**. It was frozen prose in the
donor's source, not corpus knowledge.

The bundle holds **36 `kind: check` units**, each declaring a severity, a
`## Failure Message Template`, an `## Evaluation Method` and its exemptions. The
replacement ranks those: non-negotiables first, then token coverage of the caller's
`task` over the check's own text. Verified against the real bundle: 33 checks
surface (**3 of the 36 declare no `## Severity`** — reported below).

`task` is deliberately **not** an enum. The legacy enum existed only to index the
literal table; re-declaring it would mean hand-writing a second task->unit mapping.
Free text over declared unit text needs no table, and an unrecognised task degrades
to "all the non-negotiables" with a `CHECKLIST_TASK_UNMATCHED` diagnostic instead
of to `No checklist for "x"`.

## `gallery` — dropped; its one real capability is `scout`

`index.ts:869-889` filtered atoms on `subtype === "reference-gallery"` and flattened
their `gallery.items` (screenshot `file`/`path`/`pattern`/`persona_lean`).

**Measured: `compiled-v3-final/` contains zero occurrences of
`reference-gallery`.** The substrate is 90 files under `primes/` that the migration
did not carry, which puts it inside L13-F's 2734-unmapped question and outside any
tool's reach. Bundle `atom.yaml` has no `subtype` key and no `gallery` key at all
(the full top-level field set is id/kind/version/description/domain/content_hash/
tokens/projection/quality/relations/created_at, plus `sources` on 13 and
`lifecycle` on 1).

Reviving `gallery` would therefore mean inventing data. What it was *for* — a
visual anchor for a section — is exactly what the bundle's own replacement
mechanism does: the 34 `## Screenshot Hint` sections hand a query to `scout`, and
`scout` returns thumbnail-bearing references. Verified: 16069 of the 61590
references carry a thumbnail, reachable with
`prime_design_scout(query, require_thumbnail: true)`.

Legacy's `section` enum (`hero|pricing|cta|features|footer|testimonial|
full-landing|all`) becomes a term in that query rather than a parameter, because
nothing in the bundle declares a section facet to filter on.

## `template` — dropped; the fetch half already exists, the substitution half has no substrate

`compiler.ts:681 compileTemplate` did two things. Fetch the template atom, and
substitute `<KEY>` / `${KEY}` / `{{KEY}}` from a `variables` argument into
`atom.code`.

The fetch half is already served: production `prime_query scope=show` returns a
template unit's projection (§3 says so, and 46 `kind: template` units are in the
bundle). Adding `prime_design_template` would be a second way to read a unit.

The substitution half has **no substrate**. Bundle `atom.yaml` carries no `code`
field — template bodies are projection markdown — and scanning all three chunk
levels of all 46 template units for `{{X}}`, `${X}` or `<UPPER>` yields **one hit
across 46 units**: `${id}` inside the JavaScript sample in
`@community/template-view-transitions-api`, which is source code and not a
placeholder. There is nothing for `variables` to substitute into.

So `variables` is not carried forward, and `prime_design_*` declares no `variables`
input. A test pins that, so re-adding it is a deliberate act rather than a drift.

## `related` — depth restored

Kernel `mcp-server-core/src/serve.ts:491 relatedOf` walks exactly one hop and
accepts no depth. Legacy `mcp-server/graph.ts:7 findRelated(atomId, depth, …)`
declared `depth: 1-3` (`index.ts:793`).

Two legacy properties are contractual and preserved: depth is hop count with the
subject excluded, and the walk follows **outgoing edges of any type plus incoming
edges of type `requires`** (reported as `required-by`, per the legacy comment "if B
requires A, and we're at A, show B").

Two are not preserved: the O(depth · |F| · |E|) rescan of the whole edge array
(replaced by the kernel's `buildAdjacency`, the same canonical-order index the graph
generator and relation expansion already build), and the mutation of returned atoms
(`(target as any)._edgeType = …`), which corrupted provenance across concurrent
traversals. Provenance is a result field now.

Verified against the real bundle from `@impeccable/persona-stripe-fintech`:
depth 1 -> 23 units, depth 2 -> 87, depth 3 -> 157.

`kind` filters the result but **not** the frontier, so a depth-3 walk still reaches
through non-matching units. That distinction cannot exist at depth 1, which is why
the kernel's version never had to decide it.
