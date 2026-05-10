# IconOnlyExpansionTriggers [anti-pattern] v1.0.0
Hiding secondary or advanced options behind unlabeled icon buttons — a caret (›), chevron (⌄), ellipsis (⋯), or gear (⚙) — with no visible text label, leaving new users unable to discover what the button reveals without clicking it.
domain: frontend-design

## Label
Icon-Only Expansion Triggers Without Labels

## Trap
Saves horizontal space and keeps the primary UI clean. Developers familiar with the system understand all icons intuitively — they forget new users do not share this mental model.

## Consequence
Icon-only expansion triggers are opaque to new users. They fail discoverability entirely: users cannot know what is hidden without guessing. They also fail accessibility when the button has no accessible name, making them invisible to screen readers.

## Detection Heuristics
- A button containing only an SVG icon with no visible text and no aria-label
- A caret or chevron button with no label text explaining what it expands
- An ellipsis (⋯) or 'more' icon that expands a menu — with no label saying 'More options'
- Power-user features only discoverable by hovering over unlabeled icon buttons
- User research: 'I didn't know that button was there' for secondary feature entry points

## Remediation
- Add a visible text label next to the icon: 'More options', 'Advanced settings', 'Expand'.
- If space is truly constrained, use a tooltip with role=tooltip + aria-describedby — but ALSO add aria-label to the button itself.
- For icon-only buttons in toolbars where context is clear (bold/italic), always provide aria-label for accessibility even without visible text.
- Use text disclosure: 'Show advanced options ›' as a text-link pattern instead of an icon button.

## Severity
warning

## Label
Icon-Only Expansion Triggers Without Labels

## Trap
Saves horizontal space and keeps the primary UI clean. Developers familiar with the system understand all icons intuitively — they forget new users do not share this mental model.

## Consequence
Icon-only expansion triggers are opaque to new users. They fail discoverability entirely: users cannot know what is hidden without guessing. They also fail accessibility when the button has no accessible name, making them invisible to screen readers.

## Detection Heuristics
- A button containing only an SVG icon with no visible text and no aria-label
- A caret or chevron button with no label text explaining what it expands
- An ellipsis (⋯) or 'more' icon that expands a menu — with no label saying 'More options'
- Power-user features only discoverable by hovering over unlabeled icon buttons
- User research: 'I didn't know that button was there' for secondary feature entry points

## Remediation
- Add a visible text label next to the icon: 'More options', 'Advanced settings', 'Expand'.
- If space is truly constrained, use a tooltip with role=tooltip + aria-describedby — but ALSO add aria-label to the button itself.
- For icon-only buttons in toolbars where context is clear (bold/italic), always provide aria-label for accessibility even without visible text.
- Use text disclosure: 'Show advanced options ›' as a text-link pattern instead of an icon button.

## Severity
warning
