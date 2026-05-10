# OpentypeFeatures [template] v1.0.0
CSS declarations to enable common OpenType features that most developers overlook: tabular numerics for data alignment, ordinal/diagonal fractions for recipe/measurement display, small caps for abbreviations, and ligature control for code.
domain: frontend-design

## Label
OpenType Feature Settings for UI Polish

## Code
```
    /* ──────────────────────────────────────────── */
    /* Tabular numerics — essential for data tables */
    /* ──────────────────────────────────────────── */
    .data-table td,
    .metric-value,
    .price,
    .number {
      font-variant-numeric: tabular-nums;
      /* Low-level: font-feature-settings: 'tnum' 1; */
    }

    /* ──────────────────────── */
    /* Ordinals (1st, 2nd, 3rd) */
    /* ──────────────────────── */
    .ordinal {
      font-variant-numeric: ordinal;
    }

    /* ─────────────────────────────────────────────────── */
    /* Diagonal fractions (recipes, measurements: 1/2, 3/4) */
    /* ─────────────────────────────────────────────────── */
    .fraction {
      font-variant-numeric: diagonal-fractions;
    }

    /* ────────────────────────────────────────────── */
    /* Small caps — abbreviations, labels, UI metadata */
    /* ────────────────────────────────────────────── */
    abbr,
    .label-small-caps {
      font-variant-caps: all-small-caps;
      letter-spacing: 0.05em; /* small caps need tracking */
    }

    /* ─────────────────────────────── */
    /* Disable ligatures in code/mono  */
    /* ─────────────────────────────── */
    code,
    pre,
    .monospace {
      font-variant-ligatures: none;
    }

    /* ──────────────────────────────────────── */
    /* Enable contextual alternates (some fonts) */
    /* ──────────────────────────────────────── */
    .display-heading {
      font-variant-alternates: contextual;
      font-kerning: normal;
    }

    /* ─────────────────────── */
    /* Lining vs. Old-style     */
    /* ─────────────────────── */
    .body-prose {
      font-variant-numeric: oldstyle-nums; /* more legible in running text */
    }
    .ui-label {
      font-variant-numeric: lining-nums; /* uniform cap-height alignment */
    }
  
```

## Sources

## Rationale
Most web fonts ship with OpenType features disabled by default. Enabling the correct feature for each context elevates typographic quality without requiring a design change — it is the difference between a number column where digits shift visually because proportional figures vary in width, and a column where digits align perfectly because tabular figures share a fixed width. These are the details that separate 'designed' from 'styled'.
