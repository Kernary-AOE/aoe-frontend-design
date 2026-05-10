# CardsNotRequired [principle] v1.0.0
> Cards are a container of last resort, not a default layout primitive. Spacing and alignment create visual grouping naturally — most contexts that ship cards would be better served by typography and whitespace alone.
domain: frontend-design

## Use Cards Only When
- Content is genuinely discrete and independently actionable (calendar event, kanban card, notification item)
- Items require visual comparison in a scanning grid (product listings, team member directory)
- An explicit click/tap target boundary is required for the entire content block

## Never Use Cards When
- Wrapping a section header and its body content — spacing already groups these
- Nesting cards inside cards — use typography and dividers for hierarchy within a container
- The content is continuous prose — cards interrupt reading flow
- The card's only purpose is to add visual weight — this is decoration, not containment

## Sources

## Rationale
Cards communicate 'this is an isolated, actionable unit' — a strong semantic signal that is overused as a layout shortcut. When every content block is wrapped in a card, the card loses semantic meaning (everything is actionable and distinct) while adding visual noise (borders, shadows, corner radii multiply). Gestalt proximity and typographic hierarchy create grouping without containers; adding a card on top is redundant. Cards are appropriate when: (1) content is genuinely discrete and independently actionable; (2) items need visual comparison in a scanning grid; (3) content requires an explicit interaction boundary. Cards inside cards are never appropriate — they create nested containment semantics that the eye cannot parse.
