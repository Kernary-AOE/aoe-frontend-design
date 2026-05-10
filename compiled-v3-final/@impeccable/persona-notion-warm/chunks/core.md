# NotionWarm [persona] v1.0.0
Friendly productivity-tool aesthetic: off-white #fbfaf9 paper background, soft warm-grey borders, Inter or SF Pro Display, callout cards with emoji, generous block spacing, hover states that feel tactile. Reads as 'a notebook your friend designed' rather than 'enterprise software.'
domain: visual-design

## School
notion-warm

## Implies
- **Font**:
  - **Display**: humanist or geometric sans optimized for screen — e.g. Inter, SF Pro Display, Söhne, ABC Diatype, Geist, Untitled Sans
  - **Body**: same family as display, regular weight at 16px — e.g. Inter, SF Pro Text, Söhne, system-ui
  - **Accent**: occasional handwritten pairing for headers — e.g. Caveat, Reenie Beanie, Shadows Into Light Two
- **Color**:
  - **Temperature**: warm
  - **Palette**: warm off-white paper + soft warm greys + warm primary accent — #fbfaf9 background, #ebebe9 borders, #787774 muted text, #2383e2 (Notion blue) or #d44c47 (warm red) accent
  - **Background**: #fbfaf9 (Notion-paper warm white) — slightly cream, never pure #ffffff, never grey-cool
- **Density**: balanced 1.6 — line-height 1.55, block-level padding (12px 16px), generous space between content blocks (24-32px), hover states with 2-4px lift
- **Layout**: single-column 720-820px main content, optional left rail for navigation, callout cards with 1px border + 8px radius, toggle blocks, inline emoji as iconography
- **Imagery**: abstract illustrations with rounded blob shapes, emoji as primary iconography (not Lucide icons), soft-shadow product screenshots, hand-drawn arrows
- **Motion**: playful but restrained — 200ms ease-out hover lifts, drag-and-drop feedback, toggle expand/collapse with height animation, no parallax

## Example Brands
- Notion
- Linear (the soft marketing side, not the dense product UI)
- Roam Research
- Craft Docs
- Tana
- Reflect.app
- Capacities
- AnyType

## Composition
- **Must Include**:
  - @community/pattern-card-component
  - @community/principle-typography-hierarchy
- **Must Avoid**:
  - @impeccable/persona-brutalist
  - @impeccable/persona-dense-pragmatist
- **Typography Required**:
  - **Display**: Inter | SF Pro Display | Söhne
  - **Weight**: regular at 16px body
  - **Radius**: 4-8px (6px preferred)
- **Color Required**:
  - **Background**: #fbfaf9 (never pure #ffffff)
  - **Border**: #ebebe9
  - **Accent**: #2383e2 or #d44c47
- **Motion Prescriptions**:
  - @community/pattern-hover-lift
  - @impeccable/template-easing-curves
