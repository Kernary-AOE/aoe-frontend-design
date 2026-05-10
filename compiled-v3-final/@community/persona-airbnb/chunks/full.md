# Airbnb [persona] v1.0.0
Warm photography-forward marketplace aesthetic: Airbnb Cereal VF in the 500-700 weight range, Rausch Red #ff385c as the single accent on pure white, with 20-32px radius cards that invite touch and three-layer shadow elevation that feels like warm natural light.
domain: visual-design

## School
airbnb

## Implies
- **Font**:
  - **Display**: Airbnb Cereal VF (fallbacks: Circular, -apple-system, system-ui, Roboto, Helvetica Neue)
  - **Body**: Airbnb Cereal VF same family; 14px / 400 / line-height 1.43; no thin weights ever
  - **Monospace**: system-ui-monospace (no dedicated mono — Airbnb is not a code product)
- **Color**:
  - **Temperature**: warm-neutral
  - **Palette**: Rausch Red #ff385c brand accent, deep rausch #e00b41 pressed, warm near-black #222222 primary text, light surface #f2f2f2 secondary bg, border gray #c1c1c1, Luxe Purple #460479 premium tier
  - **Background**: #ffffff pure white
- **Density**: open — 20px card radius, 32px large container radius, 50% circular controls, 8px base spacing with organic fractional steps (3, 6, 11, 15, 22px)
- **Layout**: photography-first listing cards (image top half, details below), circular carousel controls, 61-breakpoint responsive grid from 375 to 1920px, max content width ~1128px
- **Imagery**: listing photography is the product — full card-top images with rounded corners; no illustration or abstract renders
- **Motion**: subtle lift — three-layer shadow on hover, circular control transitions, no aggressive spring; scroll is leisurely browsing not snappy navigation

## Example Brands
- Airbnb

## Composition
- **Must Include**:
  - @community/principle-vertical-rhythm
  - @impeccable/template-card-hover-lift
- **Must Avoid**:
  - @impeccable/persona-dense-pragmatist
  - @community/anti-pattern-thin-weight-body
- **Typography Required**:
  - **Display**: Airbnb Cereal VF | Circular
  - **Weight Range**: 500-700
  - **No Thin Weights**: true
- **Color Required**:
  - **Background**: #ffffff
  - **Accent**: #ff385c
  - **Text Primary**: #222222
- **Motion Prescriptions**:
  - @impeccable/template-card-hover-lift
  - @impeccable/template-easing-curves

## Relations
contradicts: [@impeccable/persona-dense-pragmatist, @community/anti-pattern-thin-weight-body]

## Compatible
- magazine-editorial
- warm-institutional
- notion-warm
- editorial

## Conflicts
- vercel-clean
- dense-pragmatist
- brutalist

## Contradicts
- @impeccable/persona-dense-pragmatist
- @community/anti-pattern-thin-weight-body
