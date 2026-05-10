# DarkModeRollout [feedback] v1.0.0
Lessons from shipping dark-mode support across multiple production design systems. Dark mode is not a color inversion — it is a separate, parallel theme that requires re-validating contrast, shadow strategy, brand color saturation, and image asset variants. Most failed dark-mode rollouts treat it as a CSS filter rather than a first-class design system surface.
domain: visual-design

## Target
@community/rule-color-dark-mode-cascade

## Observations
- **Sample Size**: 12
- **Period**: 2023-Q1 to 2025-Q4
- **Success Rate**: 0.67
- **Common Failures**:
  -
    - **Step**: color token derivation
    - **Failure**: deriving dark colors as `invert(light)` or `100% - L` produces dingy, low-saturation surfaces; oklch chroma must be reduced (typically -20% to -40%) for dark backgrounds to avoid neon-glow effect
    - **Frequency**: 0.83
    - **Impact**: perceived design quality drops; users switch back to light mode
    - **Mitigation**: design dark palette manually with @community/term-oklch — fix hue, set lightness independently for each mode, and reduce chroma 20–40% on dark surfaces
  -
    - **Step**: elevation and shadow
    - **Failure**: box-shadow on dark backgrounds is invisible — light-mode elevation cues disappear
    - **Frequency**: 0.92
    - **Impact**: card/modal hierarchy collapses; users cannot tell layers apart
    - **Mitigation**: replace shadow with surface-lightness elevation (each layer +3–5% L on background) plus a 1px border at higher chroma
  -
    - **Step**: brand color saturation
    - **Failure**: primary brand color shipped at the same chroma in both modes — too bright on dark, causing eye strain
    - **Frequency**: 0.58
    - **Impact**: branded CTAs feel 'hot' in dark mode; reduces dwell time
    - **Mitigation**: ship a `--brand-dark` variant 5–10% lower lightness and ~20% lower chroma than `--brand-light`
  -
    - **Step**: images and screenshots
    - **Failure**: marketing screenshots remained light-mode; logos with white backgrounds appeared as bright rectangles
    - **Frequency**: 0.75
    - **Impact**: obvious visual breaks; perceived as 'half-shipped'
    - **Mitigation**: ship dark variants of all marketing imagery; use `<picture>` with `prefers-color-scheme` media; logos use SVG with `currentColor`
  -
    - **Step**: user override
    - **Failure**: shipped without a user-level override — only respected `prefers-color-scheme`
    - **Frequency**: 0.42
    - **Impact**: users who want dark mode in a light OS (or vice versa) had no recourse
    - **Mitigation**: ship a 3-way switch (system / light / dark), persist in localStorage, apply class on `<html>` early to avoid FOUC
- **Confidence Adjustments**:
  - **@Community/Rule Color Dark Mode Cascade**: 0.91
  - **@Community/Term Oklch**: 0.97
  - **@Community/Check Color Dark Mode Cascade**: 0.85

## Ai Confidence
0.82

## Lessons
- Dark mode is a design system surface, not a setting. Budget design time for it equal to a new color theme.
- FOUC (flash of unstyled content) on first paint kills perceived quality. Inline a script in `<head>` that reads the persisted preference and applies the class before CSS evaluates.
- Test contrast in BOTH modes against WCAG AA — see @community/check-contrast-aa. Dark-mode contrast failures are common because designers eyeball it.
- Allow per-component dark overrides for special cases (logos, branded heroes), not a global filter.
