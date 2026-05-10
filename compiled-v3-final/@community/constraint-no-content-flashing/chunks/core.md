# NoContentFlashing [constraint] v1.0.0
Content must not flash more than 3 times per second — the WCAG 2.1 Success Criterion 2.3.1 (Level A) threshold above which photosensitive seizures can be triggered.
domain: frontend-design

## Severity
critical

## Threshold
3 flashes per second (Level A); for high-contrast flashes: 1 flash per second (to avoid false-negatives)

## Applies To
- JavaScript-driven animations cycling opacity or background-color
- GIF/WebP animations with strobing frames
- Video content with deliberate flash effects
- Lottie / Rive animations with rapid transitions
