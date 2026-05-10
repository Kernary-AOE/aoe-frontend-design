# PopoverVsTooltip [rule] v1.0.0
> Use a tooltip (role=tooltip, hover+focus triggered, short text only) for supplementary labels ≤ 1 line with no interactive content. Use a popover (role=dialog or role=region, click triggered, focus-managed) for any content exceeding 1 line, containing interactive elements (links, buttons, forms), or requiring user action.
domain: frontend-design

## Label
Choose Popover or Tooltip Based on Content Complexity

## Decision Tree
```
    Content is ≤ 1 short line AND read-only AND no links/buttons?
      YES → tooltip (role=tooltip, hover+focus, Esc dismisses)
       NO → popover (role=dialog/region, click to open, focus moves inside, Esc dismisses)

    Examples of tooltips:
      - Icon button label: "Filter results"
      - Keyboard shortcut hint: "Bold (⌘B)"
      - Field constraint hint: "Must be 8–32 characters"

    Examples of popovers:
      - Color picker activated by a swatch button
      - Date picker calendar triggered by a date input
      - "Learn more" overlay with paragraphs and a link
      - Confirmation prompt: "Are you sure?" with two buttons
      - Rich user profile card with avatar, name, role, and contact links
  
```

## Anti Patterns
- Interactive links or buttons inside a role=tooltip — users cannot Tab to them; touch users cannot access them.
- Popover triggered on hover only — hovered state is unavailable on touch and unreliable on keyboard.
- Using a tooltip as a substitute for an accessible name (aria-label) on the control itself.
- Popover without focus management — focus stays on the trigger while the popover is open.

## Severity
warning
