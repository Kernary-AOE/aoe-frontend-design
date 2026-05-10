# CrossFieldValidation [rule] v1.0.0
Validation rules that span multiple form fields (e.g. password-confirm match, date-range overlap, conditional required fields) must run on form submission rather than per-field blur, and surface a grouped error summary at the top of the form.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
warning

## Behavior
- Per-field format errors (email pattern, required) fire on blur.
- Cross-field logical errors (confirm match, date range, conditional required) fire only on submit.
- On submit failure: render an error summary before the first field, focused automatically, listing each error as a link to its field.
- Each affected input also receives aria-invalid='true' and aria-describedby pointing to its individual error message.
