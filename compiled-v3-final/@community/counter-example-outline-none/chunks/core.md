# OutlineNone [counter-example] v1.0.0
A widespread CSS anti-practice of globally suppressing focus outlines in base stylesheets or CSS resets, usually added because designers disliked the browser's default blue focus ring appearing on mouse clicks. The typical form: `* { outline: none }`, `a:focus { outline: 0 }`, or `button:focus { outline: none }`.
domain: accessibility

## Label
Blanket `outline: none` / `outline: 0` Reset

## Failures
- Completely removes keyboard navigation affordance — keyboard users cannot see where focus is.
- Violates WCAG 2.2 SC 2.4.11 (Level AA) and SC 2.4.7 (Level AA).
- Fails WCAG SC 1.4.11 Non-text Contrast at the UI component level.
- Often applied globally, meaning even developers who add custom focus styles on specific components have those styles wiped by the reset.
- Frequently copied from StackOverflow answers circa 2012–2016 that predate modern best practices.

## Detection
@community/check-focus-visible

## Remediation
- Use `:focus-visible` to show rings only during keyboard navigation: `:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }`
- Never use `outline: none` without a matching custom focus indicator on the same element.
- Remove blanket outline resets from global stylesheets; apply `:focus:not(:focus-visible) { outline: none }` if mouse-click rings are undesired.
