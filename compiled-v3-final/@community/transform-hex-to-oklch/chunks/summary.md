# HexToOklch [transform] v1.0.0
Converts a hex color string ('#3B82F6' or '3B82F6' or '#fff') to oklch coordinates. Composes hex parsing → sRGB → linear sRGB → XYZ D65 → Oklab → polar oklch. The result is suitable for storing in a design token in oklch() form, enabling perceptually-even tonal palettes.
domain: visual-design
