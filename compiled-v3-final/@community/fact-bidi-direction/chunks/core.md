# BidiDirection [fact] v1.0.0
RTL (right-to-left) scripts — Arabic, Hebrew, Persian, Urdu, Yiddish, Aramaic — require bidirectional text rendering specified by the Unicode Bidirectional Algorithm (UAX #9). Layouts must mirror, but specific elements (numerals, code, logos, media controls) must NOT mirror.
> The Unicode Bidirectional Algorithm (UAX #9) defines how mixed-direction text is laid out: paragraph-level direction (set by `dir='rtl'` or auto-detection from first strong character) plus per-character direction inherent in the Unicode codepoint (e.g. Latin letters are LTR, Arabic letters are RTL, digits 0-9 are weak). When `dir='rtl'` is set on the HTML root or container: (1) inline text flows right-to-left; (2) block layout flips — left becomes right, padding-left becomes the start side; (3) flexbox `row` reverses unless `flex-direction: row` is forced; (4) CSS logical properties (margin-inline-start, padding-inline-end, inset-inline) automatically adapt; (5) physical properties (margin-left, right) do NOT adapt. Native HTML elements with `dir='auto'` (e.g. <input>, <textarea>) detect direction from the first strong character per paragraph. The <bdi> element isolates user-supplied bidirectional content from surrounding context.
domain: i18n

## Confidence
strong

## Applies To
- Any product surface that renders content in Arabic, Hebrew, Persian, Urdu, Yiddish, Pashto, Sindhi, Dhivehi
- User-generated content displayed inline with chrome (comments, names, messages)
- Forms accepting RTL input (search boxes, content editors)
- Logos containing text — must NOT mirror; use brand asset
- Number-heavy interfaces (digits remain LTR even within RTL paragraphs — '123' reads left-to-right inside an Arabic sentence)

## Quantitative
- **Rtl Script Speakers**: Arabic ~420M, Persian/Farsi ~110M, Urdu ~230M, Hebrew ~9M — total ~770M RTL-script speakers globally
- **Elements That Mirror**: Layout: navigation, sidebars, breadcrumbs, progress bars, tab order. Icons: chevrons (next/prev), arrows, undo/redo, slide direction.
- **Elements That Do NOT Mirror**: Numbers (0-9 always LTR), code blocks, music notation, time-of-day '3:45', media playback controls (play/pause/stop), brand logos with text, phone numbers, scientific formulas
- **Bidi Control Chars**: U+202A LRE, U+202B RLE, U+202C PDF (deprecated for HTML — use <bdi>/<bdo> + dir attribute instead)

## Counter Conditions
- RTL is not just 'CSS direction: rtl' — chevrons, sliders, animation directions, and toast slide-ins all need mirroring; this is layout work, not a CSS one-liner.
- `text-align: right` is NOT equivalent to RTL. RTL paragraphs naturally start at the right; explicit text-align overrides natural flow and is usually wrong.
- Bidirectional embedding controls (LRE/RLE) must NEVER appear in HTML attributes or URL query strings — they cause security issues (RTL Override attack, CVE-2021-42574 'Trojan Source').
- Mixing CJK and RTL scripts (rare) requires explicit <bdi> / <bdo> wrapping; UAX #9 leaves some cases ambiguous.
- Mobile gesture conventions (swipe to go back) are physical-direction-anchored — iOS keeps swipe-from-left as 'back' regardless of RTL, but the visual chevron mirrors. Test on real devices.
