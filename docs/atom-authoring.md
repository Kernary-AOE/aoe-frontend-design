# Atom authoring — frontend-design specifics

This page is a **design-side authoring playbook**. It complements
`CONTRIBUTING.md` (which covers the mechanical conventions) with
**which kind to use for which kind of design knowledge**, and
disambiguation for the kinds frontend authors trip on most.

For the DSL grammar (lexer/parser-level concerns), see the system
repo's `docs/dsl-quickref.md`. This file is purely about what counts as
which kind in the frontend-design domain.

---

## The 28 kinds, frontend-design lens

Five layers; 28 kinds; each row has the typical use-case in this
corpus.

### Data layer (8 kinds)

| Kind | Use when | Real example |
|---|---|---|
| `fact` | Empirical claim with a citation | `fact-wcag-contrast-aa` (≥4.5:1 contrast for normal text) |
| `term` | A named definition reused across atoms | `term-leading`, `term-tracking`, `term-x-height` |
| `value` | A specific numeric or constant value | `value-touch-target-min: 44px` |
| `category` | A grouping of related things | `category-motion-easing`, `category-color-temperature` |
| `example` | A reference implementation citation | `example-vercel-toast`, `example-linear-toast` |
| `counter-example` | An explicit anti-reference | `counter-example-inter-purple-dark` |
| `source` | Citable spec or paper | `source-wcag-22`, `source-nielsen-1994` |
| `metric` | A measurable threshold | `metric-contrast-ratio`, `metric-target-size` |

### Behavior layer (5 kinds)

| Kind | Use when | Real example |
|---|---|---|
| `step` | One operation in a procedure | `step-apply-heuristics` |
| `check` | Pass/fail assertion against an artifact | `check-contrast-aa`, `check-focus-visible` |
| `transform` | A mapping function (CSS variable → token, hex → oklch) | `transform-hex-to-oklch` |
| `tool` | An external tool the agent might invoke | `tool-stark-contrast-checker` |
| `method` | A multi-step procedure with inputs/outputs | `method-heuristic-review` |

### Composition layer (5 kinds)

| Kind | Use when | Real example |
|---|---|---|
| `rule` | Directly actionable, binary pass/fail | `rule-color-contrast`, `rule-line-length-optimal` |
| `taxonomy` | A formal taxonomy / classification system | `taxonomy-10-heuristics` |
| `pattern` | Reusable structural recipe | `pattern-toast-stack`, `pattern-hero-with-demo` |
| `anti-pattern` | "Don't do this" with rationale | `anti-pattern-generic-saas-blue`, `anti-pattern-decorative-spinning` |
| `type` | A type definition (CSS variable, color tier) | `type-spacing-scale`, `type-color-tier` |

### Style / Param layer (5 kinds)

| Kind | Use when | Real example |
|---|---|---|
| `persona` | A coherent design school | `persona-magazine-editorial`, `persona-stripe` |
| `voice` | A writing tone | `voice-casual-warm`, `voice-brand-corporate` |
| `constraint` | A hard limit | `constraint-font-blacklist`, `constraint-no-pure-white-bg` |
| `template` | Concrete code skeleton | `template-spring-config`, `template-oklch-palette` |
| `provocation` | A challenging design assertion | `provocation-why-not-serif` |

### Meta layer (5 kinds)

| Kind | Use when | Real example |
|---|---|---|
| `collection` | A curated bundle of atoms | `collection-motion-craft-toolkit` |
| `scope` | A context-of-applicability declaration | `scope-mobile-only`, `scope-dark-mode-only` |
| `tradeoff` | An explicit tension between two valid positions | `tradeoff-density-vs-readability` |
| `principle` | High-level heuristic (informs rules) | `principle-vertical-rhythm`, `principle-typography-hierarchy` |
| `feedback` | A pattern for delivering feedback / criticism | `feedback-polite-disagreement` |

---

## Common authoring traps in frontend-design

### Trap 1: confusing `rule` and `principle`

This is the single most common mistake. Resolution rule:

- If the knowledge says **how to fail/pass a binary test**, it's a `rule`.
- If it says **why** rules are the way they are, it's a `principle`.

Real example:

```
rule LineLengthOptimal {
  id: "@community/rule-line-length-optimal"
  description: "Body text line-length MUST be 60-75 characters per line."
  claim: "Every paragraph's effective width yields 60-75 chars at body size."
  severity: medium
  validates-with: [@community/principle-readability]
  ...
}

principle Readability {
  id: "@community/principle-readability"
  statement: "Reading flow is harmed by either too-short or too-long lines."
  rationale: "Reader's eye saccades have a comfortable scan width; ..."
  ...
}
```

The `rule` is testable (a regex or layout check can pass/fail it); the
`principle` is the reasoning behind multiple rules. Most actionable
knowledge is `rule`. Use `principle` sparingly.

### Trap 2: confusing `pattern` and `template`

- `pattern` describes a **conceptual recipe** that any UI library can
  implement.
- `template` is a **concrete code skeleton**, ready to paste.

A `template` MUST have a `structure: """ ... """` field with literal
HTML/CSS. A `pattern` may have one but typically focuses on
description / behavior / a11y / examples.

When you have a pattern with a canonical implementation, **author both
atoms** and link via `enhances`:

```
template SpringConfig {
  id: "@impeccable/template-spring-config"
  ...
  structure: """ ... CSS keyframes ... """
}

pattern ToastStack {
  id: "@community/pattern-toast-stack"
  ...
}

# In a separate edge or in the template's relations:
template-spring-config enhances pattern-toast-stack
```

### Trap 3: confusing `persona` and `voice`

- `persona` = visual aesthetic (color, typography, density, layout, motion)
- `voice` = verbal tone (word choice, sentence rhythm, attitude)

These are **orthogonal**. A page can be Stripe-visual + Notion-voice.
If you find yourself writing both visual and verbal directives, split
into two atoms.

### Trap 4: brand persona authoring

When authoring a persona for a real brand:

- **Only describe observable public design characteristics**. Don't
  paraphrase brand voice copy. Don't reproduce proprietary assets.
- **Cite the public-web evidence** in `notes:`. URLs, dates, what
  page you observed.
- **`example-brands:` lists only that one brand**. Sub-genre brand
  references go in `notes:` or in compatible/conflicts edges.
- **Be specific in `implies:` fields**. "GT Sectra | Tiempos
  Headline" is better than "a serif font". Specificity is what makes
  a persona produce distinctive output (see `benchmarks.md`'s
  Skill-Space-Grotesk-collapse story).

### Trap 5: choosing `domain:`

The `domain:` field gates DomainRegistry boosting. For frontend
atoms, the choices are:

- `frontend-design` — visual + structural (most atoms)
- `accessibility` — a11y-specific rules and checks
- `visual-design` — abstract design principles (rhythm, hierarchy,
  contrast theory)
- `ux-design` — interaction principles (Nielsen heuristics, error
  prevention)
- `i18n`, `performance`, `api-design`, `testing`, `security` — the
  cross-domain expansion zones

If your atom equally applies to two, pick the more specific. Don't
multi-tag — `domain:` is single-valued.

---

## Persona-specific authoring

A persona is the most expressive (and most error-prone) atom kind.

### The mandatory `implies:` block

```
implies: {
  font: { display: "...", body: "...", monospace: "...", accent: "..." }
  color: { temperature: "...", palette: "...", background: "..." }
  density: "compact | comfortable | dramatic | loose"
  layout: "..."
  imagery: "..."
  motion: "..."
}
```

This is what `prime_resolve` returns as typed JSON to the agent.
**Empty implies = useless persona**. Spend time getting the strings
specific.

Anti-example (don't do this):

```
implies: {
  font: { display: "a clean sans-serif" }   # too vague
  color: { palette: "modern" }              # not actionable
  density: "balanced"                       # meaningless
}
```

Good example (real, from `persona-magazine-editorial`):

```
implies: {
  font: {
    display: "high-contrast display serif, large and dramatic — e.g. GT Sectra, Tiempos Headline, Domaine Display, Canela, Ogg, Reckless, Tobias Frere-Jones Mallory"
    body: "transitional or old-style serif at 18-20px — e.g. Tiempos Text, Lyon Text, Mercury Text, GT Sectra Text, Source Serif 4, Charter"
    accent: "small-caps grotesk for section labels and bylines — e.g. Söhne Schmal, GT America Mono, Tiempos Headline small-caps"
  }
  color: {
    temperature: "neutral-warm"
    palette: "near-white paper + ink-black + ONE editorial accent (often issue-specific) — #f8f6f1 / #1a1a1a / accent varies per article (deep red #8b2222, ochre #c08a3e, or magazine-blue #1e3a8a)"
    background: "#f8f6f1 or #fbf9f4 (warm magazine paper) — pure white only acceptable for full-bleed photo background"
  }
  ...
}
```

### The mandatory `composition:` block

3-6 `must_include` atoms. 2-3 `must_avoid`. `typography_required` and
`color_required` as prose values. See
[`composition-contract.md`](composition-contract.md) for the full
shape and validator semantics.

### The `notes:` field

Use it for:

- **Disambiguation from related personas** ("Distinct from
  `persona-editorial`: that one is restrained literary; this is
  DRAMATIC.")
- **Defining typographic moves** ("The drop cap + small-caps byline
  triad is non-negotiable. Drop one and the page reads as generic
  blog.")
- **Brand attribution** for brand personas (URLs, dates).
- **When-to-use / when-to-avoid hints** for retrieval.

The retrieval algorithm reads `description:` more than `notes:`, but
notes are surfaced to the agent in `full.md` and inform the LLM's
synthesis.

---

## Edge verb selection — frontend-design defaults

When in doubt, here's the rule of thumb:

| You're connecting | Verb | Example |
|---|---|---|
| persona → its source brand | `derived-from` | `persona-stripe derived-from <stripe.com observation>` |
| persona → restraint persona it elaborates | `extends` | `persona-magazine-editorial extends persona-editorial` |
| pattern → template that provides its CSS skeleton | `enhances` | `template-spring-config enhances pattern-toast-stack` |
| pattern → a more specific variant | `specializes` | `pattern-data-table-sortable specializes pattern-data-table` |
| rule → check that verifies it | `validates-with` | `rule-color-contrast validates-with check-contrast-aa` |
| rule → fact that justifies it | `derived-from` | `rule-touch-target-min derived-from fact-fitts-law` |
| value → rule that enforces it | `supplies-to` | `value-touch-target-min supplies-to rule-touch-target-min` |
| persona → competing persona | `conflicts` | `persona-brutalist conflicts persona-editorial` |
| persona → harmonizing persona | `compatible` | `persona-warm-institutional compatible persona-magazine-editorial` |
| any pair, no specific shape | `related` | (catch-all) |

Every atom needs ≥3 `related:` AND ≥1 of {extends, derived-from,
requires, enhances, specializes}. The second constraint exists because
without it the graph collapses to single-verb mush (this happened
pre-Wave-12).

---

## Final tips

1. **Author by hand for the first 5–10 atoms** to internalize the
   format. After that, use `prime-decompose` Skill on any markdown
   doc.
2. **Read 2–3 atoms of the same kind before writing your own**.
   Especially personas — they're the most format-rich.
3. **Run `prime check primes-v3/sources/@<scope>/<your-atom>.prime`
   after every edit**. Parser errors are easy to fix early; cross-
   reference errors compound if you batch.
4. **Keep `description:` ≤ 200 chars**. The retrieval algorithm
   weighs description heavily — make every word load-bearing.
5. **For brand personas, write the `notes:` first** (you're observing
   public design); then `implies:` and `composition:` flow from
   that.

---

For the full DSL grammar: system repo `docs/dsl-quickref.md`.
For the mechanical conventions of this corpus: `CONTRIBUTING.md`.
For the persona-specific contract semantics: `composition-contract.md`.
