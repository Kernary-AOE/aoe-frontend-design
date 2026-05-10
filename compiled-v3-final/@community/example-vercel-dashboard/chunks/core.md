# VercelDashboard [example] v1.0.0
The Vercel project dashboard renders deployments as a vertical list with each row showing: status dot (green #0CCE6B / yellow #F5A623 / red #EE0000), commit message in 14px white, branch name as a #A1A1A1 chip, author avatar (24px circle), and a relative timestamp. Hover reveals an inline 'View Build Logs' link in #0070F3 blue.
domain: visual-design

## Label
Vercel — Deployments List in Project Dashboard

## Url
https://vercel.com/dashboard

## Observed
2026-Q1

## Brand
vercel

## Pattern Applied
@community/pattern-data-table-dense

## Aesthetic Notes
- Row height: ~56px with 16px vertical padding — dense enough to scan ~10 rows per viewport.
- Status dots: 8px circle, success #0CCE6B, building #F5A623 (with subtle pulse animation), failed #EE0000.
- Branch chip: rgba(255,255,255,0.06) background, 11px/500 monospace text, 4px border-radius, 6px horizontal padding.
- Hover state: row background lifts to rgba(255,255,255,0.04) — barely visible but enough to confirm hover.
- Dividers: 1px solid rgba(255,255,255,0.06) between rows, no zebra striping.

## What To Copy
- Status indicators as 8px dots, not badges — they read as state without stealing attention.
- Use rgba(255,255,255,0.04) for hover backgrounds on dark — keep contrast subtle, ~2% above base.
- Branch/tag identifiers should always be monospace — semantic difference from prose.
- Show relative time ('2h ago') as primary, absolute time on hover via title attribute.

## What To Skip
- The pulse animation on 'building' rows is distracting in long lists — reserve animation for the active deployment only.
- Don't copy the right-aligned action menu (three dots) without keyboard support; many keyboard users miss it.

## Screenshot Hint
scout query: vercel deployment list dark dashboard status dots branch chips

## Demonstrates
- Dense lists work on dark backgrounds when row borders are extremely subtle (~6% alpha).
- Color-coded status dots beat icon-only or text-only status communication.
- Monospace for technical identifiers creates a visual 'second column' without explicit columns.
