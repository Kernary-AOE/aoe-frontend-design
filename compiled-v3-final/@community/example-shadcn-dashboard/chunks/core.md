# ShadcnDashboard [example] v1.0.0
The shadcn dashboard template uses HSL CSS variables for theming with a 240-deg neutral palette. Layout: 240px sidebar with collapsible groups, a 56px top nav with team-switcher dropdown, and a main grid of 4 KPI cards above a 2-column area (chart left / recent-sales list right). Light mode is bg-background (HSL 0 0% 100%), dark mode flips to HSL 240 10% 3.9%.
domain: visual-design

## Label
shadcn/ui — Dashboard Template

## Url
https://ui.shadcn.com/examples/dashboard

## Observed
2026-Q1

## Brand
shadcn

## Pattern Applied
@community/pattern-dashboard-grid

## Aesthetic Notes
- Color tokens: bg-background, bg-card, bg-muted, text-foreground, border (each HSL semantic, not raw hex).
- KPI card: 24px padding, border-1 border-border, rounded-lg (8px), shadow-none — flat by default.
- KPI value: text-2xl (24px) font-bold, with text-xs muted-foreground delta below in green (#22c55e) or red (#ef4444).
- Chart: Recharts LineChart with stroke #8884d8 (default purple), 1px gray grid lines, 240px tall.
- Recent-sales list: 56px rows with 36px avatar + 14px name + 12px email + right-aligned amount.
- Sidebar: bg-muted (HSL 240 4.8% 95.9% in light, 240 3.7% 15.9% in dark), 240px wide.

## What To Copy
- Use HSL CSS variables (--background, --foreground, --muted) for theming — single source of truth across light/dark.
- Flat cards (no shadow) with 1px borders read as 'modern' on shadcn-style designs.
- Sidebar background should be subtly different from main canvas (--muted vs --background) — disambiguates regions.
- Reserve color (green/red) only for delta indicators; charts default to a single neutral accent.

## What To Skip
- The default Recharts color #8884d8 is everywhere — override with your brand color or you'll look like every other shadcn site.

## Screenshot Hint
scout query: shadcn dashboard template kpi cards line chart recent sales sidebar

## Demonstrates
- HSL CSS variables enable single-codebase light/dark theming without runtime overhead.
- Flat-card aesthetic (no shadow, 1px border) is the shadcn signature.
- Sidebar with --muted background creates region distinction without color shift.
