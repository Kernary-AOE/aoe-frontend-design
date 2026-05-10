# InvisibleFocus [anti-pattern] v1.0.0
A broader category than @community/anti-pattern-outline-suppression: the focus ring exists in CSS but is effectively invisible — too low contrast (1.5:1 against background), only 1px wide, hidden by `overflow: hidden` clipping, the same color as the element background, or covered by a sibling element. Different from outright `outline: none` because the developer thinks they 'have a focus state' but visual verification reveals nothing.
domain: accessibility

## Label
Focus Indicator Present But Invisible

## Trap
After a designer hears 'don't use outline: none' they often replace it with `outline: 1px solid #d1d5db` — a barely-visible 1px hairline against a white card. They tested it, technically it appears, the audit report says 'focus visible' — but at normal screen distance no human can see it. Or they use `box-shadow` for the ring and a parent `overflow: hidden` clips it on certain components.

## Counter Examples
- @community/counter-example-low-contrast-focus

## Detection Heuristics
- Focus ring color contrast against background is below 3:1 (WCAG 2.2 SC 1.4.11 minimum)
- Focus ring width is 1px — fails minimum perimeter requirement
- Focus ring uses `box-shadow` and a parent has `overflow: hidden` clipping the shadow
- Focus ring color matches background tone (`outline: 1px solid #f3f4f6` on `bg: white`)
- Tabbing through the page: visual indication exists but you have to squint to find it
- Custom buttons override outline with a focus state that uses the same color as :hover (no differentiation)

## Remediation
- Use `outline: 2px solid` (minimum) with `outline-offset: 2px` so the ring sits clear of the element edge.
- Ensure focus-ring color has 3:1 contrast against both the component background AND adjacent surfaces.
- Prefer `outline` over `box-shadow` — outlines aren't clipped by parent `overflow: hidden`.
- Use a high-contrast focus token: `--ring: oklch(60% 0.18 250)` paired with `--ring-offset: white/black`.
- For brand-colored buttons, the focus ring may need to invert (white ring on dark button, dark ring on light button).
- Test: take a screenshot of the focused state, ask 'can I find the focused element in 1 second?' — if not, increase contrast or width.
- Reference @community/value-focus-outline-width and @community/template-focus-ring.

## Severity
critical

## Label
Focus Indicator Present But Invisible

## Trap
After a designer hears 'don't use outline: none' they often replace it with `outline: 1px solid #d1d5db` — a barely-visible 1px hairline against a white card. They tested it, technically it appears, the audit report says 'focus visible' — but at normal screen distance no human can see it. Or they use `box-shadow` for the ring and a parent `overflow: hidden` clips it on certain components.

## Counter Examples
- @community/counter-example-low-contrast-focus

## Detection Heuristics
- Focus ring color contrast against background is below 3:1 (WCAG 2.2 SC 1.4.11 minimum)
- Focus ring width is 1px — fails minimum perimeter requirement
- Focus ring uses `box-shadow` and a parent has `overflow: hidden` clipping the shadow
- Focus ring color matches background tone (`outline: 1px solid #f3f4f6` on `bg: white`)
- Tabbing through the page: visual indication exists but you have to squint to find it
- Custom buttons override outline with a focus state that uses the same color as :hover (no differentiation)

## Remediation
- Use `outline: 2px solid` (minimum) with `outline-offset: 2px` so the ring sits clear of the element edge.
- Ensure focus-ring color has 3:1 contrast against both the component background AND adjacent surfaces.
- Prefer `outline` over `box-shadow` — outlines aren't clipped by parent `overflow: hidden`.
- Use a high-contrast focus token: `--ring: oklch(60% 0.18 250)` paired with `--ring-offset: white/black`.
- For brand-colored buttons, the focus ring may need to invert (white ring on dark button, dark ring on light button).
- Test: take a screenshot of the focused state, ask 'can I find the focused element in 1 second?' — if not, increase contrast or width.
- Reference @community/value-focus-outline-width and @community/template-focus-ring.

## Severity
critical
