# CollapseMultiColumnMobile [rule] v1.0.0
> Any multi-column layout (grid-template-columns with 2+ columns, or flex-direction: row with multiple siblings) must reflow to a single column at narrow viewports — preferably mobile-first via grid-template-columns: repeat(1, 1fr) base with wider breakpoints layered on top.
domain: frontend-design

## Label
Collapse Multi-Column Layouts on Small Screens

## Applies When
any component or layout section rendered at viewport width < 640px using 2+ columns

## Verify By
Resize browser to 375px; confirm no horizontal scrollbar and all columns stack vertically

## Code
```
    /* Mobile-first collapse pattern */
    .layout-grid {
      display: grid;
      grid-template-columns: 1fr;          /* single column base */
      gap: 16px;
    }
    @media (min-width: 640px) {
      .layout-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .layout-grid { grid-template-columns: repeat(3, 1fr); }
    }

    /* Flex row that collapses */
    .flex-row-collapse {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    @media (min-width: 768px) {
      .flex-row-collapse { flex-direction: row; }
    }
  
```

## Severity
error

## Rationale
Multi-column grids on small screens cause horizontal overflow or force horizontal scrolling, degrading usability. Single-column flow at narrow widths is the universally expected reading pattern on phone-class devices.

## Label
Collapse Multi-Column Layouts on Small Screens

## Applies When
any component or layout section rendered at viewport width < 640px using 2+ columns

## Verify By
Resize browser to 375px; confirm no horizontal scrollbar and all columns stack vertically

## Code
```
    /* Mobile-first collapse pattern */
    .layout-grid {
      display: grid;
      grid-template-columns: 1fr;          /* single column base */
      gap: 16px;
    }
    @media (min-width: 640px) {
      .layout-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .layout-grid { grid-template-columns: repeat(3, 1fr); }
    }

    /* Flex row that collapses */
    .flex-row-collapse {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    @media (min-width: 768px) {
      .flex-row-collapse { flex-direction: row; }
    }
  
```

## Severity
error
