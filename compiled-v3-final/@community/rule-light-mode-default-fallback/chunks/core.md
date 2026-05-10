# LightModeDefaultFallback [rule] v1.0.0
> Light mode must be the default color scheme defined in :root; dark mode is an override layer applied via [data-theme='dark'] or @media (prefers-color-scheme: dark) — never the base layer.
domain: frontend-design

## Applies To
- CSS custom property architecture in :root
- any project implementing both light and dark mode
- design token cascade definitions

## Counter Examples
- :root { --color-bg: oklch(13% 0.007 220); } /* dark as base — breaks system preference detection */
- @media (prefers-color-scheme: light) { :root { --color-bg: oklch(97% 0.006 220); } } /* light as override — architectural inversion */

## Severity
medium
