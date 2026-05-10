# FormLabelAssociated [check] v1.0.0
Validates that every visible form input (text, email, password, select, textarea, etc.) has a programmatically associated label: <label for>, wrapping <label>, aria-labelledby, or aria-label. Placeholder text alone does not satisfy this requirement.
domain: accessibility

signature: (html: string, context?: object) -> CheckResult
predicate: // Every form input must have an associated label via one of:
//   1. <label for="{id}"> matching input id
//   2. Wrapping <label>...<input>...</label>
//   3. aria-labelledby pointing to existing element
//   4. aria-label
// Placeholder is NOT a substitute for a label.
inputs = querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=reset]), textarea, select')
for inp in inputs:
id = inp.id
// 1. <label for="">
if id:
labelFor = querySelector(`label[for="${cssEscape(id)}"]`)
if labelFor && labelFor.textContent.trim() !== '': continue
// 2. Wrapping label
ancestor = inp.closest('label')
if ancestor && ancestor.textContent.trim().length > inp.value.length: continue
// 3. aria-labelledby
labelledby = inp.getAttribute('aria-labelledby')
if labelledby:
ids = labelledby.split(/\s+/)
if ids.every(i => document.getElementById(i)): continue
// 4. aria-label
ariaLabel = inp.getAttribute('aria-label')
if ariaLabel && ariaLabel.trim() !== '': continue

// No label found
placeholderOnly = inp.getAttribute('placeholder')
yield {
selector: cssPath(inp),
type: inp.type || inp.tagName.toLowerCase(),
fail: 'no-associated-label',
placeholderOnly: placeholderOnly !== null,
remedy: placeholderOnly ? 'placeholder is not a label — add <label for> or aria-label' : 'add <label for=> or aria-label'
}

## Validates
@community/rule-form-label-associated

## Severity
critical

## Failure Message Template
Form input '{selector}' (type={type}) has no associated label. {remedy}. Without a label, screen readers cannot announce the field's purpose.

## Evaluation Method
automated

## Tools
- axe-core
- @testing-library/dom
- lighthouse

## False Positive Rate
low

## Validates
@community/rule-form-label-associated

## Severity
critical

## Failure Message Template
Form input '{selector}' (type={type}) has no associated label. {remedy}. Without a label, screen readers cannot announce the field's purpose.

## Evaluation Method
automated

## Tools
- axe-core
- @testing-library/dom
- lighthouse

## False Positive Rate
low
