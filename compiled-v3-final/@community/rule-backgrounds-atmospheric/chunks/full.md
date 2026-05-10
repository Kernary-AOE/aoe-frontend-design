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

## Examples
- Mesh gradient: three radial-gradient layers at oklch(0.55 0.10 220 / 0.06), oklch(0.60 0.08 255 / 0.04), oklch(0.50 0.09 195 / 0.04) over a near-white base
- Noise texture: subtle SVG noise filter at opacity 0.03–0.05 layered over a solid base
- Geometric pattern: low-opacity repeating grid or dot pattern in brand hue at chroma 0.01–0.02
- Grain overlay: CSS background-image: url('grain.svg') at opacity 0.04 composited on a gradient mesh

## Rationale
Flat solid backgrounds are the lowest-effort generative default and the primary visual marker of AI-slop UI. Atmospheric backgrounds create depth and signal that a designer made active choices. They do not require heavy assets — three radial-gradient layers at opacity 0.04–0.08 are enough to read as intentional atmosphere while remaining content-neutral.

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
