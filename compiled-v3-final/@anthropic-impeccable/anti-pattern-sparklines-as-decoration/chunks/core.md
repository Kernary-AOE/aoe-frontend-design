# SparklinesAsDecoration [anti-pattern] v1.0.0
Tiny inline charts (sparklines, mini bar charts, trend indicators) placed in metric cards or dashboards to signal analytical depth, when the chart is too small to convey actual data insight and serves only as a visual sophistication prop.
domain: frontend-design

## Label
Sparklines as Decorative Sophistication Signal

## Trap
Sparklines look impressive in design mockups. A small upward trend line next to a KPI number reads as 'this is a data-driven product'. However, if the sparkline is not actionable — if users cannot read specific values, cannot interact with it, and would reach the same conclusion from the trend direction label alone — the chart is decoration. It adds rendering complexity, accessibility burden (charts require text alternatives), and visual noise without information value.

## Detection
- Sparkline appears in a fixed-width metric card with no tooltip or zoom-in behavior
- The same trend direction is communicated by an arrow icon or '+12%' label next to the sparkline
- Chart is under 60px wide or lacks data point markers
- Removing the sparkline would not change any user decision

## Remediation
- Replace with a percentage-change label + directional icon if the trend is the only signal needed.
- If the chart has genuine data value, give it enough space (120px+ wide) and add tooltip hover with specific values.
- Use a mini bar chart only when showing distribution, not trend — trend lines need at least 8-10 visible data points to be readable.
- If a chart is required, ensure it has a text alternative (aria-label with the key insight, not just 'chart').
