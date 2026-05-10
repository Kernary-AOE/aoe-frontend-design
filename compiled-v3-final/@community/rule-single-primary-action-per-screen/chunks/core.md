# SinglePrimaryActionPerScreen [rule] v1.0.0
> Each screen, dialog, or distinct user context must have at most one primary call-to-action; all other actions must be styled as secondary or tertiary.
domain: frontend-design

## Severity
warning

## Applies When
laying out actions on any page, dialog, step, or view that requires a user decision

## Verify By
Count primary-styled buttons (filled, full contrast, max size) visible simultaneously. Fail if count > 1.
