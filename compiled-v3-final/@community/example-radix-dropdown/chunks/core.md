# RadixDropdown [example] v1.0.0
Radix DropdownMenu opens on click or Space/Enter, supports ArrowUp/Down for item navigation, ArrowRight to open submenus, ArrowLeft to close back to parent, Home/End to jump to first/last, and type-ahead (typing 'p' jumps to the first item starting with P). Supports separators, item indicators (check/radio), and disabled state.
domain: accessibility

## Label
Radix UI — DropdownMenu with Keyboard Nav

## Url
https://www.radix-ui.com/primitives/docs/components/dropdown-menu

## Observed
2026-Q1

## Brand
radix

## Pattern Applied
@impeccable/template-dropdown-menu

## Aesthetic Notes
- Trigger: standard button styling with a 12px chevron-down icon, 8px gap.
- Content: min-width matches trigger, white #FFFFFF bg, 1px solid #E5E7EB border, 8px border-radius, padding 4px.
- Item: 32px tall, 8px horizontal padding, 14px text, hover/highlighted bg #F3F4F6.
- Submenu trigger: shows chevron-right icon at right, opens on hover (300ms delay) or ArrowRight.
- Separator: 1px solid #E5E7EB with 4px vertical margin.
- Item indicator (CheckboxItem/RadioItem): 16px area at left for checkmark, label indented accordingly.
- Animation: 150ms slide-in from trigger direction (origin-top, scale 0.95 → 1).

## What To Copy
- Type-ahead is the highest-ROI keyboard feature on long menus — Radix's default.
- Submenu hover-delay (~300ms) prevents accidental opens during cursor traversal.
- Use proper ARIA roles: role=menu, role=menuitem, role=menuitemcheckbox/radio with aria-checked.
- Animation origin should match the trigger direction — top trigger → scale from top, etc.

## What To Skip
- Don't use DropdownMenu for navigation — it has menu semantics, not link semantics. Use NavigationMenu instead.

## Screenshot Hint
scout query: radix dropdown menu keyboard navigation submenu indicator

## Demonstrates
- Full WAI-ARIA menu pattern requires ArrowKey nav + type-ahead + Home/End.
- Hover-delay on submenu triggers prevents 'flicker hell' during diagonal traversal.
- Animation origin from trigger direction makes popovers feel anchored, not floating.
