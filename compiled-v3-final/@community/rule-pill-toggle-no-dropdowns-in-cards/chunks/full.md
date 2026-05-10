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

## Applies To
Any card component that shows data (chart, metric, table) and allows the user to change the view/time range.

## Counter Example
```
    {/* WRONG — dropdown inside a card */}
    <div className="flex items-center justify-between mb-4">
      <h3>Revenue</h3>
      <select onChange={setPeriod}>
        <option value="1W">Last Week</option>
        <option value="1M">Last Month</option>
        <option value="3M">Last 3 Months</option>
      </select>
    </div>
  
```

## Examples
-       {/* CORRECT — pill toggle in card header, right side */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-semibold">Revenue</h3>
        <PillToggle options={["1W", "1M", "3M"]} active="1W" onChange={setPeriod} />
      </div>
      <AreaChart data={revenueData[period]} />
    

## Rationale
Dropdowns inside cards create a double-layered overflow problem: the dropdown menu renders outside the card boundary and requires z-index management. More importantly, it introduces a two-step interaction (click dropdown → select option) where a single-step pill toggle suffices for ≤3 options. Cards are meant to be self-contained views of a metric or dataset — complex filter UI belongs in the page-level filter zone, not embedded in individual cards. Extracted from StyleSeed DESIGN-LANGUAGE.md §10 and §18.

## Applies To
Any card component that shows data (chart, metric, table) and allows the user to change the view/time range.

## Counter Example
```
    {/* WRONG — dropdown inside a card */}
    <div className="flex items-center justify-between mb-4">
      <h3>Revenue</h3>
      <select onChange={setPeriod}>
        <option value="1W">Last Week</option>
        <option value="1M">Last Month</option>
        <option value="3M">Last 3 Months</option>
      </select>
    </div>
  
```
