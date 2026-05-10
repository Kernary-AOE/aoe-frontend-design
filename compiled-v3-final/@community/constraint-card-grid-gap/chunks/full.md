# CardGridGap [constraint] v1.0.0
Card grids must use gap: 16px (gap-4) minimum for dense dashboards and gap: 24px (gap-6) for content layouts — never gap: 8px or less, so cards read as discrete units rather than a merged surface.
domain: frontend-design

## Label
Card Grid Gap Minimum

## Threshold
16px minimum gap between cards in any grid or flex layout

## Unit
CSS px

## Pass
>= 16px

## Warn
8px – 15px

## Block
<= 8px

## Code
```
    /* Dense dashboard card grid */
    .card-grid-dense {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;  /* gap-4 — dashboard minimum */
    }

    /* Content-focused card grid (blog, product listings) */
    .card-grid-content {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 24px;  /* gap-6 — content layout */
    }
    @media (min-width: 640px)  { .card-grid-content { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .card-grid-content { grid-template-columns: repeat(3, 1fr); } }
  
```

## Rationale
Cards are discrete informational units. Gaps below 16px cause adjacent card borders to appear merged, breaking the 'bounded object' affordance. Dashboards use 16px (gap-4); content grids use 24px (gap-6) for more breathing room.
