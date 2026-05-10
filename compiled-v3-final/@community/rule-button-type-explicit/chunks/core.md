# ButtonTypeExplicit [rule] v1.0.0
Every `<button>` element MUST declare an explicit `type` attribute (`button`, `submit`, or `reset`). The HTML default is `submit`, which inside a `<form>` causes any unrelated button (e.g. an icon toggle) to submit the form on click — a common, hard-to-debug bug.
domain: frontend-engineering

## Checks
- [ ] @community/check-button-type-explicit

## Applies To
@community/type-html-artifact

## Severity
high

## Severity Combination
```
<button> inside a form without type=  → BLOCK
<button> outside a form without type= → WARN
<button type='...'>                   → PASS
```

## Failure Mode
An icon-toggle button inside a form silently submits the form; users lose unsaved state; double-submission charges customers twice. The bug is invisible until production traffic hits the right page.

## Remediation
- Add `type='button'` to every button that is NOT the form's submit action.
- Add `type='submit'` to the one button intended to submit (and prefer placing only one).
- Add a lint rule (`react/button-has-type` for React, `@angular-eslint/template/button-has-type` for Angular) to enforce in CI.
- Wrap legacy buttons during migration: `const SafeButton = (p) => <button type='button' {...p} />`.

## Exceptions
-
  - **Case**: Submit-only inside a single-field form
  - **Allowed When**: A form has exactly one button whose purpose is submit; defaulting still works — but adding the attr costs nothing.
