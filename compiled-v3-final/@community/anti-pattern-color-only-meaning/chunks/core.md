# ColorOnlyMeaning [anti-pattern] v1.0.0
Communicating state — error vs success vs warning, valid vs invalid, online vs offline, required vs optional — through color alone, with no icon, label, or text differentiation. Red 'Error' input borders, green 'Success' chip backgrounds, yellow 'Warning' rows. Users with color blindness (~8% of men), low vision, or in dark mode (where the saturation flattens) cannot distinguish the states.
domain: accessibility

## Label
Status / Validity Indicated Only By Color

## Trap
Color is the most efficient signal for designers — one CSS property communicates an entire state. Adding an icon or label feels redundant when the red is so obviously wrong. But ~1 in 12 men cannot distinguish red from green; many more struggle with red-on-dark-mode contrast. AI agents follow the design directly without adding the secondary signal.

## Counter Examples
- @community/counter-example-status-color-only

## Detection Heuristics
- Form field error state changes only `border-color` to red — no icon, no error message text on the field
- Status chip differentiates 'success/warning/error' purely by background color with same label structure
- Required-field indicator is a red asterisk with no `aria-required` or text 'required'
- Chart legend uses only color swatches — no patterns, labels, or shapes
- Row in a table is highlighted yellow to mean 'flagged' with no other indicator
- axe-core rule `color-contrast` may pass while WCAG 1.4.1 (Use of Color) still fails

## Remediation
- Pair every color signal with a non-color indicator: icon + color + label.
- Form errors: red border + ⚠ icon + error message text below the input + `aria-invalid='true'` + `aria-describedby` linking to the message.
- Status chips: include a status icon (✓ ⚠ ✕) and the status word, not just background color.
- Required fields: visible 'Required' label or `*` + `aria-required='true'` + a legend.
- Charts: combine color with patterns (dashed/solid lines, dot/triangle markers).
- Test with grayscale filter (Chrome devtools → Rendering → Emulate vision deficiencies → Achromatopsia).
- Satisfies WCAG 1.4.1 (Use of Color, Level A).

## Severity
critical
