# Benchmarks — A/B history (honest revision)

> **Read this section first**: this is not a victory-lap document. The
> "12/12 = 100%" framing from Wave 6 was over-claimed and has been
> retracted (N=1 per condition is not a robust win-rate). The honest
> findings are below, organized by what each benchmark **does** and
> **does not** show.

---

## TL;DR — what's actually true

1. **The 5-layer pipeline runs end-to-end on 20/20 bench-v2 tasks**.
   Every task produces a non-empty `index.html` for both `prime` and
   `raw` conditions. That's a plumbing milestone, not a quality
   verdict.

2. **N=1 per condition** in every benchmark before Wave 8 — single-shot
   judgments are not robust. The `run-noise.sh` harness for N=3 sweeps
   landed in Wave 8/10; running it across the corpus is ROADMAP § 1.

3. **One verified regression (now fixed)**: 12-log-viewer ran for 15
   turns because `prime_validate` L2 always failed when no LLM API key
   was set, triggering retry-loops. Root cause + fix in
   [`validator-html.md` § L2 skipped path](validator-html.md).

4. **The most interesting finding is the 2026-05-08 Skill-collapse
   benchmark** (12 tasks × 2 models × 2 conditions): Skill picked
   Space Grotesk in 5/6 tasks regardless of brief. Prime selected 6
   different personas. This is "aesthetic distribution under varying
   briefs", not "quality" — but it's the cleanest story the data
   tells. Details in §"2026-05-08 — Skill Space-Grotesk collapse"
   below.

5. **Cross-LLM portability is an unverified claim**. Every benchmark
   uses `claude-opus-4-7[1m]`. The `cross-llm-test.mjs` script exists
   but only runs against 2 hand-picked tasks with DeepSeek. Not
   enough to claim "multi-LLM portable". ROADMAP § 2.

6. **Architecture alignment is ~70% of v1 spec**, post-Wave-12 honesty
   pass — earlier "85%" was over-stated. The v1 spec promised:
   - typed atoms (✅ shipped, 28 kinds)
   - graph (✅ shipped, ~3,500 edges)
   - L1+L2+L3 compile checkers (✅ shipped, L2 LLM is opt-in)
   - L1+L2+L3 output validators (✅ shipped, L2 opt-in)
   - 6-axis retrieval (✅ shipped)
   - 5 MCP tools (✅ shipped)
   - registry publish/install (◻ Wave 12/13 added remote;
     production-grade UX still pending)
   - cross-LLM (◻ unverified)
   - atom lifecycle / deprecation (~50%)

---

## Benchmark history

### Phase 2 · 2026-04-15 (`5442974b`)

**Goal**: cross-skill 4-task × 4-condition. Compare Prime against
"raw" (no Skill, no Prime), "skill-koomook" (the impeccable SKILL.md
loaded full), and "skill-frontend-design" (a fork variant).

**Tasks**: 4 (waitlist, blog-article, dashboard, llm-playground).

**Verdict**: Prime cheaper / faster / fewer output tokens.

```
                   Skill        Prime        Δ
Average cost       $1.00        $0.74        Prime -26%
Average time       328 s        186 s        Prime 1.76× faster
Output tokens      28k          15k          Prime -47%
```

**What it didn't show**: aesthetic quality. Even after the Wave 0 win
on cost, blog-article output was 0 OKLCH, default Georgia, 15 hex
colors — visibly worse than skill output despite being cheaper. This
motivated the chunker bug investigation (Wave 1).

**The chunker bug (root cause)**:
`packages/compiler/chunker.ts::buildFull` only emitted `description`,
`sources`, `examples`, `relations`, `notes`. The persona / template /
voice atoms' structured fields (`implies`, `palette`, `prohibitions`,
`body`) were silently dropped. `persona-editorial.prime` source was
1841 B / 47 lines, but `chunks/full.md` was 286 B / 3 lines — a stub.

After fix (286 B → 1233 B), no prompt change, visual output reversed
immediately on the next benchmark run. The lesson: **architecture is
right; content delivery was broken**.

### Wave 3 · 2026-04-28 (`0de3263a`)

**Goal**: 8-task A/B + auto-scoring; 709 atoms, ~3k edges.

**Verdict**: hand-judged 5/8 in Prime's favor. Auto-scoring was
informal. Phase 4 wave 2 added 95 atoms.

### Wave 4 · 2026-04-29-30 (`0a0a1ab7`, `bc2a6309`)

**Goal**: Toast must-include contract; data-table fix; 4 new tasks
(signup-flow, settings-panel, empty-state, log-viewer); budget +
DeepSeek intent; 10/12 = 83% (hand-judged).

**What changed**: composition contracts started mattering — toast task
forced `template-spring-config` + `pattern-stagger-reveal` regardless
of register, fixing the "stagger feels mechanical" failure mode.

### Wave 5/5b/5c · 2026-05-01 to 2026-05-02 (`e69494f9`, `88d8b750`,
`b965b6e7`)

**Goal**: stop content-heavy tasks (blog-article) from over-spending.

**What changed**:

- `mandatory_reads` cap per task type (content=3, marketing=5,
  product-ui=7, dev-tool=7, interaction=12).
- `turn_budget_hint` per task type ("HARD BUDGET ≤6 turns. STOP
  RESEARCHING, START WRITING.").
- Wave 5b: blog ultimate cost cap (content cap 4→3, required_atoms
  6→3).
- Wave 5c: dense row-height + log-viewer hard constraint
  (row-height 1.30–1.35 added to dense-pragmatist contract).

### Wave 6 · 2026-05-03 (`b38d734e`)

**Goal**: re-run all 12 tasks.

**The over-claimed finding**: "12/12 = 100% wins." Retracted at Wave 8.

**The real finding**: blog-article flips. Pre-Wave-6, Prime cost $1.29
vs Skill $0.71 (Prime 39% **more expensive**, the original
overload-bug). Post-Wave-6, Prime $0.75 vs Skill $0.99. **Prime 24%
cheaper, 32% faster, quality equivalent or better.**

**N=1 caveat**: every "win" was a single-shot judgment by the developer.
LLM-as-judge wasn't run. Robust win-rate is N≥3 + aggregate scoring.

### Wave 7 · 2026-05-05 (`9e10e6a`)

**Goal**: protocol layer close — `prime_resolve` (typed JSON),
`prime_validate` (L1+L2+L3), cross-domain security atoms (32 atoms,
proof of domain-blind 28-kind taxonomy).

**Code-only commit, no benchmark.**

### Wave 8 / 10 / 11 · 2026-05-07 (deep audit)

**Goal**: honest re-evaluation. Found 4 P0 bugs (now fixed):

| Bug | Impact | Fix |
|---|---|---|
| Deprecated atoms leaked into retrieval | Stale atoms could surface | Self-closing parse + `deprecated` bucket |
| `rankV3Atoms` ignored taxonomy budget | Could return 8 personas in top-10 | Per-kind soft caps (persona ≤2, template/pattern ≤4) |
| **L2 always failed when no LLM key** | Root cause of 12-log-viewer turn=15 | `{pass:true, skipped:true}` fallback |
| **L3 must_include / must_avoid was a no-op** | Composition contract violations silently passed | 14-pattern signature library with honored/violated/unverifiable verdicts |

**Architecture alignment correction**: claimed 85% before; actual
~62% (Wave 10) → ~70% (Wave 12 after closes).

### Wave 12/13 · 2026-05-07 (closes the gap)

- All 14 declared edge verbs now active (was 5 of 14).
- DomainRegistry wired into MCP server (3 domains: frontend-design,
  security, accessibility).
- `prime publish/install --remote` end-to-end via minimal Bun
  registry server.
- Corpus 793 → 899 atoms with 5 new domains + sparse-kind fill (every
  kind ≥4 atoms now).
- 9 unwired runtime modules documented as "alternative architecture,
  not cargo-culted".

---

## 2026-05-08 — Skill Space-Grotesk collapse

**Goal**: same-day stress test under varying briefs. Six complex
animated UI briefs (particle hero, parallax timeline, terminal sim,
music waveform, 3D card gallery, vote dashboard) × 2 models (sonnet,
haiku) × 2 conditions (prime, skill).

**Output paths** (reproducible):

```
/tmp/ab-2026-05-08/
  T1-particle-hero-prime/index.html        22.5 KB  sonnet
  T1-particle-hero-skill/index.html        22.6 KB  sonnet
  T2-parallax-timeline-prime/index.html    18.7 KB  haiku
  T2-parallax-timeline-skill/index.html    16.6 KB  haiku
  T3-terminal-sim-prime/index.html         25.2 KB  sonnet
  T3-terminal-sim-skill/index.html         20.8 KB  sonnet
  T4-music-waveform-prime/index.html       12.6 KB  haiku
  T4-music-waveform-skill/index.html       16.3 KB  haiku
  T5-3d-card-prime/index.html              46.9 KB  sonnet
  T5-3d-card-skill/index.html              64.5 KB  sonnet
  T6-vote-live-prime/index.html            21.5 KB  haiku
  T6-vote-live-skill/index.html            25.0 KB  haiku
```

### The headline finding

| Task | Prime persona | Skill aesthetic |
|---|---|---|
| T1 particle hero | Vercel-clean (oklch cyan, Helvetica Neue) | **Cyberpunk** (Space Grotesk 900 + DM Sans 200, hot-pink/cyan/gold) |
| T2 timeline | Magazine-editorial (Garamond serif, warm paper, deep red) | **Cyberpunk** (Space Grotesk 900 + Inter 200, pink/cyan/gold) |
| T3 terminal | Warp (Geist Mono, warm-earthy near-black, parchment text) | CRT phosphor green + scanlines (JetBrains Mono) |
| T4 music waveform | Spotify (#121212 + #1ed760, system fonts) | **Cyberpunk** (Space Grotesk + JetBrains Mono, cyan/magenta) |
| T5 3D card gallery | Airbnb (#ff385c, DM Sans, 3-layer shadow) | **Cyberpunk Blade Runner** (Space Grotesk + JetBrains Mono) |
| T6 vote dashboard | Linear-precise (tabular nums, system fonts) | Election-night cyan + gold (Space Grotesk + JetBrains Mono) |

**Skill picked Space Grotesk in 5 of 6 tasks**. Cyberpunk-style
palette in 4 of 6. Same display+mono pairing. **The brief barely
mattered** — Skill applied its "distinctive frontend recipe"
uniformly.

**Prime picked 6 different personas** (Vercel-clean,
magazine-editorial, Warp, Spotify, Airbnb, Linear-precise) for 6
different briefs. The corpus routed each task to the correct register.

### Mechanical metrics (aggregated across 12 outputs)

|  | Prime | Skill |
|---|---|---|
| Total bytes | **138.4 KB** | 157.1 KB |
| Largest single file | T5 47 KB | T5 64 KB |
| Smallest | T4 12 KB | T2 16 KB |

| Metric | Prime | Skill |
|---|---|---|
| Total `@keyframes` | 10 | **20** (Skill 2× more decorative motion) |
| `cubic-bezier()` | **22** | 11 (Prime tunes easing more) |
| `box-shadow:` rules | 13 | **29** (Skill stacks more glows) |
| CSS variables | 85 | **133** |

Skill front-loads visual chrome. Prime spends more on motion vocabulary.

### Accessibility / resilience

|  | Prime (6 tasks) | Skill (6 tasks) |
|---|---|---|
| `prefers-reduced-motion` CSS guard | **6/6** | **6/6** |
| `prefers-reduced-motion` JS guard | 5/6 | 5/6 |
| `<meta viewport>` | 6/6 | 6/6 |
| `<html lang>` | 6/6 | 6/6 |
| `:focus-visible` styling | **1/6** | 0/6 |
| Total ARIA attributes | **64** | 17 (Prime 3.8×) |
| `oklch()` color space | **2/6** | 0/6 |
| Reliance on Google Fonts CDN | **1/6** | 6/6 (Skill always pulls remote fonts) |

Both honor reduced-motion at parity. **Prime emits 3.8× more ARIA**,
more `:focus-visible`, and uses oklch where Skill never does.

### Per-task observations (key snippets)

**T1 particle hero · sonnet**: Both 120-particle canvas + mouse
attraction + reduced-motion fallback. Same physics quality. **Prime
wrote a real product page** (Axiom observability, "Observe everything.
Miss nothing.", concrete CLI install). Skill wrote "Luminos" generic AI
SaaS. Both real products; Prime's specificity comes from persona
constraints, not LLM creativity.

**T2 parallax timeline · haiku**: Prime: 7 real tech-history events
1991–2022 (WWW, Win95, Facebook, iPhone, Cloud, AI, ChatGPT). Skill:
7 generic milestones 2010–2026. Both use IntersectionObserver +
scroll parallax. Prime smaller (18.7 vs 16.6 KB) because
magazine-editorial doesn't need cyberpunk gradient stack.

**T3 terminal sim · sonnet** (the *tightest convergence*): both
credible terminals with tabbed chrome, jittery typing, step-end
blinking caret. Prime ran 5 commands in Warp's actual aesthetic (warm
parchment text on warm-black). Skill ran 5 commands in CRT phosphor
green with scanlines + vignette. Both legitimately different
aesthetics — neither generic.

**T4 music waveform · haiku**: Prime in real Spotify colors (#121212
+ #1ed760). Skill in cyberpunk magenta+cyan again. Prime smaller
(12.6 vs 16.3 KB) because Spotify persona prescribes minimal accents;
Skill stacks atmosphere layers.

**T5 3D card gallery · sonnet** (the *most divergent on size*): Skill
64 KB vs Prime 47 KB. Skill stacked 4-layer hover shadows + radial
mesh gradient + 60px grid + per-card scan-lines. Prime's Airbnb
persona limited to the 3-layer shadow technique that's actually
documented in the brand. Both 8 real products; both `cubic-bezier(0.16,
1, 0.3, 1)` for the flip; both ±10° tilt. Reduced-motion: Prime
crossfade replacement for the flip; Skill collapses everything to
0.001ms.

**T6 vote dashboard · haiku**: Prime committed to Linear-precise
(tabular nums via `font-variant-numeric` rather than monospace
typeface — same alignment with proportional readability). Skill went
MSNBC/CNN broadcast (cyan+gold+red, JetBrains Mono throughout). Both 3
candidates, rolling digits, canvas line chart. Skill 24 KB vs Prime
21 KB.

### What this proves and doesn't

**Proves**: Skill's "distinctive frontend recipe" is a single
aesthetic dressed up as a methodology — when 6 different briefs hit
it, ~5 of them came back wearing Space Grotesk + cyberpunk gradients.
Prime selecting from 31 personas based on task type produces actual
variety.

**Doesn't prove**: which is "better-looking" — that needs human
judgment. Both are competent. The test was about **aesthetic
distribution under varying briefs**, and Prime's variance was much
higher than Skill's.

**Also doesn't prove**: this generalizes outside complex animated UI.
For boring forms / settings pages / blog posts, both might converge.

---

## What we still don't have

These are the items that ROADMAP.md exists to close:

1. **N=3 across all 20 bench-v2 tasks**: `run-noise.sh` exists; running
   it for 60 fresh runs (20 tasks × 3 reps × prime/skill) is the next
   concrete deliverable. Without it, all "win-rates" should be read as
   "single-shot impressions".

2. **Browser-render verification**: HTML may declare `font-family: GT
   Sectra` but render Times New Roman if Sectra isn't loaded. We
   don't currently catch this. ROADMAP § 10.

3. **Cross-LLM matrix**: GPT-4o + Gemini-Flash + Claude-Sonnet on ≥5
   tasks. The cross-llm-test.mjs sketch exists but the full sweep is
   pending API keys.

4. **LLM-as-judge for quality**: Wave 6 hand-judged "all wins" was a
   developer-as-judge call. A blind A/B with Claude/Gemini judging
   side-by-side hasn't been run as a closed loop.

5. **Cost / turn-count regression tests in CI**: today benchmarks are
   ad-hoc. CI integration would let us catch chunker-bug-class
   regressions automatically.

---

## How to reproduce

The bench-v2 harness:

```bash
# In the corpus repo
cd benchmarks/

# Run one task end-to-end on prime condition
bun run scripts/run-task.ts \
  --task 09-blog-article \
  --condition prime \
  --output-dir results/2026-05-XX/

# N=3 with run-noise.sh
bash scripts/run-noise.sh 09-blog-article prime 3
```

Each task fixture is in `benchmarks/tasks/<NN-name>/`. The five
condition scaffolds (raw / prime / skill-koomook / skill /
skill-frontend-design) are in `benchmarks/conditions/`.

The 2026-05-08 Skill-collapse benchmark has its own scripts and
report at `/tmp/ab-2026-05-08/`. The `compare.mjs` there computes
the mechanical-metrics tables verbatim from this doc.

---

## Final word

The corpus does what it says: it routes briefs to varied personas,
honors composition contracts, and produces output with measurable a11y
+ motion craft markers. It does NOT reliably win quality A/Bs at
N=3 — because we haven't run them.

The 2026-05-08 finding is the cleanest comparative result. Read it as
**"Prime distributes design choices over briefs the way a 31-persona
catalog should; Skill does not"**. That's a structural property of
the corpus, not a quality claim.

The next big number we'll know is N=3 robust win-rate. Until then,
trust the architecture more than the scoreboard.
