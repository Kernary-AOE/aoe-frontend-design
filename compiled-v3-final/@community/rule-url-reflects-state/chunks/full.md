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

## Examples
- Table with filters: ?status=active&sort=created_at&order=desc — filter and sort state in URL.
- Dashboard tab: ?tab=analytics — current tab reflected so back/forward works.
- Modal with content: /users/42 not /?modal=user-42 — modal content has its own canonical URL.
- Bad: table that filters client-side but never updates the URL — state is lost on refresh, unshareable.

## Rationale
URLs are the web's primary sharing, bookmarking, and back-navigation mechanism. Non-URL state breaks deep linking, browser history, and collaborative sharing. Users who copy a URL and send it should land in the same state.

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
