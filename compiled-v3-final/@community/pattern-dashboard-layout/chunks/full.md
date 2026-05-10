# DashboardLayout [pattern] v1.0.0
Structural composition for admin dashboards: a fixed sidebar on the left, a sticky topbar, metric cards at the top of the main content area, a chart section, and a data table below. Extracted from two open-source Next.js admin templates (2k★ and 631★).
domain: frontend-design

## Label
Dashboard Layout — Full Composition

## Problem
Admin dashboards need a predictable spatial hierarchy — navigation, context-switching, KPIs, trend charts, and tabular data — that works from mobile to wide desktop without reflow chaos.

## Solution
Compose the page as: sidebar (collapsible, 256px expanded / 48px icon-only / 288px mobile drawer) + sticky topbar (48px) + main scroll area containing metric cards grid → charts row → data table. Use CSS container queries for the metric grid, Recharts for charts, and TanStack Table for the data table.

## Structure
```
    <!-- Overall shell -->
    <div class="dashboard-shell">
      <aside class="sidebar" aria-label="Primary navigation">
        <!-- 16rem expanded, 3rem icon-only, 18rem mobile drawer -->
      </aside>

      <div class="main-column">
        <header class="topbar" aria-label="Application header">
          <!-- 48px sticky, backdrop-blur -->
        </header>

        <main class="content-area">
          <!-- 1. Metric cards — container-query grid -->
          <section aria-label="KPI summary" class="metrics-grid">
            <!-- @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 -->
          </section>

          <!-- 2. Charts row -->
          <section aria-label="Trend charts">
            <!-- ChartContainer with period toggle + stat footer -->
          </section>

          <!-- 3. Data table -->
          <section aria-label="Detail table">
            <!-- Sticky header, sortable, paginated -->
          </section>
        </main>
      </div>
    </div>
  
```

## Label
Dashboard Layout — Full Composition

## Problem
Admin dashboards need a predictable spatial hierarchy — navigation, context-switching, KPIs, trend charts, and tabular data — that works from mobile to wide desktop without reflow chaos.

## Solution
Compose the page as: sidebar (collapsible, 256px expanded / 48px icon-only / 288px mobile drawer) + sticky topbar (48px) + main scroll area containing metric cards grid → charts row → data table. Use CSS container queries for the metric grid, Recharts for charts, and TanStack Table for the data table.

## Structure
```
    <!-- Overall shell -->
    <div class="dashboard-shell">
      <aside class="sidebar" aria-label="Primary navigation">
        <!-- 16rem expanded, 3rem icon-only, 18rem mobile drawer -->
      </aside>

      <div class="main-column">
        <header class="topbar" aria-label="Application header">
          <!-- 48px sticky, backdrop-blur -->
        </header>

        <main class="content-area">
          <!-- 1. Metric cards — container-query grid -->
          <section aria-label="KPI summary" class="metrics-grid">
            <!-- @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 -->
          </section>

          <!-- 2. Charts row -->
          <section aria-label="Trend charts">
            <!-- ChartContainer with period toggle + stat footer -->
          </section>

          <!-- 3. Data table -->
          <section aria-label="Detail table">
            <!-- Sticky header, sortable, paginated -->
          </section>
        </main>
      </div>
    </div>
  
```
