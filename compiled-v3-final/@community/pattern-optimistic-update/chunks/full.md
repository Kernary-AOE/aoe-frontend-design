# OptimisticUpdate [pattern] v1.0.0
A UI pattern where mutations (toggle, like, edit, move) reflect in the UI immediately — before the server confirms — and reconcile (or revert with toast) on response. Removes perceived latency for actions where success is the overwhelming default.
domain: frontend-design

## Facts

## Label
Optimistic Update

## Problem
Network round-trips of 100-500ms make every action feel laggy if the UI waits for confirmation. Spinners on every interaction degrade trust and pace, even though the action almost always succeeds.

## Solution
Apply the change to local state immediately. Send the mutation in the background. On success, replace local state with server response (which may include id, timestamp). On failure, revert and show a toast with Retry.

## Structure
```
    <button
      type="button"
      class="like-btn"
      aria-pressed="true"
      aria-label="Liked, 42 likes"
      data-pending="false"
    >
      <svg class="heart filled" aria-hidden="true"></svg>
      <span class="count">42</span>
    </button>

    <!-- On failure, a toast appears: -->
    <div role="region" aria-label="Notifications">
      <ol aria-live="polite">
        <li role="alert" class="toast" data-tone="error">
          <p>Could not save like. Network error.</p>
          <button>Retry</button>
          <button aria-label="Dismiss">x</button>
        </li>
      </ol>
    </div>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Apply UI change synchronously when user acts; do not wait for the server.
- Mark the optimistic state with `data-pending='true'` (or similar) so retries / merges can find unsettled mutations.
- On server success, replace optimistic data with authoritative response (may include real id, server timestamp).
- On server failure: revert UI to pre-action state AND show an error toast with Retry. Never silently lose the action.
- Suitable for: toggles (like, star, archive), reorderings (drag), single-field edits, and creates with predictable response.
- Unsuitable for: payments, destructive ops without confirm, anything where user must see authoritative server result before continuing.
- Coalesce rapid repeats (e.g., toggle on/off/on) — send only the final state.

## A11y
- Toggle controls must update `aria-pressed` (or `aria-checked` for checkbox-roles) immediately on optimistic change.
- When the change is reverted on failure, the revert MUST be announced via `role='alert'` toast — silent revert confuses screen reader users who already heard 'Liked'.
- Pending state (`data-pending`) should not block keyboard interaction — users can keep navigating while the mutation flies.
- Provide a Retry control inside the error toast; make sure it has an accessible name distinguishing which mutation it retries (e.g., 'Retry liking post 123').
- If a queue of optimistic mutations stalls, expose a small 'Reconnecting...' indicator so users know progress is paused.

## Examples
- @community/example-twitter-like-button
- @community/example-linear-status-toggle
- @community/example-figma-multiplayer-cursor

## Label
Optimistic Update

## Problem
Network round-trips of 100-500ms make every action feel laggy if the UI waits for confirmation. Spinners on every interaction degrade trust and pace, even though the action almost always succeeds.

## Solution
Apply the change to local state immediately. Send the mutation in the background. On success, replace local state with server response (which may include id, timestamp). On failure, revert and show a toast with Retry.

## Structure
```
    <button
      type="button"
      class="like-btn"
      aria-pressed="true"
      aria-label="Liked, 42 likes"
      data-pending="false"
    >
      <svg class="heart filled" aria-hidden="true"></svg>
      <span class="count">42</span>
    </button>

    <!-- On failure, a toast appears: -->
    <div role="region" aria-label="Notifications">
      <ol aria-live="polite">
        <li role="alert" class="toast" data-tone="error">
          <p>Could not save like. Network error.</p>
          <button>Retry</button>
          <button aria-label="Dismiss">x</button>
        </li>
      </ol>
    </div>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Apply UI change synchronously when user acts; do not wait for the server.
- Mark the optimistic state with `data-pending='true'` (or similar) so retries / merges can find unsettled mutations.
- On server success, replace optimistic data with authoritative response (may include real id, server timestamp).
- On server failure: revert UI to pre-action state AND show an error toast with Retry. Never silently lose the action.
- Suitable for: toggles (like, star, archive), reorderings (drag), single-field edits, and creates with predictable response.
- Unsuitable for: payments, destructive ops without confirm, anything where user must see authoritative server result before continuing.
- Coalesce rapid repeats (e.g., toggle on/off/on) — send only the final state.

## A11y
- Toggle controls must update `aria-pressed` (or `aria-checked` for checkbox-roles) immediately on optimistic change.
- When the change is reverted on failure, the revert MUST be announced via `role='alert'` toast — silent revert confuses screen reader users who already heard 'Liked'.
- Pending state (`data-pending`) should not block keyboard interaction — users can keep navigating while the mutation flies.
- Provide a Retry control inside the error toast; make sure it has an accessible name distinguishing which mutation it retries (e.g., 'Retry liking post 123').
- If a queue of optimistic mutations stalls, expose a small 'Reconnecting...' indicator so users know progress is paused.

## Compatible
- @community/pattern-toast-stack
- @community/pattern-kanban-board
- @community/pattern-data-table-dense
