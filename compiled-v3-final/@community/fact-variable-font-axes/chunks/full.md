# VariableFontAxes [fact] v1.0.0
Variable fonts encode multiple design axes — Weight (wght), Width (wdth), Optical Size (opsz), Slant (slnt), Italic (ital), and custom axes — into a single WOFF2 file, enabling continuous interpolation between extremes without loading multiple static font files.
> A variable font is a single font file that contains a design space defined by named axes; CSS accesses axes via `font-variation-settings` or high-level properties (`font-weight`, `font-stretch`, `font-optical-sizing`, `font-style`). Registered axes are: wght (weight 100–900), wdth (width 75–125%), opsz (optical size, maps to point size), slnt (slant -20–20°), ital (0=upright, 1=italic). Custom axes use 4-letter uppercase tags (e.g., GRAD for grade).
domain: frontend-design

## Confidence
strong

## Applies To
- choosing web fonts — prefer variable fonts for multi-weight UIs
- performance optimization — one WOFF2 vs 4+ static files
- responsive design — smoothly adjust weight/width at breakpoints with CSS custom properties
- dark mode — GRAD axis allows grade adjustment for perceived weight on dark backgrounds without layout shift

## Quantitative
- **Wght**: 100–900 (weight)
- **Wdth**: 75–125% (condensed to expanded)
- **Opsz**: typically 6–144pt (optical size, activates automatically with font-optical-sizing: auto)
- **Slnt**: -20 to 20 degrees
- **Ital**: 0 (upright) to 1 (italic)
- **GRAD**: grade adjustment, variable font-specific (e.g. Roboto Flex)

## Counter Conditions
- Variable font file sizes are larger than a single-weight static file — only beneficial when loading 3+ weights.
- Variable fonts with many axes can be 300–500 KB; subset to needed axes + character ranges via subsetting tools.
- Not all variable fonts ship a useful opsz axis — check the font's axis list before relying on optical sizing.
- Safari < 16 had bugs with `font-optical-sizing: auto` on variable fonts — test cross-browser.

## Sources

## Confidence
strong

## Source
- CSS Fonts Module Level 4 — font-variation-settings property
- OpenType Specification, Registered Design-Variation Axis Tags
- Google Fonts — Variable Fonts Guide
- v-fonts.com — variable font catalog with axis explorer

## Applies To
- choosing web fonts — prefer variable fonts for multi-weight UIs
- performance optimization — one WOFF2 vs 4+ static files
- responsive design — smoothly adjust weight/width at breakpoints with CSS custom properties
- dark mode — GRAD axis allows grade adjustment for perceived weight on dark backgrounds without layout shift

## Quantitative
- **Wght**: 100–900 (weight)
- **Wdth**: 75–125% (condensed to expanded)
- **Opsz**: typically 6–144pt (optical size, activates automatically with font-optical-sizing: auto)
- **Slnt**: -20 to 20 degrees
- **Ital**: 0 (upright) to 1 (italic)
- **GRAD**: grade adjustment, variable font-specific (e.g. Roboto Flex)

## Counter Conditions
- Variable font file sizes are larger than a single-weight static file — only beneficial when loading 3+ weights.
- Variable fonts with many axes can be 300–500 KB; subset to needed axes + character ranges via subsetting tools.
- Not all variable fonts ship a useful opsz axis — check the font's axis list before relying on optical sizing.
- Safari < 16 had bugs with `font-optical-sizing: auto` on variable fonts — test cross-browser.
