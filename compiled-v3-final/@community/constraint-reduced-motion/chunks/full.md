# ReducedMotion [constraint] v1.0.0
All non-essential motion (transitions, CSS animations, JavaScript-driven animations) must be disabled or substantially reduced when the user has enabled `prefers-reduced-motion: reduce`. Essential motion (progress indicators, video content) is exempt.
domain: accessibility

## Target
CSS transitions and animations

## Severity
block

## Rule
```
@media (prefers-reduced-motion: reduce) {
*, *::before, *::after {
animation-duration: 0.01ms !important;
animation-iteration-count: 1 !important;
transition-duration: 0.01ms !important;
scroll-behavior: auto !important;
}
}
```

## Scope
- CSS transition on sidebar width (e.g., @community/example-vercel-sidebar) → must disable
- Scroll-triggered reveal animations → must disable or convert to instant-reveal
- Loading spinner rotations → may use opacity pulse instead of spin (opacity change is less vestibular-disruptive)
- Page transition animations → must disable
- Hero section parallax → must disable

## Exemptions
- Video content that is essential to understanding (pause/stop still required per SC 2.2.2)
- Progress indicators (spinners) may use opacity animations at reduced amplitude
- Map panning driven by user direct gesture (not auto-playing)

## Rationale
Users who set prefers-reduced-motion: reduce typically have vestibular disorders, epilepsy, or motion sensitivity. Decorative animations can trigger vertigo, nausea, or seizures. WCAG 2.1 SC 2.3.3 (AAA) covers this; WCAG 2.2 defers to the OS setting.
