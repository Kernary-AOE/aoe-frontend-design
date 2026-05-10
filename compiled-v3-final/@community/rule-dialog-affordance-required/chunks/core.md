# DialogAffordanceRequired [rule] v1.0.0
> Every modal dialog must provide an explicit visible affordance to close it — a close button (×), a labelled 'Cancel' or 'Dismiss' button, or both. Dialogs closable only via Escape key or background click fail users who cannot infer or discover that mechanism.
domain: frontend-design

## Severity
block

## Applies When
Building any modal dialog, confirmation dialog, or blocking overlay.

## Verify By
Inspect the dialog component: confirm there is at least one visible close control with an accessible label. Test keyboard: Escape key closes. Test mouse: clicking outside the modal closes or the close button is visible.
