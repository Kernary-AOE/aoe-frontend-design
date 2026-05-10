# FormValidationStates [taxonomy] v1.0.0
A taxonomy of form-field validation states by severity and timing. Each state has distinct visual treatment, ARIA semantics, and lifecycle rules. Conflating these states (one red border for both required-missing and server-rejected) produces unhelpful error UX and accessibility violations.
domain: ux-design

## Label
Form Validation State Hierarchy

## Members
- pristine
- filling
- valid-untouched
- valid-confirmed
- warning
- client-error
- server-error
- async-validating
- disabled

## Styles
- **Pristine**:
  - **Purpose**: Field has not been interacted with; default state at form load.
  - **Visual**: Neutral border; no icon; no message.
  - **Aria**: no aria-invalid attribute set
  - **Timing**: On initial render until user focuses or submits
- **Filling**:
  - **Purpose**: User is actively typing or interacting; defer validation feedback.
  - **Visual**: Focus ring; neutral border; helper text visible if present.
  - **Aria**: aria-describedby points to helper, not error
  - **Timing**: While field has focus AND user has not yet submitted
  - **Rule**: Do NOT validate while typing. Wait for blur OR submit attempt.
- **Valid Untouched**:
  - **Purpose**: Field has correct content but does not need explicit confirmation feedback.
  - **Visual**: Same as pristine OR subtle indicator (no required action for user).
  - **Timing**: Most fields most of the time; UI should not be congratulatory by default.
- **Valid Confirmed**:
  - **Purpose**: Field with valuable confirmation (e.g. password meets complexity, username available).
  - **Visual**: Green check icon; positive helper text; subtle border tint.
  - **Aria**: aria-describedby points to confirmation text
  - **Timing**: After blur OR after async check completes
  - **Rule**: Use sparingly — too many green checks add noise. Reserve for fields where confirmation is genuinely useful.
- **Warning**:
  - **Purpose**: Input is acceptable but suspicious or unusual; submission allowed.
  - **Visual**: Amber border; warning icon; advisory message.
  - **Aria**: aria-describedby points to warning text; aria-invalid is NOT set (input is valid)
  - **Examples**: Common typo in email domain ('gmial.com'); password is weak but meets minimum; entered phone for a region with high error rate.
- **Client Error**:
  - **Purpose**: Validation rule violated; submission blocked until corrected.
  - **Visual**: Red border; error icon; specific message.
  - **Aria**: aria-invalid='true'; aria-describedby points to error message; error text is in role='alert' OR aria-live='polite' container after submit attempt
  - **Timing**: On blur AFTER first submit attempt (don't pre-emptively scold) OR on submit
  - **Examples**: Required field empty; pattern mismatch (email format); minlength not met; password mismatch.
- **Server Error**:
  - **Purpose**: Server rejected the value (uniqueness, business rule, fraud check).
  - **Visual**: Red border; error icon; server-supplied message.
  - **Aria**: Same as client-error; message reflects server response
  - **Examples**: 'This email is already registered'; 'Coupon code expired'; 'Address could not be verified'.
  - **Rule**: Do NOT clear the field on server error (see @community/rule-preserve-user-input-on-error).
- **Async Validating**:
  - **Purpose**: Validation in flight (e.g. checking username availability against server).
  - **Visual**: Subtle spinner or shimmer; neutral border; no error/success styling yet.
  - **Aria**: aria-busy='true' on the input or field group
  - **Timing**: Triggered after debounce (200-500ms) following user input
  - **Rule**: Allow form submission only when async checks complete; OR fast-fail with debounce + queue.
- **Disabled**:
  - **Purpose**: Field is not currently editable (locked by another field, requires permission, read-only).
  - **Visual**: Reduced opacity; cursor: not-allowed; muted text.
  - **Aria**: Native disabled OR aria-disabled='true'
  - **Rule**: If user cannot edit, explain WHY (helper text or tooltip). Disabled-without-explanation is an anti-pattern.

## Invariants
- client-error and server-error MUST have specific, actionable messages — not 'Invalid input' (see @community/rule-actionable-error-messages)
- aria-invalid='true' MUST be paired with aria-describedby pointing to the error message
- Error messages MUST be positioned visually adjacent to the field (NOT only in a top banner)
- Submit attempt MUST move keyboard focus to the FIRST invalid field
- Validation MUST NOT clear the field's value on error
- filling state MUST NOT show error styling — wait for blur or submit
- warning state MUST allow submission; client-error and server-error MUST block submission

## Label
Form Validation State Hierarchy

## Members
- pristine
- filling
- valid-untouched
- valid-confirmed
- warning
- client-error
- server-error
- async-validating
- disabled

## Styles
- **Pristine**:
  - **Purpose**: Field has not been interacted with; default state at form load.
  - **Visual**: Neutral border; no icon; no message.
  - **Aria**: no aria-invalid attribute set
  - **Timing**: On initial render until user focuses or submits
- **Filling**:
  - **Purpose**: User is actively typing or interacting; defer validation feedback.
  - **Visual**: Focus ring; neutral border; helper text visible if present.
  - **Aria**: aria-describedby points to helper, not error
  - **Timing**: While field has focus AND user has not yet submitted
  - **Rule**: Do NOT validate while typing. Wait for blur OR submit attempt.
- **Valid Untouched**:
  - **Purpose**: Field has correct content but does not need explicit confirmation feedback.
  - **Visual**: Same as pristine OR subtle indicator (no required action for user).
  - **Timing**: Most fields most of the time; UI should not be congratulatory by default.
- **Valid Confirmed**:
  - **Purpose**: Field with valuable confirmation (e.g. password meets complexity, username available).
  - **Visual**: Green check icon; positive helper text; subtle border tint.
  - **Aria**: aria-describedby points to confirmation text
  - **Timing**: After blur OR after async check completes
  - **Rule**: Use sparingly — too many green checks add noise. Reserve for fields where confirmation is genuinely useful.
- **Warning**:
  - **Purpose**: Input is acceptable but suspicious or unusual; submission allowed.
  - **Visual**: Amber border; warning icon; advisory message.
  - **Aria**: aria-describedby points to warning text; aria-invalid is NOT set (input is valid)
  - **Examples**: Common typo in email domain ('gmial.com'); password is weak but meets minimum; entered phone for a region with high error rate.
- **Client Error**:
  - **Purpose**: Validation rule violated; submission blocked until corrected.
  - **Visual**: Red border; error icon; specific message.
  - **Aria**: aria-invalid='true'; aria-describedby points to error message; error text is in role='alert' OR aria-live='polite' container after submit attempt
  - **Timing**: On blur AFTER first submit attempt (don't pre-emptively scold) OR on submit
  - **Examples**: Required field empty; pattern mismatch (email format); minlength not met; password mismatch.
- **Server Error**:
  - **Purpose**: Server rejected the value (uniqueness, business rule, fraud check).
  - **Visual**: Red border; error icon; server-supplied message.
  - **Aria**: Same as client-error; message reflects server response
  - **Examples**: 'This email is already registered'; 'Coupon code expired'; 'Address could not be verified'.
  - **Rule**: Do NOT clear the field on server error (see @community/rule-preserve-user-input-on-error).
- **Async Validating**:
  - **Purpose**: Validation in flight (e.g. checking username availability against server).
  - **Visual**: Subtle spinner or shimmer; neutral border; no error/success styling yet.
  - **Aria**: aria-busy='true' on the input or field group
  - **Timing**: Triggered after debounce (200-500ms) following user input
  - **Rule**: Allow form submission only when async checks complete; OR fast-fail with debounce + queue.
- **Disabled**:
  - **Purpose**: Field is not currently editable (locked by another field, requires permission, read-only).
  - **Visual**: Reduced opacity; cursor: not-allowed; muted text.
  - **Aria**: Native disabled OR aria-disabled='true'
  - **Rule**: If user cannot edit, explain WHY (helper text or tooltip). Disabled-without-explanation is an anti-pattern.

## Invariants
- client-error and server-error MUST have specific, actionable messages — not 'Invalid input' (see @community/rule-actionable-error-messages)
- aria-invalid='true' MUST be paired with aria-describedby pointing to the error message
- Error messages MUST be positioned visually adjacent to the field (NOT only in a top banner)
- Submit attempt MUST move keyboard focus to the FIRST invalid field
- Validation MUST NOT clear the field's value on error
- filling state MUST NOT show error styling — wait for blur or submit
- warning state MUST allow submission; client-error and server-error MUST block submission
