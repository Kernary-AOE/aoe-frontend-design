# ROADMAP — Kernary Frontend Design Domain Package

The corpus and the surrounding pipeline are **architecturally ~70%
done** (per the source repo's Wave-12 honesty pass). The remaining 30%
is concentrated in three buckets: **statistical robustness**, **graph
density**, and **portability**. This file lays out what's coming, by
bucket and approximate priority.

This roadmap is for the **corpus repo** specifically. The system repo
(parser / compiler / runtime / registry) has its own roadmap covering
language-level concerns (typed AST, semantic versioning, dep
resolution). When something concerns both repos, it's flagged.

---

## Near-term (next 1–2 corpus releases)

### 1. Robust win-rate (N=3 across 20 tasks)

The biggest single deliverable. `run-noise.sh` lands; the bench-v2
suite gets executed N=3 per condition. We separate signal from noise.

- Acceptance: every task has ≥3 fresh runs per condition; per-task
  win/loss/tie verdict by an LLM judge; aggregate per-condition median
  cost / median turn count / median time.
- Output: `benchmarks/results/2026-05-XX/` with raw runs + scoreboard
  + judge transcripts.

### 2. Cross-LLM portability matrix

Today every benchmark uses `claude-opus-4-7[1m]`. The protocol claim
is "model-agnostic"; the proof is missing.

- Sweep ≥5 tasks × {GPT-4o, Gemini-Flash, claude-sonnet, claude-haiku}
  through the same prime + skill-koomook conditions.
- Document at `docs/benchmarks.md` § Cross-LLM. Honest about quality
  gaps if any model under-performs.
- This is also a system-repo concern (the MCP transport must be tested
  against each runtime).

### 3. Author the 49 missing-ref atoms

`prime check --registry` reports 49 broken refs that need atoms
authored (not edges fixed):

- `pattern-hero-cta` (referenced by 6 atoms)
- `rule-server-side-validation` (referenced by 5)
- … (full list in `scripts/fix-broken-refs.ts` output)

Most are 30-line atoms; can be done in a single afternoon with
`prime-decompose` Skill.

### 4. The 14 sparse-kind decision

14 of 28 declared atom kinds have <1% representation:

| Kind | Atoms (Wave 13) |
|---|---|
| `tradeoff` | 4 (was 1 pre-Wave-13) |
| `scope` | 4 (was 1) |
| `feedback` | 4 (was 1) |
| `collection` | 4 (was 1) |
| `provocation` / `term` / `value` / `type` / `transform` / `tool` / `taxonomy` / `step` / `metric` / `category` | 4–7 each |

Post-Wave-13 every kind has ≥4 atoms — the prior "is this kind
real?" cliff is closed. Decision needed: either commit to expanding
each kind to ≥10 atoms in 2026-Q3 (treat them as first-class), or
remove from PRIME-SPEC v1 (keep ~14 actively-used kinds and call the
rest experimental). System repo concern; corpus repo provides input.

---

## Mid-term (2–4 corpus releases)

### 5. Persona expansion — 31 → 60

The 31 personas cover the major design schools well, but there are
genres with no representation:

- **Editorial / cultural** beyond `magazine-editorial`: Pitchfork-vs-
  NYT-Magazine vs Pitchfork-vs-It's-Nice-That distinctions.
- **Asian SaaS regional**: Toss exists but no Japanese-design (e.g.
  cookpad-clean, mercari-bold), no Chinese-design (Bytedance-dense,
  Xiaohongshu-warm).
- **Gaming / consumer**: Steam-grid, Itch.io-handcraft.
- **Brutalist / experimental** beyond the canonical brutalist
  persona.

Each new persona is ~6 atoms (the persona itself + composition
`must-include` references that may also need authoring). Target: +30
personas across two waves; **40 personas + 10 voice atoms** at the
peak.

### 6. Composition-contract validator coverage

The L3 validator's signature library currently covers 14 atom-id
patterns (`toast` → `role="alert"`, `modal` → `role="dialog"`, etc.).
There are ~40 more atoms in the corpus that have a clean signature
mapping (e.g. `pattern-data-table-*` → `<table>`,
`pattern-hero-cta` → `class*="hero"` + `<button>`). Expand the library
to ~60 patterns.

After expansion, atoms not in the library still fall back to the
noun-keyword check (current behaviour). No semantic regressions
expected; just better coverage.

### 7. Domain-isolation (security / a11y / frontend separation)

The 32 security atoms and the 70+ accessibility atoms currently share
a single retrieval index with the 700+ frontend-design atoms. The
DomainRegistry now boosts in-domain matches (Wave 12), but namespace
isolation isn't built. A "secure auth flow" brief should not pull
frontend-design persona into the register axis.

This is partly a system-repo deliverable (Domain Plugin Protocol) and
partly a corpus deliverable (declare which atoms belong to which
domain). Coordinate.

---

## Longer-term (3–6 months)

### 8. Validator escalation: L2 LLM aesthetic check by default

L2 currently skips when no LLM key is configured. The roadmap is to
make L2 a **non-optional** check using a small, cheap model (Haiku
$0.25/M, DeepSeek). Cost to validate one HTML output ≈ $0.0008. At
that price it should always run.

Requires: registry of cheap models per layer; key-management UX;
"skip when offline" still as an escape hatch.

### 9. Per-persona example gallery

Today personas declare `example-brands: [...]` as a string list. The
roadmap is to attach **`example` atoms** with screenshots /
representative HTML / typography spec. Lets `aoe_query
scope='gallery' id='persona-stripe'` return concrete reference
material, not just brand names.

### 10. Browser-renderer benchmark

Quality scoring today is HTML-content based (heuristics + LLM
judgment). The roadmap is to add a **browser-render scoring**
condition: `puppeteer` renders the HTML at 1920×1080; PaintLab /
custom heuristics judge visual fidelity to the persona's
prescriptions. Catches "the HTML says `font-family: Fraunces` but the
page actually renders Times New Roman because Fraunces wasn't loaded"
class of bugs.

This is a benchmarks-repo concern (the corpus repo); the system
repo's contribution is just adding `prefers-render-test` to the spec.

### 11. Internationalization atoms (i18n)

Wave 13 added 5 i18n atoms; this is a placeholder for a richer set:
RTL layouts, CJK-specific typography (vertical writing modes,
ruby annotations), Arabic shaping rules, locale-aware
number/date/currency formatting. Coordinate with persona expansion
(each region produces design-school context).

---

## Decisions deferred (not roadmap, but tracked)

- Whether to keep `@anthropic-impeccable/` namespace as separate from
  `@community/` once the 26 derivative atoms have diverged enough
  that they're effectively re-authored. Today every wave pushes them
  further from the upstream MIT-licensed source.
- Whether to ship a "minimal corpus" cut (e.g. 100 atoms covering 8
  personas) for low-context-budget agents; today 899 is the only
  shape.
- Whether to publish the corpus as a real npm package (under the
  `prime-` scope) once the system repo's registry is live.

---

## How to influence this roadmap

- Open an issue tagged `corpus-roadmap` with the brief / use-case
  you'd like covered.
- For new personas: include 5+ visible-on-the-public-web brand
  references and explain why they share a register the existing 31
  don't already capture.
- For new task types: contribute a YAML to
  `primes-v3/taxonomy/<family>/<sub_type>.yaml` with the
  `default_register_pool` you propose.

The corpus is curated, not crowd-sourced — but proposals are welcome
and reviewed in batches every two weeks.

---

For the system-level roadmap (DSL evolution, registry, multi-LLM
coordination), see the source repo's `ROADMAP.md`.
