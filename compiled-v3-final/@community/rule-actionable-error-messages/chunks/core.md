# ActionableErrorMessages [rule] v1.0.0
> Error and success messages must be actionable and tied to the specific context in which they appear — telling the user what happened AND what to do next. Generic messages ('Something went wrong', 'Success') are prohibited.
domain: frontend-design

## Severity
warning

## Applies When
Writing or reviewing any error, validation, or success feedback in a UI.

## Verify By
Confirm each message names the specific event and offers at least one next step. Reject messages that only describe state without direction.

## Anti Pattern
Generic context-free messages force users to guess what went wrong and how to recover, increasing abandonment rates. Examples of banned messages: 'An error occurred', 'Operation failed', 'Done'.

## Use Instead
- 'Email already in use — try signing in or use a different email'
- 'Payment failed — check your card number and expiry, then try again'
- 'Report saved — view it in your Reports dashboard'
