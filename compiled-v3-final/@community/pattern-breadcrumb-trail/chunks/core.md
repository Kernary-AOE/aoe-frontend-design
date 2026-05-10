# BreadcrumbTrail [pattern] v1.0.0
A horizontal sequence of links showing the path from a root location to the current page (e.g., Workspace > Project > Issue). Provides hierarchical wayfinding and one-click jump-up navigation.
domain: frontend-design

## Facts

## Label
Breadcrumb Trail

## Problem
Users deep inside a hierarchy lose context: where am I, and how do I jump to a higher level without traversing back through every layer?

## Solution
Render a single-line trail of ancestor links separated by a chevron or slash, with the current page rendered as plain text (non-link) at the end. Truncate middle segments with an ellipsis when the trail overflows.

## Structure
```
    <nav aria-label="Breadcrumb">
      <ol role="list">
        <li><a href="/">Home</a></li>
        <li aria-hidden="true" class="sep">/</li>
        <li><a href="/projects">Projects</a></li>
        <li aria-hidden="true" class="sep">/</li>
        <li>
          <button aria-label="Show hidden ancestors" aria-haspopup="menu">...</button>
        </li>
        <li aria-hidden="true" class="sep">/</li>
        <li>
          <a href="/projects/web/issues">Issues</a>
        </li>
        <li aria-hidden="true" class="sep">/</li>
        <li>
          <span aria-current="page">PRM-1024 Fix login redirect</span>
        </li>
      </ol>
    </nav>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- The current page is the last item, rendered as text (not a link), with `aria-current='page'`.
- When the trail overflows the container, collapse middle segments behind an ellipsis button that opens a menu listing them.
- Separators (chevrons, slashes) are decorative — render as `aria-hidden` siblings or via CSS pseudo-elements.
- On narrow viewports, optionally show only the parent and current segments (back-button style).
- Long page titles in the current segment should truncate with ellipsis, not wrap.

## A11y
- Wrap in `<nav aria-label='Breadcrumb'>` and use an ordered list inside.
- Mark the current page with `aria-current='page'`; do not render it as a link.
- Visual separators must be `aria-hidden='true'` or generated via CSS — never spoken.
- If using an ellipsis menu for collapsed segments, the trigger needs an accessible name like 'Show hidden ancestors'.
