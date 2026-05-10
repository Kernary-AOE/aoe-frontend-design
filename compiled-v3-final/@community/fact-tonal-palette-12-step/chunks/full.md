# TonalPalette12Step [fact] v1.0.0
A 12-step tonal palette assigns each step a fixed functional role (steps 1–2: app backgrounds; 3–4: component backgrounds/hover; 5–6: borders/separators; 7–8: solid backgrounds; 9–10: high-contrast solids; 11–12: text), enabling automatic dark-mode parity and WCAG AA compliance when steps 9–10 are tested against steps 1–2.
> The Radix Colors 12-step scale architecture establishes that: steps 1–2 serve as page/subtle backgrounds at L=0.97–0.99 light (L=0.10–0.15 dark); steps 3–4 as component backgrounds and hover states; steps 5–6 as borders and separators; steps 7–8 as solid backgrounds for buttons and badges; steps 9–10 as high-contrast indicators at L=0.45–0.60; and steps 11–12 as text. Steps 9–10 must pass WCAG AA contrast ratio 4.5:1 against steps 1–2.

## Confidence
strong

## Applies To
- any project implementing a design system with a named color scale
- Radix Colors integration
- custom OKLCH ramp authoring
- dark mode token mapping

## Counter Conditions
- Open Color uses a 10-step scale (0–9), not 12. The functional mapping differs slightly — use it only for prototypes and teaching, not production design systems requiring automatic dark mode.
- Data visualization palettes use categorical encoding (--chart-1 through --chart-N) and are independent of the 12-step tonal model.

## Sources

## Confidence
strong

## Source
- Radix Colors documentation — https://www.radix-ui.com/colors — The 12-step scale architecture
- Prime Wiki A/B v4/v5 test data — semantic scale layer validation
- CSS Color Level 4 specification — perceptual color models

## Applies To
- any project implementing a design system with a named color scale
- Radix Colors integration
- custom OKLCH ramp authoring
- dark mode token mapping

## Counter Conditions
- Open Color uses a 10-step scale (0–9), not 12. The functional mapping differs slightly — use it only for prototypes and teaching, not production design systems requiring automatic dark mode.
- Data visualization palettes use categorical encoding (--chart-1 through --chart-N) and are independent of the 12-step tonal model.
