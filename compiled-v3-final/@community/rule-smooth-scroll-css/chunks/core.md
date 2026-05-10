# SmoothScrollCss [rule] v1.0.0
CSS scroll-behavior: smooth is universally supported (all modern browsers), runs on the compositor thread, and costs 0 bytes — it should be the default for anchor link navigation before reaching for Lenis or GSAP ScrollSmoother.
> Always set scroll-behavior: smooth on the html element for anchor navigation, paired with @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } } — this is the complete CSS-native smooth scroll solution for 2026, requiring 0 KB of JS.
domain: frontend-design

## Code
```
    html {
      scroll-behavior: smooth;
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto; /* instant jump — no motion */
      }
    }

    /* Optional: offset for fixed header */
    /* Target elements get scroll-margin-top to clear fixed nav */
    #section-id {
      scroll-margin-top: 80px; /* height of fixed header */
    }
  
```

## Exceptions
- Editorial/agency sites requiring scroll-has-weight inertia feel → Lenis (with full tradeoff review)
- GSAP ScrollTrigger scrub animations where smoothed scroll position improves scrub feel → ScrollSmoother
- Programmatic scroll-to with precise easing control → window.scrollTo({ behavior: 'smooth' }) or GSAP

## Applies When
- Anchor navigation (#section-id href links)
- Back-to-top buttons
- Jump-to-section navigation (table of contents)
- Tab panel activation with scroll-into-view
