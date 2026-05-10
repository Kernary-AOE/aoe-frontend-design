# BackgroundsAtmospheric [rule] v1.0.0
> Page and section backgrounds must not default to a single flat solid color; use atmosphere-creating techniques — gradient meshes, noise textures, tinted layered gradients, grain overlays, or geometry — to signal deliberate craftsmanship over AI-generated defaults.
domain: frontend-design

## Applies To
- hero sections and above-the-fold page backgrounds
- landing page section backgrounds
- marketing and editorial layouts
- any surface where visual craftsmanship is a product signal

## Counter Examples
- background: #f8f8f8 as the entire page background — flat, undesigned
- background-color: white on every section — fails to signal depth or hierarchy
- background: oklch(0.97 0 0) with no layering — correct color, no atmosphere

## Use Instead
gradient meshes (radial-gradient layers), noise textures, layered transparencies, grain overlays, subtle geometric patterns

## Severity
medium
