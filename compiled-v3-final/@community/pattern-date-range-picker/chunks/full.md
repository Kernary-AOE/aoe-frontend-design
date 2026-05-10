# DateRangePicker [pattern] v1.0.0
A dual-month calendar popover for selecting a start and end date in one flow, with preset shortcuts (Last 7 days, This month, Custom). Used in analytics filters, booking systems, and report selectors.
domain: frontend-design

## Facts

## Label
Date Range Picker

## Problem
Selecting a start and end date with two separate inputs is slow and error-prone (end before start, mismatched formats). Users need to see both endpoints in calendar context.

## Solution
A popover containing two side-by-side month grids. Click first day to set start, click second day to set end; the in-between range is highlighted. Preset shortcuts on the left handle common spans.

## Structure
```
    <div class="date-range">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded="true"
        aria-controls="dr-popover"
      >
        Apr 1, 2026 - Apr 27, 2026
      </button>

      <div
        id="dr-popover"
        role="dialog"
        aria-label="Choose date range"
        class="popover"
      >
        <aside class="presets">
          <button>Today</button>
          <button>Yesterday</button>
          <button>Last 7 days</button>
          <button>Last 30 days</button>
          <button>This month</button>
          <button aria-pressed="true">Custom</button>
        </aside>
        <div class="months">
          <div role="grid" aria-label="March 2026"></div>
          <div role="grid" aria-label="April 2026"></div>
        </div>
        <footer>
          <span class="summary">Apr 1 - Apr 27 (27 days)</span>
          <button>Cancel</button>
          <button class="primary">Apply</button>
        </footer>
      </div>
    </div>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- First click sets start; second click sets end. If second click is before start, swap them.
- Hovering after start-only state previews the would-be range with a soft highlight.
- Preset buttons immediately set start+end and update both calendars.
- Arrow keys move focused day; Enter selects; Esc closes the popover.
- Range crossing months: highlight all days in between with a subtle band.
- Disabled dates (e.g., before today for booking) get `aria-disabled='true'` and are unfocusable.
- Apply commits and closes; Cancel discards staged changes.

## A11y
- Popover uses `role='dialog'` with an accessible name like 'Choose date range'.
- Each month uses ARIA grid pattern with `role='grid'`, `role='row'`, `role='gridcell'`.
- Selected start and end days use `aria-selected='true'`; in-between days use `aria-selected='false'` but visually highlighted.
- Provide a text summary ('Apr 1 - Apr 27, 27 days') in an `aria-live='polite'` region updating on selection.
- Allow direct text input as a fallback (formatted YYYY-MM-DD) for keyboard users who do not want grid navigation.

## Examples
- @community/example-stripe-date-filter
- @community/example-vercel-analytics-range
- @community/example-airbnb-booking

## Label
Date Range Picker

## Problem
Selecting a start and end date with two separate inputs is slow and error-prone (end before start, mismatched formats). Users need to see both endpoints in calendar context.

## Solution
A popover containing two side-by-side month grids. Click first day to set start, click second day to set end; the in-between range is highlighted. Preset shortcuts on the left handle common spans.

## Structure
```
    <div class="date-range">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded="true"
        aria-controls="dr-popover"
      >
        Apr 1, 2026 - Apr 27, 2026
      </button>

      <div
        id="dr-popover"
        role="dialog"
        aria-label="Choose date range"
        class="popover"
      >
        <aside class="presets">
          <button>Today</button>
          <button>Yesterday</button>
          <button>Last 7 days</button>
          <button>Last 30 days</button>
          <button>This month</button>
          <button aria-pressed="true">Custom</button>
        </aside>
        <div class="months">
          <div role="grid" aria-label="March 2026"></div>
          <div role="grid" aria-label="April 2026"></div>
        </div>
        <footer>
          <span class="summary">Apr 1 - Apr 27 (27 days)</span>
          <button>Cancel</button>
          <button class="primary">Apply</button>
        </footer>
      </div>
    </div>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- First click sets start; second click sets end. If second click is before start, swap them.
- Hovering after start-only state previews the would-be range with a soft highlight.
- Preset buttons immediately set start+end and update both calendars.
- Arrow keys move focused day; Enter selects; Esc closes the popover.
- Range crossing months: highlight all days in between with a subtle band.
- Disabled dates (e.g., before today for booking) get `aria-disabled='true'` and are unfocusable.
- Apply commits and closes; Cancel discards staged changes.

## A11y
- Popover uses `role='dialog'` with an accessible name like 'Choose date range'.
- Each month uses ARIA grid pattern with `role='grid'`, `role='row'`, `role='gridcell'`.
- Selected start and end days use `aria-selected='true'`; in-between days use `aria-selected='false'` but visually highlighted.
- Provide a text summary ('Apr 1 - Apr 27, 27 days') in an `aria-live='polite'` region updating on selection.
- Allow direct text input as a fallback (formatted YYYY-MM-DD) for keyboard users who do not want grid navigation.

## Compatible
- @community/pattern-calendar-grid
- @community/pattern-inline-validation
