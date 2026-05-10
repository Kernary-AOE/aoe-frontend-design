# NoPureBlackText [constraint] v1.0.0
Body and paragraph text must never use pure black (#000000 / oklch(0% 0 0)). Pure black on near-white induces excessive contrast and visual fatigue; use a soft near-black such as oklch(18% 0.04 var(--hue)).
domain: visual-design

## Target
- body text
- paragraph color
- default foreground in long-form reading contexts

## Severity
high

## Values
-
  - **Forbidden**: #000000
  - **Forbidden Equivalent**: oklch(0% 0 0)
-
  - **Forbidden**: rgb(0, 0, 0)
  - **Forbidden Equivalent**: hsl(0 0% 0%)

## Exceptions
- Logos and brand marks where pure black is part of the identity.
- Pure-data UI tokens (e.g., terminal text on a black-themed code editor where intent is high-contrast monospace).
- Print stylesheets (where reflectance, not emission, governs perception).

## Approved Alternatives
- oklch(18% 0.04 var(--hue)) — soft near-black, hue-aware
- oklch(20% 0.02 250) — neutral cool near-black
- #1a1a1a / #1c1c1e — Apple system label (dark)
- #171717 — Tailwind neutral-900

## Enforcement
Stylelint custom rule rejecting `color: #000` / `color: black` on prose selectors (`p`, `article *`, `[role=main]`, `.prose *`). PR review checks tokens for `--text` resolving to pure black.

## Rationale
Pure black against pure white is a halation pattern: the eye over-adjusts to the maximum-contrast edge, causing chromatic blur and reading fatigue. Editorial publications (NYT, Atlantic, FT) all use a desaturated near-black around L=15–20 to soften the glare while preserving WCAG AA contrast against off-white backgrounds.
