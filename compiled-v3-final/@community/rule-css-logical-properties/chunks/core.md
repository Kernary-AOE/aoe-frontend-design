# CssLogicalProperties [rule] v1.0.0
> Replace physical CSS directional properties (margin-left, margin-right, padding-left, padding-right, border-left, border-right, left:, right:) with logical equivalents (margin-inline-start, margin-inline-end, padding-inline-start, padding-inline-end, border-inline-start, inset-inline-start) to support both LTR and RTL layouts without extra CSS.
domain: frontend-design

## Label
Use CSS Logical Properties for RTL Compatibility

## Applies When
writing any CSS with directional spacing, borders, positioned offsets, or text alignment

## Verify By
Search codebase for margin-left, margin-right, padding-left, padding-right, border-left, border-right, left:, right: — replace each with its logical equivalent

## Mapping
```
    /* Physical → Logical mapping */
    margin-left        → margin-inline-start
    margin-right       → margin-inline-end
    padding-left       → padding-inline-start
    padding-right      → padding-inline-end
    border-left        → border-inline-start
    border-right       → border-inline-end
    left:              → inset-inline-start:
    right:             → inset-inline-end:
    margin-top         → margin-block-start    (for vertical-writing-mode support)
    margin-bottom      → margin-block-end

    /* Example: sidebar border that auto-flips in RTL */
    .sidebar { border-inline-end: 1px solid hsl(var(--border)); }

    /* Example: icon spacing in a button */
    .btn .icon { margin-inline-end: 8px; }
  
```

## Severity
warning
