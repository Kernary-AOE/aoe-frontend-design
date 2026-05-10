# ErrorMessageAssociated [rule] v1.0.0
Every form-validation error message MUST be programmatically associated with its field via `aria-describedby`, AND the field MUST set `aria-invalid='true'`. Visually-adjacent error text without programmatic association is invisible to screen readers.
domain: accessibility

## Checks
- [ ] @community/check-error-message-associated

## Applies To
@community/type-html-artifact

## Severity
critical

## Severity Combination
```
error visible, no aria-describedby                   → BLOCK  (SC 1.3.1, 3.3.1)
error visible, no aria-invalid                       → WARN
error has both aria-describedby and aria-invalid     → PASS
```

## Failure Mode
Screen-reader users hear the field name and value but no indication an error exists; they submit the form again with the same data and the same failure. WCAG Level A fails.

## Remediation
- Render: `<input id='email' aria-describedby='email-error' aria-invalid='true'>` `<p id='email-error' role='alert'>Enter a valid email.</p>`.
- Toggle `aria-invalid` to `false` (or remove) when the user corrects the value — don't leave stale state.
- Use `role='alert'` (or `aria-live='polite'`) on the error region so the message is announced when it appears, not on next focus.
- If a field has both a hint and an error, set `aria-describedby='email-hint email-error'` (space-separated).

## Exceptions
-
  - **Case**: Server-side post-submit error page
  - **Allowed When**: A full re-render of the form with errors injected as adjacent text is acceptable IF aria-describedby is wired on render.

## Applies To
@community/type-html-artifact

## Severity
critical

## Validates With
- @w3c/source-wcag-22

## Severity Combination
```
error visible, no aria-describedby                   → BLOCK  (SC 1.3.1, 3.3.1)
error visible, no aria-invalid                       → WARN
error has both aria-describedby and aria-invalid     → PASS
```

## Failure Mode
Screen-reader users hear the field name and value but no indication an error exists; they submit the form again with the same data and the same failure. WCAG Level A fails.

## Remediation
- Render: `<input id='email' aria-describedby='email-error' aria-invalid='true'>` `<p id='email-error' role='alert'>Enter a valid email.</p>`.
- Toggle `aria-invalid` to `false` (or remove) when the user corrects the value — don't leave stale state.
- Use `role='alert'` (or `aria-live='polite'`) on the error region so the message is announced when it appears, not on next focus.
- If a field has both a hint and an error, set `aria-describedby='email-hint email-error'` (space-separated).

## Exceptions
-
  - **Case**: Server-side post-submit error page
  - **Allowed When**: A full re-render of the form with errors injected as adjacent text is acceptable IF aria-describedby is wired on render.

## See Also
- @community/check-error-message-associated
