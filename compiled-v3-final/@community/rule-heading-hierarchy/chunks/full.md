# HeadingHierarchy [rule] v1.0.0
Heading elements (`h1`–`h6`) MUST form a strict, gap-free hierarchy: exactly one `h1` per document, and each subsequent heading is at most one level deeper than its predecessor. Skipping levels (e.g. `h2` directly to `h4`) and using multiple `h1`s is forbidden.
domain: accessibility

## Checks
- [ ] @community/check-heading-hierarchy

## Applies To
@community/type-html-artifact

## Severity
high

## Severity Combination
```
document has 0 or >1 h1                       → BLOCK  (WCAG SC 1.3.1, 2.4.6)
heading level skip detected (e.g. h2 → h4)    → BLOCK
headings styled with non-heading tags         → WARN
```

## Failure Mode
Screen-reader users navigate by heading; broken hierarchy makes the document outline unintelligible. Search engines down-rank pages with malformed outlines. Visual-only 'big bold text' that is not an h-tag is invisible to assistive tech.

## Remediation
- Audit the heading outline with the WAVE or axe extension — verify a single h1 and contiguous levels.
- Replace styled `<div class='heading-lg'>` with a real `<h2>` (and style the h2).
- If a section truly has no parent heading, lift it to its proper level rather than jumping numbers.
- Use the HTML5 outline algorithm: each `<section>` resets the implicit level — but always verify with a real screen reader.

## Exceptions
-
  - **Case**: Standalone widgets without page context
  - **Allowed When**: An embedded widget (e.g. a third-party chat) renders inside a host page; the widget owns its internal hierarchy starting at h2 or below.

## Applies To
@community/type-html-artifact

## Severity
high

## Validates With
- @w3c/source-wcag-22

## Severity Combination
```
document has 0 or >1 h1                       → BLOCK  (WCAG SC 1.3.1, 2.4.6)
heading level skip detected (e.g. h2 → h4)    → BLOCK
headings styled with non-heading tags         → WARN
```

## Failure Mode
Screen-reader users navigate by heading; broken hierarchy makes the document outline unintelligible. Search engines down-rank pages with malformed outlines. Visual-only 'big bold text' that is not an h-tag is invisible to assistive tech.

## Remediation
- Audit the heading outline with the WAVE or axe extension — verify a single h1 and contiguous levels.
- Replace styled `<div class='heading-lg'>` with a real `<h2>` (and style the h2).
- If a section truly has no parent heading, lift it to its proper level rather than jumping numbers.
- Use the HTML5 outline algorithm: each `<section>` resets the implicit level — but always verify with a real screen reader.

## Exceptions
-
  - **Case**: Standalone widgets without page context
  - **Allowed When**: An embedded widget (e.g. a third-party chat) renders inside a host page; the widget owns its internal hierarchy starting at h2 or below.

## See Also
- @community/check-heading-hierarchy
