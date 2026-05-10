# SaveFormProgress [rule] v1.0.0
Long or high-stakes forms (multi-step wizards, job applications, checkout with many fields) should auto-save draft progress to localStorage or a backend draft endpoint so users can resume after accidental navigation, session expiry, or browser crash.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
warning

## Applies When
- Multi-step wizards with 3+ steps
- Job applications, grant submissions, or forms with uploaded documents
- Checkout or booking flows where re-entry cost is high
- Any form where session expiry during completion is plausible

## Behavior
- Debounce auto-save to localStorage on field change (300-500ms idle).
- On form load, check for a saved draft and prompt: 'You have unsaved progress — continue?'
- Clear the draft from storage on successful submission.
- For sensitive data (SSN, CC), auto-save only non-sensitive fields; never persist card numbers locally.
- Provide explicit 'Save draft' button in multi-step wizards as a complement to auto-save.

## Storage Strategy
- **Client**: localStorage keyed by form-id + user-id hash (or anonymous session id)
- **Server**: Draft API endpoint for authenticated users; preferred for high-stakes forms

## Applies To
@community/type-html-artifact

## Severity
warning

## Applies When
- Multi-step wizards with 3+ steps
- Job applications, grant submissions, or forms with uploaded documents
- Checkout or booking flows where re-entry cost is high
- Any form where session expiry during completion is plausible

## Behavior
- Debounce auto-save to localStorage on field change (300-500ms idle).
- On form load, check for a saved draft and prompt: 'You have unsaved progress — continue?'
- Clear the draft from storage on successful submission.
- For sensitive data (SSN, CC), auto-save only non-sensitive fields; never persist card numbers locally.
- Provide explicit 'Save draft' button in multi-step wizards as a complement to auto-save.

## Storage Strategy
- **Client**: localStorage keyed by form-id + user-id hash (or anonymous session id)
- **Server**: Draft API endpoint for authenticated users; preferred for high-stakes forms
