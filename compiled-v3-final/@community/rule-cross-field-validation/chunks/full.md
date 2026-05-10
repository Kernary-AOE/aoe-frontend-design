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

## Rationale
Firing cross-field checks on blur creates false positives: 'Password does not match' appears on the first password field before the user has even reached the confirm field. Defer until submit to check relational constraints; then surface them in two places so screen-reader users and sighted users both discover all errors.

## Applies To
@community/type-html-artifact

## Severity
warning

## Behavior
- Per-field format errors (email pattern, required) fire on blur.
- Cross-field logical errors (confirm match, date range, conditional required) fire only on submit.
- On submit failure: render an error summary before the first field, focused automatically, listing each error as a link to its field.
- Each affected input also receives aria-invalid='true' and aria-describedby pointing to its individual error message.
