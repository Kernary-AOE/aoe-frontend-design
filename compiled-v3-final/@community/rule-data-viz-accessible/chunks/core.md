# DataVizAccessible [rule] v1.0.0
SVG and canvas charts must expose a descriptive aria-label on role='img' that states the data trend, never rely on color as the sole encoding channel, provide a screen-reader text alternative (sr-only table or summary), and respect prefers-reduced-motion by disabling chart entry animations (WCAG SC 1.1.1 Non-text Content, SC 1.4.1 Use of Color).
domain: frontend-design

## Rules
- SVG chart must have role='img' and aria-label describing the trend or insight — not just the chart type.
- Never use color as the only distinguishing channel; add a second encoding: dash patterns for lines, shapes for scatter points, direct data labels for bars.
- Provide a visually-hidden <table> or <p> summary as screen-reader fallback alongside the visual chart.
- Disable all entry animations (isAnimationActive={false} in Recharts) when prefers-reduced-motion: reduce is active.
- Interactive tooltips must be keyboard-triggerable, not hover-only.

## Example
```
// ✅ Minimum required accessible SVG chart wrapper
<figure aria-labelledby="chart-title" aria-describedby="chart-desc">
<figcaption id="chart-title">Monthly Revenue — Jan to Jun 2026</figcaption>
<p id="chart-desc" className="sr-only">
Revenue grew 34% from $106k in January to $142k in May, then slightly declined.
</p>
<svg role="img" aria-hidden="true">
{/* visual chart — aria-hidden because figure provides the label */}
</svg>
<table className="sr-only" aria-label="Monthly revenue data">...</table>
</figure>
```

## Color Safe Palette
```
// Wong 2011 — verified against deuteranopia, protanopia, tritanopia
--chart-1: #0072B2; // blue (primary)
--chart-2: #E69F00; // orange (secondary)
--chart-3: #009E73; // teal-green
--chart-4: #CC79A7; // pink-purple
```

## Severity
critical

## Verification
Run axe-core on the page; check for image-alt, color-contrast, and aria-required-parent violations. Manually: enable VoiceOver and navigate to a chart; confirm it announces the trend description.

## Tools
- axe-core
- lighthouse
