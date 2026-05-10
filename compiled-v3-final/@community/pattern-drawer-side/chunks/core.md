# DrawerSide [pattern] v1.0.0
A panel that slides in from the right (or left) edge of the viewport, overlaying or pushing content. Used for detail inspectors, edit forms, and mobile nav menus where context-with-task is more important than full focus.
domain: frontend-design

## Facts

## Label
Side Drawer

## Problem
Modals interrupt and lose context; full-page navigation loses scroll position. When users need to inspect or edit a related item without leaving the current view, a side panel preserves both context and task.

## Solution
A 360-720px wide panel sliding in from a viewport edge, with a backdrop scrim. Includes a header (title + close), scrollable body, and sticky footer for primary actions.

## Structure
```
    <div class="drawer-backdrop" aria-hidden="true"></div>
    <aside
      role="dialog"
      aria-modal="true"
      aria-labelledby="dr-title"
      class="drawer"
      data-side="right"
    >
      <header>
        <h2 id="dr-title">PRM-1024 Fix login redirect</h2>
        <button aria-label="Close drawer" class="close">
          <svg aria-hidden="true"></svg>
        </button>
      </header>
      <div class="drawer-body">
        <dl>
          <dt>Status</dt><dd>In Progress</dd>
          <dt>Assignee</dt><dd>Kevin Hou</dd>
          <dt>Priority</dt><dd>P1</dd>
        </dl>
        <section aria-labelledby="comments-h">
          <h3 id="comments-h">Comments</h3>
          <ol>
            <li><article>...</article></li>
          </ol>
        </section>
      </div>
      <footer class="drawer-footer">
        <button>Save</button>
        <button class="primary">Mark complete</button>
      </footer>
    </aside>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Slide in from edge over 200-260ms ease-out; honor `prefers-reduced-motion`.
- Body scroll locks while drawer open (overflow:hidden on body).
- Esc closes; clicking scrim closes if no unsaved changes (otherwise prompt confirm).
- Trap focus inside the drawer while open; restore focus on close.
- Width: 360-480px on desktop for inspector use cases; 720-960px for full edit forms; 100% on mobile.
- Resizable variant: drag the leading edge to adjust width; persist to localStorage.
- Multiple drawers: stack with progressively darker scrims; Esc closes the topmost only.

## A11y
- Use `role='dialog'` with `aria-modal='true'` and `aria-labelledby` pointing to the drawer title.
- Provide a close button with accessible name 'Close drawer' (or 'Close <title>').
- Trap focus inside; on close, return focus to the trigger element.
- Backdrop has `aria-hidden='true'` and is not focusable; clicking it dispatches close.
- Honor `prefers-reduced-motion: reduce` by replacing slide with instant appearance.
