# AriaLabelInName [rule] v1.0.0
When an interactive element has visible text, its accessible name computed by aria-label or aria-labelledby must include that visible text as a substring, so voice-control users can activate it by speaking what they see (WCAG SC 2.5.3 Label in Name, Level A).
domain: frontend-design

## Applies When
Adding aria-label or aria-labelledby to any interactive element (<button>, <a>, <input>, or a custom component with role='button'|'link'|'menuitem') that already displays visible text.

## Rule
```
// The aria-label value must contain the visible text as a case-insensitive substring.
// ✅ Correct — aria-label extends visible text with extra context
<button aria-label="Delete item 42">Delete</button>
// ✅ Correct — icon button with no visible text; aria-label is the only name
<button aria-label="Close dialog"><svg aria-hidden="true" .../></button>
// ❌ Incorrect — aria-label replaces "Submit" with something else entirely
<button aria-label="Proceed to next step">Submit</button>
```

## Bad Patterns
```
// ❌ Visible "Save" replaced by unrelated accessible name — voice command "Save" fails
// <button aria-label="Persist changes to server">Save</button>

// ❌ Visible "Cancel" but aria-label says "Dismiss modal" — voice command "Cancel" fails
// <button aria-label="Dismiss modal">Cancel</button>
```

## Severity
block

## Verification
Check every element with aria-label that also has non-empty text content; confirm the aria-label value contains that text (case-insensitive). axe-core rule: label-content-name-mismatch.

## Tools
- axe-core
- lighthouse

## Rationale
Voice-control software (Dragon NaturallySpeaking, macOS Voice Control, Windows Voice Access) activates controls by matching spoken words to the accessible name. If aria-label contradicts or omits the visible label, the spoken command fails silently — the user sees 'Submit' but must say the hidden aria-label value they cannot know.

## Applies When
Adding aria-label or aria-labelledby to any interactive element (<button>, <a>, <input>, or a custom component with role='button'|'link'|'menuitem') that already displays visible text.

## Rule
```
// The aria-label value must contain the visible text as a case-insensitive substring.
// ✅ Correct — aria-label extends visible text with extra context
<button aria-label="Delete item 42">Delete</button>
// ✅ Correct — icon button with no visible text; aria-label is the only name
<button aria-label="Close dialog"><svg aria-hidden="true" .../></button>
// ❌ Incorrect — aria-label replaces "Submit" with something else entirely
<button aria-label="Proceed to next step">Submit</button>
```

## Bad Patterns
```
// ❌ Visible "Save" replaced by unrelated accessible name — voice command "Save" fails
// <button aria-label="Persist changes to server">Save</button>

// ❌ Visible "Cancel" but aria-label says "Dismiss modal" — voice command "Cancel" fails
// <button aria-label="Dismiss modal">Cancel</button>
```

## Severity
block

## Verification
Check every element with aria-label that also has non-empty text content; confirm the aria-label value contains that text (case-insensitive). axe-core rule: label-content-name-mismatch.

## Tools
- axe-core
- lighthouse
