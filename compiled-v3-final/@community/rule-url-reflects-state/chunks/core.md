# UrlReflectsState [rule] v1.0.0
> Every meaningful view, filter, or sort state in a web application must update the URL via the History API — any state a user can share or return to must be encoded in the URL.
domain: frontend-design

## Severity
warning

## Applies When
building SPAs or any page with view-level state changes that don't trigger a full page load

## Verify By
Navigate to a filtered/sorted state. Copy the URL. Open in a new tab. Confirm the same state is restored exactly.

## Code
```
    // Minimal pattern: push filter state to URL on change
    const params = new URLSearchParams(window.location.search);
    params.set('status', filterStatus);
    params.set('sort', sortField);
    history.pushState({}, '', '?' + params.toString());

    // On mount: restore state from URL
    const params = new URLSearchParams(window.location.search);
    const initialStatus = params.get('status') ?? 'all';
    const initialSort = params.get('sort') ?? 'created_at';
  
```
