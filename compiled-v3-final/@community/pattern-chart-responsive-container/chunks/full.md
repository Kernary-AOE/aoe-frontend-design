# ChartResponsiveContainer [pattern] v1.0.0
Charts MUST fill their parent's width via a ResponsiveContainer wrapper, never use a fixed pixel width. The only fixed dimension is height, chosen from a standard scale. The parent wrapper must have width:100% and min-width:0 to prevent flex-overflow.
domain: frontend-design

## Label
Chart Responsive Container

## Problem
Fixed-width charts (e.g. width={600}) overflow on smaller viewports and cause page-level horizontal scroll. Charts with height='100%' fail to render because ResponsiveContainer cannot compute 100% of an unconstrained height.

## Solution
Always wrap the chart in <ResponsiveContainer width='100%' height={N}>. Set the parent container to width:100%; min-width:0. Choose height from the standard scale: 80px sparkline, 200-250px dashboard card chart, 300-400px full-width section chart. Never use height='100%' on ResponsiveContainer.

## Structure
```
    <style>
      /* Parent: must have explicit width, min-width:0 prevents flex-overflow */
      .chart-wrapper {
        width: 100%;
        min-width: 0;   /* prevents flex children from overflowing parent */
      }

      /* Optional: height by chart type */
      .chart-wrapper--sparkline  { height: 80px; }
      .chart-wrapper--card       { height: 220px; }
      .chart-wrapper--section    { height: 350px; }
    </style>

    <!-- Sparkline / mini chart -->
    <div class="chart-wrapper chart-wrapper--sparkline">
      <!-- ResponsiveContainer width="100%" height={80} -->
      <!-- <LineChart> or <AreaChart> with no axes, no grid -->
    </div>

    <!-- Dashboard card chart -->
    <div class="chart-wrapper chart-wrapper--card">
      <!-- ResponsiveContainer width="100%" height={220} -->
      <!-- <AreaChart> with XAxis + minimal CartesianGrid + Tooltip -->
    </div>

    <!-- Full-width section chart -->
    <div class="chart-wrapper chart-wrapper--section">
      <!-- ResponsiveContainer width="100%" height={350} -->
      <!-- <BarChart> or <AreaChart> with full axes, legend, Tooltip -->
    </div>
  
```

## Label
Chart Responsive Container

## Problem
Fixed-width charts (e.g. width={600}) overflow on smaller viewports and cause page-level horizontal scroll. Charts with height='100%' fail to render because ResponsiveContainer cannot compute 100% of an unconstrained height.

## Solution
Always wrap the chart in <ResponsiveContainer width='100%' height={N}>. Set the parent container to width:100%; min-width:0. Choose height from the standard scale: 80px sparkline, 200-250px dashboard card chart, 300-400px full-width section chart. Never use height='100%' on ResponsiveContainer.

## Structure
```
    <style>
      /* Parent: must have explicit width, min-width:0 prevents flex-overflow */
      .chart-wrapper {
        width: 100%;
        min-width: 0;   /* prevents flex children from overflowing parent */
      }

      /* Optional: height by chart type */
      .chart-wrapper--sparkline  { height: 80px; }
      .chart-wrapper--card       { height: 220px; }
      .chart-wrapper--section    { height: 350px; }
    </style>

    <!-- Sparkline / mini chart -->
    <div class="chart-wrapper chart-wrapper--sparkline">
      <!-- ResponsiveContainer width="100%" height={80} -->
      <!-- <LineChart> or <AreaChart> with no axes, no grid -->
    </div>

    <!-- Dashboard card chart -->
    <div class="chart-wrapper chart-wrapper--card">
      <!-- ResponsiveContainer width="100%" height={220} -->
      <!-- <AreaChart> with XAxis + minimal CartesianGrid + Tooltip -->
    </div>

    <!-- Full-width section chart -->
    <div class="chart-wrapper chart-wrapper--section">
      <!-- ResponsiveContainer width="100%" height={350} -->
      <!-- <BarChart> or <AreaChart> with full axes, legend, Tooltip -->
    </div>
  
```
