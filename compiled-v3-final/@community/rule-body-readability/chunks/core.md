# BodyReadability [rule] v1.0.0
Body text MUST meet the minimum readability floor: `font-size` ≥ 16px (1rem) and `line-height` ≥ 1.5 (unitless). Text below 16px causes user-pinch-zoom on mobile; line-height under 1.5 collapses descenders into ascenders and reduces sustained-reading speed.
domain: typography

## Checks
- [ ] @community/check-body-readability

## Applies To
@community/type-html-artifact

## Severity
high

## Severity Combination
```
body font-size < 14px                        → BLOCK
body font-size 14–16px or line-height < 1.4 → WARN
body font-size ≥ 16px AND line-height ≥ 1.5 → PASS
```

## Failure Mode
Mobile users zoom-and-pan to read; older users abandon; WCAG SC 1.4.4 (Resize Text) and SC 1.4.12 (Text Spacing) fail; perceived quality drops. Tight line-height visibly crowds paragraphs.

## Remediation
- Set `html { font-size: 16px }` (or 100%) and never override below 1rem for body copy.
- Apply `line-height: 1.5` (unitless) on the body element so it inherits proportionally.
- For dense data UI where 14px is required, restrict to data tables and label them as such — do not apply globally.

## Exceptions
-
  - **Case**: Caption / footnote / legal disclosure
  - **Allowed When**: Secondary text at 14px (0.875rem) is acceptable when it is unambiguously secondary and accompanied by adjacent body text at 16px.
-
  - **Case**: Dense data table cells
  - **Allowed When**: @impeccable/persona-dense-pragmatist-style dashboards may render data at 13–14px; user expectation is set by the surface.
