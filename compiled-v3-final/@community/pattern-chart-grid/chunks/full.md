# ChartGrid [pattern] v1.0.0
Pattern for embedding responsive Recharts area/bar charts inside a dashboard card, including a period-range toggle in the header and a stat-footer below the chart. Based on shadcn/ui ChartContainer conventions.
domain: frontend-design

## Label
Dashboard Chart Grid

## Problem
Dashboard charts placed without period context or supporting numbers leave users unable to interpret the slope or magnitude. A bare chart floating in a card provides trend shape but no actionable numbers.

## Solution
Wrap every chart in a ChartContainer that fills parent width. Add a period toggle (1W/1M/3M/All) in the card header, and a stat footer grid (max 4 columns) below the chart, separated by a border-t. Use CSS custom properties --chart-1 through --chart-5 for color so themes apply automatically.

## Structure
```
    <div class="chart-card">
      <!-- Header: title + period toggle -->
      <div class="chart-card__header">
        <h3 class="chart-card__title">Revenue Trend</h3>
        <div class="period-toggle" role="group" aria-label="Time range">
          <button class="period-btn active" aria-pressed="true">1W</button>
          <button class="period-btn" aria-pressed="false">1M</button>
          <button class="period-btn" aria-pressed="false">3M</button>
        </div>
      </div>

      <!-- Chart area: fill parent width, fixed height -->
      <div class="chart-wrapper" aria-hidden="true">
        <!-- Recharts ResponsiveContainer width="100%" height={200} -->
        <!-- AreaChart with CartesianGrid, XAxis, ChartTooltip -->
        <!-- Color: var(--chart-1) through var(--chart-5) -->
      </div>

      <!-- Stat footer: up to 4 columns, separated by border-t -->
      <div class="chart-stats" role="list">
        <div class="chart-stat" role="listitem">
          <span class="chart-stat__label">Web</span>
          <span class="chart-stat__value">$1,648<span class="chart-stat__unit">/mo</span></span>
        </div>
        <div class="chart-stat" role="listitem">
          <span class="chart-stat__label">Mobile</span>
          <span class="chart-stat__value">$1,520<span class="chart-stat__unit">/mo</span></span>
        </div>
        <div class="chart-stat" role="listitem">
          <span class="chart-stat__label">API</span>
          <span class="chart-stat__value">$1,430<span class="chart-stat__unit">/mo</span></span>
        </div>
      </div>
    </div>
  
```

## Label
Dashboard Chart Grid

## Problem
Dashboard charts placed without period context or supporting numbers leave users unable to interpret the slope or magnitude. A bare chart floating in a card provides trend shape but no actionable numbers.

## Solution
Wrap every chart in a ChartContainer that fills parent width. Add a period toggle (1W/1M/3M/All) in the card header, and a stat footer grid (max 4 columns) below the chart, separated by a border-t. Use CSS custom properties --chart-1 through --chart-5 for color so themes apply automatically.

## Structure
```
    <div class="chart-card">
      <!-- Header: title + period toggle -->
      <div class="chart-card__header">
        <h3 class="chart-card__title">Revenue Trend</h3>
        <div class="period-toggle" role="group" aria-label="Time range">
          <button class="period-btn active" aria-pressed="true">1W</button>
          <button class="period-btn" aria-pressed="false">1M</button>
          <button class="period-btn" aria-pressed="false">3M</button>
        </div>
      </div>

      <!-- Chart area: fill parent width, fixed height -->
      <div class="chart-wrapper" aria-hidden="true">
        <!-- Recharts ResponsiveContainer width="100%" height={200} -->
        <!-- AreaChart with CartesianGrid, XAxis, ChartTooltip -->
        <!-- Color: var(--chart-1) through var(--chart-5) -->
      </div>

      <!-- Stat footer: up to 4 columns, separated by border-t -->
      <div class="chart-stats" role="list">
        <div class="chart-stat" role="listitem">
          <span class="chart-stat__label">Web</span>
          <span class="chart-stat__value">$1,648<span class="chart-stat__unit">/mo</span></span>
        </div>
        <div class="chart-stat" role="listitem">
          <span class="chart-stat__label">Mobile</span>
          <span class="chart-stat__value">$1,520<span class="chart-stat__unit">/mo</span></span>
        </div>
        <div class="chart-stat" role="listitem">
          <span class="chart-stat__label">API</span>
          <span class="chart-stat__value">$1,430<span class="chart-stat__unit">/mo</span></span>
        </div>
      </div>
    </div>
  
```
