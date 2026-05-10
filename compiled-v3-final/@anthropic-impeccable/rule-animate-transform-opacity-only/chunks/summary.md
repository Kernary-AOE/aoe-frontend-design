# AnimateTransformOpacityOnly [rule] v1.0.0
> CSS transitions and animations MUST target only `transform` and `opacity`. Animating layout properties (width, height, padding, margin, top, left, border-width) triggers browser layout recalculation on every frame, causing forced reflows and dropped frames. For height animations (accordions, disclosures), use `grid-template-rows: 0fr → 1fr` instead of `height: 0 → auto`.
domain: frontend-design
