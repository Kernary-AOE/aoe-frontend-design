# SinglePrimaryActionPerScreen [rule] v1.0.0
> Each screen, dialog, or distinct user context must have at most one primary call-to-action; all other actions must be styled as secondary or tertiary.
domain: frontend-design

## Severity
warning

## Applies When
laying out actions on any page, dialog, step, or view that requires a user decision

## Verify By
Count primary-styled buttons (filled, full contrast, max size) visible simultaneously. Fail if count > 1.

## Examples
- Checkout step: 'Continue to payment' is primary; 'Save cart' is a ghost button — one primary.
- Delete confirmation dialog: 'Delete permanently' is primary destructive; 'Cancel' is secondary.
- Bad: two filled buttons side by side — 'Save Draft' and 'Publish' — users don't know which is more important.

## Rationale
Multiple equally prominent actions compete for attention, leave users uncertain which to choose, and dilute the intended conversion path. A single obvious primary action eliminates choice paralysis.

## Severity
warning

## Applies When
laying out actions on any page, dialog, step, or view that requires a user decision

## Verify By
Count primary-styled buttons (filled, full contrast, max size) visible simultaneously. Fail if count > 1.
