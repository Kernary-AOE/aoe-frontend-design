# MercuryBankingDashboard [example] v1.0.0
Mercury's banking dashboard sits on a near-white #FAFAF7 background (warm tint, not pure gray). Top shows account balance in 48px serif (their signature 'Tiempos' or similar), followed by a horizontal cash-flow chart in muted blue #4A6CF7 + dotted line for projection. Below is a transaction list with 56px rows, each showing merchant logo (24px circle), name, category, and amount in tabular-nums.
domain: visual-design

## Label
Mercury — Banking Dashboard

## Url
https://mercury.com

## Observed
2026-Q1

## Brand
mercury

## Pattern Applied
@community/pattern-dashboard-grid

## Aesthetic Notes
- Background: #FAFAF7 (warm cream, banking-trustworthy not tech-cold).
- Balance: 48px serif (Tiempos Headline-style), color #1A1F36, with currency symbol smaller at 24px superscript.
- Chart accent: #4A6CF7 (muted blue, not Stripe purple), with dotted projection line in #4A6CF7 at 40% alpha.
- Transaction row: 56px, white card #FFFFFF on #FAFAF7, 1px #EEEEEC bottom border (NOT shadow).
- Merchant logo: 24px circle, fallback to first-letter monogram on a hashed pastel background.
- Amount: 14px/500 tabular-nums monospace, right-aligned, debit in #1A1F36, credit in #00875A green.

## What To Copy
- Use serif (not sans) for primary balance display — banking apps gain trust signal from editorial typography.
- Warm cream background (#FAFAF7) feels more 'private banking' than cool tech grays.
- Show projection as dotted line continuation of the actual line — same color, lower alpha, dashed stroke.
- Amount column always tabular-nums + right-aligned. Always.

## What To Skip
- The merchant-logo fallback uses ALL CAPS first letter which clips on lowercase-only company names — switch to first 2 chars.

## Screenshot Hint
scout query: mercury banking dashboard cream serif balance transactions list

## Demonstrates
- Serif typography for balance/totals signals 'banking trust' more than sans.
- Warm cream backgrounds disambiguate finance apps from generic SaaS dashboards.
- Dotted-line projection extension is the cleanest way to show 'forecast vs actual'.
