# PillToggleNoDropdownsInCards [rule] v1.0.0
Inside a data card, the only allowed selection UI is a pill toggle with 2–3 options in the card header — select dropdowns, radio groups, and checkboxes inside cards are prohibited.
>     Inside a data card:
    ALLOWED selection controls:
    - Capsule pill toggle with 2–3 options, placed in the card header right side only.
      Example: 1W / 1M / 3M on a chart card.
    - Tapping a chart element (donut segment, bar) to select/highlight it.

    PROHIBITED inside cards:
    - Select dropdowns (▼ arrow) — opening a dropdown inside a card breaks the card's visual containment.
    - Radio button groups — too much vertical space; use a pill toggle instead.
    - Checkbox filters — belong in a filter panel above/beside the card, not inside it.
    - Toggles with ≥4 options — truncate to 3 maximum or move to a filter panel.
    - Pill toggles placed inside the card body (content area) — header-right placement only.
  
domain: frontend-design
