# DashboardDataTable [pattern] v1.0.0
An interactive data table for dashboard pages: sticky muted header, hover-state rows, sortable columns with chevron indicators, search + categorical filter toolbar above, and paginated rows. Powered by TanStack Table. NEVER a static read-only table.
domain: frontend-design

## Label
Dashboard Data Table

## Problem
Dashboard tables that are static (no sort, no filter, no pagination) degrade to display-only grids. Power users need to find, sort, and page through data without leaving the screen.

## Solution
Use a controlled <table> with a sticky muted header (bg-muted, h-10), row hover (hover:bg-muted/50), selected state (data-[state=selected]:bg-muted), tabular-nums on numeric columns, a search input + dropdown filter toolbar above the table, and a 'X of Y rows' pagination row below. Column sort state toggles asc → desc → none on header click.

## Structure
```
    <!-- Search + filter toolbar -->
    <div class="dt-toolbar" role="toolbar" aria-label="Table controls">
      <input
        type="search"
        class="dt-search"
        placeholder="Search..."
        aria-label="Search table"
      />
      <select class="dt-filter" aria-label="Filter by status">
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
      </select>
      <!-- Column visibility toggle (dropdown checkbox list) -->
      <button type="button" class="dt-columns-toggle" aria-haspopup="true">Columns</button>
    </div>

    <!-- Table scroll region -->
    <div role="region" aria-label="Data table" tabindex="0" class="dt-scroll">
      <table class="dt">
        <thead class="dt-head">
          <tr>
            <th scope="col" class="dt-th--check">
              <input type="checkbox" aria-label="Select all rows" />
            </th>
            <th scope="col" aria-sort="ascending" class="dt-th">
              <button type="button" class="dt-sort-btn">
                Name
                <svg aria-hidden="true" class="dt-sort-icon dt-sort-icon--asc"></svg>
              </button>
            </th>
            <th scope="col" aria-sort="none" class="dt-th">
              <button type="button" class="dt-sort-btn">
                Status
                <svg aria-hidden="true" class="dt-sort-icon"></svg>
              </button>
            </th>
            <th scope="col" aria-sort="none" class="dt-th dt-th--num">
              <button type="button" class="dt-sort-btn">
                Amount
                <svg aria-hidden="true" class="dt-sort-icon"></svg>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr aria-selected="false" class="dt-row">
            <td><input type="checkbox" aria-label="Select Alpha row" /></td>
            <td>Alpha</td>
            <td><span class="status-badge status-badge--active">Active</span></td>
            <td class="dt-cell--num">$1,200</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination row -->
    <div class="dt-pager" role="navigation" aria-label="Pagination">
      <span class="dt-pager__info">1–10 of 342 rows</span>
      <select class="dt-pager__size" aria-label="Rows per page">
        <option>10</option>
        <option>20</option>
        <option>30</option>
        <option>40</option>
        <option>50</option>
      </select>
      <button type="button" disabled aria-disabled="true">Prev</button>
      <button type="button">Next</button>
    </div>
  
```
