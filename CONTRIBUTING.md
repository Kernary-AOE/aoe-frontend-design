# Contributing — Atom authoring for the frontend-design corpus

> This guide is for **adding atoms to the frontend-design corpus**. For
> the `.prime` DSL grammar (lexer/parser-level concerns), see the
> system repo's `CONTRIBUTING.md`. This file is the design-specific
> playbook: which kind to use for which kind of design knowledge, when
> to make a persona vs a voice, when a `rule` vs a `principle`, and
> the conventions this corpus follows.

---

## 0 · Two ways to author

### 0a. With the `prime-decompose` Skill (recommended)

If you have a markdown design document (a brand guideline, an
`impeccable` SKILL.md, a Figma export's prose), point the
[`prime-decompose`](prime-decompose/SKILL.md) Claude Code Skill at it:

```
You: /prime-decompose ./our-design-system-brief.md
       --target @ourteam --out ./out-prime/
```

The Skill emits `.prime` files; you review, edit, merge.

### 0b. By hand

If you're authoring single atoms or have a design call you want to
encode directly, follow the rest of this guide. Estimated time per
atom: 5–15 minutes once you've internalised the kind taxonomy.

---

## 1 · The 5-layer kind decision

Always pick **layer first**, then kind.

| Layer | Kinds in this corpus | "What does this knowledge do?" |
|---|---|---|
| **Data** | `fact`, `term`, `value`, `category`, `example`, `counter-example`, `source`, `metric` | States something true / defined / measured. No imperative; just data. |
| **Behavior** | `step`, `check`, `transform`, `tool`, `method` | A discrete operation an agent or human performs. |
| **Composition** | `rule`, `taxonomy`, `pattern`, `anti-pattern`, `type` | Reusable structural piece — the building blocks. |
| **Style / Param** | `persona`, `voice`, `constraint`, `template`, `provocation` | What the output looks/sounds like. Bundles other atoms via `composition:`. |
| **Meta** | `collection`, `scope`, `tradeoff`, `principle`, `feedback` | Heuristics, ambient guidance, or curated bundles. |

Then within layer, pick the most specific kind. Worked examples below.

---

## 2 · `rule` vs `principle` — the most common mistake

| | `rule` | `principle` |
|---|---|---|
| Actionability | Directly actionable, binary pass/fail | High-level heuristic, not directly actionable |
| Validation | Has a `check` atom | Cannot be checked — it informs rules |
| Example | "All spacing values MUST be multiples of 4 px" | "A single base unit and its multiples create rhythm" |
| Output | Validator can verify it from HTML | Validator cannot verify it; rules derived from it can |

If your knowledge **says how to fail/pass a binary test** → `rule`.
If it **says why** rules are the way they are → `principle`.

In the frontend-design corpus, ratio is roughly:

```
rule       206
principle   47
```

Most actionable knowledge is in `rule`. Use `principle` sparingly — it
should be quotable, philosophical, and not directly enforceable.

---

## 3 · `pattern` vs `template` — when to use which

| | `pattern` | `template` |
|---|---|---|
| Structure | Conceptual recipe (what + why + when) | Concrete code, ready-to-paste |
| Includes a `structure` field with HTML/CSS | Optional | **Required** |
| Examples | `pattern-toast-stack`, `pattern-hero-with-demo` | `template-spring-config`, `template-oklch-palette` |
| Cross-persona reuse | Yes — patterns are persona-neutral | Mostly persona-specific (template-spring-config supplies-to many personas, but its parameter values are persona-tuned) |
| Body length | Description + behavior + a11y bullets | A literal `structure: """ ... """` block |

If you can write `<div class="...">` skeleton, it's a template. If
you're describing the abstract solution that any UI library could
implement, it's a pattern.

When a pattern has a canonical implementation, **author both** —
pattern for "what it is", template for "drop-in code". Link them via
`enhances` (template enhances pattern).

---

## 4 · `persona` vs `voice` — visual vs verbal

| | `persona` | `voice` |
|---|---|---|
| Concerned with | Visual aesthetic — color, typography, density, layout, motion | Verbal tone — word choice, sentence rhythm, attitude |
| Example | `persona-magazine-editorial` (display serif, drop caps, asymmetric flow) | `voice-casual-warm` (chatty, contractions OK, em-dashes for emphasis) |
| Required field | `implies: { font, color, density, layout, ...}` | `tone:`, `vocabulary:`, `grammar_preferences:` |
| Compatibility | One persona per page (sometimes blended) | Often paired with persona — persona+voice = full design language |

If you find yourself writing both visual and verbal directives, split
into two atoms. They're orthogonal and reusable separately. Stripe's
visual aesthetic + Notion's voice is a real combination some teams
adopt; if both were one atom you couldn't blend them.

---

## 5 · Required fields per atom (frontend-design conventions)

Every atom in this corpus has these fields:

```
<kind> <PascalName> {
  id: "@<scope>/<kind>-<kebab-name>"   // MUST equal filename minus .prime
  version: "1.0.0"

  description: "..."                   // ≤ 200 chars; what it is in plain English

  domain: frontend-design              // also: accessibility | security | ux-design | …

  // — kind-specific fields, see system repo's PRIME-SPEC-v1.md §1.2 —

  related: [..., ..., ...]             // ≥ 3 entries

  // ≥ 1 of: extends / derived-from / requires / enhances / specializes
  derived-from: @<scope>/...
}
```

### Frontend-design-specific conventions

- **Always set `domain:`**. The DomainRegistry uses this to boost
  in-domain atoms during retrieval.
- **`description:` is consumed by the ranker**. Make every word load-
  bearing; don't restate the kind.
- **For `persona` atoms, `implies:` is mandatory**. The retrieval
  algorithm's `register` axis returns the picked persona's `implies`
  fields directly to the agent — empty `implies` makes the agent
  guess.
- **For `template` atoms, `structure:` (multi-line `"""..."""`) is
  mandatory**. The L3 validator's signature library matches against
  patterns in the literal HTML.
- **For brand-name personas**: write **observable public design
  characteristics only**. Don't paraphrase brand voice copy. Cite
  public web pages in `notes:`.

---

## 6 · Composition contracts (the persona's most important section)

When authoring a `persona`, the `composition:` block is the contract
the agent will be held to. Spend disproportionate care here.

```
composition: {
  must-include: [
    @<scope>/principle-foo,
    @<scope>/pattern-bar,
    ...
  ]
  must-avoid: [
    @<scope>/persona-bad-pairing,
    ...
  ]
  typography-required: {
    display: "high-contrast display serif (GT Sectra | Tiempos Headline)"
    body: "transitional or old-style serif, 18-20px"
    display-size: "96-160px"
  }
  color-required: {
    background: "#f8f6f1 or #fbf9f4 (warm magazine paper)"
    palette: "per-article accent (issue-specific, not global)"
  }
  motion-prescriptions: [
    @<scope>/principle-vertical-rhythm,
  ]
  quality-thresholds: {
    min-keyframes: 4
    requires-cubic-bezier: true
    requires-reduced-motion-fallback: true
  }
}
```

Rules:

- `must-include` references must point to atoms that **actually
  exist**. The validator hard-fails if any must-include is missing
  from the output.
- Limit `must-include` to **3–6 atoms**. More than 6 starts to
  over-constrain the output and bloats agent context.
- `typography-required` is **string prose, not atom IDs**. The agent
  reads it directly.
- `motion-prescriptions` should reference **template** or **pattern**
  atoms (concrete motion specs), not principles.
- `quality-thresholds` is a numeric / boolean checklist consumed by
  the L3 validator.

---

## 7 · Edge verb cheatsheet (frontend-design)

The 14 edge verbs were under-used pre-Wave-12. Here's when to use each
in this corpus:

| Verb | Use when |
|---|---|
| `related` | Catch-all peer reference. Every atom has ≥3. |
| `extends` | A persona that's a refinement of another (`persona-magazine-editorial extends persona-editorial`) |
| `specializes` | A pattern that's a more specific case of a parent pattern (`pattern-data-table-sortable specializes pattern-data-table`) |
| `derived-from` | A `rule` derived from a `fact` or `principle`; a persona derived from external brand reference |
| `requires` | A pattern that **cannot work** without another pattern (`pattern-toast-stack requires pattern-stagger-reveal`) |
| `enhances` | A template that strengthens a pattern (`template-spring-config enhances pattern-toast-stack`) |
| `validates-with` | A `rule` whose pass/fail is checked against a `fact` or external spec (`rule-color-contrast validates-with @w3c/fact-wcag-contrast-aa`) |
| `supplies-to` | A `value` or `fact` consumed by another atom (`value-touch-target-min supplies-to rule-touch-target-min`) |
| `conflicts` | Two atoms cannot be loaded together (`persona-brutalist conflicts persona-editorial`) |
| `compatible` | Two atoms work well together (`persona-warm-institutional compatible persona-magazine-editorial`) |
| `contradicts` | Strong logical disagreement, surfaced as warning (mirror of `must-avoid`) |
| `see-also` | Loosely related; rule↔check pairs |
| `relationships` | Membership in a `taxonomy` or `category` |
| `includes` | Composition / collection bundling |

### One non-`related` verb is mandatory

Every atom MUST have at least one of:
{`extends`, `derived-from`, `requires`, `enhances`, `specializes`}.

This is enforced in `prime check`. The reason: `related` is the lazy
default; without at least one strong-typed edge, the graph collapses
to single-verb mush (which is what happened pre-Wave-12).

---

## 8 · Naming + scope

- File: `primes-v3/sources/@<scope>/<kind>-<kebab-name>.prime`
- Atom `id`: `@<scope>/<kind>-<kebab-name>` (must equal filename
  minus `.prime`)
- `<scope>` is the namespace. For frontend-design corpus contributions:
  - `@community` — public-domain authored atoms (most contributions)
  - `@impeccable` — distinct persona school + supporting atoms
    (gated; talk to maintainers)
  - `@anthropic-impeccable` — derived from anthropics/skills (don't
    add new entries; this namespace is frozen at 26 atoms)
  - `@nielsen` / `@w3c` — citing only; don't add unless covering a
    new public spec
  - `@<yourteam>` — bring your own scope when forking (e.g.
    `@stripe-internal`)

---

## 9 · Submission checklist

Before opening a PR:

- [ ] Every new atom parses clean: `bun run prime check primes-v3/sources/@<scope>/<your-atom>.prime`
- [ ] `prime check --registry` reports 0 new broken refs
- [ ] At least 3 `related:` edges per atom
- [ ] At least 1 of {`extends`, `derived-from`, `requires`, `enhances`, `specializes`} per atom
- [ ] `description:` ≤ 200 chars, load-bearing words only
- [ ] `domain:` set to one of the corpus's 9 domains
- [ ] Persona atoms: `implies:` populated; `composition:` has 3–6
      `must-include` entries
- [ ] Template atoms: `structure:` literal HTML/CSS block
- [ ] If citing external (WCAG / Nielsen / brand), `derived-from` or
      `notes:` entry with URL
- [ ] If you add a new task-type YAML, `default_register_pool`
      references existing personas (or you've also authored the new
      ones in the same PR)
- [ ] If you add brand-name persona, `notes:` cites public web
      references; no proprietary asset reproduction

---

## 10 · Frontend-design taxonomy (when to file what)

Quick reference for putting a new atom under the right scope:

- New design school / aesthetic → `persona-*.prime`
- New writing tone → `voice-*.prime`
- New UI building block (toast, modal, hero) → `pattern-*.prime` (+ `template-*.prime` if you have a code skeleton)
- New CSS technique → `template-*.prime`
- New "always do X" → `rule-*.prime` + `check-*.prime`
- New "never do X" → `anti-pattern-*.prime` + `rule-*.prime` (negation form)
- New empirical claim with citation → `fact-*.prime` + `source-*.prime`
- New abstract heuristic → `principle-*.prime`
- New ratio/threshold/numeric value → `value-*.prime`
- New named term that other atoms reuse → `term-*.prime`

If the atom doesn't fit any of these, ask in an issue before
authoring. Inventing new kinds isn't supported (the 28 kinds are
spec-frozen); but coining a sub-namespace within an existing kind is
fine (e.g. `pattern-data-table-sortable` is a sub-pattern of the
generic `pattern-data-table`).

---

## 11 · Bigger contributions

- **A new task-type family** (e.g. "agentic-cli-ui"): coordinate via
  issue. Likely needs ~30 atoms + 4–6 yaml files + persona-pool
  decisions. Don't open a PR cold.
- **A new persona school** with no current representative: write a
  scoping doc first (what brand references, what it conflicts with,
  what `must-include` it'll declare, ~6 supporting atoms estimated).
- **A new domain** (you're seeding e.g. `@<yourteam>` for game-design
  atoms): consider forking the repo entirely; the corpus repo
  template is meant to be forked once you exceed ~50 atoms.

---

For the engineering-grade contribution guide (parser tests, code
style, CI), see the system repo's `CONTRIBUTING.md`. This file is the
**design-side** authoring playbook — different concerns, often
different reviewers.
