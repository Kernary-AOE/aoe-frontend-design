# AnimationPrefRespected [constraint] v1.0.0
All non-essential motion must respect `prefers-reduced-motion: reduce`. When the user has the OS-level setting enabled, decorative motion must be eliminated or replaced with an instant or sub-perceptual variant.
domain: accessibility

## Target
- CSS transitions / animations
- JS-driven animations (Framer Motion, GSAP, Web Animations API)
- scroll-driven animations
- video autoplay

## Severity
critical

## Values
-
  - **Required**: @media (prefers-reduced-motion: reduce) { /* zero or instant motion */ }
-
  - **Required**: JS animation libraries gated by useReducedMotion() / matchMedia('(prefers-reduced-motion: reduce)').matches
-
  - **Required**: <video autoplay> paired with prefers-reduced-motion check
-
  - **Forbidden**: scroll-triggered parallax that ignores the preference
-
  - **Forbidden**: auto-playing carousels with no reduce-motion fallback
-
  - **Forbidden**: page-transition animations that always play regardless of preference

## Exceptions
- Essential motion that conveys information (progress indicators, video that is the content itself).
- User-initiated direct-manipulation (drag, panning) — driven by gesture, not auto-played.
- Motion that has been reduced to opacity-only crossfades is acceptable as the reduced variant.

## Approved Alternatives
- @community/constraint-reduced-motion (the operative rule, this constraint enforces compliance).
- Framer Motion: useReducedMotion() hook returns true → animate via opacity only.
- GSAP: gsap.matchMedia() with (prefers-reduced-motion: reduce) branch.

## Enforcement
Lighthouse a11y audit. Manual: macOS Reduce Motion ON, full keyboard pass through every animated surface. CI: scan for animation/transition declarations not inside a prefers-reduced-motion @media query.
