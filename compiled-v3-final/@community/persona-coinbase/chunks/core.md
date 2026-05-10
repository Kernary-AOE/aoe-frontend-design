# Coinbase [persona] v1.0.0
Institutional crypto-financial aesthetic: CoinbaseDisplay/Sans/Text/Icons proprietary four-font stack, Coinbase Blue #0052ff as sole accent on white and near-black #0a0b0d, 56px pill CTAs with a counterintuitive hover-lightens pattern, and 1.00 line-height display density that signals financial-grade seriousness.
domain: visual-design

## School
coinbase

## Implies
- **Font**:
  - **Display**: CoinbaseDisplay — hero-only, 80px / 400 / line-height 1.00 (ultra-tight financial-statement density)
  - **Body**: CoinbaseText for reading prose, 18px / 400 / 1.56 line-height; CoinbaseSans for buttons/headings/nav, 16px / 600 / +0.16px tracking
  - **Monospace**: system-monospace (CoinbaseIcons handles iconography; no code-display mono role)
- **Color**:
  - **Temperature**: cool
  - **Palette**: Coinbase Blue #0052ff brand + interactive, button hover blue #578bfa lighter-on-hover, secondary link #0667d0, near-black #0a0b0d dark sections, cool gray surface #eef0f3 secondary buttons (blue-tinted), dark card #282b31
  - **Background**: #ffffff primary light / #0a0b0d dark sections — decisive alternation only
- **Density**: compact display — 1.00 line-height on 80/64/52px display sizes, 8px base spacing, max content width ~1440px, 56px primary pill CTAs
- **Layout**: decisively alternating white ↔ #0a0b0d sections, centered content, feature grids and asset grids, 56px pill CTAs as focal CTA anchor
- **Imagery**: crypto asset icons, product UI screenshots, abstract data visualization; no lifestyle photography
- **Motion**: professional restraint — hover-lightens (CTA to #578bfa, counterintuitive), smooth section transitions, no bouncy springs; motion must never undermine trust

## Example Brands
- Coinbase

## Composition
- **Must Include**:
  - @community/fact-fintech-number-display
  - @impeccable/template-card-hover-lift
  - @impeccable/template-oklch-palette
- **Must Avoid**:
  - @impeccable/persona-brutalist
  - @impeccable/persona-warm-institutional
- **Typography Required**:
  - **Display**: CoinbaseDisplay
  - **Line Height Display**: 1.00
  - **Cta Radius**: 56px (not 9999px full pill)
- **Color Required**:
  - **Background**: #ffffff
  - **Dark Section**: #0a0b0d
  - **Accent**: #0052ff
- **Motion Prescriptions**:
  - @impeccable/template-card-hover-lift
  - @community/pattern-hover-lift
