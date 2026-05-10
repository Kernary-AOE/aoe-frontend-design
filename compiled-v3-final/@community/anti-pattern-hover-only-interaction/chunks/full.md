# HoverOnlyInteraction [anti-pattern] v1.0.0
Building tooltips, hover cards, mega-menus, or row-action buttons that only appear on `:hover` or `mouseenter`, with no equivalent for keyboard focus or touch tap. On mobile devices (no hover), the content is unreachable. For keyboard users, the trigger never activates because focus doesn't fire `:hover`.
domain: accessibility

## Label
Tooltip / Submenu / Reveal Triggered Only By Hover

## Trap
Hover is the easiest desktop interaction to wire up — `:hover` in CSS is one selector. The mobile and keyboard equivalents need JavaScript and accessibility plumbing. AI-generated code routinely produces `:hover { display: block }` because the prompt asked for 'a tooltip on hover' and the agent took that literally.

## Counter Examples
- @community/counter-example-tooltip-hover-only

## Detection Heuristics
- CSS rule reveals content only on `:hover` with no matching `:focus` or `:focus-visible` selector
- Submenu opens via `onMouseEnter` with no `onFocus` or click toggle
- Row-hover action buttons (`opacity: 0` → `opacity: 1` on hover) have no keyboard or touch equivalent
- On a touch device, the content is impossible to trigger or requires double-tap
- Tab navigation focuses the trigger but no popup appears
- Tooltip content contains required information (price, deadline) — not just decoration

## Remediation
- Pair every `:hover` selector with `:focus-visible` (and often `:focus-within`).
- For touch: convert hover-trigger to click/tap toggle, or use `@media (hover: hover)` to gate hover behavior.
- Tooltips with critical content should be persistent or revealed on focus — never hover-only.
- Use proper `role='tooltip'` + `aria-describedby` so screen readers see the content.
- Apply Radix UI Tooltip or similar primitive — they handle hover + focus + touch + dismiss correctly.
- Run keyboard-only and touch-only smoke tests before merging.

## Severity
critical

## Label
Tooltip / Submenu / Reveal Triggered Only By Hover

## Trap
Hover is the easiest desktop interaction to wire up — `:hover` in CSS is one selector. The mobile and keyboard equivalents need JavaScript and accessibility plumbing. AI-generated code routinely produces `:hover { display: block }` because the prompt asked for 'a tooltip on hover' and the agent took that literally.

## Counter Examples
- @community/counter-example-tooltip-hover-only

## Detection Heuristics
- CSS rule reveals content only on `:hover` with no matching `:focus` or `:focus-visible` selector
- Submenu opens via `onMouseEnter` with no `onFocus` or click toggle
- Row-hover action buttons (`opacity: 0` → `opacity: 1` on hover) have no keyboard or touch equivalent
- On a touch device, the content is impossible to trigger or requires double-tap
- Tab navigation focuses the trigger but no popup appears
- Tooltip content contains required information (price, deadline) — not just decoration

## Remediation
- Pair every `:hover` selector with `:focus-visible` (and often `:focus-within`).
- For touch: convert hover-trigger to click/tap toggle, or use `@media (hover: hover)` to gate hover behavior.
- Tooltips with critical content should be persistent or revealed on focus — never hover-only.
- Use proper `role='tooltip'` + `aria-describedby` so screen readers see the content.
- Apply Radix UI Tooltip or similar primitive — they handle hover + focus + touch + dismiss correctly.
- Run keyboard-only and touch-only smoke tests before merging.

## Severity
critical
