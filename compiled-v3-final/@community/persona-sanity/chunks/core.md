# Sanity [persona] v1.0.0
Nocturnal command center: pure-achromatic gray ramp on near-black #0b0b0b, waldenburgNormal at -4.48px tracking and 112px display scale, with coral #f36458 CTAs and electric #0052ef universal hover landing like signal lights in a dark control room.
domain: visual-design

## School
sanity

## Implies
- **Font**:
  - **Display**: waldenburgNormal (fallbacks: waldenburgNormal Fallback, ui-sans-serif, system-ui; substitute Inter or Space Grotesk externally) — OpenType: cv01, cv11, cv12, cv13, ss07; display hero 112px / 400 / -4.48px tracking
  - **Body**: waldenburgNormal — weight 400 most text, 425 mid headings, 500–600 only on 11px uppercase labels; calt disabled
  - **Monospace**: IBM Plex Mono (fallbacks: ibmPlexMono Fallback, ui-monospace)
- **Color**:
  - **Temperature**: neutral
  - **Palette**: canvas #0b0b0b, elevated #212121, border #353535, CTA coral #f36458, universal hover blue #0052ef, light blue #55beff / #afe3ff, neon green color(display-p3 .270588 1 0) / sRGB #19d600, text #ffffff / #b9b9b9 / #797979
  - **Background**: #0b0b0b
- **Density**: compact — 3px xs inputs / 4–5px sm / 6px md cards / 12px lg cards / 99999px pills (direct jump, no middle values), 8px base, section 64–120px, page gutter 32px desktop / 16px mobile, max-width ~1440px
- **Layout**: centered max 1440px, control-room hierarchy — monochrome surfaces, coral CTA as sole warm color, blue as universal activation layer
- **Imagery**: developer/infrastructure UI screenshots on dark, system-readout aesthetic with IBM Plex Mono uppercase labels as visual texture
- **Motion**: precise — no spring animations; transitions serve the control-room aesthetic: instant-feeling with short ease-out

## Example Brands
- Sanity

## Composition
- **Must Include**:
  - @impeccable/template-oklch-dark-mode-cascade
  - @community/rule-opentype-features-on
  - @community/pattern-data-table-dense
- **Must Avoid**:
  - @impeccable/persona-warm-institutional
  - @impeccable/persona-magazine-editorial
- **Typography Required**:
  - **Display**: waldenburgNormal
  - **Tracking**: -4.48px at 112px display
  - **Opentype Features**: cv01, cv11, cv12, cv13, ss07
- **Color Required**:
  - **Background**: #0b0b0b
  - **Accent Cta**: #f36458
  - **Accent Hover**: #0052ef (universal hover across all interactive)
- **Motion Prescriptions**:
  - @impeccable/template-easing-curves
  - @community/pattern-hover-lift
