# NoStateResetWithoutConfirm [rule] v1.0.0
Navigation away, session timeout, or flow reset must not silently discard unsaved changes or mid-flow state — users must be prompted to confirm or offered to save before loss occurs.
domain: frontend-design

## Severity
high

## Patterns
- beforeunload event: warn before browser navigation away from dirty forms
- Router guard: intercept SPA navigation with 'You have unsaved changes — leave?' dialog
- Auto-save: persist form state to localStorage every 30 seconds; restore on return
- Session timeout: warn 2 minutes before expiry with 'Extend session' option, not silent redirect

## Exceptions
- Explicitly canceling a task (Cancel button) — user initiated, no confirmation needed if labeled clearly
- Changes that are immediately reversible (optimistic toggle) — no confirmation needed

## Severity
high

## Patterns
- beforeunload event: warn before browser navigation away from dirty forms
- Router guard: intercept SPA navigation with 'You have unsaved changes — leave?' dialog
- Auto-save: persist form state to localStorage every 30 seconds; restore on return
- Session timeout: warn 2 minutes before expiry with 'Extend session' option, not silent redirect

## Exceptions
- Explicitly canceling a task (Cancel button) — user initiated, no confirmation needed if labeled clearly
- Changes that are immediately reversible (optimistic toggle) — no confirmation needed
