# NativeHtmlInteractive [pattern] v1.0.0
Prefer native HTML interactive elements — <details>, <dialog>, <input popover>, <meter>, <progress>, inert attribute — over custom JavaScript implementations for accordions, modals, tooltips, and progress indicators.
domain: frontend-design

## Patterns
- <details>/<summary>: accordion/FAQ without JS; browser manages open/close, disclosure triangle; style with ::marker
- <dialog>: modal with built-in focus trap, backdrop, ESC dismiss, showModal() / close() API
- popover API: anchor tooltips and dropdowns with popover='auto' + popovertarget; browser handles dismiss on outside click
- inert attribute: block interaction and AT with inert='true' on background content behind modal — replaces aria-hidden + tabindex=-1 trees
- <meter>: semantic gauge (battery, disk usage); <progress>: task completion
- <input type='color'>: native color picker without a 500-line component

## Browser Support
dialog: 100% Baseline 2023; popover: Baseline 2024 (Chrome 114+, Firefox 125+, Safari 17+); inert: Baseline 2023

## When To Use Custom
- Complex multi-select combobox with search and grouping
- Date range picker with custom calendar logic
- Rich-text editor content areas
- Command palette with fuzzy search
