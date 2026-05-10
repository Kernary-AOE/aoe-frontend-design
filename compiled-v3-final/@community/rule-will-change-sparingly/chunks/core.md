# WillChangeSparingly [rule] v1.0.0
> Apply CSS will-change only to specific elements that will animate imminently; never apply it to body, large containers, or elements that won't animate; remove or reset it after animation completes.
domain: frontend-design

## Severity
warning

## Applies When
adding CSS transitions or JS-driven animations to any element

## Verify By
Audit for body-level, wildcard, or container-wide will-change declarations. Confirm will-change is scoped to the animating element and removed (or set to auto) after the animation ends.

## Code
```
    /* BAD — promotes entire page to GPU layer, excessive VRAM use */
    body { will-change: transform; }
    * { will-change: opacity; }

    /* GOOD — apply only to the element that will animate, just before animation */
    .modal { will-change: transform, opacity; }
    /* After animation: remove it */
    .modal.is-done { will-change: auto; }

    /* GOOD with JS — apply before animation, clean up after */
    element.style.willChange = 'transform';
    element.addEventListener('transitionend', () => {
      element.style.willChange = 'auto';
    }, { once: true });

    /* For hover: use :hover to scope to the interaction window only */
    .card:hover { will-change: transform; }
    /* This is acceptable — short-lived, scoped to hover state */
  
```
