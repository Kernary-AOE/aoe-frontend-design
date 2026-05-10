# StripeFintech [persona] v1.0.0
Fintech trustworthiness made aspirational: brand-color OKLCH systems with a single hue variable, animated gradient hero backgrounds, dense API-doc tables, rounded 12px cards with crisp 1px hairline borders, dark-mode toggle as first-class. Reads as 'we move money and we have taste.'
domain: visual-design

## School
stripe-fintech

## Implies
- **Font**:
  - **Display**: geometric or grotesque sans with strong numerals — e.g. Sohne, Camphor, ABC Diatype, Inter, Larsseit, GT Walsheim, Untitled Sans
  - **Body**: same family as display with tabular-nums always on — e.g. Sohne, Inter, Camphor, system-ui
  - **Monospace**: essential for code samples and financial values — e.g. Sohne Mono, JetBrains Mono, IBM Plex Mono, Geist Mono
- **Color**:
  - **Temperature**: cool
  - **Palette**: OKLCH brand-hue system: --brand-hue: 235 generates 50-step ramp, plus semantic green (#00d924) and red (#df1b41), gradient hero of brand-hue + adjacent hue (e.g. 235 to 280)
  - **Background**: light-mode oklch(99% 0.005 240) near-white with cool tint, dark-mode oklch(13% 0.02 240) deep navy-black; gradient heroes use conic-gradient or radial multi-stop
- **Density**: balanced — vertical rhythm 1.55, dense data tables (40-44px row height with tabular-nums), card padding 24px, section padding 96-128px
- **Layout**: 1280px max-width, sticky nav with backdrop-blur, hero with animated gradient mesh, 3-up feature cards with 12px radius and 1px hairline border, API-style code blocks side-by-side with prose
- **Imagery**: abstract gradient meshes, isometric 3D illustrations of cards/checkout flows, real product screenshots in browser-chrome frames, no stock photography
- **Motion**: smooth — 300-400ms ease-out for transitions, animated gradient hue shifts on hero, count-up animations for stats, hover states with 2px lift + border-color shift, no spring physics

## Example Brands
- Stripe
- Plaid
- Mercury
- Ramp
- Brex
- Wise
- Modern Treasury
- Increase

## Composition
- **Must Include**:
  - @community/template-shadcn-pricing-toggle
  - @community/fact-fintech-number-display
  - @impeccable/template-oklch-palette
- **Must Avoid**:
  - @impeccable/persona-brutalist
  - @impeccable/persona-warm-institutional
- **Typography Required**:
  - **Display**: Söhne | Inter | Camphor (single-family sans)
  - **Tabular Nums**: true
  - **No Serif Body**: true
- **Color Required**:
  - **System**: OKLCH --brand-hue variable (50-step ramp)
  - **Background Light**: oklch(99% 0.005 240)
  - **Background Dark**: oklch(13% 0.02 240)
- **Motion Prescriptions**:
  - @community/pattern-gradient-mesh-engine
  - @impeccable/template-easing-curves
