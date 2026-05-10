# AriaLabelRequired [rule] v1.0.0
Interactive elements that present no visible accessible name (icon-only buttons, icon-only links, image-only buttons) MUST carry a non-empty `aria-label` (or `aria-labelledby`, or visually-hidden text). Without an accessible name, screen-reader users hear 'button' with no context.
domain: accessibility

## Checks
- [ ] @community/check-aria-label-required

## Applies To
@community/type-html-artifact

## Severity
critical

## Severity Combination
```
icon-only button without aria-label              → BLOCK  (SC 4.1.2 Name, Role, Value)
icon-only link without aria-label                → BLOCK  (SC 2.4.4 Link Purpose)
aria-label is empty / generic ('button', 'icon') → BLOCK
aria-label present and descriptive               → PASS
```

## Failure Mode
Screen-reader users hear 'button' or 'image' with no purpose; voice-control users cannot say 'click X' because X has no name; the artifact fails WCAG Level A conformance.

## Remediation
- Add a meaningful aria-label: `<button aria-label='Close dialog'>×</button>`.
- Prefer visually-hidden text for screen-reader-only labels: `<button><span class='sr-only'>Close</span><svg ...></button>`. This survives translation tooling that ignores aria attrs.
- For toggle buttons, include the state: `aria-label='Mute audio'` plus `aria-pressed` rather than swapping the label string.
- For decorative icons inside a labeled button, mark the SVG with `aria-hidden='true'` so the icon does not double the announcement.

## Exceptions
-
  - **Case**: Decorative icon adjacent to text label
  - **Allowed When**: The button already has visible text; the icon is decorative — mark `aria-hidden='true'` on the SVG.
