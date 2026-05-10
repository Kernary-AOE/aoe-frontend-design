# Notion [persona] v1.0.0
Warm minimalist workspace brand: NotionInter (modified Inter) on pure white #ffffff with warm-undertone gray scale, Notion Blue #0075de as single saturated accent, whisper borders at rgba(0,0,0,0.1), and multi-layer micro-shadows for depth that is felt rather than seen.
domain: visual-design

## School
notion

## Implies
- **Font**:
  - **Display**: NotionInter (modified Inter, fallbacks: Inter, -apple-system, system-ui, Segoe UI) — OpenType lnum + locl on display/heading text; 64px/700/line-height 1.00/letter-spacing -2.125px for hero
  - **Body**: NotionInter — 400 body, 500 UI, 600 emphasis, 700 display; scale with progressively relaxing tracking from -2.125px at 64px toward normal at 16px
  - **Monospace**: NotionInter sans everywhere (Notion uses its sans for code as well); distinct mono typeface not a brand feature
- **Color**:
  - **Temperature**: warm-neutral
  - **Palette**: Notion Blue #0075de CTA/link, near-black rgba(0,0,0,0.95) primary text, white #ffffff canvas, alt-bg #f6f5f4 warm-white (yellow undertone), warm dark surface #31302e, gray-500 #615d59, gray-300 #a39e98, active blue #005bab, deep navy #213183, badge-bg #f2f9ff
  - **Background**: #ffffff
- **Density**: refined-minimal — 4px buttons/inputs, 8px small cards, 12px standard cards, 16px hero cards, 9999px pill badges; 8px base with fractional micro-adjustments (5.6px, 6.4px); 1200px max-width; section rhythm 64–120px vertical
- **Layout**: white sections alternating with #f6f5f4 warm-white sections for visual rhythm without harsh color breaks; centered 1200px; playful hand-drawn hero illustrations layered on soft warm gradient backgrounds
- **Imagery**: hand-drawn character illustrations and decorative art as hero anchors — not stock photography, not abstract gradients; illustration signals 'canvas for your content'
- **Motion**: multi-layer micro-shadows (4–5 stacked layers, max individual opacity 0.05 each) — depth felt rather than seen; whisper border rgba(0,0,0,0.1) throughout

## Example Brands
- Notion

## Composition
- **Must Include**:
  - @community/pattern-card-component
  - @impeccable/template-card-hover-lift
- **Must Avoid**:
  - @impeccable/persona-brutalist
  - @community/anti-pattern-thin-weight-body
- **Typography Required**:
  - **Display**: NotionInter (modified Inter)
  - **Weight Range**: 400-700
  - **Tracking**: -2.125px at 64px, relaxing to normal at 16px
- **Color Required**:
  - **Background**: #ffffff
  - **Alt Bg**: #f6f5f4
  - **Accent**: #0075de
- **Motion Prescriptions**:
  - @impeccable/template-card-hover-lift
  - @community/pattern-hover-lift
