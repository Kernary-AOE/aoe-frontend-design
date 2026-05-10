# OklchOnlyColor [constraint] v1.0.0
All new color declarations must use the oklch() color function. Hex (#rrggbb), rgb()/rgba(), hsl()/hsla(), and CSS named colors are forbidden in new author code and in design tokens.
domain: visual-design

## Target
- color values in author CSS
- design-token primitives
- inline style color props

## Severity
high

## Values
-
  - **Forbidden**: #rrggbb / #rgb hex literals
  - **Reason**: non-perceptual sRGB encoding
-
  - **Forbidden**: rgb() / rgba()
  - **Reason**: device-dependent, non-perceptual
-
  - **Forbidden**: hsl() / hsla()
  - **Reason**: lightness axis is not perceptually uniform across hues
-
  - **Forbidden**: named colors (red, blue, rebeccapurple, …)
  - **Reason**: imprecise, opaque to tooling
-
  - **Required**: oklch(L C H [/ A])
-
  - **Allowed**: transparent, currentColor, inherit, initial, unset

## Exceptions
- Vendor / third-party CSS shipped by external libraries (track but do not block).
- SVG paint values inside imported designer assets treated as binary blobs.
- @supports not (color: oklch(0% 0 0)) fallback blocks targeting legacy browsers.

## Approved Alternatives
- oklch(L% C H) — primary form, e.g. oklch(62% 0.18 250)
- color-mix(in oklch, …) — for blends, still oklch() space
- var(--token) where --token resolves to oklch()

## Enforcement
Stylelint plugin: `color-no-hex`, `color-named: never`, plus a custom matcher requiring the `oklch(` token in all color-bearing properties. CI uses @community/check-color-oklch-required.
