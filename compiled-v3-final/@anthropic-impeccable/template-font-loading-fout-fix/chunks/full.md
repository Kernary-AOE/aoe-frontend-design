# FontLoadingFoutFix [template] v1.0.0
A CSS @font-face pattern that uses `font-display: swap` with a metric-adjusted fallback font to minimize layout shift when the custom font loads. The fallback uses size-adjust, ascent-override, and descent-override to match the custom font's visual footprint.
domain: frontend-design

## Label
Web Font Loading with FOUT Mitigation via Metric Override

## Code
```
    /* 1. Self-hosted custom font with swap */
    @font-face {
      font-family: 'DisplayFont';
      src: url('/fonts/display.woff2') format('woff2');
      font-weight: 400 700;
      font-display: swap;
      font-style: normal;
    }

    /* 2. Metric-adjusted fallback to eliminate layout shift */
    @font-face {
      font-family: 'DisplayFont-Fallback';
      src: local('Georgia');          /* closest available system font */
      size-adjust: 108%;              /* scale to match x-height */
      ascent-override: 88%;           /* match ascender height */
      descent-override: 22%;          /* match descender depth */
      line-gap-override: 0%;          /* match line gap */
    }

    /* 3. Use the custom font with fallback stack */
    :root {
      --font-display: 'DisplayFont', 'DisplayFont-Fallback', Georgia, serif;
    }

    body {
      font-family: var(--font-display);
    }
  
```

## Sources

## Rationale
Font loading without metric overrides causes Cumulative Layout Shift (CLS) when the fallback font's metrics differ from the custom font — text reflows as the font swaps. By adjusting the fallback font's metrics to match the custom font, text occupies identical space before and after the swap, eliminating visual instability. Tools like Fontaine (unjs) calculate these overrides automatically from font files.
