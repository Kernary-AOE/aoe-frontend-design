# RadixTabs [example] v1.0.0
Radix Tabs implements WAI-ARIA Authoring Practices for tabs: Tab/Shift+Tab moves focus into and out of the tablist; ArrowLeft/Right (or Up/Down with vertical orientation) moves focus between tabs WITHOUT activating; Space/Enter activates the focused tab. Optional 'activateOnFocus' prop switches to auto-activation. Underline indicator slides between tabs with framer-motion.
domain: accessibility

## Label
Radix UI — Tabs with Full Keyboard Support

## Url
https://www.radix-ui.com/primitives/docs/components/tabs

## Observed
2026-Q1

## Brand
radix

## Pattern Applied
@impeccable/template-tabs-keyboard

## Aesthetic Notes
- Tab list: horizontal flex with 1px solid border-b at the bottom, 24px gap between tabs.
- Tab trigger: 36px tall, 14px/500 text, color #71717A inactive, color #18181B active.
- Active indicator: 2px high underline below the active tab in #18181B (or accent color in branded variants).
- Focus ring: 2px outline #2563EB at 2px offset, only visible on keyboard focus (focus-visible).
- Disabled tab: opacity 0.5, pointer-events none, aria-disabled='true'.
- Vertical variant: tablist becomes flex-col with 1px right border; indicator becomes 2px-wide on right edge.

## What To Copy
- Decouple focus from activation — ArrowKeys move focus, Space/Enter activates. Auto-activation breaks screen-reader users.
- Use focus-visible (NOT :focus) for the focus ring — avoids ring on mouse click.
- Animated underline indicator uses transform/translateX (not width) — GPU-accelerated, never jitters.
- Always include aria-controls on each trigger pointing to the corresponding panel id.

## What To Skip
- Don't disable focus styles globally to remove the ring — it breaks keyboard nav. Use focus-visible to scope to keyboard only.

## Screenshot Hint
scout query: radix tabs underline indicator focus ring keyboard accessibility

## Demonstrates
- Focus-vs-activation separation is the WAI-ARIA standard for tabs and is mandatory for screen reader UX.
- focus-visible is the modern way to show focus rings only when relevant.
- Transform-based animations beat width-based for active indicators.

## Label
Radix UI — Tabs with Full Keyboard Support

## Url
https://www.radix-ui.com/primitives/docs/components/tabs

## Observed
2026-Q1

## Brand
radix

## Pattern Applied
@impeccable/template-tabs-keyboard

## Aesthetic Notes
- Tab list: horizontal flex with 1px solid border-b at the bottom, 24px gap between tabs.
- Tab trigger: 36px tall, 14px/500 text, color #71717A inactive, color #18181B active.
- Active indicator: 2px high underline below the active tab in #18181B (or accent color in branded variants).
- Focus ring: 2px outline #2563EB at 2px offset, only visible on keyboard focus (focus-visible).
- Disabled tab: opacity 0.5, pointer-events none, aria-disabled='true'.
- Vertical variant: tablist becomes flex-col with 1px right border; indicator becomes 2px-wide on right edge.

## What To Copy
- Decouple focus from activation — ArrowKeys move focus, Space/Enter activates. Auto-activation breaks screen-reader users.
- Use focus-visible (NOT :focus) for the focus ring — avoids ring on mouse click.
- Animated underline indicator uses transform/translateX (not width) — GPU-accelerated, never jitters.
- Always include aria-controls on each trigger pointing to the corresponding panel id.

## What To Skip
- Don't disable focus styles globally to remove the ring — it breaks keyboard nav. Use focus-visible to scope to keyboard only.

## Screenshot Hint
scout query: radix tabs underline indicator focus ring keyboard accessibility

## Demonstrates
- Focus-vs-activation separation is the WAI-ARIA standard for tabs and is mandatory for screen reader UX.
- focus-visible is the modern way to show focus rings only when relevant.
- Transform-based animations beat width-based for active indicators.
