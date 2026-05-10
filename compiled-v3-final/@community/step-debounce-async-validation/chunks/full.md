# DebounceAsyncValidation [step] v1.0.0
domain: frontend-engineering

signature: (input: HTMLInputElement, validator: AsyncValidator, delay?: number) -> AbortablePromise
effect: idempotent

## Errors
- NetworkError
- AbortError
- ValidationFailed

## Body
```
    Inputs: HTMLInputElement (or controlled equivalent), AsyncValidator function (value → Promise<ValidationResult>), debounce delay (default 300ms).

    Lifecycle per user keystroke:

    1. CAPTURE INPUT
       - Listen to `input` event on the field.
       - Read current value.

    2. CANCEL PRIOR
       - If a pending validation is in flight from a previous keystroke:
           a. Call AbortController.abort() on its fetch.
           b. Clear its scheduled timer.
       - This guarantees only the LATEST keystroke's validation completes.

    3. ENTER VALIDATING STATE
       - Set field aria-busy='true'.
       - Show subtle inline spinner (do NOT block input).
       - Clear any previous error/success styling.

    4. DEBOUNCE
       - Schedule validator(value) to run after `delay` ms.
       - Default delay 300ms — long enough to avoid mid-typing fires, short enough to feel responsive.
       - For autocomplete-style validation, 200ms; for expensive server checks, 500ms.

    5. EXECUTE VALIDATOR
       - Create a new AbortController; pass signal to validator's fetch.
       - On success: receive ValidationResult { valid, message? }
       - On abort: silently exit (a newer keystroke is in flight).
       - On network error: show retryable error message.

    6. UPDATE UI
       - Set field aria-busy='false'.
       - If valid:    aria-invalid='false'; show success styling if applicable.
       - If invalid:  aria-invalid='true'; aria-describedby=errorId; render message.

    7. RACE PROTECTION
       - Out-of-order responses: enforce 'last write wins' by tracking the latest request id.
       - Even with abort, ensure stale responses cannot overwrite newer ones.

    Return AbortablePromise — caller can manually abort (e.g. on form unmount).
  
```

## Preconditions
- field is mounted in DOM with valid id/name
- validator is a pure async function (does not mutate field)
- AbortController is supported (Node 16+, all modern browsers)

## Postconditions
- After 300ms idle: exactly ONE validation request fires for the final value
- aria-busy reflects in-flight state accurately at all times
- Field state on completion is one of: pristine, valid, invalid (never stale-validating)

## Errors
- NetworkError
- AbortError
- ValidationFailed

## Body
```
    Inputs: HTMLInputElement (or controlled equivalent), AsyncValidator function (value → Promise<ValidationResult>), debounce delay (default 300ms).

    Lifecycle per user keystroke:

    1. CAPTURE INPUT
       - Listen to `input` event on the field.
       - Read current value.

    2. CANCEL PRIOR
       - If a pending validation is in flight from a previous keystroke:
           a. Call AbortController.abort() on its fetch.
           b. Clear its scheduled timer.
       - This guarantees only the LATEST keystroke's validation completes.

    3. ENTER VALIDATING STATE
       - Set field aria-busy='true'.
       - Show subtle inline spinner (do NOT block input).
       - Clear any previous error/success styling.

    4. DEBOUNCE
       - Schedule validator(value) to run after `delay` ms.
       - Default delay 300ms — long enough to avoid mid-typing fires, short enough to feel responsive.
       - For autocomplete-style validation, 200ms; for expensive server checks, 500ms.

    5. EXECUTE VALIDATOR
       - Create a new AbortController; pass signal to validator's fetch.
       - On success: receive ValidationResult { valid, message? }
       - On abort: silently exit (a newer keystroke is in flight).
       - On network error: show retryable error message.

    6. UPDATE UI
       - Set field aria-busy='false'.
       - If valid:    aria-invalid='false'; show success styling if applicable.
       - If invalid:  aria-invalid='true'; aria-describedby=errorId; render message.

    7. RACE PROTECTION
       - Out-of-order responses: enforce 'last write wins' by tracking the latest request id.
       - Even with abort, ensure stale responses cannot overwrite newer ones.

    Return AbortablePromise — caller can manually abort (e.g. on form unmount).
  
```

## Preconditions
- field is mounted in DOM with valid id/name
- validator is a pure async function (does not mutate field)
- AbortController is supported (Node 16+, all modern browsers)

## Postconditions
- After 300ms idle: exactly ONE validation request fires for the final value
- aria-busy reflects in-flight state accurately at all times
- Field state on completion is one of: pristine, valid, invalid (never stale-validating)
