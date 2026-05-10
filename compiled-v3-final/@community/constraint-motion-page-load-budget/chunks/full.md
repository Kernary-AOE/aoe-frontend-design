# MotionPageLoadBudget [constraint] v1.0.0
Page-load entrance animations must complete within 800ms total — hero in ≤ 600ms at 250-400ms per element, stagger cap of 70ms × 8 items = 560ms — to avoid blocking perceived interactivity.
domain: frontend-design

## Threshold
- **Hero Entrance Max**: 600ms (first meaningful element visible)
- **Stagger Total Max**: 800ms (last staggered item settled)
- **Stagger Delay Per Item**: 50-100ms (70ms sweet-spot)
- **Stagger Item Cap**: 8 items maximum before instant-showing remainder
- **Single Element Duration**: 250-400ms for translate+opacity combo
- **Lcp Element**: 0ms delay — never animate the LCP element

## Applies When
- Page hero section with title, subtitle, CTA stagger
- Dashboard card grid reveal on initial mount
- List/table rows stagger reveal
- Any animation triggered by DOMContentLoaded or first paint

## Anti Patterns
- Staggering 20+ items — user scrolls before animation ends
- Animating LCP element (hero image, H1) — delays Core Web Vitals
- Chaining GSAP timelines that total > 2s before first interactive state
- Using animation-delay on above-the-fold content without a visibility guard

## Rationale
Google's Interaction to Next Paint (INP) and Time to Interactive (TTI) are hurt by long JS-driven entrance animations that block the main thread. CSS animations are compositor-only but still delay perceived readiness. Users make 'is this page working?' judgements within 1 second. Entrances that complete by 800ms feel instant; beyond that they feel like loading.
