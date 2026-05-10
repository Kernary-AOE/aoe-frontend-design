# OutlineSuppression [anti-pattern] v1.0.0
The practice of suppressing browser-default focus outlines globally via CSS resets (`* { outline: none }` or `a:focus { outline: 0 }`) without providing custom focus indicators. This remains one of the most common WCAG failures on the web despite being trivially detectable and fixable.
domain: accessibility

## Label
Global Focus Outline Suppression

## Trap
Many CSS resets (including older versions of Normalize.css and custom resets) included blanket outline removal as 'cleanup'. Developers copy these resets without understanding the accessibility implications. The visual motivation — removing the blue browser ring on mouse click — is legitimate, but the solution is wrong.

## Counter Examples
- @community/counter-example-outline-none

## Detection
@community/check-focus-visible

## Detection Heuristics
- CSS contains `outline: none`, `outline: 0`, or `outline: initial` in a rule targeting `:focus` without a corresponding custom indicator
- axe-core rule `scrollable-region-focusable` or `focus-trap` fires
- Lighthouse accessibility audit reports `[tabindex]:not(:focus-visible)`
- Tab-navigate the page: focused elements have no visible indicator

## Remediation
- Replace `*:focus { outline: none }` with `*:focus:not(:focus-visible) { outline: none }` — this preserves keyboard rings while removing mouse-click rings.
- Add global `:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }` as the base style.
- Use @community/value-focus-outline-width (2px) as the standard outline width.
- For custom components, apply per-component `:focus-visible` styles that match the component's visual design.

## Severity
critical

## Label
Global Focus Outline Suppression

## Trap
Many CSS resets (including older versions of Normalize.css and custom resets) included blanket outline removal as 'cleanup'. Developers copy these resets without understanding the accessibility implications. The visual motivation — removing the blue browser ring on mouse click — is legitimate, but the solution is wrong.

## Counter Examples
- @community/counter-example-outline-none

## Detection
@community/check-focus-visible

## Detection Heuristics
- CSS contains `outline: none`, `outline: 0`, or `outline: initial` in a rule targeting `:focus` without a corresponding custom indicator
- axe-core rule `scrollable-region-focusable` or `focus-trap` fires
- Lighthouse accessibility audit reports `[tabindex]:not(:focus-visible)`
- Tab-navigate the page: focused elements have no visible indicator

## Remediation
- Replace `*:focus { outline: none }` with `*:focus:not(:focus-visible) { outline: none }` — this preserves keyboard rings while removing mouse-click rings.
- Add global `:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }` as the base style.
- Use @community/value-focus-outline-width (2px) as the standard outline width.
- For custom components, apply per-component `:focus-visible` styles that match the component's visual design.

## Severity
critical
