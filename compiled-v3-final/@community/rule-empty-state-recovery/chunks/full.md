# EmptyStateRecovery [rule] v1.0.0
> Empty states caused by filters, search queries, or permissions (zero-results empty) must include a recovery affordance — a button or link that removes the filter, clears the search, or explains how to gain access. A zero-results state with no recovery is a dead end.
domain: frontend-design

## Severity
warning

## Applies When
Rendering any empty state that resulted from a user action (filter, search, permission scope) rather than a first-run state.

## Verify By
Trigger the zero-results state (apply a filter that matches nothing). Confirm the empty state shows the cause ('No results match your filter') and provides a recovery action ('Clear filters').

## Distinction
Zero-data empty (first run, no items exist yet) needs a create-first-item CTA. Zero-results empty (filter excluded everything) needs a clear-filters CTA. Zero-permission empty needs an access request or explanation. Each has a different recovery affordance.

## Severity
warning

## Applies When
Rendering any empty state that resulted from a user action (filter, search, permission scope) rather than a first-run state.

## Verify By
Trigger the zero-results state (apply a filter that matches nothing). Confirm the empty state shows the cause ('No results match your filter') and provides a recovery action ('Clear filters').

## Distinction
Zero-data empty (first run, no items exist yet) needs a create-first-item CTA. Zero-results empty (filter excluded everything) needs a clear-filters CTA. Zero-permission empty needs an access request or explanation. Each has a different recovery affordance.
