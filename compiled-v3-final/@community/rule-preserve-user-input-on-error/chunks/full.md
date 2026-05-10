# PreserveUserInputOnError [rule] v1.0.0
When a form fails validation or a submission error occurs, all user-entered data must be retained in the fields so users can correct only the erroneous inputs without re-entering everything.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
block

## Behavior
- Never call form.reset() or clear input values on validation failure.
- Server-rendered forms must re-populate fields from the submitted values on error response.
- Client-side: keep state in component variables; only clear after confirmed successful submission.
- Autosave to localStorage as an extra safety net for multi-field forms (see save-form-progress).

## Exceptions
-
  - **Case**: Password fields after a failed authentication
  - **Allowed When**: Clearing the password field is a security best practice; never clear the username.
-
  - **Case**: OTP / verification code fields
  - **Allowed When**: Clearing after failure is acceptable since OTPs are single-use.

## Rationale
Forcing re-entry after a single mistake violates Nielsen's error recovery heuristic. Users who typed a long address or paragraph should never lose that work due to an unrelated field error. Forms that clear on error have measurably higher abandonment rates.

## Applies To
@community/type-html-artifact

## Severity
block

## Behavior
- Never call form.reset() or clear input values on validation failure.
- Server-rendered forms must re-populate fields from the submitted values on error response.
- Client-side: keep state in component variables; only clear after confirmed successful submission.
- Autosave to localStorage as an extra safety net for multi-field forms (see save-form-progress).

## Exceptions
-
  - **Case**: Password fields after a failed authentication
  - **Allowed When**: Clearing the password field is a security best practice; never clear the username.
-
  - **Case**: OTP / verification code fields
  - **Allowed When**: Clearing after failure is acceptable since OTPs are single-use.
