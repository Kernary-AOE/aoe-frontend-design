# ErrorMessageAssociated [rule] v1.0.0
Every form-validation error message MUST be programmatically associated with its field via `aria-describedby`, AND the field MUST set `aria-invalid='true'`. Visually-adjacent error text without programmatic association is invisible to screen readers.
domain: accessibility
