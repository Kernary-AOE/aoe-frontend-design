# Linear [persona] v1.0.0
Dark-mode-native project management precision: Inter Variable at weight 510 with cv01/ss03 OpenType features on near-black #08090a, single indigo #5e6ad2 accent, and translucent rgba(255,255,255,0.05) borders as structure.
domain: visual-design

## School
linear

## Implies
- **Font**:
  - **Display**: Inter Variable (fallbacks: SF Pro Display, -apple-system, system-ui, Segoe UI, Roboto) — OpenType cv01/ss03 non-negotiable; 72px/510/line-height 1.00/letter-spacing -1.584px for display XL
  - **Body**: Inter Variable same family — weight 510 signature (between 400 regular and 500 medium); 300 light for secondary text; 590 semibold for emphasis
  - **Monospace**: Berkeley Mono (fallbacks: ui-monospace, SF Mono, Menlo)
- **Color**:
  - **Temperature**: cool
  - **Palette**: indigo #5e6ad2 CTA, violet #7170ff active/links, accent hover #828fff, canvas #08090a (also #010102), panel #0f1011, elevated surface #191a1b, secondary #28282c, primary text #f7f8f8 (never pure white), secondary text #d0d6e0, tertiary #8a8f98
  - **Background**: #08090a
- **Density**: compact-precise — 2px micro / 4px standard / 6px buttons-inputs / 8px cards / 12px panels / 22px large panels / 9999px pills; 8px base with 7px/11px micro-adjustments for optical alignment; 1200px max-width
- **Layout**: dark-canvas centered layout; content emerges from darkness via opacity stepping rather than color contrast; section padding 80px+
- **Imagery**: abstract product screenshots, command palette demos, keyboard-driven UI; no stock photography; luminance-stepping elevation replaces shadow depth
- **Motion**: opacity-only hover states; inset shadow rgba(0,0,0,0.2) 0px 0px 12px 0px for recessed panels; compressed tracking at large sizes progressively relaxing

## Example Brands
- Linear

## Composition
- **Must Include**:
  - @impeccable/template-oklch-dark-mode-cascade
  - @community/pattern-data-table-dense
  - @impeccable/template-cmd-palette-shell
- **Must Avoid**:
  - @community/anti-pattern-thin-weight-body
  - @impeccable/template-fade-stagger
- **Typography Required**:
  - **Display**: Inter Variable | SF Pro Display
  - **Weight Signature**: 510
  - **Opentype Features**: cv01, ss03
- **Color Required**:
  - **Background**: #08090a
  - **Accent**: #5e6ad2
  - **Shadow Style**: rgba(0,0,0,0.2) 0px 0px 12px 0px inset
- **Motion Prescriptions**:
  - @community/pattern-hover-lift
  - @impeccable/template-card-hover-lift

## Relations
contradicts: [@community/anti-pattern-thin-weight-body, @impeccable/template-fade-stagger]

## Compatible
- vercel-clean
- swiss-modernist
- dense-pragmatist
- tokyo-minimal

## Conflicts
- warm-institutional
- magazine-editorial
- brutalist

## Contradicts
- @community/anti-pattern-thin-weight-body
- @impeccable/template-fade-stagger
