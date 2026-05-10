# AriaLabelRequired [check] v1.0.0
Validates that interactive elements have an accessible name (computed via ARIA spec: aria-labelledby → aria-label → associated label → text → title). Focuses on icon-only buttons/links, unlabeled inputs, and images without alt.
domain: accessibility

signature: (html: string, context?: object) -> CheckResult
predicate: // Elements that MUST have an accessible name:
//   - <button> with no text content (icon-only)
//   - <a> with no text content (icon link)
//   - <input type="text|email|password|search|tel|url|number"> not associated to a <label>
//   - <img> without alt
//   - elements with role="button|link|tab|menuitem" and empty text
//
// Accessible name resolution order:
//   aria-labelledby → aria-label → label[for] → text content → title
candidates = querySelectorAll('button, a[href], [role="button"], [role="link"], [role="tab"], [role="menuitem"], img, input, [role="checkbox"], [role="radio"], [role="switch"]')
for el in candidates:
name = computeAccessibleName(el) // ARIA spec algorithm
if name && name.trim().length > 0: continue

tag = el.tagName.toLowerCase()
if tag === 'img' && el.getAttribute('alt') === null:
yield { selector: cssPath(el), fail: 'img-missing-alt' }
else if tag === 'img' && el.getAttribute('alt') === '':
// Empty alt is valid for decorative images — skip
continue
else if tag === 'input' && el.type !== 'hidden' && el.type !== 'submit' && el.type !== 'button':
// Submit/button get name from value
yield { selector: cssPath(el), fail: 'input-no-accessible-name', remedy: 'wrap in <label> or add aria-label' }
else if (tag === 'button' || el.getAttribute('role') === 'button'):
if el.textContent.trim() === '' && !el.querySelector('img[alt], svg[aria-label], svg title'):
yield { selector: cssPath(el), fail: 'icon-button-no-label', remedy: 'add aria-label or visible text' }
else if tag === 'a' && el.textContent.trim() === '':
yield { selector: cssPath(el), fail: 'icon-link-no-label' }

## Validates
@community/rule-aria-label-required

## Severity
critical

## Failure Message Template
Element '{selector}' has no accessible name: {fail}. {remedy}. Without a name, screen readers announce only the element type (e.g. 'button').

## Evaluation Method
automated

## Tools
- axe-core
- lighthouse
- @testing-library/dom

## False Positive Rate
low
