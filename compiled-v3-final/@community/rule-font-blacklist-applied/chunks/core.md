# FontBlacklistApplied [rule] v1.0.0
The primary display and body typefaces in author CSS MUST NOT be drawn from @impeccable/constraint-font-blacklist (Inter, Roboto, Arial, Helvetica Neue, Space Grotesk, DM Sans, Nunito, Poppins, Open Sans, Lato). These fonts are the statistical mode of LLM-generated and shadcn/Tailwind-default output and produce a visually undifferentiated 'commodity' result.
domain: visual-design

## Checks
- [ ] @community/check-font-blacklist-applied

## Applies To
@community/type-html-artifact

## Severity
high

## Severity Combination
```
primary display or body font is blacklisted, no exception cited → BLOCK
fallback-only blacklisted font (e.g. system stack)             → PASS
blacklisted font used for dense data (with exception)          → WARN
```

## Failure Mode
Output looks identical to thousands of other shadcn-scaffolded apps; brand identity is invisible; reviewer's first impression is 'AI generated this'.

## Remediation
- Pick from @impeccable/constraint-font-blacklist.approved-alternatives (Geist, Söhne, Canela, Freight, Tiempos, GT Super, Roc Grotesk, Berkeley Mono).
- If budget forbids licensed fonts, use Geist (free) or a free serif like Spectral / Source Serif 4 — anything outside the top-10 Google Fonts.
- Keep blacklisted fonts only as system-stack fallbacks, e.g. `font-family: 'Söhne', 'Helvetica Neue', sans-serif`.

## Exceptions
-
  - **Case**: Dense data table UI
  - **Allowed When**: Inter is used in a @impeccable/persona-dense-pragmatist context where tabular figures and screen optimization dominate; document the choice.
-
  - **Case**: Inherited brand decision
  - **Allowed When**: The brand book mandates a blacklisted font; record the decision in `BRAND.md` and annotate the CSS with a comment.
