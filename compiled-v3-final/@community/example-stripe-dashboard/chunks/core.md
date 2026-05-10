# StripeDashboard [example] v1.0.0
The Stripe Dashboard combines KPI cards (Volume, Net Volume, Successful Payments) at the top with a stacked-bar timeseries chart in Stripe purple #635BFF, then a payments table below showing amount, customer, status pill (succeeded green / refunded gray / failed red), and ISO timestamp. The whole page sits on #F6F9FC (light blue-gray).
domain: visual-design

## Label
Stripe — Merchant Dashboard with Payments List

## Url
https://dashboard.stripe.com

## Observed
2026-Q1

## Brand
stripe

## Pattern Applied
@community/pattern-dashboard-grid

## Aesthetic Notes
- Background: #F6F9FC (cool light gray-blue), cards on white #FFFFFF with 0px border (lifted via 0 1px 3px rgba(50,50,93,0.1) shadow).
- KPI card: 24px/600 number in #1A1F36, 13px/500 label in #425466 above, sparkline below in #635BFF.
- Chart: stacked bars in #635BFF (succeeded), #00D4FF (pending), #FF5A5F (failed) — semantic colors only.
- Status pill: 11px/500, succeeded #D7F7C2 bg + #007038 text, refunded #F0F1F4 bg + #6B7280 text.
- Table row: 56px tall, hover #F6F9FC, 1px #E3E8EE bottom border.
- Amounts: tabular-nums + monospace, right-aligned for vertical scanning.

## What To Copy
- Use shadows instead of borders to lift cards on light-blue-gray backgrounds — feels more dimensional.
- Tabular-nums + right-alignment on amount columns lets the eye scan magnitudes vertically.
- Status pills with both colored bg AND colored text (matching hue) read accessibly without icons.
- Reserve red (#FF5A5F) ONLY for failed/error states — never for accent decoration.

## What To Skip
- The default 'last 7 days' time range hides MoM trends — let users pick a default in settings.

## Screenshot Hint
scout query: stripe dashboard light gray background payments table KPI cards purple chart

## Demonstrates
- Light blue-gray backgrounds (#F6F9FC) feel more 'data-trustworthy' than warm whites.
- Card shadows beat borders on light non-white backgrounds.
- Semantic colors (green/red/gray) for status pills outperform brand-colored pills.
