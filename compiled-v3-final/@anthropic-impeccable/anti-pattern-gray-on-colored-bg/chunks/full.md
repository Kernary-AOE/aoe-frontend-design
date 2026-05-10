# GrayOnColoredBackground [anti-pattern] v1.0.0
Using achromatic gray text (oklch(X% 0 0)) on any non-white colored background. The gray appears washed-out, lifeless, and loses legibility because the chroma conflict between a chromatic background and achromatic text creates visual dissonance.
domain: frontend-design

## Label
Gray Text on Colored Background

## Trap
Gray is safe and legible on white backgrounds, so designers reach for it habitually. On a colored surface — even a subtly tinted background — gray text reads as faded, unintentional, or low quality. The eye expects text on a colored surface to either contrast strongly (high-chroma dark text) or to share the surface's hue family (a darker shade of the background color).

## Remediation
- Use a darker shade of the background hue for secondary text, not a neutral gray.
- Example: background at oklch(75% 0.12 250) → secondary text at oklch(30% 0.08 250), not oklch(40% 0 0).
- For maximum contrast text, use the brand near-black (hue-tinted, not pure achromatic).
- Use oklch color-mix() to derive on-color text: `color-mix(in oklch, var(--surface) 30%, oklch(5% 0.02 var(--hue)))`

## Sources

## Label
Gray Text on Colored Background

## Trap
Gray is safe and legible on white backgrounds, so designers reach for it habitually. On a colored surface — even a subtly tinted background — gray text reads as faded, unintentional, or low quality. The eye expects text on a colored surface to either contrast strongly (high-chroma dark text) or to share the surface's hue family (a darker shade of the background color).

## Remediation
- Use a darker shade of the background hue for secondary text, not a neutral gray.
- Example: background at oklch(75% 0.12 250) → secondary text at oklch(30% 0.08 250), not oklch(40% 0 0).
- For maximum contrast text, use the brand near-black (hue-tinted, not pure achromatic).
- Use oklch color-mix() to derive on-color text: `color-mix(in oklch, var(--surface) 30%, oklch(5% 0.02 var(--hue)))`
