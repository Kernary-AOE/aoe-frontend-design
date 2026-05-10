# ImageExplicitDimensions [rule] v1.0.0
Every <img> element MUST carry explicit width and height attributes matching the image's intrinsic dimensions to prevent Cumulative Layout Shift (CLS) during page load.
domain: frontend-design

## Severity
high

## Exceptions
- CSS-controlled fluid images where width:100% is applied AND the container has a fixed aspect ratio via aspect-ratio property — dimensions still preferred for browser hint
