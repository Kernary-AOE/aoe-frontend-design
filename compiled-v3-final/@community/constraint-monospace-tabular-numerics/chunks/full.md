# MonospaceTabularNumerics [constraint] v1.0.0
Numeric data in tables, dashboards, financial UIs, and metric cards MUST use tabular-numeral rendering (`font-variant-numeric: tabular-nums`) — NOT a monospace typeface — unless the typeface is itself monospace for other semantic reasons (code, terminals). Monospace fonts are not required; `tnum` OpenType feature on a proportional font achieves column alignment without sacrificing aesthetics.
domain: frontend-design

## Target
numeric display in tables, dashboards, fintech UIs

## Severity
medium

## Values
-
  - **Required**: font-variant-numeric: tabular-nums on all numeric table cells, balance displays, metric cards
-
  - **Required**: font-variant-numeric: lining-nums (or lnum) for numbers alongside capitals in headers
-
  - **Allowed**: Monospace font for CODE, hashes, IDs, terminal output, SKUs — where character-by-character alignment is the entire point
-
  - **Forbidden**: Switching to full monospace font (JetBrains Mono, Courier) solely for column alignment in a proportional UI — use tnum instead
-
  - **Forbidden**: Mixing proportional and tabular numerals within the same column of a data table

## Approved Alternatives
- font-variant-numeric: tabular-nums lining-nums on numeric contexts
- CSS: `.metric, td.number, .amount { font-variant-numeric: tabular-nums lining-nums; }`
- CSS shorthand: `font-variant: tabular-nums` (applies tnum, compatible with most browsers)
- font-feature-settings: 'tnum' 1, 'lnum' 1 (explicit feature activation fallback)

## Rationale
Tabular figures (tnum) ensure each digit occupies the same horizontal advance, causing numbers in adjacent rows to align vertically in a column — exactly what monospace achieves, but without the aesthetic penalty of fixed-width letters on non-numeric characters. Most quality fonts (Inter, Geist, Söhne, Source Serif 4, IBM Plex) ship tnum as an OpenType feature. Switching the entire UI to a monospace face to solve numeric alignment is the typographic equivalent of using a sledgehammer for a thumbtack.
