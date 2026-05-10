# NoPureWhiteBg [constraint] v1.0.0
Backgrounds for long-form prose must not be pure white (#ffffff). Use a warm or cool off-white such as #f9f7f4 or oklch(98% 0.008 var(--hue)) to reduce halation and reading fatigue.
domain: visual-design

## Target
- page background in long-form reading contexts
- article body background
- editorial / blog / marketing prose surfaces

## Severity
high

## Values
-
  - **Forbidden**: #ffffff
  - **Forbidden Equivalent**: rgb(255, 255, 255)
-
  - **Forbidden**: white
  - **Forbidden Equivalent**: oklch(100% 0 0)

## Exceptions
- Cards / modals / tooltips where surface contrast against page background is the design intent.
- Dashboard data surfaces where pure white maximises legibility for tabular numerics.
- Print stylesheets — paper is the medium.

## Approved Alternatives
- #f9f7f4 — warm paper-white (Atlantic / Readwise)
- oklch(98% 0.008 var(--hue)) — hue-aware off-white
- #fafaf7 — neutral off-white (Stripe long-form docs)
- #f5f5f4 — Tailwind stone-100

## Enforcement
Stylelint custom rule rejecting `background: #fff` / `background: white` on selectors `body`, `article`, `[role=main]`, `.prose`. Token review: `--bg` and `--surface-page` must not resolve to pure white in prose-context themes.
