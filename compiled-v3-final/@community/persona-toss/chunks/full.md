# Toss [persona] v1.0.0
Korean fintech super-app precision: Pretendard on #FAFAFA page with near-ink #3C3C3C text, single saturated accent #721FE5 reserved for active/selected states only, hero metrics at 48px/24px 2:1 ratio, and card shadows at rgba(0,0,0,0.04) — everything else is white space and numbers.
domain: frontend-design

## School
toss

## Implies
- **Font**:
  - **Display**: Pretendard (fallbacks: Inter, system-ui, sans-serif) — same family for display and body
  - **Body**: Pretendard or Inter — covers CJK characters cleanly for Korean/Japanese market apps
  - **Monospace**: ui-monospace, SFMono-Regular, Menlo, monospace
- **Color**:
  - **Temperature**: neutral
  - **Palette**: brand accent #721FE5 (active/selected only — never as card background or body text), dark variant #9B5FFF, brand tint bg #F0E8FF (10% opacity for selected rows/badges), page #FAFAFA (NOT pure white), card #ffffff, subtle surface #FAFAF9, muted #E8E6E1 (progress track/dividers), text-primary #3C3C3C (never pure #000), text-secondary #6A6A6A, text-tertiary #7A7A7A, text-disabled #9B9B9B
  - **Background**: #FAFAFA
- **Density**: mobile-first 430px max-width; space-y-6 between cards; mx-6 single cards; px-6 card grids; radius 10px (cards use rounded-2xl = 16px); 8px base grid
- **Layout**: single-column 430px max-w centered; everything inside cards — no bare-page content; hero metric 48px/24px 2:1 ratio; KPI 36px/18px; all cards float on #FAFAFA page
- **Imagery**: data-forward — balances, rates, spending charts; no lifestyle photography; numbers are the hero
- **Motion**: subtle spring ease cubic-bezier(0.34, 1.56, 0.64, 1); shadow-card 0 1px 3px rgba(0,0,0,0.04) — never ≥8% opacity

## Example Brands
- Toss (Korea)
- Kakao Pay
- Naver Pay
- Revolut (mobile dashboard)

## Composition
- **Must Include**:
  - @community/template-shadcn-pricing-toggle
  - @community/fact-fintech-number-display
- **Must Avoid**:
  - @impeccable/persona-magazine-editorial
  - @community/anti-pattern-rainbow-explosion
- **Typography Required**:
  - **Display**: Pretendard | Inter
  - **Tabular Nums**: true
  - **Number Unit Ratio**: 2:1 (48px/24px hero, 36px/18px KPI)
- **Color Required**:
  - **Background**: #FAFAFA
  - **Text Primary**: #3C3C3C
  - **Accent**: #721FE5
- **Motion Prescriptions**:
  - @community/pattern-hover-lift
  - @community/rule-whisper-shadows

## Relations
contradicts: [@impeccable/persona-magazine-editorial, @community/anti-pattern-rainbow-explosion]

## Compatible
- fintech-data-forward
- mobile-dashboard
- korean-super-app
- dense-pragmatist

## Conflicts
- editorial-magazine
- playful-consumer
- color-saturated-brand
- warm-institutional

## Contradicts
- @impeccable/persona-magazine-editorial
- @community/anti-pattern-rainbow-explosion
