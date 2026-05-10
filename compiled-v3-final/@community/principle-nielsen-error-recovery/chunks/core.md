# NielsenErrorRecovery [principle] v1.0.0
Nielsen Heuristic 9: error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution.
> Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.
domain: ux-design

## Attributed To
Jakob Nielsen, 1994

## Applies To
- form validation messages: field-level errors with specific correction guidance
- network/API errors: translating failures into user-actionable next steps
- empty states after failed searches: explaining why results are empty + what to try
- authentication errors: distinguishing 'wrong password' from 'account not found'
- payment failures: explaining decline reason in terms of user action required
- 404 / dead-link pages: offering navigation alternatives rather than just the error code

## Counter Examples
- A form that returns a generic 'Something went wrong. Please try again.' with no indication of which field failed or why.
- A login page that returns 'Invalid credentials' for both wrong password and non-existent account — security rationale is valid, but no recovery path is offered for forgotten email.
- An API error dialog showing 'HTTP 500 Internal Server Error' with a Close button and nothing else — no retry, no support link, no explanation.
