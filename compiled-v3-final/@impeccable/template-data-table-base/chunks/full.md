# DataTableBase [template] v1.0.0
Foundational data table: sticky header, zebra-free row hover, sortable columns with aria-sort, pagination controls. Scoped headers for screen readers.
domain: data-display

## Language
html-css-js

## Body
```
    <style>
      .data-table-wrap {
        overflow: auto;
        max-height: 480px;
        border: 1px solid oklch(88% 0.02 250);
        border-radius: 8px;
      }
      .data-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        font-size: 0.9rem;
      }
      .data-table thead th {
        position: sticky;
        top: 0;
        z-index: 1;
        background: {HEADER_BG};
        font-weight: 600;
        text-align: left;
        padding: 12px 16px;
        border-bottom: 1px solid oklch(88% 0.02 250);
        white-space: nowrap;
      }
      .data-table tbody td {
        padding: 10px 16px;
        border-bottom: 1px solid oklch(94% 0.01 250);
      }
      .data-table tbody tr:last-child td { border-bottom: none; }
      .data-table tbody tr:hover { background: {ROW_HOVER}; }

      .data-table th[aria-sort] button {
        background: transparent;
        border: none;
        font: inherit;
        font-weight: inherit;
        cursor: pointer;
        padding: 0;
        color: inherit;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .data-table th[aria-sort] button:focus-visible {
        outline: 2px solid {ACCENT_COLOR};
        outline-offset: 2px;
      }
      .data-table th[aria-sort] button::after { content: "↕"; opacity: 0.4; font-size: 0.85em; }
      .data-table th[aria-sort="ascending"]  button::after { content: "↑"; opacity: 1; color: {ACCENT_COLOR}; }
      .data-table th[aria-sort="descending"] button::after { content: "↓"; opacity: 1; color: {ACCENT_COLOR}; }

      .data-table-pager {
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: flex-end;
        padding: 12px 8px;
        font-size: 0.875rem;
      }
      .data-table-pager button {
        background: white;
        border: 1px solid oklch(85% 0.02 250);
        border-radius: 6px;
        padding: 6px 10px;
        cursor: pointer;
        font: inherit;
      }
      .data-table-pager button[disabled] { opacity: 0.4; cursor: not-allowed; }
      .data-table-pager button:focus-visible {
        outline: 2px solid {ACCENT_COLOR};
        outline-offset: 2px;
      }
    </style>

    <div class="data-table-wrap" role="region" aria-label="Items table" tabindex="0">
      <table class="data-table" data-table>
        <caption class="visually-hidden">List of items, sortable</caption>
        <thead>
          <tr>
            <th scope="col" aria-sort="none"><button type="button" data-sort="name">Name</button></th>
            <th scope="col" aria-sort="none"><button type="button" data-sort="status">Status</button></th>
            <th scope="col" aria-sort="none"><button type="button" data-sort="updated">Updated</button></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Alpha</td><td>Active</td><td>2026-04-12</td></tr>
          <tr><td>Bravo</td><td>Paused</td><td>2026-04-08</td></tr>
          <tr><td>Charlie</td><td>Active</td><td>2026-04-22</td></tr>
        </tbody>
      </table>
    </div>
    <nav class="data-table-pager" aria-label="Pagination">
      <span data-page-info>Page 1 of 1</span>
      <button type="button" data-prev disabled>Prev</button>
      <button type="button" data-next disabled>Next</button>
    </nav>

    <script>
      (function() {
        var table = document.querySelector('[data-table]');
        if (!table) return;
        table.querySelectorAll('th[aria-sort]').forEach(function(th) {
          var btn = th.querySelector('button');
          btn && btn.addEventListener('click', function() {
            var current = th.getAttribute('aria-sort');
            // Reset siblings
            th.parentNode.querySelectorAll('th[aria-sort]').forEach(function(s) {
              if (s !== th) s.setAttribute('aria-sort', 'none');
            });
            var next = current === 'ascending' ? 'descending' : 'ascending';
            th.setAttribute('aria-sort', next);
            // Sort rows
            var key = btn.getAttribute('data-sort');
            var idx = Array.from(th.parentNode.children).indexOf(th);
            var tbody = table.tBodies[0];
            var rows = Array.from(tbody.rows);
            rows.sort(function(a, b) {
              var av = a.cells[idx].textContent.trim();
              var bv = b.cells[idx].textContent.trim();
              return next === 'ascending' ? av.localeCompare(bv) : bv.localeCompare(av);
            });
            rows.forEach(function(r) { tbody.appendChild(r); });
          });
        });
      })();
    </script>
  
```

## Usage Notes
- Use scope=col on header cells; aria-sort communicates current sort direction.
- Wrap in role=region + tabindex=0 so users can scroll horizontally with keyboard.
- <caption> with visually-hidden class gives table a name without affecting layout.
- Avoid zebra striping by default — modern UIs read better with hover-only highlight.
- For large datasets, swap localeCompare for a typed comparator (numeric, date).

## Tested In
- Chrome 120+
- Firefox 121
- Safari 17

## Accessibility
- Caption + scope=col + aria-sort fully described to screen readers.
- Sticky header keeps column meaning visible while scrolling.
- Pager has aria-label and disabled state.
- Region wrapper is keyboard-scrollable.
