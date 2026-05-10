# VercelAnalytics [example] v1.0.0
Vercel Analytics shows Core Web Vitals (LCP, FID, CLS, INP) as four large stat cards with the metric value in 32px white, a delta indicator (green up arrow / red down arrow), and a 80px-tall sparkline chart underneath in muted blue #0070F3 at ~40% opacity. The full-page time-series chart uses a single accent color rather than the rainbow-multi-line approach.
domain: visual-design

## Label
Vercel Analytics — Realtime Web Vitals Panel

## Url
https://vercel.com/analytics

## Observed
2026-Q1

## Brand
vercel

## Pattern Applied
@community/pattern-dashboard-grid

## Aesthetic Notes
- Stat card: rgba(255,255,255,0.04) background, 1px rgba(255,255,255,0.08) border, 16px border-radius, 24px padding.
- Metric value: 32px/600 Geist Sans white; metric label below in 13px/500 #A1A1A1 uppercase letter-spacing 0.05em.
- Sparkline: stroke #0070F3, stroke-width 1.5px, no fill, no axes, no labels — pure shape.
- Delta chip: green #0CCE6B for improvements, red #EE0000 for regressions, 11px/500 with 8px arrow icon.
- Grid: 4-column on desktop, 2-column on tablet, 1-column on mobile — exact 16px gap throughout.

## What To Copy
- Use a single accent color across all sparklines — multi-color charts only work when each series has semantic meaning.
- Strip sparklines of axes/labels/grid — they're shape-readers, not data-tables.
- Uppercase + letter-spacing 0.05em on metric labels — instant 'metadata' read.
- Card border at 1px rgba(255,255,255,0.08) is the right strength — visible at hover, invisible at scroll.

## What To Skip
- The hover tooltip on sparklines is positioned absolute and clips on the right edge — use Floating UI or Radix Popover for production.

## Screenshot Hint
scout query: dark analytics dashboard stat cards sparklines core web vitals

## Demonstrates
- Numerical-first card layouts with sparklines feel 'modern' without needing chart libraries.
- Single-accent-color charts read faster than multi-line rainbow charts.
- Uppercase label treatment is the cheapest way to differentiate metadata from values.

## Label
Vercel Analytics — Realtime Web Vitals Panel

## Url
https://vercel.com/analytics

## Observed
2026-Q1

## Brand
vercel

## Pattern Applied
@community/pattern-dashboard-grid

## Aesthetic Notes
- Stat card: rgba(255,255,255,0.04) background, 1px rgba(255,255,255,0.08) border, 16px border-radius, 24px padding.
- Metric value: 32px/600 Geist Sans white; metric label below in 13px/500 #A1A1A1 uppercase letter-spacing 0.05em.
- Sparkline: stroke #0070F3, stroke-width 1.5px, no fill, no axes, no labels — pure shape.
- Delta chip: green #0CCE6B for improvements, red #EE0000 for regressions, 11px/500 with 8px arrow icon.
- Grid: 4-column on desktop, 2-column on tablet, 1-column on mobile — exact 16px gap throughout.

## What To Copy
- Use a single accent color across all sparklines — multi-color charts only work when each series has semantic meaning.
- Strip sparklines of axes/labels/grid — they're shape-readers, not data-tables.
- Uppercase + letter-spacing 0.05em on metric labels — instant 'metadata' read.
- Card border at 1px rgba(255,255,255,0.08) is the right strength — visible at hover, invisible at scroll.

## What To Skip
- The hover tooltip on sparklines is positioned absolute and clips on the right edge — use Floating UI or Radix Popover for production.

## Screenshot Hint
scout query: dark analytics dashboard stat cards sparklines core web vitals

## Demonstrates
- Numerical-first card layouts with sparklines feel 'modern' without needing chart libraries.
- Single-accent-color charts read faster than multi-line rainbow charts.
- Uppercase label treatment is the cheapest way to differentiate metadata from values.
