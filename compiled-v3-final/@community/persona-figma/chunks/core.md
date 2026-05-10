# Figma [persona] v1.0.0
Achromatic tool-chrome aesthetic: figmaSans variable font with granular weight stops (320–700), strict black #000000 and white #ffffff interface shell hosting explosively colorful product-output heroes, pill and circle button geometry evoking a tool palette, and dashed focus outlines that mirror the product's own selection UI.
domain: visual-design

## School
figma

## Implies
- **Font**:
  - **Display**: figmaSans variable (fallbacks: figmaSans Fallback, SF Pro Display, system-ui, helvetica) — 86px / 400 / line-height 1.00 / letter-spacing -1.72px for hero
  - **Body**: figmaSans at weight 320–340 (lighter than typical 400) for ethereal airy reading; OpenType 'kern' enabled globally
  - **Monospace**: figmaMono variable (fallbacks: figmaMono Fallback, SF Mono, menlo) — uppercase labels with +0.54–0.6px tracking
- **Color**:
  - **Temperature**: neutral
  - **Palette**: pure black #000000 text and borders, pure white #ffffff background, glass dark rgba(0,0,0,0.08) subtle overlay, glass white rgba(255,255,255,0.16) frosted on colored hero — zero chromatic colors in chrome
  - **Background**: #ffffff pure white (chrome only; hero sections use vibrant multi-stop gradient: electric green → bright yellow → deep purple → hot pink)
- **Density**: open-airy — body at 320–340 weight feels lighter than standard 400, 8px base spacing with fractional 4.5px values, max container up to 1920px
- **Layout**: centered 1920px max-width, hero with full-bleed vibrant gradient hosting product screenshot, feature grids with colorful product previews, pill tabs and circle icon buttons throughout
- **Imagery**: colorful product screenshots and user-generated Figma files as hero art — the chrome is the frame, the content is the painting; no stock photography
- **Motion**: creative playground — frosted glass transitions, gradient hue shifts in hero, 200-300ms ease-out; no scroll-jacking; motion reinforces the tool-as-canvas metaphor

## Example Brands
- Figma

## Composition
- **Must Include**:
  - @impeccable/template-easing-curves
  - @community/fact-variable-font-axes
  - @community/rule-opentype-features-on
- **Must Avoid**:
  - @impeccable/persona-warm-institutional
  - @impeccable/persona-magazine-editorial
- **Typography Required**:
  - **Display**: figmaSans variable
  - **Weight Stops**: 320/330/340/450/480/540/700 (never standard 400/500/600)
  - **Tracking**: -1.72px at 86px display
- **Color Required**:
  - **Background**: #ffffff (chrome only)
  - **Chrome Colors**: black #000000 and white #ffffff only — zero chromatic in chrome
  - **Hero**: vibrant gradient: electric green → bright yellow → deep purple → hot pink
- **Motion Prescriptions**:
  - @impeccable/template-easing-curves
  - @community/pattern-gradient-mesh-engine
