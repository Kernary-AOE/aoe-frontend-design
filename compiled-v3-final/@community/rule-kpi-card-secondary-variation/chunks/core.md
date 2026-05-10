# KpiCardSecondaryVariation [rule] v1.0.0
In a 2x2 KPI grid, vary the secondary element across cards. Use each secondary type in at most 2 of the 4 cards. The most important metric goes top-left. Extracted from StyleSeed DESIGN-LANGUAGE.md §62 (github.com/bitjaru/styleseed, MIT).
> When rendering a 2×2 KPI grid, vary the secondary element in each card. Choose from the variation toolkit: trend % + arrow, mini progress bar (h-2), comparison text ('vs 380 last week'), sparkline (inline h-8 chart), status dot (● Active), sub-metric breakdown ('Desktop 60% · Mobile 40%'). Use at most 2 cards with the same secondary element in a 4-card grid. The most important metric sits top-left (reading order).
domain: frontend-design

## Label
KPI Card Secondary Element Variation — The 4-Card Rule

## Applies To
Any 2×2 or 4-column KPI/metric card grid in a dashboard layout.

## Counter Example
Four cards each with icon + label + big number + '+X% trend arrow' — every card identical in structure. Reads as auto-generated; user cannot tell which KPI is the primary focus.
