# DarkModeSurfaceHierarchy [template] v1.0.0
Dark mode elevation hierarchy uses progressively lighter surface colors to indicate depth — the inverse of light mode which uses shadows. This CSS token pattern establishes three surface levels and handles text weight reduction for dark rendering.
domain: frontend-design

## Label
Dark Mode Depth via Surface Colors, Not Shadows

## Code
```
    /* ─────────────────────────────────────────── */
    /* Token layer: dark mode surface + text system */
    /* ─────────────────────────────────────────── */
    :root {
      /* Light mode: shadows for depth */
      --surface-1: oklch(99% 0.005 var(--hue));  /* Page background */
      --surface-2: oklch(95% 0.008 var(--hue));  /* Cards, panels */
      --surface-3: oklch(90% 0.010 var(--hue));  /* Active state, hover */

      --text-primary:   oklch(18% 0.04 var(--hue));
      --text-secondary: oklch(45% 0.03 var(--hue));
      --text-muted:     oklch(60% 0.02 var(--hue));
    }

    [data-theme="dark"] {
      /* Dark mode: LIGHTER surfaces sit HIGHER */
      --surface-1: oklch(13% 0.01 var(--hue));   /* Page background */
      --surface-2: oklch(18% 0.01 var(--hue));   /* Cards (visible lift) */
      --surface-3: oklch(23% 0.01 var(--hue));   /* Modals, dropdowns (top) */

      /* Desaturate accents slightly in dark mode */
      --color-accent: oklch(65% 0.18 var(--hue)); /* vs 60% 0.22 in light */

      /* Reduce body weight — light text reads heavier on dark */
      --body-weight: 350;
    }

    body {
      background: var(--surface-1);
      font-weight: var(--body-weight, 400);
    }

    .card { background: var(--surface-2); }
    .modal, .dropdown { background: var(--surface-3); }

    /* Note: no box-shadow in dark mode — surfaces carry depth */
  
```

## Sources

## Rationale
In light mode, darker shadows on a light background communicate depth (elements closer to the viewer cast shadows onto the ground plane). In dark mode, shadows are invisible against dark backgrounds. The correct dark mode convention is inverted: lighter surfaces sit 'higher' than darker ones. A modal (high elevation) uses a lighter dark surface than the page background (ground level). Additionally, dark mode text should be rendered at a slightly reduced weight (350 instead of 400) because light text on dark backgrounds has higher perceived contrast than dark text on light, making medium-weight text appear bolder than intended.
