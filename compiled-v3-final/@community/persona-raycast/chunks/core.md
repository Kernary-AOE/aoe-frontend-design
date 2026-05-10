# Raycast [persona] v1.0.0
macOS-native precision instrument: near-black blue-tinted void #07080a with Inter + GeistMono, layered multi-layer inset box-shadows simulating pressed-glass depth, and Raycast Red #FF6363 reserved exclusively for the diagonal hero stripe pattern.
domain: visual-design

## School
raycast

## Implies
- **Font**:
  - **Display**: Inter (features: calt, kern, liga, ss02, ss03, ss08) — liga disabled on hero headings
  - **Body**: Inter (weight 500 baseline on dark — heavier than typical 400 for legibility)
  - **Monospace**: GeistMono, ui-monospace, SFMono-Regular, Roboto Mono, Menlo, Monaco
- **Color**:
  - **Temperature**: cool-neutral
  - **Palette**: near-black #07080a canvas, elevated #101111, card #1b1c1e, text #f9f9f9 primary / #cecece secondary / #9c9c9d dim, red #FF6363 hero punctuation, blue hsl(202,100%,67%) ~#55b3ff interactive
  - **Background**: #07080a
- **Density**: balanced-compact — 2–3px micro / 6px button workhorse / 12px standard cards / 86px+ pill CTAs, 8px base spacing, ~1200px max-width, section padding 80–120px
- **Layout**: centered hero with diagonal red stripe pattern, max-width ~1200px, keyboard-showcase sections with physical keycap renders as primary prop
- **Imagery**: physical keycap renders with 3D gradient depth, macOS-native window chrome screenshots, no stock photography
- **Motion**: opacity-only hover (buttons to opacity 0.6) — no background-color transitions, no bouncy springs

## Example Brands
- Raycast

## Composition
- **Must Include**:
  - @impeccable/template-cmd-palette-shell
  - @community/pattern-kbd-shortcut-chip
  - @impeccable/template-button-press
- **Must Avoid**:
  - @impeccable/persona-magazine-editorial
  - @impeccable/persona-warm-institutional
- **Typography Required**:
  - **Display**: Inter
  - **Weight Signature**: 500
  - **Opentype Features**: calt, kern, liga, ss02, ss03, ss08
- **Color Required**:
  - **Background**: #07080a
  - **Accent Interactive**: hsl(202,100%,67%)
  - **Accent Punctuation**: #FF6363
- **Motion Prescriptions**:
  - @impeccable/template-button-press
  - @community/pattern-hover-lift
