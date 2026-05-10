# MissingEmptyState [anti-pattern] v1.0.0
Rendering an empty container — a blank table, an unstyled `<div>`, or just the page chrome with nothing inside — when a list, search, or workspace returns zero items. The user is left wondering whether the page failed, the filter excluded everything, or the feature is broken.
domain: ux-design

## Label
Blank Screen When Data Is Empty

## Trap
During development, the engineer is always working with seeded data and never sees the empty state. The first-render-empty case is hidden until a real user with no items arrives. AI agents writing list components routinely skip the `data.length === 0` branch entirely because the prompt asked for 'a list of issues' and didn't specify zero-state.

## Counter Examples
- @community/counter-example-empty-list-blank

## Detection Heuristics
- List/table component renders only `data.map(...)` with no `data.length === 0` check
- JSX has `{items.length > 0 && <List items={items} />}` but no `else` branch
- Empty container has no `role='status'` or aria announcement for screen readers
- First-run user lands on a blank page with no orientation or CTA
- Filter UI removes all results and leaves a silent blank area where the table was

## Remediation
- Add a zero-state branch to every list/table component before merging.
- Differentiate three empty types: (1) zero-data first-run, (2) zero-results filter active, (3) zero-permission access denied.
- Use @community/pattern-empty-state — illustration + headline + body + CTA.
- First-run empty states get a CTA to create the first item; filter-empty get a 'Clear filter' button.
- Use @impeccable/template-empty-state as the canonical implementation.

## Severity
high

## Label
Blank Screen When Data Is Empty

## Trap
During development, the engineer is always working with seeded data and never sees the empty state. The first-render-empty case is hidden until a real user with no items arrives. AI agents writing list components routinely skip the `data.length === 0` branch entirely because the prompt asked for 'a list of issues' and didn't specify zero-state.

## Counter Examples
- @community/counter-example-empty-list-blank

## Detection Heuristics
- List/table component renders only `data.map(...)` with no `data.length === 0` check
- JSX has `{items.length > 0 && <List items={items} />}` but no `else` branch
- Empty container has no `role='status'` or aria announcement for screen readers
- First-run user lands on a blank page with no orientation or CTA
- Filter UI removes all results and leaves a silent blank area where the table was

## Remediation
- Add a zero-state branch to every list/table component before merging.
- Differentiate three empty types: (1) zero-data first-run, (2) zero-results filter active, (3) zero-permission access denied.
- Use @community/pattern-empty-state — illustration + headline + body + CTA.
- First-run empty states get a CTA to create the first item; filter-empty get a 'Clear filter' button.
- Use @impeccable/template-empty-state as the canonical implementation.

## Severity
high
