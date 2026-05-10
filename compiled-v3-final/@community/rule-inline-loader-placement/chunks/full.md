# InlineLoaderPlacement [rule] v1.0.0
Loading indicators MUST appear immediately adjacent to the content being fetched — replacing or overlaying only the affected region — not as a global full-page spinner disconnected from the triggering action.
domain: frontend-design

## Severity
medium

## Examples
- Correct: button shows an inline spinner replacing its label text while submitting
- Correct: a data table cell shows a skeleton row while its row data refreshes
- Correct: a card shows a shimmer overlay while its image loads
- Wrong: full-page spinner covering everything for a partial content fetch
- Wrong: toast 'Loading...' while a form section below is actually fetching

## Rationale
A spinner in the corner of a page while a table in the center loads gives no spatial association between cause and effect. Users scan back to the action they triggered; feedback must appear exactly there.

## Severity
medium
