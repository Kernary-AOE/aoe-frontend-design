# TypeScaleModular [fact] v1.0.0
Modular type scales generate font-size steps from a single ratio (Major Third 1.25, Perfect Fourth 1.333, Golden 1.618), producing visually consistent size jumps across a typographic hierarchy.
> A modular type scale multiplies a base font-size by a fixed ratio (typically between 1.125 and 1.618) to derive each step — common ratios are Minor Third (1.2), Major Third (1.25), Perfect Fourth (1.333), Augmented Fourth (1.414), Perfect Fifth (1.5), and Golden Ratio (1.618) — creating geometrically harmonious size hierarchies.

## Confidence
strong

## Applies To
- type-size token scales (h1-h6 + body)
- responsive type via clamp() with modular endpoints
- ratio choice depending on density: tighter (1.2) for UI, wider (1.5+) for editorial

## Quantitative
- **Minor Third**: 1.2
- **Major Third**: 1.25
- **Perfect Fourth**: 1.333
- **Augmented Fourth**: 1.414
- **Perfect Fifth**: 1.5
- **Golden Ratio**: 1.618
- **Typical Ui Ratio**: 1.25
- **Typical Editorial Ratio**: 1.5

## Counter Conditions
- Modular scales can produce awkward intermediate sizes that need rounding to the pixel grid.
- Display typography (huge headlines) often breaks the modular scale to land specific dramatic sizes.
- Multi-ratio scales (different ratios for different size ranges) are often more practical than a single ratio across the whole stack.
