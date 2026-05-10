# Supabase [persona] v1.0.0
Dark-mode-native BaaS developer aesthetic: Circular weight 400 at 1.00 line-height on near-black #171717 with PostgreSQL-green #3ecf8e as identity-only accent, depth built entirely from border-color stepping rather than shadows.
domain: visual-design

## School
supabase

## Implies
- **Font**:
  - **Display**: Circular with fallbacks custom-font, Helvetica Neue, Helvetica, Arial
  - **Body**: Circular weight 400 — same family across display and body
  - **Monospace**: Source Code Pro with fallbacks Office Code Pro, Menlo
- **Color**:
  - **Temperature**: cool-neutral
  - **Palette**: brand green #3ecf8e logo/accent, link green #00c573, green border rgba(62,207,142,0.3), page bg #171717, button/deepest bg #0f0f0f, primary text #fafafa, secondary text #b4b4b4, muted #898989, border subtle #242424, card border #2e2e2e, button border #363636
  - **Background**: #171717
- **Density**: airy sections — 8px base spacing, dramatic section scale 48 → 90 → 96 → 128px, cards 8–16px radius, pill CTAs at 9999px, single 600px mobile/desktop breakpoint
- **Layout**: single-column hero with terminal-command density, large pill CTAs, OSS-identity section anchors with Source Code Pro uppercase mono labels
- **Imagery**: product-first — terminal screenshots and database diagrams; no stock photography; glass dark rgba(41,41,41,0.84) surfaces for overlaid panels
- **Motion**: minimal — rgba(0,0,0,0.1) 0px 4px 12px focus-only shadow; hover states via border-color stepping, not movement

## Example Brands
- Supabase

## Composition
- **Must Include**:
  - @impeccable/template-oklch-palette
  - @community/pattern-dashboard-layout
  - @impeccable/template-oklch-dark-mode-cascade
- **Must Avoid**:
  - @impeccable/persona-warm-institutional
  - @impeccable/persona-notion-warm
- **Typography Required**:
  - **Display**: Circular
  - **Weight Signature**: 400
  - **Line Height Display**: 1.00
- **Color Required**:
  - **Background**: #171717
  - **Accent**: #3ecf8e
  - **Border Depth**: #242424 → #2e2e2e → #363636
- **Motion Prescriptions**:
  - @community/pattern-hover-lift
  - @impeccable/template-dark-mode-toggle
