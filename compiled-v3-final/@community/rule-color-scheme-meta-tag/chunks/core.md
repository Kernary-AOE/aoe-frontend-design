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
