# VercelClean [persona] v1.0.0
Dark-first developer-tool aesthetic: Geist Sans on near-black OKLCH neutrals, generous whitespace, monochrome surfaces lifted by subtle radial gradients, one neon accent (cyan/magenta/lime), and crisp 1px borders on glass-like cards.
domain: visual-design

## School
vercel-clean

## Implies
- **Font**:
  - **Display**: geometric-sans with optical sizing — e.g. Geist Sans, Inter Display, ABC Diatype, Söhne, Aeonik Pro, GT Walsheim
  - **Body**: same family as display — e.g. Geist Sans, Inter, Söhne, ABC Diatype Mono (for code accents)
  - **Monospace**: Geist Mono, JetBrains Mono, Berkeley Mono
- **Color**:
  - **Temperature**: cool-neutral
  - **Palette**: OKLCH neutral ramp (50-step) plus one neon accent — e.g. cyan oklch(85% 0.18 200), magenta oklch(75% 0.25 350), or lime oklch(90% 0.20 130)
  - **Background**: dark-first oklch(14% 0.005 270) — near-black with slight cool tint; light mode oklch(98.6% 0.002 270)
- **Density**: balanced — vertical rhythm 1.6, comfortable padding (16/24/32), card-based composition with breathing room between cards
- **Layout**: centered 1280px max-width, 12-col grid, sticky nav, hero with radial gradient background, feature grids 2x2 or 3-up cards
- **Imagery**: abstract 3D renders (Spline-style), gradient-mesh backgrounds, monochrome product screenshots with subtle drop-shadow, no stock photography
- **Motion**: subtle — 200-300ms ease-out, fade-in-up on scroll, gradient hue rotation, no bouncy springs

## Example Brands
- Vercel
- Resend
- Linear (product UI)
- Cal.com
- Supabase
- Clerk
- Railway
- Liveblocks

## Composition
- **Must Include**:
  - @impeccable/template-oklch-palette
  - @impeccable/template-oklch-dark-mode-cascade
  - @community/pattern-button-press-feedback
- **Must Avoid**:
  - @impeccable/persona-brutalist
  - @impeccable/persona-warm-institutional
- **Typography Required**:
  - **Display**: Geist Sans | Inter Display | Söhne
  - **Radius**: 6-8px (not pill)
  - **Dark Mode First**: true
- **Color Required**:
  - **Background**: oklch(14% 0.005 270)
  - **Accent**: one neon (cyan | magenta | lime)
  - **System**: OKLCH 50-step neutral ramp
- **Motion Prescriptions**:
  - @community/pattern-button-press-feedback
  - @impeccable/template-easing-curves

## Relations
specializes: [@community/persona-vercel]
contradicts: [@impeccable/persona-brutalist, @impeccable/persona-warm-institutional]

## Compatible
- minimal
- modern
- developer-tool
- swiss-modernist
- dark-mode-native

## Conflicts
- brutalist
- warm-institutional
- magazine-editorial
- tokyo-minimal

## Specializes
- @community/persona-vercel

## Contradicts
- @impeccable/persona-brutalist
- @impeccable/persona-warm-institutional
