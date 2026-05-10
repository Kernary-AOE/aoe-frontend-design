# Apple [persona] v1.0.0
Cinematic product-as-sculpture marketing aesthetic: SF Pro Display/Text with optical sizing crossover at 20px, pure-black #000000 and cool-tinted #f5f5f7 alternating in binary film-cut rhythm, Apple Blue #0071e3 as the sole chromatic accent, and universal negative tracking at every text size.
domain: visual-design

## School
apple

## Implies
- **Font**:
  - **Display**: SF Pro Display (fallbacks: SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif) — used at 20px and above
  - **Body**: SF Pro Text (same fallbacks) — used below 20px; crossover at 20px is a hard boundary, not a suggestion
  - **Monospace**: SF Mono (no dedicated mono role in Apple marketing; system mono as fallback)
- **Color**:
  - **Temperature**: cool-neutral
  - **Palette**: pure black #000000 dark canvas, cool-tinted light gray #f5f5f7 light sections, near-black text #1d1d1f, Apple Blue #0071e3 interactive, bright link blue #2997ff on dark surfaces, dark glass surface #272729
  - **Background**: #000000 (dark sections) / #f5f5f7 (light sections) — alternating binary rhythm, never mixed
- **Density**: spacious — one product per viewport rhythm, 8px base with 1px micro-adjustments, max content width ~980px, universal negative tracking (-0.374px at 17px, -0.224px at 14px, -0.12px at 12px)
- **Layout**: full-bleed alternating dark/light sections each featuring a single product or feature, 980px pill CTAs, centered 980px max-width content, sticky translucent nav
- **Imagery**: product as sculpture on pure black or #f5f5f7 — no lifestyle context, no background distractions, single soft shadow rgba(0,0,0,0.22) 3px 5px 30px
- **Motion**: cinematic — parallax on product reveals, smooth section transitions, translucent nav backdrop-filter saturate(180%) blur(20px), no bouncy springs

## Example Brands
- Apple

## Composition
- **Must Include**:
  - @community/pattern-ios-large-title-nav
  - @community/constraint-ios-touch-target-44pt
  - @community/fact-ios-button-style-hierarchy
- **Must Avoid**:
  - @impeccable/persona-brutalist
  - @community/pattern-data-table-dense
- **Typography Required**:
  - **Display**: SF Pro Display
  - **Body**: SF Pro Text
  - **Tracking**: universal negative — -0.374px at 17px, -0.224px at 14px, -0.12px at 12px
- **Color Required**:
  - **Dark Section**: #000000
  - **Light Section**: #f5f5f7
  - **Accent**: #0071e3
- **Motion Prescriptions**:
  - @impeccable/template-easing-curves
