# SvgNoiseGrainTexture [pattern] v1.0.0
SVG feTurbulence filter encoded as a data-URI pseudo-element overlay that adds film grain to flat digital UI — making surfaces feel physical and editorial without image assets. Uses position:fixed for scroll performance.
domain: frontend-design

## Problem
Flat digital screens emit uniform light, giving UI surfaces a sterile, weightless feel. Film grain adds physical texture that marks a design as intentional and editorial without requiring any image files.

## Solution
Apply an SVG feTurbulence fractalNoise filter as a background-image on body::before with position:fixed, pointer-events:none, and low CSS opacity. Reduce opacity in dark mode since grain is more visible on dark surfaces.

## Code
```
    /* Full-viewport grain overlay — scrolls with position:fixed, no repaint */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
      opacity: 0.025;  /* Default: subtle, editorial */
    }

    /* Dark mode: grain more visible on dark surfaces — reduce slightly */
    @media (prefers-color-scheme: dark) {
      body::before { opacity: 0.018; }
    }

    /* Scoped grain (hero section only) */
    .hero {
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
      opacity: 0.035;
    }
  
```

## Opacity Guide
- **0.015**: Subliminal — ultra-minimal light-mode interfaces
- **0.025**: Default starting point — subtle, editorial, intentional
- **0.03 0.04**: Noticeably textured — brutalist, luxury, editorial
- **0.05 0.06**: Strong texture — dark editorial, print-inspired
- **0.07+**: Too much — degrades legibility

## When To Use
- Editorial publications, blogs, creative writing tools
- Brutalist or confrontational design aesthetics
- Luxury or premium product positioning (subtle = expensive)
- Photography-adjacent or visual-first applications
- When large flat color blocks feel sterile

## When Not To Use
- Data-dense dashboards (adds noise where precision matters)
- Accessibility-sensitive contexts — texture may impact text for users with low vision
- Highly interactive tables, code editors, or terminal interfaces

## Rules
- z-index: 9999 for grain; modals/toasts must use z-index: 10000+ or isolation: isolate.
- pointer-events: none is mandatory — never block clicks.
- Data URI generates texture client-side, zero network requests.
- type='fractalNoise' (not 'turbulence') produces organic film-like grain.
- stitchTiles='stitch' makes the 256×256 tile seamless across the viewport.
