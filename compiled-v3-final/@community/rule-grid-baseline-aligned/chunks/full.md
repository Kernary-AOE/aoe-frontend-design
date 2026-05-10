# GridBaselineAligned [rule] v1.0.0
Long-form text and adjacent typographic elements (captions, metadata, sidebars) MUST share a vertical baseline grid — the typographic baseline of one block aligns with another at a consistent rhythmic interval. The interval is typically the body-text `line-height` (e.g. 24px for 16px×1.5 body).
domain: visual-design

## Checks
- [ ] @community/check-grid-baseline-aligned

## Applies To
@community/type-html-artifact

## Severity
low

## Severity Combination
```
>15% of text rows off the baseline grid           → WARN
adjacent columns desynchronized by >2px           → WARN
text rows align to baseline grid within 1px       → PASS
```

## Failure Mode
Designed pages feel 'almost right' — readers can't articulate the dissonance, but it reduces perceived craft. Compare a New York Times article (baseline-aligned) to a typical SaaS landing page (not) to feel the difference.

## Remediation
- Choose a baseline step (e.g. 8px or 24px), apply `line-height: <step>px` to body, and constrain heading `margin-top` / `margin-bottom` to multiples of the step.
- For mixed-size headings, use `font-size + leading-trim` (CSS `text-edge: cap alphabetic`) to recover predictable baselines — chrome 132+ supports it.
- If full baseline alignment is impractical, at least align the first line of adjacent columns.

## Exceptions
-
  - **Case**: Hero / display typography
  - **Allowed When**: Display-size text breaks baseline by design; the rule applies to body-and-caption regions, not hero.
-
  - **Case**: Single-column long-form
  - **Allowed When**: With one column, baseline-grid alignment is internally consistent so long as body line-height is constant.

## Applies To
@community/type-html-artifact

## Severity
low

## Validates With
- @community/fact-consistency-standards

## Severity Combination
```
>15% of text rows off the baseline grid           → WARN
adjacent columns desynchronized by >2px           → WARN
text rows align to baseline grid within 1px       → PASS
```

## Failure Mode
Designed pages feel 'almost right' — readers can't articulate the dissonance, but it reduces perceived craft. Compare a New York Times article (baseline-aligned) to a typical SaaS landing page (not) to feel the difference.

## Remediation
- Choose a baseline step (e.g. 8px or 24px), apply `line-height: <step>px` to body, and constrain heading `margin-top` / `margin-bottom` to multiples of the step.
- For mixed-size headings, use `font-size + leading-trim` (CSS `text-edge: cap alphabetic`) to recover predictable baselines — chrome 132+ supports it.
- If full baseline alignment is impractical, at least align the first line of adjacent columns.

## Exceptions
-
  - **Case**: Hero / display typography
  - **Allowed When**: Display-size text breaks baseline by design; the rule applies to body-and-caption regions, not hero.
-
  - **Case**: Single-column long-form
  - **Allowed When**: With one column, baseline-grid alignment is internally consistent so long as body line-height is constant.

## See Also
- @community/check-grid-baseline-aligned
