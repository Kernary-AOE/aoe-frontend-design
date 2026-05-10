# ValidateRequiredFields [step] v1.0.0
domain: frontend-engineering

signature: (form: HTMLFormElement | FormDataObject) -> ValidationResult
effect: read-only

## Errors
- InvalidFormElement
- NoFieldsFound

## Body
```
    For each field F in form.fields:
      1. Check `required` attribute or `data-required` flag.
      2. If required AND F.value is empty (undefined, null, "", or whitespace-only):
           record violation:
             { field-id: F.id, field-name: F.name, message: localizedMessage(F, 'required') }
      3. If F has `pattern` attribute AND F.value does not match:
           record violation with message from F.dataset.patternError or default.
      4. If F.type == 'email' AND F.value does not match RFC-5322-compatible regex:
           record violation.
      5. If F has `minlength` AND F.value.length < minlength:
           record violation.

    Aggregation rules:
      - For each violation, set ARIA: F.setAttribute('aria-invalid', 'true')
        and link to error message via F.setAttribute('aria-describedby', errorId).
      - Move keyboard focus to the FIRST violating field on submit attempt.
      - Announce summary via aria-live="assertive" region: "5 errors prevented submission. First error: ..."
      - Inline error message must be visually adjacent to the field (NOT only in a top banner).

    Return ValidationResult = {
      valid: boolean,            // true iff no violations
      violations: Violation[],   // ordered by DOM order
      first-invalid: HTMLElement | null
    }
  
```

## Preconditions
- form has been initialized in the DOM with semantic <input>/<select>/<textarea> elements
- each field has an associated <label> (see @community/check-form-label-associated)

## Postconditions
- valid fields have aria-invalid='false' or attribute removed
- invalid fields have aria-invalid='true' and aria-describedby pointing at error message id
- focus has moved to first invalid field if any
