# ContentWidthConstrained [rule] v1.0.0
Long-form content containers (article, blog post, documentation, prose) MUST cap their width at approximately 65ch (≈ 720px at 16px/1ch). Full-bleed layouts force readers to track lines wider than the eye can follow, increasing fatigue and abandonment.
domain: typography

## Checks
- [ ] @community/check-content-width-constrained

## Applies To
@community/type-html-artifact

## Severity
medium

## Severity Combination
```
long-form container has no max-width                     → BLOCK
long-form container max-width > 90ch                     → BLOCK
long-form container max-width 75–90ch                    → WARN
long-form container max-width 60–75ch                    → PASS
```

## Failure Mode
Articles read like website copy at 1440px-wide; readers' eyes lose track of the next line; bounce rate on read-time-3min+ pages spikes. Search engines (Core Web Vitals beyond) increasingly weight readability metrics.

## Remediation
- Set the article wrapper: `article { max-width: 65ch; margin-inline: auto; }`.
- Allow media (figures, code blocks, callouts) to extend wider via `figure { max-width: 90ch; margin-inline: -clamp(0px, 12vw, 200px); }`.
- Combine with @community/rule-line-length-optimal at the paragraph level for defense-in-depth.
- Use `ch` units, not `px` — `ch` adapts to font choice.

## Exceptions
-
  - **Case**: Reference / API documentation with code-heavy content
  - **Allowed When**: Code samples need ≥ 80ch; the doc may run 80–90ch and rely on code being the primary content.
-
  - **Case**: Two-column layout
  - **Allowed When**: A `column-width: 30ch` two-column layout achieves comfortable measure at wider container widths.

## Applies To
@community/type-html-artifact

## Severity
medium

## Validates With
- @community/fact-optimal-line-length

## Severity Combination
```
long-form container has no max-width                     → BLOCK
long-form container max-width > 90ch                     → BLOCK
long-form container max-width 75–90ch                    → WARN
long-form container max-width 60–75ch                    → PASS
```

## Failure Mode
Articles read like website copy at 1440px-wide; readers' eyes lose track of the next line; bounce rate on read-time-3min+ pages spikes. Search engines (Core Web Vitals beyond) increasingly weight readability metrics.

## Remediation
- Set the article wrapper: `article { max-width: 65ch; margin-inline: auto; }`.
- Allow media (figures, code blocks, callouts) to extend wider via `figure { max-width: 90ch; margin-inline: -clamp(0px, 12vw, 200px); }`.
- Combine with @community/rule-line-length-optimal at the paragraph level for defense-in-depth.
- Use `ch` units, not `px` — `ch` adapts to font choice.

## Exceptions
-
  - **Case**: Reference / API documentation with code-heavy content
  - **Allowed When**: Code samples need ≥ 80ch; the doc may run 80–90ch and rely on code being the primary content.
-
  - **Case**: Two-column layout
  - **Allowed When**: A `column-width: 30ch` two-column layout achieves comfortable measure at wider container widths.

## See Also
- @community/check-content-width-constrained
