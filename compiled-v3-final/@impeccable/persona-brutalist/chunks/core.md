# Brutalist [persona] v1.0.0
Raw concrete made digital: exposed structure, monospaced everywhere, harsh hierarchy, default browser blue links, intentionally awkward layouts that refuse polish. The page looks like the source code wrote itself onto the screen.
domain: visual-design

## School
brutalist

## Implies
- **Font**:
  - **Display**: monospace or system-default — e.g. JetBrains Mono, IBM Plex Mono, Berkeley Mono, Departure Mono, Times New Roman (the browser default)
  - **Body**: monospace dominant, occasionally Times New Roman or Arial as ironic counterpoint — e.g. JetBrains Mono, IBM Plex Mono, Space Mono, Times New Roman
- **Color**:
  - **Temperature**: neutral-harsh
  - **Palette**: black on white plus one primary — pure #000000, #ffffff, and one of #ff0000 / #0000ff / #ffff00 (no OKLCH, no muted tones)
  - **Background**: #ffffff (pure white) or #000000 (pure black) — never tinted, never warm
- **Density**: compact 1.4 — tight line-height, no decorative padding, content butted against edges
- **Layout**: single-column or 2-col with no gutter, full-bleed bands, raw HTML table semantics, asymmetric drops, intentional misalignment
- **Imagery**: raw photography (over-exposed, under-edited), screenshots-of-screenshots, default-styled <img> with visible alt fallbacks, no Figma-illustrations
- **Motion**: none — or jarring, instant, no easing; cursor effects acceptable, scroll-jacking not

## Example Brands
- Are.na
- brutalistwebsites.com
- Solana (early site)
- Cosmos.so
- It's Nice That archive
- Read.cv
- Bloomberg Businessweek (graphics dept micro-sites)

## Composition
- **Must Include**:
  - @community/fact-monospace-purpose
  - @community/check-contrast-aa
  - @community/rule-no-justified-text-narrow
- **Must Avoid**:
  - @impeccable/template-spring-config
  - @impeccable/persona-magazine-editorial
- **Typography Required**:
  - **Display**: monospace (JetBrains Mono | IBM Plex Mono | Berkeley Mono)
  - **Link Color**: #0000EE default browser blue (never override)
  - **No Rounded Corners**: true
- **Color Required**:
  - **Background**: #ffffff or #000000 (never tinted)
  - **Palette**: #000000 + #ffffff + one of #ff0000 / #0000ff / #ffff00
  - **No Shadows**: true
- **Motion Prescriptions**:
  - @community/check-contrast-aa
