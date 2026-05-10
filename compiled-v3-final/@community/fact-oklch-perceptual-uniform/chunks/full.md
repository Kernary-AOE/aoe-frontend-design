# OklchPerceptualUniform [fact] v1.0.0
OKLCH is a perceptually-uniform color space: equal numerical changes in L (lightness) or C (chroma) produce equal perceived changes across all hues. sRGB hex / HSL fail this property — equal HSL lightness deltas read very differently across yellow vs blue.
> OKLCH (Björn Ottosson, 2020) is perceptually uniform — a 5-point lightness step in OKLCH looks like the same brightness change regardless of hue, while the equivalent step in HSL produces a much larger change in yellows than in blues — making OKLCH the correct color space for tonal ramps, contrast math, and dark-mode mirroring.

## Confidence
proven

## Applies To
- design-token color systems (12-stop ramps)
- dark-mode token derivation (mirror L axis)
- contrast math (predictable APCA / WCAG ratios across hues)
- perceptual gradient interpolation (color-mix in oklch)

## Quantitative
- **L Axis Range**: 0%–100%, perceptually uniform
- **C Axis Typical Max**: ~0.4 in display-P3, ~0.32 in sRGB
- **H Axis Range**: 0–360 degrees
- **Contrast Deviation From Uniformity**: OKLCH < 1% perceptual variance per L step; HSL > 30% across hues

## Counter Conditions
- OKLCH's gamut extends beyond sRGB — out-of-gamut OKLCH values get clipped on sRGB displays. Use color-gamut media queries or stay within achievable C for the target gamut.
- OKLCH ≠ Oklab — they are the polar / Cartesian forms of the same space. Browser support for both shipped in 2023.
- Pre-OKLCH alternatives (CIELAB, CIELCh) are also perceptually uniform but produce slightly worse predictions for blue hues — OKLCH improves the blue range specifically.

## Sources

## Confidence
proven

## Source
- Björn Ottosson, 'A perceptual color space for image processing' (2020) — bottosson.github.io/posts/oklab/
- CSS Color Module Level 4 — oklch() / oklab() function specification
- Lea Verou, 'LCH colors in CSS: what, why, and how?' (2020)
- Andrew Clark / Evil Martians, 'OKLCH in CSS' explainers (2022–2023)

## Applies To
- design-token color systems (12-stop ramps)
- dark-mode token derivation (mirror L axis)
- contrast math (predictable APCA / WCAG ratios across hues)
- perceptual gradient interpolation (color-mix in oklch)

## Quantitative
- **L Axis Range**: 0%–100%, perceptually uniform
- **C Axis Typical Max**: ~0.4 in display-P3, ~0.32 in sRGB
- **H Axis Range**: 0–360 degrees
- **Contrast Deviation From Uniformity**: OKLCH < 1% perceptual variance per L step; HSL > 30% across hues

## Counter Conditions
- OKLCH's gamut extends beyond sRGB — out-of-gamut OKLCH values get clipped on sRGB displays. Use color-gamut media queries or stay within achievable C for the target gamut.
- OKLCH ≠ Oklab — they are the polar / Cartesian forms of the same space. Browser support for both shipped in 2023.
- Pre-OKLCH alternatives (CIELAB, CIELCh) are also perceptually uniform but produce slightly worse predictions for blue hues — OKLCH improves the blue range specifically.
