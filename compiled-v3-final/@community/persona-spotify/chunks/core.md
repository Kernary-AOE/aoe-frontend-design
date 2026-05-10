# Spotify [persona] v1.0.0
Content-first darkness: near-black cocoon #121212 where album art is the sole color source, SpotifyMixUI at bold-or-regular binary weight contrast, Spotify Green #1ed760 reserved for play controls only, and pill-plus-circle geometry encoding interaction type.
domain: visual-design

## School
spotify

## Implies
- **Font**:
  - **Display**: SpotifyMixUITitle (CircularSp variant) with extensive global fallback: CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl, CircularSp-Grek, CircularSp-Deva, Helvetica Neue, helvetica, arial, Hiragino Sans, Meiryo, MS Gothic
  - **Body**: SpotifyMixUI — bold/regular binary: 700 or 400 with minimal 600 usage; compact 10–24px size range
  - **Monospace**: not applicable — app context uses no code display
- **Color**:
  - **Temperature**: neutral
  - **Palette**: deepest #121212, dark surface #181818, button surface #1f1f1f, elevated cards #252525 / #272727, brand green #1ed760 play+CTA (border variant #1db954), text #ffffff / #b3b3b3 silver, semantic red #f3727f / orange #ffa42b / blue #539df5
  - **Background**: #121212
- **Density**: compact — 2–4px micro badges+tags / 6–8px cards / 10–20px panels / 100px large pills / 500px primary pill buttons / 9999px nav pills / 50% circular play controls, 8px base spacing, breakpoints 425/576/768/896/1024/1280px
- **Layout**: multi-breakpoint app shell (425–1280px), achromatic chrome receding so user album art content leads all visual hierarchy
- **Imagery**: user-generated album art, playlist covers, podcast artwork as primary chromatic source — UI deliberately achromatic; no stock photography or abstract renders
- **Motion**: heavy-shadow elevation transitions: `rgba(0,0,0,0.5) 0px 8px 24px` dialog float, `rgba(0,0,0,0.3) 0px 8px 8px` card hover — dark-on-dark shadow is the motion vocabulary

## Example Brands
- Spotify

## Composition
- **Must Include**:
  - @impeccable/template-oklch-dark-mode-cascade
  - @impeccable/template-card-hover-lift
  - @community/constraint-typography-weight-blacklist
- **Must Avoid**:
  - @impeccable/persona-magazine-editorial
  - @impeccable/persona-warm-institutional
- **Typography Required**:
  - **Display**: SpotifyMixUITitle (CircularSp)
  - **Weight Binary**: 700 or 400 only (no 500 medium)
  - **Size Range**: 10-24px compact
- **Color Required**:
  - **Background**: #121212
  - **Accent**: #1ed760 (play controls only)
  - **Shadow**: rgba(0,0,0,0.5) 0px 8px 24px dialogs / rgba(0,0,0,0.3) 0px 8px 8px cards
- **Motion Prescriptions**:
  - @impeccable/template-card-hover-lift
  - @community/pattern-hover-lift
