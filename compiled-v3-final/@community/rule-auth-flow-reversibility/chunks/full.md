# AuthFlowReversibility [rule] v1.0.0
> Every step of sign-in, sign-out, password reset, account recovery, and MFA enrollment flows must have a clear back, cancel, or recovery path — users must never be able to reach a dead end in an authentication flow.
domain: frontend-design

## Severity
warning

## Applies When
Implementing sign-in, sign-out, password reset, account recovery, or MFA enrollment.

## Verify By
Walk each auth flow as a new user and confirm every step has an accessible exit. Check: can a user cancel mid-flow without losing access? Is there recovery if MFA device is unavailable?

## Rationale
Users who get stuck in auth flows lose access to the product permanently. Reversibility prevents lockout and reduces support burden. A single missing 'Back' button or missing recovery code step can lock out legitimate users.

## Severity
warning

## Applies When
Implementing sign-in, sign-out, password reset, account recovery, or MFA enrollment.

## Verify By
Walk each auth flow as a new user and confirm every step has an accessible exit. Check: can a user cancel mid-flow without losing access? Is there recovery if MFA device is unavailable?
