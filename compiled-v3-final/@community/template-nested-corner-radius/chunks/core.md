# NestedCornerRadius [template] v1.0.0
domain: frontend-design

## Label
Nested Corner Radius Formula

## Body
```
    /* Nested Corner Radius Formula: inner-radius = outer-radius - gap */
    /*
      When a rounded container holds a rounded child element,
      the inner radius must be smaller to maintain visual harmony.

      Formula:
        inner-radius = outer-radius - padding (gap between container edge and child)

      Example:
        outer card: border-radius 12px, padding 8px
        inner element: border-radius = 12 - 8 = 4px
    */

    .card {
      border-radius: 12px;
      padding: 8px;
    }

    .card__inner {
      border-radius: 4px; /* 12px - 8px = 4px */
    }

    /* shadcn/ui derived-scale pattern — change one token to shift entire product personality */
    :root {
      --radius: 8px; /* Your base persona decision */
    }

    .rounded-sm  { border-radius: calc(var(--radius) - 4px); } /* 4px */
    .rounded-md  { border-radius: calc(var(--radius) - 2px); } /* 6px */
    .rounded-lg  { border-radius: var(--radius);              } /* 8px */
    .rounded-xl  { border-radius: calc(var(--radius) + 4px);  } /* 12px */
    .rounded-2xl { border-radius: calc(var(--radius) + 8px);  } /* 16px — use sparingly */
  
```

## Usage
Apply the subtraction formula whenever a child element inside a rounded container also needs rounding. Use the shadcn/ui single-token scale pattern to create a cohesive radius system across all component sizes. Adjust --radius to shift the entire product's personality.
