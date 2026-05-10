# BreakingKeyboardFlow [anti-pattern] v1.0.0
Re-implementing a `<button>`, `<a>`, `<input>`, or `<select>` as a custom `<div>` for styling reasons, without restoring the native keyboard semantics. The `<div onClick>` is unreachable by Tab, doesn't activate on Enter or Space, doesn't have a role, and isn't announced as interactive by screen readers. Tab order silently skips the entire control.
domain: accessibility

## Label
Custom `<div>` Replaces Native Element And Loses Keyboard Reachability

## Trap
Native form elements are notoriously hard to style consistently across browsers — `<select>` particularly. Designers ask for a custom dropdown that 'doesn't look like the OS one'. Engineers reach for `<div>` because it has no inherited styles to fight. The accessibility cost is invisible until QA, by which point the design is shipped and the keyboard layer is an afterthought.

## Counter Examples
- @community/counter-example-div-button-no-tabindex

## Detection Heuristics
- Interactive elements are `<div>` or `<span>` with `onClick`, missing `tabindex='0'`
- No `role='button'`, `role='link'`, or matching ARIA role on the custom element
- Tab key skips the element entirely — not in tab order
- Element responds to mouse click but not Enter/Space keys
- axe-core rule `interactive-supports-focus` or `aria-required-children` fires
- Screen reader announces 'group' or nothing when the custom control receives focus

## Remediation
- First choice: use the native element. `<button>` styled with CSS can match any visual design — `appearance: none; all: unset;` removes UA styles.
- If you must use `<div>`: add `role='button'`, `tabindex='0'`, AND `onKeyDown` handler for Enter/Space.
- Set `aria-disabled='true'` instead of removing tabindex when temporarily disabling.
- Custom inputs: link a hidden native `<input>` to the visual element so form submission and keyboard navigation work.
- Reference @community/rule-keyboard-accessible for the canonical checklist.
- Never use `tabindex` values greater than 0 — they break the natural tab order.

## Severity
critical

## Label
Custom `<div>` Replaces Native Element And Loses Keyboard Reachability

## Trap
Native form elements are notoriously hard to style consistently across browsers — `<select>` particularly. Designers ask for a custom dropdown that 'doesn't look like the OS one'. Engineers reach for `<div>` because it has no inherited styles to fight. The accessibility cost is invisible until QA, by which point the design is shipped and the keyboard layer is an afterthought.

## Counter Examples
- @community/counter-example-div-button-no-tabindex

## Detection Heuristics
- Interactive elements are `<div>` or `<span>` with `onClick`, missing `tabindex='0'`
- No `role='button'`, `role='link'`, or matching ARIA role on the custom element
- Tab key skips the element entirely — not in tab order
- Element responds to mouse click but not Enter/Space keys
- axe-core rule `interactive-supports-focus` or `aria-required-children` fires
- Screen reader announces 'group' or nothing when the custom control receives focus

## Remediation
- First choice: use the native element. `<button>` styled with CSS can match any visual design — `appearance: none; all: unset;` removes UA styles.
- If you must use `<div>`: add `role='button'`, `tabindex='0'`, AND `onKeyDown` handler for Enter/Space.
- Set `aria-disabled='true'` instead of removing tabindex when temporarily disabling.
- Custom inputs: link a hidden native `<input>` to the visual element so form submission and keyboard navigation work.
- Reference @community/rule-keyboard-accessible for the canonical checklist.
- Never use `tabindex` values greater than 0 — they break the natural tab order.

## Severity
critical
