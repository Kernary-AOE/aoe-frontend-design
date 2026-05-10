# DebounceSearchInput [step] v1.0.0
domain: frontend-engineering

signature: (input: HTMLInputElement, onQuery: (q: string) => Promise<Result[]>, delayMs?: number) -> CleanupFn
effect: side-effect

## Errors
- AbortedRequest
- NetworkError

## Body
```
    Setup:
      let timeoutId = null;
      let activeController = null;
      const delay = delayMs ?? 250;  // 250ms is the perceptual sweet spot

    On `input` event:
      1. Clear any pending timeout: clearTimeout(timeoutId).
      2. If activeController exists, abort the previous request: activeController.abort().
      3. Read raw value: const q = input.value.trim().
      4. If q.length < 2:
           clear results UI immediately
           announce "" via aria-live region (clear)
           return
      5. Schedule the search:
           timeoutId = setTimeout(async () => {
             activeController = new AbortController();
             try {
               const results = await onQuery(q, { signal: activeController.signal });
               renderResults(results);
               announce(`${results.length} results for "${q}"`);
             } catch (err) {
               if (err.name === 'AbortError') return;  // expected; superseded
               renderError(err);
             }
           }, delay);

    On unmount / cleanup:
      clearTimeout(timeoutId);
      activeController?.abort();

    Return cleanup function.
  
```

## Preconditions
- input element is connected to the DOM
- onQuery accepts AbortSignal in options for cancellation
- an aria-live='polite' region exists for screen reader announcements

## Postconditions
- at most one in-flight network request per input session (older are aborted)
- results UI updates only with the latest typed query
- screen reader users hear result counts via aria-live announcement

## Errors
- AbortedRequest
- NetworkError

## Body
```
    Setup:
      let timeoutId = null;
      let activeController = null;
      const delay = delayMs ?? 250;  // 250ms is the perceptual sweet spot

    On `input` event:
      1. Clear any pending timeout: clearTimeout(timeoutId).
      2. If activeController exists, abort the previous request: activeController.abort().
      3. Read raw value: const q = input.value.trim().
      4. If q.length < 2:
           clear results UI immediately
           announce "" via aria-live region (clear)
           return
      5. Schedule the search:
           timeoutId = setTimeout(async () => {
             activeController = new AbortController();
             try {
               const results = await onQuery(q, { signal: activeController.signal });
               renderResults(results);
               announce(`${results.length} results for "${q}"`);
             } catch (err) {
               if (err.name === 'AbortError') return;  // expected; superseded
               renderError(err);
             }
           }, delay);

    On unmount / cleanup:
      clearTimeout(timeoutId);
      activeController?.abort();

    Return cleanup function.
  
```

## Preconditions
- input element is connected to the DOM
- onQuery accepts AbortSignal in options for cancellation
- an aria-live='polite' region exists for screen reader announcements

## Postconditions
- at most one in-flight network request per input session (older are aborted)
- results UI updates only with the latest typed query
- screen reader users hear result counts via aria-live announcement
