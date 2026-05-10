# MetricCard [pattern] v1.0.0
A single KPI card with label, large value, optional trend badge, and a secondary element chosen from a variation toolkit. Arranged in a responsive 4-column container-query grid. Pairs with @community/rule-kpi-card-secondary-variation.
domain: frontend-design

## Label
Dashboard Metric Card (KPI Card)

## Problem
Four identical KPI cards (each with the same label + big number + trend arrow) produce visual wallpaper. Users cannot tell which metric is most important, and the layout reads as generated rather than designed.

## Solution
Use container queries for the grid (4-col desktop / 2-col tablet / 1-col mobile). Vary the secondary element across cards from the toolkit: trend %, mini progress bar (h-2), comparison text, sparkline (h-8), status dot, or sub-metric breakdown. Place the most important metric top-left. Cap each secondary type at 2 cards per 4-card grid.

## Structure
```
    <!-- Grid: @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1, gap-4 md:gap-6 -->
    <div class="kpi-grid">

      <!-- Card 1: trend % secondary -->
      <article class="kpi-card" aria-label="Today's Revenue">
        <p class="kpi-card__label">Today's Revenue</p>
        <p class="kpi-card__value" aria-live="polite">$48.2K</p>
        <div class="kpi-card__secondary kpi-card__secondary--trend">
          <svg aria-hidden="true" class="trend-icon trend-icon--up"></svg>
          <span class="trend-value">+8.2%</span>
        </div>
      </article>

      <!-- Card 2: trend % secondary (2nd allowed — cap is 2) -->
      <article class="kpi-card" aria-label="Active Users">
        <p class="kpi-card__label">Active Users</p>
        <p class="kpi-card__value">12,840</p>
        <div class="kpi-card__secondary kpi-card__secondary--trend">
          <svg aria-hidden="true" class="trend-icon trend-icon--up"></svg>
          <span class="trend-value">+3.1%</span>
        </div>
      </article>

      <!-- Card 3: progress bar secondary -->
      <article class="kpi-card" aria-label="Storage">
        <p class="kpi-card__label">Storage</p>
        <p class="kpi-card__value">68%</p>
        <div class="kpi-card__secondary kpi-card__secondary--progress"
             role="progressbar" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100"
             aria-label="Storage 68% used">
          <div class="progress-track">
            <div class="progress-fill" style="width: 68%"></div>
          </div>
        </div>
      </article>

      <!-- Card 4: comparison text secondary -->
      <article class="kpi-card" aria-label="Orders">
        <p class="kpi-card__label">Orders</p>
        <p class="kpi-card__value">342</p>
        <p class="kpi-card__secondary kpi-card__secondary--comparison">vs 380 last week</p>
      </article>

    </div>
  
```

## Label
Dashboard Metric Card (KPI Card)

## Problem
Four identical KPI cards (each with the same label + big number + trend arrow) produce visual wallpaper. Users cannot tell which metric is most important, and the layout reads as generated rather than designed.

## Solution
Use container queries for the grid (4-col desktop / 2-col tablet / 1-col mobile). Vary the secondary element across cards from the toolkit: trend %, mini progress bar (h-2), comparison text, sparkline (h-8), status dot, or sub-metric breakdown. Place the most important metric top-left. Cap each secondary type at 2 cards per 4-card grid.

## Structure
```
    <!-- Grid: @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1, gap-4 md:gap-6 -->
    <div class="kpi-grid">

      <!-- Card 1: trend % secondary -->
      <article class="kpi-card" aria-label="Today's Revenue">
        <p class="kpi-card__label">Today's Revenue</p>
        <p class="kpi-card__value" aria-live="polite">$48.2K</p>
        <div class="kpi-card__secondary kpi-card__secondary--trend">
          <svg aria-hidden="true" class="trend-icon trend-icon--up"></svg>
          <span class="trend-value">+8.2%</span>
        </div>
      </article>

      <!-- Card 2: trend % secondary (2nd allowed — cap is 2) -->
      <article class="kpi-card" aria-label="Active Users">
        <p class="kpi-card__label">Active Users</p>
        <p class="kpi-card__value">12,840</p>
        <div class="kpi-card__secondary kpi-card__secondary--trend">
          <svg aria-hidden="true" class="trend-icon trend-icon--up"></svg>
          <span class="trend-value">+3.1%</span>
        </div>
      </article>

      <!-- Card 3: progress bar secondary -->
      <article class="kpi-card" aria-label="Storage">
        <p class="kpi-card__label">Storage</p>
        <p class="kpi-card__value">68%</p>
        <div class="kpi-card__secondary kpi-card__secondary--progress"
             role="progressbar" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100"
             aria-label="Storage 68% used">
          <div class="progress-track">
            <div class="progress-fill" style="width: 68%"></div>
          </div>
        </div>
      </article>

      <!-- Card 4: comparison text secondary -->
      <article class="kpi-card" aria-label="Orders">
        <p class="kpi-card__label">Orders</p>
        <p class="kpi-card__value">342</p>
        <p class="kpi-card__secondary kpi-card__secondary--comparison">vs 380 last week</p>
      </article>

    </div>
  
```
