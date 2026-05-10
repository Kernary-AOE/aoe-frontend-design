# Mintlify [persona] v1.0.0
Documentation-as-product design: Inter on pure white #ffffff with atmospheric green-to-white gradient hero, brand green #18E299 reserved exclusively for interactive states, full-pill 9999px buttons and inputs, and whisper-thin 5%-opacity borders throughout.
domain: visual-design

## School
mintlify

## Implies
- **Font**:
  - **Display**: Inter (fallbacks: Inter Fallback, system-ui, -apple-system, sans-serif) — 64px/600/line-height 1.15/letter-spacing -1.28px for display hero
  - **Body**: Inter — 400 body, 500 UI, 600 headings (no bold 700 used); section labels 13px/500/tracking 0.65px uppercase
  - **Monospace**: Geist Mono (fallbacks: Geist Mono Fallback, ui-monospace, SFMono-Regular) — 12px uppercase/500–600/tracking +0.6px for terminal labels
- **Color**:
  - **Temperature**: cool-neutral
  - **Palette**: near-black #0d0d0d primary text, brand green #18E299 CTA/hover/focus, green light #d4fae8 tinted surface, green deep #0fa76e badge text, gray-500 #666666, gray-200 #e5e5e5, gray-100 #f5f5f5, gray-50 #fafafa, border rgba(0,0,0,0.05)
  - **Background**: #ffffff
- **Density**: airy — 4px inline-code radius, 8px nav buttons, 16px standard cards, 24px featured cards, 9999px pills; 8px base; section padding 48–96px vertical; 1200px max-width; 24px mobile / 32px desktop horizontal padding
- **Layout**: luminous white centered layout with atmospheric cloud-like green-to-white gradient hero wash; white-on-white sections separated by 5%-opacity borders only; demonstrates reading comfort as product value
- **Imagery**: light documentation UI screenshots; no decorative fills or gradients beyond the hero wash; dark mode bg #0d0d0d / card #141414 / text #ededed
- **Motion**: whisper shadows rgba(0,0,0,0.03) 0px 2px 4px maximum; button shadow rgba(0,0,0,0.06) 0px 1px 2px; depth is border-driven not shadow-driven

## Example Brands
- Mintlify

## Composition
- **Must Include**:
  - @impeccable/template-card-hover-lift
  - @community/check-body-readability
  - @community/principle-typography-hierarchy
- **Must Avoid**:
  - @impeccable/persona-brutalist
  - @impeccable/persona-dense-pragmatist
- **Typography Required**:
  - **Display**: Inter
  - **Weight Range**: 400-600 (no 700)
  - **Pill Radius**: 9999px on buttons AND inputs
- **Color Required**:
  - **Background**: #ffffff
  - **Accent**: #18E299
  - **Border**: rgba(0,0,0,0.05)
- **Motion Prescriptions**:
  - @impeccable/template-card-hover-lift
  - @impeccable/template-easing-curves

## Relations
contradicts: [@impeccable/persona-brutalist, @impeccable/persona-dense-pragmatist]

## Compatible
- swiss-modernist
- vercel-clean
- editorial
- notion-warm

## Conflicts
- brutalist
- dense-pragmatist
- magazine-editorial

## Contradicts
- @impeccable/persona-brutalist
- @impeccable/persona-dense-pragmatist
