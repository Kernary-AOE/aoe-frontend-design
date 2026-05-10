# FadeStagger [template] v1.0.0
Children of a list / grid fade-up in sequence using nth-child animation-delay — pure CSS, no JS. Triggered by adding .is-revealed to the parent (combine with scroll-reveal observer for on-scroll cascades).
domain: motion

## Language
html-css

## Body
```
    <style>
      .stagger > * {
        opacity: 0;
        transform: translateY({DISTANCE});
        transition:
          opacity   {DURATION} cubic-bezier(0.16, 1, 0.3, 1),
          transform {DURATION} cubic-bezier(0.16, 1, 0.3, 1);
      }

      .stagger.is-revealed > * {
        opacity: 1;
        transform: translateY(0);
      }

      /* Stagger ladder — each child waits one BASE_DELAY longer */
      .stagger.is-revealed > *:nth-child(1) { transition-delay: calc(1 * {BASE_DELAY}); }
      .stagger.is-revealed > *:nth-child(2) { transition-delay: calc(2 * {BASE_DELAY}); }
      .stagger.is-revealed > *:nth-child(3) { transition-delay: calc(3 * {BASE_DELAY}); }
      .stagger.is-revealed > *:nth-child(4) { transition-delay: calc(4 * {BASE_DELAY}); }
      .stagger.is-revealed > *:nth-child(5) { transition-delay: calc(5 * {BASE_DELAY}); }
      .stagger.is-revealed > *:nth-child(6) { transition-delay: calc(6 * {BASE_DELAY}); }
      .stagger.is-revealed > *:nth-child(7) { transition-delay: calc(7 * {BASE_DELAY}); }
      .stagger.is-revealed > *:nth-child(8) { transition-delay: calc(8 * {BASE_DELAY}); }
      /* 9th child onward shares the 8-child cap so very long lists don't drag */
      .stagger.is-revealed > *:nth-child(n+9) { transition-delay: calc({MAX_CHILDREN} * {BASE_DELAY}); }

      @media (prefers-reduced-motion: reduce) {
        .stagger > *,
        .stagger.is-revealed > * {
          opacity: 1;
          transform: none;
          transition: none;
        }
        .stagger.is-revealed > *:nth-child(n) { transition-delay: 0ms; }
      }
    </style>

    <ul class="stagger is-revealed">
      <li>Item one</li>
      <li>Item two</li>
      <li>Item three</li>
      <li>Item four</li>
    </ul>

    <!-- Pair with IntersectionObserver:
      observer triggers parent.classList.add('is-revealed') — children stagger in. -->
  
```

## Usage Notes
- 60ms base delay is the sweet spot: 40ms feels racing, 100ms feels lazy after 6+ items.
- Cap at 8 children — beyond that the last items wait too long and users perceive jank.
- Never apply stagger to long lists (>20 items) — flatten to a single fade or virtual-scroll first.
- Toggle via parent class, not per-child JS — CSS handles the cascade for free.
- Pair with @impeccable/template-scroll-reveal-vanilla: observer adds .is-revealed when parent enters view.

## Tested In
- Chrome 120+
- Firefox 121
- Safari 17

## Accessibility
- prefers-reduced-motion zeroes all delays AND the transition — content appears instantly.
- Initial opacity:0 only applies before .is-revealed is added; if JS fails, content stays hidden — pair with a no-JS fallback that adds .is-revealed at load.
- No reliance on JS for visibility once .is-revealed lands.
