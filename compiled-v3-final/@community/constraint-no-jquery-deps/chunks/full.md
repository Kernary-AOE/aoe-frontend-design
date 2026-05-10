# NoJqueryDeps [constraint] v1.0.0
New code must not introduce jQuery as a dependency. All DOM querying, event handling, and AJAX must use native browser APIs or the framework's built-in primitives.
domain: engineering

## Target
- new frontend code
- package.json dependencies of new modules / new pages
- DOM manipulation in greenfield components

## Severity
high

## Values
-
  - **Forbidden**: jquery (npm)
-
  - **Forbidden**: @types/jquery for new TS modules
-
  - **Forbidden**: jQuery plugins (jquery-ui, jquery-validation, slick-carousel, …) in new pages
-
  - **Forbidden**: $(selector) / $.ajax / $.each in new files

## Exceptions
- Maintenance touches to legacy pages already built on jQuery (must come with a deprecation issue).
- Vendored third-party widgets that bundle jQuery internally (track but do not block).
- Email-template HTML where jQuery is not even applicable.

## Approved Alternatives
- document.querySelector / querySelectorAll for DOM lookup.
- Element.addEventListener for events.
- fetch() / Axios / TanStack Query for HTTP.
- React / Vue / Svelte / Solid for state-driven UI.
- Alpine.js or htmx for sprinkle-of-interactivity needs without jQuery.

## Enforcement
Lint: `eslint-plugin-no-restricted-imports` blocking `jquery`. CI: `package.json` audit that fails the build if jquery appears in dependencies of any new package.

## Rationale
jQuery's core value (cross-browser DOM normalization, terse selectors, AJAX) is fully covered by modern standards: querySelectorAll, addEventListener, fetch, classList, dataset. Bringing jQuery into a modern React/Vue/Svelte app is ~30KB gzipped of dead weight, plus it bypasses the framework's reactivity model and creates state-of-the-DOM bugs. Browser support floor (ES2017+, evergreen) makes the legacy reasons obsolete.
