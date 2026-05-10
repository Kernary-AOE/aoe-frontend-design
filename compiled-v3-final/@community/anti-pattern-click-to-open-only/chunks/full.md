# ClickToOpenOnly [anti-pattern] v1.0.0
Building drawers, dropdowns, modals, or accordions that respond exclusively to `onClick` mouse events — with no keyboard activation (Enter/Space), no escape-to-close, no focus trap, no ARIA disclosure semantics. The component is a `<div onClick>` that mouse users can operate and nobody else can.
domain: accessibility

## Label
Drawer / Dropdown Bound Only To Mouse Click

## Trap
React documentation often shows `<div onClick>` as the simplest disclosure example. AI agents replicate the pattern without adding the keyboard layer because the prompt asked for 'a dropdown menu' and the click handler made it look like one. The fix requires multiple changes (button element, key handlers, focus management, aria attributes) so it's frequently skipped.

## Counter Examples
- @community/counter-example-div-onclick-dropdown

## Detection Heuristics
- Disclosure trigger is a `<div>` or `<span>` with `onClick`, not a `<button>`
- No `onKeyDown` handler for Enter/Space on the trigger element
- Dropdown/drawer doesn't close on Escape key
- No `aria-expanded`, `aria-controls`, or `aria-haspopup` attributes
- Tab navigation skips the trigger entirely — no `tabindex='0'` or native focusable element
- Touch on iOS/Android works inconsistently because click events are flaky on `<div>` taps

## Remediation
- Use a real `<button>` element for the trigger — gets keyboard, touch, and screen reader support free.
- Add `aria-expanded={isOpen}` and `aria-controls={panelId}` to the trigger.
- Bind `onKeyDown` handler: Escape closes, ArrowDown moves focus into menu (for menus).
- Use Radix UI / Headless UI / Reach UI primitives instead of rolling your own — they handle all of this.
- Reference @community/pattern-drawer-side and @community/example-radix-dropdown for canonical patterns.
- Test with Tab + Enter + Escape only (mouse unplugged) before merging.

## Severity
critical

## Label
Drawer / Dropdown Bound Only To Mouse Click

## Trap
React documentation often shows `<div onClick>` as the simplest disclosure example. AI agents replicate the pattern without adding the keyboard layer because the prompt asked for 'a dropdown menu' and the click handler made it look like one. The fix requires multiple changes (button element, key handlers, focus management, aria attributes) so it's frequently skipped.

## Counter Examples
- @community/counter-example-div-onclick-dropdown

## Detection Heuristics
- Disclosure trigger is a `<div>` or `<span>` with `onClick`, not a `<button>`
- No `onKeyDown` handler for Enter/Space on the trigger element
- Dropdown/drawer doesn't close on Escape key
- No `aria-expanded`, `aria-controls`, or `aria-haspopup` attributes
- Tab navigation skips the trigger entirely — no `tabindex='0'` or native focusable element
- Touch on iOS/Android works inconsistently because click events are flaky on `<div>` taps

## Remediation
- Use a real `<button>` element for the trigger — gets keyboard, touch, and screen reader support free.
- Add `aria-expanded={isOpen}` and `aria-controls={panelId}` to the trigger.
- Bind `onKeyDown` handler: Escape closes, ArrowDown moves focus into menu (for menus).
- Use Radix UI / Headless UI / Reach UI primitives instead of rolling your own — they handle all of this.
- Reference @community/pattern-drawer-side and @community/example-radix-dropdown for canonical patterns.
- Test with Tab + Enter + Escape only (mouse unplugged) before merging.

## Severity
critical
