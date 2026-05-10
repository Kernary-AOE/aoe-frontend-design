# FontWeightNotStyle [rule] v1.0.0
Font weight variation MUST be expressed via `font-weight` values (400, 510, 700) using a typeface that ships those weights — never via `font-style: oblique` or browser-synthesized faux-bold (`font-weight: bold` on a single-weight font).
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
high

## Remediation
- Load only the weights you actually use in @font-face (woff2 subset by weight).
- For variable fonts: declare `font-weight: 100 900;` in the @font-face range and let the single file handle all weights.
- Avoid `font-weight: bold` as a shorthand — use numeric values (700) so you know exactly what weight is requested.
- Check browser DevTools font panel for 'synthesized bold' warnings — these are hard failures.

## Exceptions
-
  - **Case**: System font stacks
  - **Allowed When**: System-ui / -apple-system — the OS provides all weights natively; synthesis does not occur.

## Rationale
Browser-synthesized bold works by algorithmically slanting and widening glyph outlines — it produces visibly distorted letterforms with uneven stroke weights and poor optical balance. Type designers spend years perfecting weight transitions; the browser's synthetic substitution destroys that work. Similarly, CSS `font-style: italic` on a sans-serif font that ships no italic causes the browser to slant upright glyphs into a fake oblique — missing the humanist curves of a true italic cut. The rule requires loading the actual weight file.

## Applies To
@community/type-html-artifact

## Severity
high

## Remediation
- Load only the weights you actually use in @font-face (woff2 subset by weight).
- For variable fonts: declare `font-weight: 100 900;` in the @font-face range and let the single file handle all weights.
- Avoid `font-weight: bold` as a shorthand — use numeric values (700) so you know exactly what weight is requested.
- Check browser DevTools font panel for 'synthesized bold' warnings — these are hard failures.

## Exceptions
-
  - **Case**: System font stacks
  - **Allowed When**: System-ui / -apple-system — the OS provides all weights natively; synthesis does not occur.
