# CalcomScheduler [example] v1.0.0
Cal.com's booking page is a two-column layout: left side shows a month calendar grid with available days as filled circles in #292929 (dark mode) or solid black (light mode); right side shows time slots as a vertical list of buttons in 15-minute increments. Selected day has a filled accent #292929; selected time slot transitions to a 'Confirm' state with the time pinned at top.
domain: visual-design

## Label
Cal.com — Booking Time Picker

## Url
https://cal.com

## Observed
2026-Q1

## Brand
calcom

## Pattern Applied
@community/pattern-calendar-grid

## Aesthetic Notes
- Calendar grid: 7-column, 36px square cells, 4px gap. Day numbers in 14px/500.
- Available days: filled circle bg #292929 (dark) or #000000 (light), white text.
- Unavailable days: opacity 0.3, pointer-events none.
- Today indicator: 1px solid #292929 ring around the day cell.
- Time slot button: full-width within column, 44px tall, 1px solid #292929 border, hover bg #292929.
- Confirm transition: selected time slot expands to fill column with 'Confirm' button below; other slots fade to opacity 0.3.

## What To Copy
- Two-column layout (calendar | times) prevents mode-switching that single-column scheduler has.
- Available-day affordance via filled circle is more scannable than 'crossed out unavailable' approach.
- 44px time-slot buttons hit Apple's 44pt minimum touch target — never compromise this.
- Confirm-as-expansion (vs Confirm-as-modal) keeps the user in the same mental context.

## What To Skip
- The time-zone display is small (12px) at the bottom — many users miss it; show prominently above the times list.

## Screenshot Hint
scout query: cal.com booking scheduler calendar time slots two column

## Demonstrates
- Filled-circle available-day affordance reads faster than X-ed-out unavailable.
- Two-column scheduler avoids the modal-on-modal trap of single-column.
- 44px touch targets are non-negotiable for time-selection UI on mobile.
