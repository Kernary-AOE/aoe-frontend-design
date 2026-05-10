# ColorHueSelection [rule] v1.0.0
> A palette must have hue spread of at least 120 degrees between primary and accent colors; primary and accent must differ in chroma by at least 0.04; semantic hues (success, warning, danger, info) must not collide with the brand primary hue.
domain: frontend-design

## Applies To
- brand palette creation
- design token specification
- AI-generated color schemes
- any project using OKLCH primitives

## Examples
- primary H=220, accent H=350 (spread = 130°) — PASS
- primary H=145, accent H=22 (spread = 123°) — PASS
- primary C=0.12 (restrained), accent C=0.18 (vivid pop) — chroma diff = 0.06, PASS

## Rationale
Small hue spread (< 120°) creates a monotone trap where everything is 'blue and slightly different blue.' Equal chroma on primary and accent produces flat hierarchy with no visual pop. Semantic color collision means warning/danger signals cannot be visually distinguished from brand actions — a critical usability and safety failure.

## Applies To
- brand palette creation
- design token specification
- AI-generated color schemes
- any project using OKLCH primitives
