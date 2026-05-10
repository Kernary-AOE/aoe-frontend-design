# Sentry [persona] v1.0.0
Late-night debugging aesthetic: warm purple-black #1f1633 canvas with bioluminescent inset-shadow buttons, Dammit Sans hero voice contrasted by Rubik UI workhorse, and lime green #c2ef4e as rare high-visibility pop against deep purple ambience.
domain: visual-design

## School
sentry

## Implies
- **Font**:
  - **Display**: Dammit Sans — hero and display only, brand personality; 88px / 700 / line-height 1.20
  - **Body**: Rubik (fallbacks: -apple-system, system-ui, Segoe UI, Helvetica, Arial) — 4-tier weight system: 400 body / 500 nav+emphasis / 600 titles / 700 buttons+CTAs
  - **Monospace**: Monaco (fallbacks: Menlo, Ubuntu Mono)
- **Color**:
  - **Temperature**: cool
  - **Palette**: deep purple #1f1633 primary bg, deeper #150f23, border purple #362d59, sentry purple #6a5fc1 links/hover, muted purple #79628c buttons, lime #c2ef4e rare pop, coral focus #ffb287, pink outline #fa7faa, code yellow #dcdcaa syntax
  - **Background**: #1f1633
- **Density**: balanced — 6px inputs / 8–12px cards+containers / 13px primary muted buttons / 18px pill images+badges, 8px base spacing, section padding 64–80px+, max-width 1152px
- **Layout**: centered max 1152px, single-column hero with ambient glow wrapping, feature sections with frosted-glass layered panels
- **Imagery**: code/terminal screenshots with syntax highlighting (#dcdcaa yellow), dark-on-dark frosted glass (blur 18px saturate 180%), no stock photography
- **Motion**: tactile — inset shadow transitions on button press; backdrop-blur panels; ambient glow `rgba(22,15,36,0.9) 0px 4px 4px 9px` wraps hero content

## Example Brands
- Sentry

## Composition
- **Must Include**:
  - @impeccable/template-button-press
  - @impeccable/template-oklch-dark-mode-cascade
  - @community/fact-monospace-purpose
- **Must Avoid**:
  - @impeccable/persona-warm-institutional
  - @impeccable/persona-magazine-editorial
- **Typography Required**:
  - **Display**: Dammit Sans (hero-only, 0-2 elements max)
  - **Body**: Rubik
  - **Lime Accent Scarcity**: once per section maximum
- **Color Required**:
  - **Background**: #1f1633
  - **Accent Lime**: #c2ef4e
  - **Accent Purple**: #6a5fc1
- **Motion Prescriptions**:
  - @impeccable/template-button-press
  - @impeccable/template-easing-curves

## Relations
contradicts: [@impeccable/persona-warm-institutional, @impeccable/persona-magazine-editorial]

## Compatible
- vercel-clean
- dense-pragmatist
- tokyo-minimal

## Conflicts
- warm-institutional
- magazine-editorial
- swiss-modernist
- notion-warm

## Contradicts
- @impeccable/persona-warm-institutional
- @impeccable/persona-magazine-editorial
