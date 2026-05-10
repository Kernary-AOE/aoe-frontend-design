# PopstateBackForward [rule] v1.0.0
Single-page applications must listen to the popstate event and restore the correct view state when the user navigates back or forward with browser controls.
domain: frontend-design

## Severity
high

## Implementation
- React Router / Next.js: built-in if routes are mapped to pages — no manual popstate needed
- Custom SPA: window.addEventListener('popstate', (e) => restoreState(e.state))
- Serialize view state into history.pushState(stateObject, '', url) when navigating
- On popstate: read e.state, restore scroll position, restore focused element, re-fetch if needed
- Test: navigate forward 3 pages, hit back 3 times — all states must be correct

## Rationale
Browser back/forward navigation is the #1 UI pattern users depend on. SPAs that manage their own routing via history.pushState must also handle history.popstate, or back/forward silently loads the wrong state while the URL changes.

## Severity
high

## Implementation
- React Router / Next.js: built-in if routes are mapped to pages — no manual popstate needed
- Custom SPA: window.addEventListener('popstate', (e) => restoreState(e.state))
- Serialize view state into history.pushState(stateObject, '', url) when navigating
- On popstate: read e.state, restore scroll position, restore focused element, re-fetch if needed
- Test: navigate forward 3 pages, hit back 3 times — all states must be correct
