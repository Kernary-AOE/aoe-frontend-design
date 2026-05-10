# EmptyState [pattern] v1.0.0
A purposeful screen shown when a list, table, or workspace has no data, combining a friendly illustration or icon, an explanatory headline, body copy, and a primary CTA that helps the user create their first item or recover from a filter.
domain: frontend-design

## Facts

## Label
Empty State

## Problem
An empty container with no items is silent and confusing — users cannot tell if the page failed, if their filter excluded everything, or if they are simply at zero. They need orientation and a clear next step.

## Solution
Replace the empty container with a centered block: illustration/icon, 1-line headline (state + verb), 1-2 line body copy, and a primary CTA button. Differentiate first-run empty (CTA: create) from filtered empty (CTA: clear filters).

## Structure
```
    <section
      class="empty-state"
      role="status"
      aria-labelledby="es-title"
    >
      <div class="illus" aria-hidden="true">
        <svg><!-- friendly inbox illustration --></svg>
      </div>
      <h2 id="es-title">No issues yet</h2>
      <p>
        Capture a bug, idea, or request. Issues are searchable and assignable.
      </p>
      <div class="actions">
        <a href="/new" class="primary">Create issue</a>
        <a href="/docs/issues">Learn more</a>
      </div>
    </section>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Differentiate empty types: zero-data (first run), zero-results (filter active), zero-permission (access denied).
- Zero-data empties have a CTA to create the first item; zero-results have a CTA to clear filters.
- Headline names the state in 4-7 words ('No issues yet', 'No results match your filter').
- Body copy is 1-2 lines explaining what the user can do next or why the state exists.
- Illustration is decorative and culturally neutral; avoid stock photos or anthropomorphized characters that need translation.
- On mobile, stack vertically; cap illustration size to 120px to leave room for CTA above the fold.

## A11y
- Wrap the empty state in a landmark or `role='status'` so screen readers announce 'No issues yet'.
- Illustration is decorative — `aria-hidden='true'`.
- Headline must be a real heading (`<h2>` or `<h3>`) so it appears in landmark navigation.
- Primary CTA is a real `<a>` or `<button>` with a verb name like 'Create issue' — not 'Click here'.
- Do not rely on illustration alone — text must convey the state for screen reader and low-vision users.

## Examples
- @community/example-linear-empty-inbox
- @community/example-notion-empty-page
- @community/example-github-empty-repo

## Label
Empty State

## Problem
An empty container with no items is silent and confusing — users cannot tell if the page failed, if their filter excluded everything, or if they are simply at zero. They need orientation and a clear next step.

## Solution
Replace the empty container with a centered block: illustration/icon, 1-line headline (state + verb), 1-2 line body copy, and a primary CTA button. Differentiate first-run empty (CTA: create) from filtered empty (CTA: clear filters).

## Structure
```
    <section
      class="empty-state"
      role="status"
      aria-labelledby="es-title"
    >
      <div class="illus" aria-hidden="true">
        <svg><!-- friendly inbox illustration --></svg>
      </div>
      <h2 id="es-title">No issues yet</h2>
      <p>
        Capture a bug, idea, or request. Issues are searchable and assignable.
      </p>
      <div class="actions">
        <a href="/new" class="primary">Create issue</a>
        <a href="/docs/issues">Learn more</a>
      </div>
    </section>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Differentiate empty types: zero-data (first run), zero-results (filter active), zero-permission (access denied).
- Zero-data empties have a CTA to create the first item; zero-results have a CTA to clear filters.
- Headline names the state in 4-7 words ('No issues yet', 'No results match your filter').
- Body copy is 1-2 lines explaining what the user can do next or why the state exists.
- Illustration is decorative and culturally neutral; avoid stock photos or anthropomorphized characters that need translation.
- On mobile, stack vertically; cap illustration size to 120px to leave room for CTA above the fold.

## A11y
- Wrap the empty state in a landmark or `role='status'` so screen readers announce 'No issues yet'.
- Illustration is decorative — `aria-hidden='true'`.
- Headline must be a real heading (`<h2>` or `<h3>`) so it appears in landmark navigation.
- Primary CTA is a real `<a>` or `<button>` with a verb name like 'Create issue' — not 'Click here'.
- Do not rely on illustration alone — text must convey the state for screen reader and low-vision users.

## Compatible
- @community/pattern-skeleton-loader
- @community/pattern-data-table-dense
