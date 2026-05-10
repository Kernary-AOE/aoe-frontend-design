# LineLengthOptimal [rule] v1.0.0
Body text containers (paragraphs, list items, block quotes) MUST limit measure (line length) to between 45 and 75 characters per line. This range is the documented optimum for sustained reading — below 45ch the eye breaks rhythm, above 75ch it loses the next-line return.
domain: typography

## Checks
- [ ] @community/check-line-length-optimal

## Applies To
@community/type-html-artifact

## Severity
medium

## Severity Combination
```
body block measure > 90ch                  → BLOCK  (definitely fatiguing)
body block measure 75–90ch or 35–45ch      → WARN
body block measure 45–75ch                 → PASS
```

## Failure Mode
Readers fatigue, abandon, or stop returning. Lines longer than 75ch produce 'reading drift' where the eye skips lines; lines shorter than 45ch produce too many returns and break comprehension.

## Remediation
- Add `max-width: 65ch` to the body-copy container (e.g. `.prose`, `<article> p`).
- For multi-column layouts, set column width via `column-width: 30ch` rather than fixed pixel grids.
- If the page is full-bleed by design, restrict only the long-form content while letting media (images, code blocks) extend wider.

## Exceptions
-
  - **Case**: Code blocks
  - **Allowed When**: Source code commonly extends past 80ch and is read line-by-line; horizontal scroll is acceptable.
-
  - **Case**: Tabular data
  - **Allowed When**: Tables are scanned, not read linearly; column count drives width.
-
  - **Case**: CJK languages
  - **Allowed When**: Chinese / Japanese / Korean prefer ~30–40 full-width characters per line; the 45–75 range is for Latin script.
