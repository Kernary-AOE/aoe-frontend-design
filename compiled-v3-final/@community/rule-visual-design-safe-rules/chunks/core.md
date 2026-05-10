# VisualDesignSafeRules [rule] v1.0.0
> Apply these 12 mathematically-verifiable visual design rules: (1) near-black not pure black (oklch 12–15% lightness); (2) near-white not pure white (oklch 96–98%); (3) saturate neutrals with brand hue at chroma < 0.01; (4) 60-30-10 color ratio; (5) spacing values must come from an 8px base scale (4/8/12/16/24/32/48/64/96px); (6) outer padding ≥ inner padding; (7) button horizontal padding = 2× vertical; (8) body text minimum 16px; (9) line length 60–80ch; (10) shadow blur = 2× offset distance; (11) nested corner radius = outer − padding; (12) high contrast for CTAs, low contrast for structural borders.
domain: frontend-design

## Label
Visual Design Safe Rules (Anthony Hobday + Refactoring UI)

## Applies When
reviewing or generating any frontend design — landing pages, dashboards, components, or marketing sites

## Rules
```
    /* Rule 1: Near-black, not pure black */
    color: oklch(13% 0.01 var(--brand-hue));   /* not #000 */

    /* Rule 2: Near-white, not pure white */
    background: oklch(97% 0.01 var(--brand-hue));  /* not #fff */

    /* Rule 5: Spacing from 8pt scale only */
    /* Valid: 4, 8, 12, 16, 24, 32, 48, 64, 96px */
    /* Invalid: 10, 15, 20, 22, 30px */

    /* Rule 6: Outer padding >= inner padding */
    .card { padding: 24px; }
    .card .inner { padding: 16px; }  /* inner < outer: correct */

    /* Rule 7: Button horizontal padding = 2x vertical */
    .btn { padding: 8px 16px; }   /* 8 vertical, 16 horizontal: correct */

    /* Rule 10: Shadow blur = 2x offset */
    box-shadow: 0 4px 8px oklch(0% 0 0 / 0.12);  /* offset 4, blur 8: correct */

    /* Rule 11: Nested corner radius */
    /* card outer: border-radius: 12px; card padding: 16px */
    .card-inner { border-radius: calc(12px - 16px); }  /* clamp to 0 or small value */

    /* Rule 12: High/low contrast pairing */
    .btn-primary { background: oklch(50% 0.15 250); color: white; }  /* CTA: high contrast */
    .divider { background: oklch(90% 0.01 250); }  /* Structure: low contrast */
  
```

## Checklist
- No #000 or #fff — use near-black/near-white oklch values
- No spacing values outside 4/8/12/16/24/32/48/64/96px
- Button padding ratio: horizontal = 2× vertical
- Body font size >= 16px
- Prose max-width: 65ch
- Shadow blur always 2× shadow offset
- Nested radius formula applied to all inset elements
- 60% neutral / 30% secondary / 10% accent color distribution

## Severity
warning
