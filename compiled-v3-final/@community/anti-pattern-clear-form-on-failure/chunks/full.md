# ClearFormOnSingleFieldFailure [anti-pattern] v1.0.0
Resetting or clearing an entire form when only a single field fails validation, forcing users to re-enter all previously filled data after a minor mistake.
domain: frontend-design

## Symptom
User fills a 10-field checkout form, types an invalid card expiry, and the entire form blanks out on submit — name, address, and all other data is lost.

## Why Harmful
- Violates Nielsen's error recovery heuristic: errors should be easy to fix, not catastrophic.
- Destroys user effort, triggering abandonment — especially on mobile where re-typing is slow.
- No legitimate UX reason exists to clear valid fields when one field fails.

## Root Causes
- Calling `form.reset()` in a submit error handler.
- Server renders a fresh form template on validation failure without repopulating values.
- React state initialized to empty on mount without restoring from error response.

## Instead
- Preserve all field values on validation failure; only highlight and focus the failing field.
- Server-rendered forms: repopulate all fields from the POST body on error response.
- Call form.reset() ONLY after confirmed successful submission.

## Symptom
User fills a 10-field checkout form, types an invalid card expiry, and the entire form blanks out on submit — name, address, and all other data is lost.

## Why Harmful
- Violates Nielsen's error recovery heuristic: errors should be easy to fix, not catastrophic.
- Destroys user effort, triggering abandonment — especially on mobile where re-typing is slow.
- No legitimate UX reason exists to clear valid fields when one field fails.

## Root Causes
- Calling `form.reset()` in a submit error handler.
- Server renders a fresh form template on validation failure without repopulating values.
- React state initialized to empty on mount without restoring from error response.

## Instead
- Preserve all field values on validation failure; only highlight and focus the failing field.
- Server-rendered forms: repopulate all fields from the POST body on error response.
- Call form.reset() ONLY after confirmed successful submission.
