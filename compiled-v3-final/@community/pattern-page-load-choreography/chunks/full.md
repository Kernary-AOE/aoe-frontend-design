# PageLoadChoreography [pattern] v1.0.0
First-visit page load animation sequence: prevent FOUC with initial hidden state, stagger-reveal content blocks after paint, and skip the animation on return visits using sessionStorage.
domain: frontend-design

## Structure
- 1. HTML: critical elements start as opacity:0 via .js-hidden class set immediately
- 2. CSS: .reveal transition opacity 0→1, translateY 12px→0, duration 400ms, stagger via animation-delay
- 3. JS: after DOMContentLoaded, check sessionStorage.getItem('visited') — if set, skip animation entirely
- 4. JS: if first visit, add .reveal class to elements with 80ms delay between each, then set sessionStorage
- 5. Reduced motion: wrap the reveal animation in @media (prefers-reduced-motion: no-preference)

## Css Skeleton
```
    .js-hidden { opacity: 0; transform: translateY(12px); }
    @media (prefers-reduced-motion: no-preference) {
      .reveal {
        animation: fadeUp 400ms ease-out forwards;
      }
    }
    @keyframes fadeUp {
      to { opacity: 1; transform: translateY(0); }
    }
    /* Stagger via nth-child or explicit delay */
    .hero { animation-delay: 0ms; }
    .nav  { animation-delay: 80ms; }
    .body { animation-delay: 160ms; }
  
```

## Rationale
Choreographed first-paint entry communicates product quality and gives the eye a focal point during load. Return visitors should never re-watch the intro — that becomes friction.

## Structure
- 1. HTML: critical elements start as opacity:0 via .js-hidden class set immediately
- 2. CSS: .reveal transition opacity 0→1, translateY 12px→0, duration 400ms, stagger via animation-delay
- 3. JS: after DOMContentLoaded, check sessionStorage.getItem('visited') — if set, skip animation entirely
- 4. JS: if first visit, add .reveal class to elements with 80ms delay between each, then set sessionStorage
- 5. Reduced motion: wrap the reveal animation in @media (prefers-reduced-motion: no-preference)

## Css Skeleton
```
    .js-hidden { opacity: 0; transform: translateY(12px); }
    @media (prefers-reduced-motion: no-preference) {
      .reveal {
        animation: fadeUp 400ms ease-out forwards;
      }
    }
    @keyframes fadeUp {
      to { opacity: 1; transform: translateY(0); }
    }
    /* Stagger via nth-child or explicit delay */
    .hero { animation-delay: 0ms; }
    .nav  { animation-delay: 80ms; }
    .body { animation-delay: 160ms; }
  
```
