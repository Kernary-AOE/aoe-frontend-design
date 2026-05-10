# AnimateTransformOpacityOnly [rule] v1.0.0
> CSS transitions and animations MUST target only `transform` and `opacity`. Animating layout properties (width, height, padding, margin, top, left, border-width) triggers browser layout recalculation on every frame, causing forced reflows and dropped frames. For height animations (accordions, disclosures), use `grid-template-rows: 0fr → 1fr` instead of `height: 0 → auto`.
domain: frontend-design

## Label
Animate Only transform and opacity — Never Layout Properties

## Code
```
    /* CORRECT: GPU-composited, no layout recalculation */
    .card {
      transition: transform 200ms cubic-bezier(0.25, 1, 0.5, 1),
                  opacity 200ms ease-out;
    }
    .card:hover {
      transform: translateY(-4px);
      opacity: 0.92;
    }

    /* CORRECT: accordion height via grid-template-rows */
    .accordion-content {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 300ms cubic-bezier(0.25, 1, 0.5, 1);
    }
    .accordion-content[aria-hidden="false"] {
      grid-template-rows: 1fr;
    }
    .accordion-inner { overflow: hidden; }

    /* WRONG: triggers layout on every frame */
    .bad-accordion { transition: height 300ms ease; height: 0; overflow: hidden; }
    .bad-card:hover { margin-top: -4px; }
  
```

## Severity
high
