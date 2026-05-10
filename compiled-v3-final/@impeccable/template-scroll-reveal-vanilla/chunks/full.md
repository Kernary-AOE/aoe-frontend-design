# ScrollRevealVanilla [template] v1.0.0
Scroll-reveal animation using IntersectionObserver — no GSAP, no AOS, ~25 lines of JS. Adds .is-visible class once an element scrolls into view; does NOT re-trigger on scroll-out. Reduced-motion users see content instantly without animation.
domain: motion

## Language
html-css-js

## Body
```
    <style>
      [data-reveal] {
        opacity: 0;
        transform: translateY({DISTANCE});
        transition:
          opacity   {DURATION} cubic-bezier(0.16, 1, 0.3, 1),
          transform {DURATION} cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
      }

      [data-reveal].is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        [data-reveal] {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    </style>

    <article data-reveal>First section — fades up on scroll</article>
    <article data-reveal>Second section</article>
    <article data-reveal>Third section</article>

    <script>
      (function() {
        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var targets = document.querySelectorAll('[data-reveal]');

        if (prefersReduced || !('IntersectionObserver' in window)) {
          // Fallback: reveal everything immediately, no observer.
          targets.forEach(function(el) { el.classList.add('is-visible'); });
          return;
        }

        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target); // one-shot
            }
          });
        }, {
          threshold: {THRESHOLD},
          rootMargin: '{ROOT_MARGIN}',
        });

        targets.forEach(function(el) { observer.observe(el); });
      })();
    </script>
  
```

## Usage Notes
- One-shot by design — unobserve after first reveal. Re-triggering on scroll-out feels nervous.
- rootMargin '-10%' trims the bottom so animation starts before the element is fully in view.
- Threshold 0.15 is the goldilocks zone: 0 triggers at 1px (too eager), 0.5 waits too long for tall elements.
- Always set initial opacity:0 in CSS (not JS) so first paint doesn't flash unstyled content.
- will-change is set on data-reveal not .is-visible — promotes layer BEFORE the transform runs.
- Fallback path: no IO support OR reduced-motion → instantly show everything. Never hide content.

## Tested In
- Chrome 120+
- Firefox 121
- Safari 17

## Accessibility
- prefers-reduced-motion completely bypasses the observer; content is visible from first paint.
- No IntersectionObserver support → graceful fallback to all-visible (IE11, very old WebKit).
- Animation is purely visual — no semantic content depends on the reveal.

## Relations
enhances: [@community/pattern-scroll-reveal]

## Enhances
- @community/pattern-scroll-reveal
