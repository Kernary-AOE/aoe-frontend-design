# ColorSchemeMetaTag [rule] v1.0.0
> Every web page that implements dark mode must include `<meta name='color-scheme' content='light dark'>` in <head> so the browser themes native UI controls (scrollbars, form inputs, select menus, checkboxes) to match the active color scheme.
domain: frontend-design

## Applies To
- any web page implementing dark mode via CSS
- pages using prefers-color-scheme media queries
- pages with a JS-toggled dark theme

## Counter Examples
- A fully dark-themed page without the meta tag — scrollbars render white, breaking the dark aesthetic
- Setting only CSS prefers-color-scheme without the meta tag — native controls remain unstyled

## Severity
medium

## Examples
- <meta name='color-scheme' content='light dark'> — supports both modes, defaults to system preference
- <meta name='color-scheme' content='dark'> — dark-only page (use only for intentional dark-only experiences)
- Complement with CSS: :root { color-scheme: light dark; } for component-level cascade

## Rationale
Without the color-scheme meta tag, browsers render native form controls and scrollbars in their default light style even when the page uses a dark palette. This produces jarring white scrollbars, white input backgrounds, and unthemed select dropdowns on an otherwise dark-mode page. The meta tag is a one-line fix with no CSS overhead. When `color-scheme: dark` is signaled, the browser also adjusts the default text color and background, preventing a flash of unstyled light background before CSS loads.

## Applies To
- any web page implementing dark mode via CSS
- pages using prefers-color-scheme media queries
- pages with a JS-toggled dark theme

## Counter Examples
- A fully dark-themed page without the meta tag — scrollbars render white, breaking the dark aesthetic
- Setting only CSS prefers-color-scheme without the meta tag — native controls remain unstyled

## Severity
medium
