# DensePragmatist [persona] v1.0.0
An aesthetic persona derived from professional-grade data tools: Bloomberg Terminal, trading dashboards, IDE UIs, analytics platforms. Optimized for information density, expert-user efficiency, and zero decorative overhead. Every pixel carries information.
domain: visual-design

## School
dense-pragmatist

## Implies
- **Font**:
  - **Display**: geometric-sans or neo-grotesque — e.g. Inter (permitted here), IBM Plex Sans, Geist, Aktiv Grotesk
  - **Monospace**: essential — e.g. JetBrains Mono, IBM Plex Mono, Berkeley Mono for data values
  - **Body**: tabular-figures enabled — `font-variant-numeric: tabular-nums`
- **Color**:
  - **Temperature**: cool-neutral
  - **Background**: #0a0a0a–#161b22 (near-black or GitHub dark)
  - **Accent**: functional color — red=error, green=success, amber=warning, blue=info; avoid decorative accent
- **Density**: maximum — 24-28px row height (Bloomberg-tight), 12-13px base font, line-height 1.30-1.35 (NOT 1.45+), 2-4px row padding
- **Layout**: grid-based, fixed columns, minimal whitespace, data-table dominant
- **Motion**: zero — no decorative transitions; state changes are instant or < 80ms
- **Numbers**: tabular-nums throughout; align decimal points

## Example Brands
- Bloomberg Terminal
- Grafana dashboard
- Linear (issue list view)
- VS Code with compact mode
- Datadog metrics explorer

## Composition
- **Must Include**:
  - @community/pattern-data-table-dense
  - @community/fact-monospace-purpose
  - @impeccable/template-oklch-dark-mode-cascade
- **Must Avoid**:
  - @impeccable/template-fade-stagger
  - @impeccable/template-spring-config
- **Typography Required**:
  - **Display**: Inter | IBM Plex Sans | Geist
  - **Tabular Nums**: true
  - **Base Size**: 12-13px
  - **Line Height**: 1.30-1.35
  - **Row Height Max**: 28px
- **Color Required**:
  - **Background**: #0a0a0a-#161b22
  - **Accent**: semantic only: red=error, green=success, amber=warning, blue=info
  - **No Decorative Accent**: true
- **Motion Prescriptions**:
  - @community/check-contrast-aa
