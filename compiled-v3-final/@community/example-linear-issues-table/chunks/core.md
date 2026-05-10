# LinearIssuesTable [example] v1.0.0
Linear's primary issue list is a single-line-per-row table on a near-black canvas (#08090A). Each row shows: priority icon (4 bars), issue ID (e.g., LIN-1234) in #6E7178 monospace, title in white, status pill, assignee avatar, and due date. Row height is ~32px — extreme density that lets ~25 issues fit in a viewport.
domain: visual-design

## Label
Linear — Issues Table View

## Url
https://linear.app

## Observed
2026-Q1

## Brand
linear

## Pattern Applied
@community/pattern-data-table-dense

## Aesthetic Notes
- Background: #08090A (slightly warmer than pure black); rows transparent, hover #15161A.
- Row height: 32px, with 8px vertical padding — far denser than Notion or Asana.
- Typography: Inter 13px throughout for body, monospace 12px for issue IDs.
- Priority icon: 4 horizontal bars stacked, 2px each, with the count active (filled #FFFFFF) for priority level.
- Status pill: 11px/500 with colored dot prefix — Backlog gray #6E7178, In Progress blue #5E6AD2, Done green #00B47D.
- Selection: shift+click multi-select highlights rows with rgba(94,106,210,0.15) (Linear's signature purple-blue).

## What To Copy
- Drop row height to 32px when content is single-line — density is a feature, not a bug, for power users.
- Use 4-bar priority icons instead of 'High/Med/Low' text — instantly scannable, locale-independent.
- Status pills with colored dot prefix are clearer than fully-filled pills (which dominate visually).
- Reserve a single signature accent color (Linear's #5E6AD2) for selection/active states only.

## What To Skip
- The drag-to-reorder handle is invisible until row hover — discoverability problem; show it at low opacity always.
- 32px rows are too dense for touch — bump to 44px minimum on tablet/mobile.

## Screenshot Hint
scout query: linear issues table dense rows priority bars status pills

## Demonstrates
- Density is a power-user feature; the right table fits 25 rows per viewport, not 8.
- Iconographic priority (bars, not words) is faster to scan and more accessible to non-English readers.
- A single accent color for selection/active beats per-feature accent colors.
