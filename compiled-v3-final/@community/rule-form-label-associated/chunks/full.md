# FormLabelAssociated [rule] v1.0.0
Every form control (`<input>`, `<select>`, `<textarea>`, custom widgets with role='textbox' / 'combobox' / 'listbox') MUST have a programmatically-associated label — via `<label for='id'>`, wrapping `<label>`, `aria-label`, or `aria-labelledby`. Placeholder text alone is NEVER a label.
domain: accessibility

## Checks
- [ ] @community/check-form-label-associated

## Applies To
@community/type-html-artifact

## Severity
critical

## Severity Combination
```
input has no associated label                  → BLOCK  (SC 1.3.1, 4.1.2)
input uses placeholder as label only           → BLOCK  (SC 3.3.2)
input wrapped in <label> or has matching for=  → PASS
custom widget has aria-labelledby              → PASS
```

## Failure Mode
Screen-reader users hear 'edit' or 'combobox' with no purpose; voice-control users cannot say 'click <field name>'; users with cognitive impairment lose context the moment they type and the placeholder disappears. WCAG Level A fails.

## Remediation
- Replace `<input placeholder='Email'>` with `<label for='email'>Email</label><input id='email' type='email'>`.
- For visually compact UI, hide the label with `.sr-only` rather than removing it — keeps screen-reader access.
- For custom widgets (combobox, datepicker), use `aria-labelledby='external-label-id'`.
- Use `aria-describedby` (NOT label) for hints / format examples.

## Exceptions
-
  - **Case**: Search field with explicit aria-label
  - **Allowed When**: A globally-recognizable search input may use `<input type='search' aria-label='Search'>` without a visible label, but a visible label is still preferred.

## Applies To
@community/type-html-artifact

## Severity
critical

## Validates With
- @w3c/source-wcag-22

## Severity Combination
```
input has no associated label                  → BLOCK  (SC 1.3.1, 4.1.2)
input uses placeholder as label only           → BLOCK  (SC 3.3.2)
input wrapped in <label> or has matching for=  → PASS
custom widget has aria-labelledby              → PASS
```

## Failure Mode
Screen-reader users hear 'edit' or 'combobox' with no purpose; voice-control users cannot say 'click <field name>'; users with cognitive impairment lose context the moment they type and the placeholder disappears. WCAG Level A fails.

## Remediation
- Replace `<input placeholder='Email'>` with `<label for='email'>Email</label><input id='email' type='email'>`.
- For visually compact UI, hide the label with `.sr-only` rather than removing it — keeps screen-reader access.
- For custom widgets (combobox, datepicker), use `aria-labelledby='external-label-id'`.
- Use `aria-describedby` (NOT label) for hints / format examples.

## Exceptions
-
  - **Case**: Search field with explicit aria-label
  - **Allowed When**: A globally-recognizable search input may use `<input type='search' aria-label='Search'>` without a visible label, but a visible label is still preferred.

## See Also
- @community/check-form-label-associated
