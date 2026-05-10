# ButtonTypeExplicit [check] v1.0.0
Validates that every <button> element declares an explicit type attribute (button | submit | reset). Buttons in forms default to 'submit' which causes accidental form submission — a common bug source.
domain: forms

signature: (html: string, context?: object) -> CheckResult
predicate: // Every <button> inside a <form> must declare type="button|submit|reset" explicitly.
// Default is type="submit" — buttons without type silently submit forms when clicked.
// Buttons OUTSIDE forms can omit type (default is "submit" but no form to submit).
buttons = querySelectorAll('button:not([type])')
for b in buttons:
inForm = b.closest('form') !== null
if !inForm:
// Outside form: still recommend type="button" for safety against future refactor
yield {
selector: cssPath(b),
fail: 'missing-type-attribute',
inForm: false,
severity: 'warn',
remedy: 'add type="button" for clarity'
}
else:
yield {
selector: cssPath(b),
fail: 'missing-type-in-form',
inForm: true,
severity: 'high',
remedy: 'add type="button" — default submit will trigger unintended form submission'
}

// Also check: type values must be valid
typed = querySelectorAll('button[type]')
for b in typed:
t = b.getAttribute('type')
if !['button','submit','reset','menu'].includes(t):
yield { selector: cssPath(b), fail: 'invalid-type-value', value: t, allowed: ['button','submit','reset'] }

## Validates
@community/rule-button-type-explicit

## Severity
high

## Failure Message Template
Button '{selector}' missing type attribute (inside form: {inForm}). {remedy}.

## Evaluation Method
automated

## Tools
- regex
- @anthropic/claude-code
- eslint-plugin-react

## False Positive Rate
low
