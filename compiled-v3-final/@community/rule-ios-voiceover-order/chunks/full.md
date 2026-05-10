# IosVoiceoverOrder [rule] v1.0.0
> Ensure VoiceOver reads elements in a logical, content-meaningful order; use .accessibilitySortPriority() to override layout-driven order when the visual position produces a nonsensical traversal sequence.
domain: frontend-design

## Applies To
any iOS screen where visual layout order does not match logical reading order (e.g., multi-column layouts, overlaid cards, Z-layered views)

## Examples
- A product card with price on the left and rating on the right: ensure price is read before rating.
- .accessibilityElement(children: .combine) on a label+value row to announce them as one unit.
- Verify: navigate with VoiceOver swipe-right; elements must be announced in semantic, not positional, order.

## Rationale
Out-of-order VoiceOver navigation is disorienting and can make content incomprehensible for blind users. Two-column or grid layouts are frequently read in Z-order (top-left → top-right → second-left → second-right) when a row-first order would be semantically correct.

## Applies To
any iOS screen where visual layout order does not match logical reading order (e.g., multi-column layouts, overlaid cards, Z-layered views)
