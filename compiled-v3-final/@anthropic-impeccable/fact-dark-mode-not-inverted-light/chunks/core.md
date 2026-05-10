# DarkModeNotInvertedLight [fact] v1.0.0
> Dark mode is not an inverted version of light mode. It requires independent design decisions on surface hierarchy (lighter surfaces = higher elevation), shadow removal, accent saturation reduction, text weight reduction, and image handling.
domain: frontend-design

## Detail
The na ve implementation of dark mode — inverting the light palette — fails because the design conventions are different in each mode: (1) In light mode, shadows create depth; in dark mode, lighter surfaces create depth (shadows are invisible on dark). (2) Accent colors appear more saturated in dark environments — reduce chroma by 10-20% in dark mode to prevent visual overload. (3) Light text on dark backgrounds registers as heavier weight than equivalent dark text on light — reduce body font-weight by 50 units (400 → 350) in dark mode. (4) Images and illustrations designed for light mode may have halos or inappropriate contrast in dark mode — use `prefers-color-scheme` in image source sets or CSS filters. (5) Never use pure black (#000) as the dark mode background — perceived contrast is too harsh; use oklch(12-18%) dark surfaces with a hint of brand hue.

## Four Differences
- Depth signal: light mode = shadows, dark mode = lighter surfaces (NOT darker shadows)
- Accent saturation: dark mode accents need 10-20% less chroma than their light mode equivalents
- Text weight: reduce by ~50 units (400→350) — light text on dark reads heavier
- Background: never pure black; use oklch(13-18% 0.01 brand-hue)
