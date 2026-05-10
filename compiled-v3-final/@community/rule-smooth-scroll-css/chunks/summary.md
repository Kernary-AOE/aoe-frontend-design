# SmoothScrollCss [rule] v1.0.0
CSS scroll-behavior: smooth is universally supported (all modern browsers), runs on the compositor thread, and costs 0 bytes — it should be the default for anchor link navigation before reaching for Lenis or GSAP ScrollSmoother.
> Always set scroll-behavior: smooth on the html element for anchor navigation, paired with @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } } — this is the complete CSS-native smooth scroll solution for 2026, requiring 0 KB of JS.
domain: frontend-design
