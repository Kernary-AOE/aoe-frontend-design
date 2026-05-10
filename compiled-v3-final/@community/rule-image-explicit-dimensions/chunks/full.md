# ImageExplicitDimensions [rule] v1.0.0
Every <img> element MUST carry explicit width and height attributes matching the image's intrinsic dimensions to prevent Cumulative Layout Shift (CLS) during page load.
domain: frontend-design

## Severity
high

## Exceptions
- CSS-controlled fluid images where width:100% is applied AND the container has a fixed aspect ratio via aspect-ratio property — dimensions still preferred for browser hint

## Examples
- Correct: <img src="hero.webp" width="1200" height="630" alt="Hero" loading="eager">
- Wrong: <img src="hero.webp" alt="Hero"> — no dimensions, CLS guaranteed
- Next.js: Use <Image> component which enforces width/height by default

## Rationale
The browser calculates the aspect ratio from width/height before the image loads, reserving the correct space in the layout. Without these attributes, content below the image jumps once the image arrives — a Core Web Vitals violation.

## Severity
high

## Exceptions
- CSS-controlled fluid images where width:100% is applied AND the container has a fixed aspect ratio via aspect-ratio property — dimensions still preferred for browser hint
