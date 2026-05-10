# NoFixedWidthsNarrow [rule] v1.0.0
Fixed pixel widths that cause horizontal overflow or layout breakage on viewports narrower than 375px are forbidden — use fluid widths, max-width, or container queries instead.
domain: frontend-design

## Severity
high

## Forbidden
- width: 400px on any block-level element without a max-width: 100% fallback
- min-width: 600px on form inputs, modals, or cards
- Fixed table column widths that force horizontal scroll on mobile

## Correct Patterns
- width: min(400px, 100%) — never overflows its container
- max-width: 400px; width: 100% — fluid until 400px
- container queries for component-level layout changes

## Severity
high

## Forbidden
- width: 400px on any block-level element without a max-width: 100% fallback
- min-width: 600px on form inputs, modals, or cards
- Fixed table column widths that force horizontal scroll on mobile

## Correct Patterns
- width: min(400px, 100%) — never overflows its container
- max-width: 400px; width: 100% — fluid until 400px
- container queries for component-level layout changes
