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
