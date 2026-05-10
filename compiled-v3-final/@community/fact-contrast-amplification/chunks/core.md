# ContrastAmplification [fact] v1.0.0
Light-on-dark text (negative polarity) needs ~10% higher contrast and slightly heavier weight than dark-on-light to feel equally legible, because halation around bright glyphs on dark backgrounds reduces effective edge sharpness.
> Text rendered light-on-dark (negative polarity) requires roughly 10% higher luminance contrast and one weight step heavier than the same text dark-on-light to achieve perceptual parity, because of halation: bright glyphs on dark backgrounds bleed photons into adjacent dark pixels, softening edges and reducing effective contrast.

## Confidence
strong

## Applies To
- dark-mode token derivation (don't naive-invert)
- weight selection: bump body weight from 400 → 450/500 in dark themes
- OKLCH lightness tuning when mirroring light tokens to dark
- checking that AA-passing light tokens still pass when inverted

## Quantitative
- **Contrast Amplification Factor**: ≈ 1.1× (10%)
- **Weight Amplification**: +50 weight units typical (e.g., 400 → 450)
- **Halation Mechanism**: subpixel rendering + LCD photon scatter on adjacent dark pixels

## Counter Conditions
- OLED displays with true blacks reduce halation considerably — amplification factor closer to 1.0.
- Astigmatism users report inverse polarity preference — halation is *more* pronounced for them, but the discomfort flips relative to the median user.
- Variable-font weight axes let dark-mode amplification be a continuous tweak rather than a discrete weight step.
