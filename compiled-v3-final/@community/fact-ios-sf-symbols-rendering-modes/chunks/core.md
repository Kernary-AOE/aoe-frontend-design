# IosSfSymbolsRenderingModes [fact] v1.0.0
SF Symbols support four rendering modes — monochrome, hierarchical, palette, and multicolor — each with a distinct visual purpose and SwiftUI symbolRenderingMode API.
domain: frontend-design

## Evidence
- monochrome: single color, default rendering; use for simple decorative icons. .symbolRenderingMode(.monochrome).
- hierarchical: single hue with automatic opacity layers creating depth; use for icons with visual layering. .symbolRenderingMode(.hierarchical).
- palette: explicit per-layer colors for custom two-tone icons. .symbolRenderingMode(.palette).foregroundStyle(.red, .blue).
- multicolor: system-defined per-layer colors with inherent semantic meaning (battery level, weather icons). .symbolRenderingMode(.multicolor).
- Choose multicolor for symbols that Apple ships with intended per-layer colors; choose palette for brand-specific two-tone customization.
