# CHANGELOG — Kernary Frontend Design Domain Package

> Wave-by-wave summary. Numeric figures in this file are reproduced
> verbatim from the source repo's `STATUS-2026-05-07.md` and
> `RESULTS-FINAL.md`; please consult those for the engineering-grade
> changelog.

The corpus and the surrounding pipeline went through 13 waves of
edits. This file gives a one-paragraph capsule per wave; the per-wave
commit hashes are in the source repo.

---

## v1.13 — Wave 13 · 2026-05-07

- Corpus: **793 → 899 atoms (+13%)** via two parallel curation streams:
  - **Cross-domain expansion (4 new domains × 5 atoms)**: i18n
    (cjk-line-break, no-string-concat, icu-message-format,
    flag-as-language anti-pattern, bidi-direction); performance
    (cls-budget, perceived-vs-actual, image-lcp-priority,
    blocking-third-party anti-pattern, rail-targets); api-design
    (resource-not-action, pagination-first, cursor-pagination,
    rpc-as-rest anti-pattern, http-method-semantics); testing
    (flaky-quarantine, test-pyramid, snapshot-restraint,
    test-the-mock anti-pattern, test-pyramid-ratios). Total
    cross-domain atoms: **45 across 9 non-frontend domains**.
  - **Sparse-kind fill (31 atoms)** on the long tail: type ×4,
    transform ×2, tool ×2, value ×2, step ×1, metric ×1, taxonomy ×3,
    tradeoff ×4, scope ×3, feedback ×3, collection ×3, term ×3.
    **Every kind now has ≥4 atoms.**
- Registry: `prime publish --remote <url>` and `aoe install --remote
  <url>` round-trip green end-to-end via a minimal Bun-based HTTP
  registry server (`scripts/registry-server.ts`).
- L3 cross-atom checker: 76 dead-ref errors → **0** by adding a
  full-id index alongside the name index.
- Documentation: 9 unwired runtime modules now have a documented
  reason for not being wired (PrimeLoader / PrimeExecutor /
  EvaluationEngine / IndexManager / CorpusGraph / CorpusIndex /
  ai-step-executor / method-loader / skill-bundler form a coherent
  alternative runtime model that doesn't fit the current MCP +
  atom-loader architecture).

## v1.12 — Wave 12 · 2026-05-07

- Edge graph polysemy: **5 active verbs → 14 active verbs**.
  `scripts/infer-dead-verb-edges.ts` derives heuristic edges for
  `specializes` / `derived-from` / `extends` / `enhances` / `requires`
  / `contradicts` / `see-also` / `relationships` / `supplies-to`. The
  graph went from 94% single-verb (`related`) dominance to genuinely
  multi-verb.
- DomainRegistry wired into the MCP server. `mcp-server/index.ts`
  registers 3 domains at startup (`frontend-design`, `security`,
  `accessibility`); `rankV3Atoms` now boosts atoms whose domain
  matches the brief.
- Corpus expansion across 5 new non-frontend domains
  (data-engineering, machine-learning, legal-compliance,
  infrastructure, ops-observability). Plus 30 deficit-kind atoms in
  `tradeoff` / `scope` / `feedback` / `collection` / `provocation` /
  `term` / `value` / `type` / `transform` / `tool` / `taxonomy` /
  `step` / `metric` / `category`. Corpus 793 → 814+.

## v1.10–11 — Wave 10/11 · 2026-05-07 (audit)

Wave 10 was a deep audit; Wave 11 closed a chunker rewrite + 79/82
broken refs.

- **chunker bug**: 60% of atoms had `core.md == summary.md` (3 of 5
  byte-identical in a sample). Fixed by adding a universal catch-all
  that emits kind-specific body fields (implies / palette /
  composition / …) into core. After fix: 6/793 atoms still have
  `core==summary` (down from ~480).
- L3 cross-atom checker not wired (only ran via standalone scripts).
  Now called from `build-atom-dirs.ts`.
- L2 LLM checker not wired in compile pipeline. `--enable-l2-llm`
  flag added (opt-in, costs real money, skipped without API key).
- 84% conflict-graph dangling: 117/139 conflicts edges pointed at
  bare slugs (`brutalist` instead of
  `@impeccable/persona-brutalist`). `edge-resolver.ts` now resolves
  slug → fullId via a pre-built index after compile. Down to 6%.
- L2 validator no-key path: was returning `{pass:false}`, triggered
  retry loops. Root cause of the 12-log-viewer turn=15 run. Now
  returns `{pass:true, skipped:true}`.
- L3 validator must_include / must_avoid was a no-op. Comment
  literally said "skipped …". 14-pattern signature library added
  (toast → `role="alert"`; modal → `role="dialog"`; etc.). Falls back
  to noun-keyword check; ambiguous → `unverifiable` (no
  false-positive failures).
- 30 broken atom refs auto-fixed via fuzzy-LCS match
  (`scripts/fix-broken-refs.ts --apply`); 52 still broken — 3
  ambiguous, 49 need to be authored.

## v1.7 — Wave 7 · 2026-05-05

- Protocol layer closed: `aoe_resolve` (typed JSON
  font/color/duration spec) + `aoe_validate` (output validation
  loop with feedback retry) + cross-domain security atoms (32 atoms,
  proof that 28-kind taxonomy is domain-agnostic).
- `aoe_resolve` is the centerpiece: agent gets typed JSON, not
  markdown text — markdown is the intermediate format, typed JSON is
  the final interface.

## v1.6 — Wave 6 · 2026-05-03

- 12 tasks all produced HTML on Prime conditions; hand-judged "12/12
  wins" claim subsequently retracted at Wave 8 (single-shot N=1, not
  robust).
- **Blog flips**: Prime $0.75 vs koomook $0.99. Prime 24% cheaper,
  32% faster, quality equivalent or better. Last open task from
  Wave 3 closed.

## v1.5 — Wave 5/5b/5c · 2026-05-01–02

- `mandatory_reads` cap per task type added; `turn_budget_hint`
  per task type. Content-heavy tasks get cap=3 + "stop researching,
  start writing" hint.
- Wave 5b: blog ultimate cost cap (content 4→3, required_atoms 6→3).
- Wave 5c: dense row-height + log-viewer hard constraint
  (row-height 1.30–1.35).

## v1.4 — Wave 4 · 2026-04-29–30

- Toast `must-include` contract added: every toast task gets
  `template-spring-config` and `pattern-stagger-reveal` loaded.
- 24 motion-craft atoms added.
- data-table brief disambiguation: separate atoms for
  `pattern-data-table-sortable` vs `-filter-bar` vs `-inline-edit`.
- 4 new tasks (signup-flow, settings-panel, empty-state, log-viewer);
  10/12 = 83% on hand-judging.

## v1.3 — Wave 3 · 2026-04-28

- 8-task A/B + auto-scoring; 709 atoms; ~3k edges.
- Phase 4 wave 2 added 95 atoms.

## v1.2 — Wave 1/2 · 2026-04-26–27

- Wave 1: Intent + Edges + Composition packages (9 agents parallel).
- Wave 2: Full 5-layer pipeline wired (8 agents parallel).
- 1,559 P0 edges built; graph traversal live.

## v1.0 — Phase 2 baseline · 2026-04-15

- 4-task × 4-condition cross-skill benchmark.
- Identified blog overload bug (Prime got more expensive than Skill
  on text-heavy tasks because the ranker over-loaded a11y atoms).
- Identified the **chunker bug** (commit `5442974b`): persona /
  template / voice atoms had their structured fields silently
  truncated; `persona-editorial.prime` source = 1841 B, but
  `chunks/full.md` = 286 B. Fixed in subsequent wave; visual
  reversal was immediate.

---

## Looking forward

- Run `run-noise.sh` for N≥3 across the 20-task suite (harness landed
  Wave 8/10).
- Cross-LLM portability matrix: GPT-4o + Gemini Flash on 5 tasks
  minimum.
- Author the 49 missing atoms behind broken refs.
- Decide whether to remove the 14 sparse-kind declarations from spec
  or build them out to ≥10 atoms each.
- See [`ROADMAP.md`](ROADMAP.md) for the full forward plan.

For the engineering-grade per-commit history, see the source repo's
`git log --grep "feat(arch)"` plus
[`STATUS-2026-05-07.md`](https://github.com/kernary-aoe/prime/blob/main/STATUS-2026-05-07.md).
