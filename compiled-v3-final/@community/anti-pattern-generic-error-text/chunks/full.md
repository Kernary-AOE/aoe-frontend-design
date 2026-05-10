# GenericErrorText [anti-pattern] v1.0.0
Displaying 'An error occurred', 'Something went wrong', or 'Please try again' without explaining what failed, why, or what the user should do next.
domain: frontend-design

## Label
Generic or Vague Error Messages

## Trap
Catch-all error handlers display a generic message to avoid exposing internal state. This is appropriate for security (server errors, auth failures), but developers apply the same pattern everywhere including form validation, network timeouts, and user-correctable errors where specific guidance is needed.

## Detection Heuristics
- Error text is identical across multiple failure scenarios
- Error message has no actionable next step
- Message says 'try again' without indicating when or how
- No error code or reference for support contact

## Remediation
- Name the field or resource that failed: 'Your card number is invalid'
- Explain the constraint: 'Password must be at least 8 characters'
- Provide a recovery action: 'Check your connection and try again — if this persists, contact support'
- For opaque server errors: show a reference code so support can look it up
- Reserve 'Something went wrong' only for truly unclassifiable errors

## Label
Generic or Vague Error Messages

## Trap
Catch-all error handlers display a generic message to avoid exposing internal state. This is appropriate for security (server errors, auth failures), but developers apply the same pattern everywhere including form validation, network timeouts, and user-correctable errors where specific guidance is needed.

## Detection Heuristics
- Error text is identical across multiple failure scenarios
- Error message has no actionable next step
- Message says 'try again' without indicating when or how
- No error code or reference for support contact

## Remediation
- Name the field or resource that failed: 'Your card number is invalid'
- Explain the constraint: 'Password must be at least 8 characters'
- Provide a recovery action: 'Check your connection and try again — if this persists, contact support'
- For opaque server errors: show a reference code so support can look it up
- Reserve 'Something went wrong' only for truly unclassifiable errors
