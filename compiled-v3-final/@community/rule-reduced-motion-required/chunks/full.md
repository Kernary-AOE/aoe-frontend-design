# ReducedMotionRequired [rule] v1.0.0
Every CSS animation, CSS transition, and JS-driven motion MUST respect the user's `prefers-reduced-motion: reduce` setting. Vestibular disorders, migraine triggers, and motion sensitivity make animation actively harmful for some users — opt-out is mandatory, not optional.
domain: accessibility

## Checks
- [ ] @community/check-reduced-motion-required

## Applies To
@community/type-html-artifact

## Severity
critical

## Severity Combination
```
animation runs at full duration under reduce → BLOCK  (SC 2.3.3)
parallax / large-motion runs under reduce    → BLOCK
animation duration shortened (≤ 0.01s)       → PASS
animation removed entirely under reduce      → PASS
```

## Failure Mode
Users with vestibular disorders experience nausea / disorientation; migraine sufferers can lose hours; users abandon. WCAG SC 2.3.3 (Animation from Interactions) fails.

## Remediation
- Add a global guard: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }`.
- For JS animations (Framer Motion, GSAP), check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and skip / shorten.
- For purposeful motion (carousel auto-advance, marquee), pause entirely when reduce is set.
- Replace large-distance motion with a fade — fades are generally safe under reduce.

## Exceptions
-
  - **Case**: Loading / progress indicators
  - **Allowed When**: A spinner is functional feedback; reduce should slow / convert to a static label, not remove entirely.
-
  - **Case**: Essential motion
  - **Allowed When**: WCAG 2.3.3 exempts motion essential to functionality (e.g. an interactive game).

## Applies To
@community/type-html-artifact

## Severity
critical

## Validates With
- @w3c/source-wcag-22

## Severity Combination
```
animation runs at full duration under reduce → BLOCK  (SC 2.3.3)
parallax / large-motion runs under reduce    → BLOCK
animation duration shortened (≤ 0.01s)       → PASS
animation removed entirely under reduce      → PASS
```

## Failure Mode
Users with vestibular disorders experience nausea / disorientation; migraine sufferers can lose hours; users abandon. WCAG SC 2.3.3 (Animation from Interactions) fails.

## Remediation
- Add a global guard: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }`.
- For JS animations (Framer Motion, GSAP), check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and skip / shorten.
- For purposeful motion (carousel auto-advance, marquee), pause entirely when reduce is set.
- Replace large-distance motion with a fade — fades are generally safe under reduce.

## Exceptions
-
  - **Case**: Loading / progress indicators
  - **Allowed When**: A spinner is functional feedback; reduce should slow / convert to a static label, not remove entirely.
-
  - **Case**: Essential motion
  - **Allowed When**: WCAG 2.3.3 exempts motion essential to functionality (e.g. an interactive game).

## See Also
- @community/check-reduced-motion-required
