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

## Examples
- :root { --color-bg: oklch(97% 0.006 220); } /* light mode default */
- [data-theme='dark'] { --color-bg: oklch(13% 0.007 220); } /* dark mode override */
- @media (prefers-color-scheme: dark) { :root:not([data-theme='light']) { --color-bg: oklch(13% 0.007 220); } }

## Rationale
Defining dark mode as the base and light mode as the override is a common architectural mistake that breaks: (1) system preference detection — the @media fallback must target light, not dark; (2) flash prevention — the inline script that reads localStorage must override dark, not default to it; (3) accessibility tooling that assumes light-mode defaults; (4) print stylesheets that inherit from :root. Light mode is the universal baseline because the web was designed for reflective-medium metaphor (paper) and most accessibility tools, browsers, and crawlers default to light. Dark mode is an enrichment, not the ground state.

## Applies To
- CSS custom property architecture in :root
- any project implementing both light and dark mode
- design token cascade definitions

## Counter Examples
- :root { --color-bg: oklch(13% 0.007 220); } /* dark as base — breaks system preference detection */
- @media (prefers-color-scheme: light) { :root { --color-bg: oklch(97% 0.006 220); } } /* light as override — architectural inversion */

## Severity
medium
