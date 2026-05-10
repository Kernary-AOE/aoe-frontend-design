# SvgChartAria [template] v1.0.0
Accessibility code template for SVG-based charts. Provides two patterns: (1) simple svg with role='img' and descriptive aria-label, (2) figure+figcaption+sr-only paragraph wrapping an aria-hidden SVG. Use pattern 2 for interactive/filterable charts.
domain: frontend-design

## Label
SVG Chart Accessibility Template (ARIA)

## Body
```
    <!-- Pattern 1: Simple SVG — role="img" + descriptive aria-label -->
    <!-- aria-label MUST describe the trend or insight, not just "bar chart" -->
    <svg
      role="img"
      aria-label="Monthly revenue grew 34% from January to June 2026, peaking at $142k in May"
    >
      <!-- chart content -->
    </svg>


    <!-- Pattern 2: Interactive chart — figure + figcaption + sr-only description -->
    <!-- Use when the chart has controls (period toggle, hover tooltip, filter) -->
    <figure aria-labelledby="chart-title" aria-describedby="chart-desc">
      <figcaption id="chart-title" class="text-sm font-medium">
        Monthly Revenue — Jan to Jun 2026
      </figcaption>
      <p id="chart-desc" class="sr-only">
        Revenue increased steadily from $106k in January to a peak of $142k in May,
        then slightly declined to $138k in June. Total growth: 34%.
      </p>
      <!-- SVG is aria-hidden because figure provides the accessible name -->
      <svg role="img" aria-hidden="true">
        <!-- chart content -->
      </svg>
    </figure>


    <!-- Pattern 3: Screen reader data table (append inside figure for complex charts) -->
    <!-- Provides the raw numbers for users who cannot perceive the visual chart -->
    <table class="sr-only">
      <caption>Monthly revenue data</caption>
      <thead>
        <tr>
          <th scope="col">Month</th>
          <th scope="col">Revenue</th>
        </tr>
      </thead>
      <tbody>
        <!-- Repeat for each data point -->
        <tr><td>January</td><td>$106,000</td></tr>
        <tr><td>February</td><td>$118,000</td></tr>
        <tr><td>March</td><td>$125,000</td></tr>
        <tr><td>April</td><td>$131,000</td></tr>
        <tr><td>May</td><td>$142,000</td></tr>
        <tr><td>June</td><td>$138,000</td></tr>
      </tbody>
    </table>
  
```

## Usage Notes
- Pattern 1 is sufficient for static decorative charts where the card/section heading already provides context.
- Pattern 2 is required for interactive charts — the figure owns the accessible name; the SVG is aria-hidden.
- Pattern 3 (sr-only table) is required for charts where exact data values matter (financial, medical, accessibility-critical).
- aria-label content MUST describe the insight, not the chart type: 'Revenue grew 34% from Jan to Jun' not 'Area chart of revenue'.
- In React/Recharts: add isAnimationActive={!prefersReducedMotion} to the chart component to honor prefers-reduced-motion.
- The sr-only class: position absolute; width 1px; height 1px; overflow hidden; clip rect(0,0,0,0); white-space nowrap.
