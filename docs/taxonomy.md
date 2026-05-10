# Taxonomy — the 30 task-type YAMLs

The taxonomy is the **routing table** between a brief and a retrieval
plan. When `prime_intent` classifies a brief into a `task_type`, the
matching YAML in `primes-v3/taxonomy/<family>/<task_type>.yaml`
provides:

- The **register pool** — which personas to consider on the register
  axis, with weights.
- The **`required_atoms`** — atoms the agent MUST read full.md of.
  These are the highest-priority atoms in the retrieval result.
- The **`recommended_motion`** — motion-craft atoms surfaced on the
  motion axis.
- The **`forbidden_atoms`** — atoms that MUST NOT appear in the
  retrieval result, regardless of score.
- The **`max_atoms_per_axis`** — the per-axis budget cap.
- The **`quality_checks`** — observable criteria the validator and
  the LLM judge use to evaluate output.

This page surveys all 30 yamls organized by family. It's the
"contract" each task type ships with. Read the YAMLs directly in
`primes-v3/taxonomy/`; this is a guided tour.

---

## YAML schema (one form for all 30)

```yaml
task_type: <id>                    # matches IntentObject.task_type
parent: <family>                   # one of: marketing-landing | product-ui |
                                   #   content | interaction | dev-tool
description: "..."                 # 1-line summary
trigger_keywords:                  # what brief words map to this task_type
  - "..."
  - "..."                          # bilingual (EN + 中文)
default_register_pool:             # personas considered for register axis
  - school: <school-id>
    weight: <0..1>                 # weights sum to 1.0 typically
required_atoms:                    # MANDATORY — agent reads each full.md
  - "@<scope>/<id>"
recommended_motion:                # surfaced on motion axis
  - "@<scope>/<id>"
forbidden_atoms:                   # MUST NOT appear in retrieval
  - "@<scope>/<id>"
max_atoms_per_axis:                # per-axis budget cap
  register: 1                      # always 1 (one persona per page)
  pattern: 2..4
  motion: 1..5
  typography: 1..3
  color: 1..2
  rules: 2..3
quality_checks:                    # observable criteria for the judge
  - "..."
```

The `_index.yaml` at the taxonomy root maps each bench-v2 task to its
YAML — see `primes-v3/taxonomy/_index.yaml`.

---

## Family 1 · `marketing-landing` (8 task types)

Conversion-focused pages. Single primary CTA above the fold; trust
signals; warm or cool register based on audience.

### `waitlist`

Email signup waitlist for product launch.

- **Default register pool**: warm-institutional 0.4 / magazine-editorial
  0.3 / notion-warm 0.3
- **Required atoms** (4): `pattern-hero-with-demo`,
  `pattern-trust-signal-components`, `rule-single-primary-action-per-screen`,
  `pattern-inline-validation`
- **Forbidden**: brutalist, vercel-clean, dense-pragmatist (too cold
  for waitlist), skeleton-loader template
- **Quality checks**: hero email + CTA above fold on mobile, body
  ≥16px, no pure white background (cream/off-white preferred), single
  primary action only, trust signals within 2 scrolls.
- **Source**: `primes-v3/taxonomy/marketing-landing/waitlist.yaml`

### `landing-saas`

Generic SaaS product marketing landing.

- **Default pool**: vercel-clean 0.4 / stripe-fintech 0.3 / linear 0.3
- Quality checks emphasize hero with screenshot, feature grid,
  social-proof logos, pricing teaser, single CTA repetition.

### `landing-creative`

Creative agency / portfolio / cultural landing.

- **Default pool**: magazine-editorial 0.4 / brutalist 0.3 /
  swiss-modernist 0.3
- Quality checks emphasize asymmetric layout, large typography,
  intentional non-conformity to SaaS patterns.

### `pricing-b2b`

Enterprise pricing with tier comparison + custom-call CTA.

- **Default pool**: stripe-fintech 0.55 / vercel-clean 0.25 / linear
  0.2
- Required: `pattern-pricing-toggle`, `template-shadcn-pricing-toggle`,
  `pattern-metric-card`, `rule-tabular-numerics`.
- Quality checks: monthly/annual toggle present, comparison row count
  ≥6, contact-sales for highest tier.

### `pricing-consumer`

Consumer-facing pricing (3 tiers, "free / pro / family").

- **Default pool**: notion-warm 0.4 / airbnb 0.3 / vercel-clean 0.3
- Quality checks: max 3 tiers visible, recommended tier highlighted,
  per-feature checkmarks not text.

### `comparison`

vs-competitor comparison table.

- **Default pool**: linear 0.5 / stripe-fintech 0.5
- Quality checks: side-by-side table, fair (don't shaft competitors),
  clear winner indicators (checkmarks), source links cited.

### `404`

The 404 page itself (low-stakes but identity-defining).

- **Default pool**: notion-warm 0.4 / vercel-clean 0.3 / brutalist 0.3
- Quality checks: helpful navigation back, search box, light tone OK
  but not at expense of usefulness.

### `coming-soon`

Pre-launch teaser page.

- **Default pool**: warm-institutional 0.5 / magazine-editorial 0.3 /
  framer 0.2

---

## Family 2 · `content` (5 task types)

Prose-heavy pages. Body typography is paramount; constrain context to
prevent over-research.

### `blog-article`

Single blog or magazine article page.

- **Default pool**: magazine-editorial 0.55 / notion-warm 0.25 /
  warm-institutional 0.2
- **Required atoms** (3): `pattern-blog-article-layout`,
  `principle-typography-hierarchy`, `rule-line-length-optimal`
- **Forbidden**: dense-pragmatist, vercel-clean (too cold for prose),
  pattern-dashboard-layout, pattern-data-table-dense
- **`max_atoms_per_axis`**: register 1, pattern 2, motion 1,
  typography 3, color 1, rules 2
- **Quality checks**: body 16-18px line-height 1.6-1.8, line-length
  60-75 chars (target 65ch), heading hierarchy h1>h2>h3, table of
  contents for >1500 words, reading-progress indicator recommended,
  images with alt + captions.
- **mandatory_reads cap = 3** (`content` task family budget — content
  tasks should stop researching and start writing).
- **`turn_budget_hint`**: "HARD BUDGET ≤6 turns. After reading the
  mandatory atoms, START WRITING HTML IMMEDIATELY. Content tasks are
  95% prose synthesis."

### `doc-page`

Technical documentation page (single concept).

- **Default pool**: notion-warm 0.5 / mintlify 0.3 / vercel-clean 0.2
- Quality checks: code samples with syntax highlighting, table of
  contents sticky on desktop, prev/next page nav, "edit on GitHub" link.

### `about-page`

Team/company about.

- **Default pool**: warm-institutional 0.5 / magazine-editorial 0.3 /
  notion-warm 0.2
- Quality checks: team photos, mission statement above fold, contact
  info accessible.

### `changelog`

Release notes / changelog page.

- **Default pool**: vercel-clean 0.4 / notion-warm 0.3 / linear 0.3
- Quality checks: dated entries reverse-chronological, version tags,
  release-type badges (feature/fix/breaking).

### `podcast-episode`

Single podcast episode page.

- **Default pool**: spotify 0.4 / warm-institutional 0.3 / notion-warm
  0.3
- Quality checks: audio player above fold, transcript present,
  show-notes structured (links + timestamps).

---

## Family 3 · `product-ui` (8 task types)

In-product surfaces. Density is OK; keyboard navigation expected;
quality matters because users see this every day.

### `dashboard`

Multi-metric KPI dashboard.

- **Default pool**: linear 0.55 / vercel-clean 0.25 / stripe-fintech
  0.2
- Required: `pattern-metric-card`, `template-chart-color-ramp`,
  `pattern-dashboard-data-table`, `constraint-monospace-tabular-numerics`
- Quality checks: ≥4 metric cards, ≥1 chart, period-toggle (7d/30d/
  90d), tabular numerics for all numeric columns.

### `data-table`

Sortable, filterable data table.

- **Default pool**: linear 0.55 / vercel-clean 0.3 / stripe-fintech 0.15
- Required: `pattern-data-table-dense`, `pattern-dashboard-data-table`,
  `template-data-table-base`, `fact-fintech-number-display`,
  `constraint-monospace-tabular-numerics`, `rule-touch-target-min`
- Quality checks: column headers clickable for sort + `aria-sort`,
  filter controls accessible, shift-click range selection, bulk-action
  bar on selection, tabular/monospace numerics, virtualize/paginate
  >100 rows, ≥8 rows of realistic named data (not "User 1"), at least
  one named web font, ≥1 keyframes + reduced-motion override, ≥2 of
  {sparkline, avatar+status, floating bulk-action bar, status pill,
  kbd-shortcut bar}.

### `kanban-mobile`

Mobile-first kanban board.

- **Default pool**: linear 0.4 / framer 0.3 / notion-warm 0.3
- Quality checks: 3 columns visible on 375px viewport, horizontal
  swipe between columns OR vertical scroll within column, drag-and-
  drop with haptic feedback (CSS).

### `log-viewer`

Real-time log viewer.

- **Default pool**: dense-pragmatist 0.55 / vercel-clean 0.3 / sentry
  0.15
- Quality checks: monospace font, row-height 1.30-1.35 (Wave 5c
  constraint), level filter (info/warn/error), follow-tail toggle,
  search field with regex support.

### `settings`

User account / app settings.

- **Default pool**: linear 0.4 / notion-warm 0.3 / vercel-clean 0.3
- Quality checks: section navigation (sidebar or tabs), save state
  visible, dangerous actions visually separated.

### `signup-wizard`

Multi-step signup flow.

- **Default pool**: warm-institutional 0.4 / vercel-clean 0.3 /
  notion-warm 0.3
- Quality checks: step indicator, prev/next nav, validation per step,
  password strength meter if applicable.

### `order-confirm`

Post-checkout order confirmation.

- **Default pool**: warm-institutional 0.4 / airbnb 0.3 / stripe 0.3
- Quality checks: order summary readable, confirmation email sent
  notice, "what's next" actionable nav.

### `file-explorer`

In-product file/folder explorer.

- **Default pool**: linear 0.4 / vercel-clean 0.3 / dense-pragmatist
  0.3
- Quality checks: tree navigation OR breadcrumb, multi-select,
  context-menu (right-click), keyboard nav.

---

## Family 4 · `interaction` (5 task types)

Motion-heavy / transient UI. The `mandatory_reads` cap is
**highest** (12) because motion craft requires reading multiple
templates.

### `toast-demo`

Toast notification component demo.

- **Default pool**: linear 0.4 / vercel-clean 0.35 / framer 0.25
- **Required atoms** (10): `pattern-toast-stack`, `pattern-interaction-states`,
  `rule-animation-duration`, `constraint-reduced-motion`,
  `fact-duration-perception-thresholds`, **plus motion mandatory-reads**:
  `template-spring-config`, `template-easing-curves`,
  `pattern-stagger-reveal`, `template-fade-stagger`,
  `fact-stagger-feel-organic`
- **Forbidden**: magazine-editorial (wrong register for interaction),
  `anti-pattern-decorative-spinning`, `anti-pattern-no-bounce-everything`
- **`max_atoms_per_axis`**: register 1, pattern 2, motion **5**,
  typography 1, color 1, rules 2
- **Quality checks** (15 — most exhaustive of any task type):
  - ≥4 named `@keyframes` (toast-in / drain-progress / spinner / slide-out)
  - Custom `cubic-bezier` (not default `ease`)
  - 60-100ms stagger between toasts
  - `@media (prefers-reduced-motion: reduce)` fallback
  - ≥5 toast variants (success / error / warning / info / loading)
  - Visible auto-dismiss timer
  - Spring physics on entry
  - Mirrored dismiss animation
  - All 4 states visually distinct
  - Pause on hover
  - Reduced-motion gets instant appear
  - Max 3-4 toasts simultaneously
  - Individual dismiss buttons

### `modal`

Modal dialog with focus trap.

- Quality checks: `role="dialog"`, focus trap, Esc to close,
  click-outside-dismisses, focus restored on close.

### `command-palette`

Cmd+K command palette.

- **Default pool**: raycast 0.4 / linear 0.3 / vercel-clean 0.3
- Quality checks: keyboard-first nav, fuzzy search, recent history,
  shortcut hints in result rows.

### `form-wizard`

Multi-step form (often longer than signup-wizard, with validation).

- Quality checks: step indicator, per-step validation, browser-back
  navigates steps, save-as-draft.

### `notification-center`

In-product notification panel (not toasts; persistent inbox).

- Quality checks: unread/read distinction, mark-all-read action,
  filter by type, infinite scroll OR paginated.

---

## Family 5 · `dev-tool` (4 task types)

Engineer-audience UIs. Mono fonts welcome; data density OK; "looks
like a tool" is a feature.

### `llm-playground`

Interactive LLM prompt playground.

- **Default pool**: vercel-clean 0.4 / linear 0.3 / replicate 0.3
- Quality checks: split prompt/response panes, model selector, temp/
  max-tokens controls, streaming indicator, copy-to-clipboard.

### `prompt-editor`

Prompt template editor.

- Quality checks: template variables highlighted, preview pane,
  version history.

### `analytics-realtime`

Real-time analytics dashboard.

- **Default pool**: linear 0.4 / posthog 0.3 / sentry 0.3
- Quality checks: live-updating numbers, sparkline trends, anomaly
  highlighting.

### `api-explorer`

API explorer / Postman-like.

- Quality checks: request method/URL/headers/body editor, response
  status + body display, history list.

---

## Cross-cutting fields

### `mandatory_reads_cap` per family (set in `mcp-server/index.ts`)

```
content              3
marketing-landing    5
product-ui           7
dev-tool             7
interaction         12
```

Derivation: content tasks are 95% prose synthesis (extra atoms don't
help). Interaction tasks need motion templates (each adds value).
Product-UI is in the middle.

### `turn_budget_hint` per family

Each family has a one-liner the agent gets in its response, hinting
at how many turns are "enough":

- `content` — "HARD BUDGET ≤6 turns. STOP RESEARCHING, START WRITING."
- `marketing-landing` — "Aim for ≤8 turns."
- `product-ui` — "Aim for ≤10 turns."
- `interaction` — "Up to 12 turns OK — motion craft requires multiple templates."
- `dev-tool` — "Aim for ≤10 turns."

This budget hint is enforced *as advice*, not a hard cap, but it
prevents the kind of 15-turn blog-article runs that motivated Wave 5b.

---

## Adding a new task type

1. Pick the family. If none fits, see `ROADMAP.md` § 11 for "new
   family" workflow (requires coordination).
2. Author a YAML at `primes-v3/taxonomy/<family>/<task_type>.yaml`
   following the schema above.
3. `default_register_pool` references must be existing personas.
4. `required_atoms` references must be existing atoms; if they
   aren't, author them in the same PR.
5. Add the task to `_index.yaml`.
6. Optionally add a `bench-v2` task that exercises the new YAML.

The `prime_intent` classifier picks up new YAMLs automatically via
`trigger_keywords`. Make those bilingual (EN + 中文).

---

## Source files

```
primes-v3/taxonomy/
├── _index.yaml                          # families + bench-v2 mapping
├── marketing-landing/
│   ├── 404.yaml
│   ├── coming-soon.yaml
│   ├── comparison.yaml
│   ├── landing-creative.yaml
│   ├── landing-saas.yaml
│   ├── pricing-b2b.yaml
│   ├── pricing-consumer.yaml
│   └── waitlist.yaml
├── content/
│   ├── about-page.yaml
│   ├── blog-article.yaml
│   ├── changelog.yaml
│   ├── doc-page.yaml
│   └── podcast-episode.yaml
├── product-ui/
│   ├── dashboard.yaml
│   ├── data-table.yaml
│   ├── file-explorer.yaml
│   ├── kanban-mobile.yaml
│   ├── log-viewer.yaml
│   ├── order-confirm.yaml
│   ├── settings.yaml
│   └── signup-wizard.yaml
├── interaction/
│   ├── command-palette.yaml
│   ├── form-wizard.yaml
│   ├── modal.yaml
│   ├── notification-center.yaml
│   └── toast-demo.yaml
└── dev-tool/
    ├── analytics-realtime.yaml
    ├── api-explorer.yaml
    ├── llm-playground.yaml
    └── prompt-editor.yaml
```

Read 2-3 yamls before authoring your own; the schema fits in 30
lines but the `quality_checks` craft is the part that takes time.
