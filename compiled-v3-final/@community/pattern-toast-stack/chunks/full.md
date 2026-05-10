# ToastStack [pattern] v1.0.0
Transient, non-blocking notifications anchored to a screen corner (typically bottom-right) that auto-dismiss after 4-6 seconds. Stacks newest on top with up to 3 visible; older toasts collapse or rotate out.
domain: frontend-design

## Facts

## Label
Toast Notification Stack

## Problem
Background success/error feedback (saved, deleted, copied) does not warrant a modal but must still surface visibly without interrupting flow.

## Solution
A fixed-position region in a screen corner. Each toast is a small card with icon + title + optional action (Undo, View) + close button. Auto-dismiss with a thin progress timer; pause on hover/focus.

## Structure
```
    <div
      role="region"
      aria-label="Notifications"
      class="toast-region"
      data-position="bottom-right"
    >
      <ol role="list" aria-live="polite" aria-relevant="additions">
        <li role="status" class="toast" data-tone="success">
          <svg aria-hidden="true"><!-- check --></svg>
          <div class="content">
            <p class="title">Issue created</p>
            <p class="desc">PRM-1029 added to Sprint 14.</p>
          </div>
          <button class="action">Undo</button>
          <button class="close" aria-label="Dismiss notification">
            <svg aria-hidden="true"></svg>
          </button>
          <span class="timer" aria-hidden="true"></span>
        </li>
        <li role="alert" class="toast" data-tone="error">
          <svg aria-hidden="true"></svg>
          <div class="content">
            <p class="title">Save failed</p>
            <p class="desc">Network error - changes kept locally.</p>
          </div>
          <button class="action">Retry</button>
          <button class="close" aria-label="Dismiss notification"></button>
        </li>
      </ol>
    </div>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Auto-dismiss after 4s for success/info, 6s for warnings, persistent for errors (require manual dismiss).
- Pause auto-dismiss on hover or focus inside the toast; resume on leave.
- Stack newest at top; cap visible to 3; older toasts collapse into a 'N more' indicator.
- Each toast slides in from the anchored edge over 180ms; honor `prefers-reduced-motion`.
- Provide an Undo affordance for destructive successes (delete, archive) within the toast lifetime.
- Toasts are dismissable with Esc when focused; clicking the body does not dismiss (only the close button or action).

## A11y
- Container uses `role='region'` with `aria-label='Notifications'` so it appears as a landmark.
- Inner list has `aria-live='polite'` for non-urgent toasts; use `role='alert'` (or `aria-live='assertive'`) only on individual errors.
- Each toast must have a dismiss button with an accessible name like 'Dismiss notification'.
- Do not auto-dismiss errors — require explicit user action so screen reader users can finish reading them.
- Honor `prefers-reduced-motion: reduce` by replacing slide animation with instant appearance.

## Composition
- **Must Include**:
  - @impeccable/template-spring-config
  - @impeccable/template-easing-curves
  - @community/pattern-stagger-reveal
  - @impeccable/template-fade-stagger
- **Motion Prescriptions**:
  - @impeccable/template-spring-config
  - @community/pattern-stagger-reveal
- **Quality Thresholds**:
  - **Min Keyframes**: 4
  - **Requires Reduced Motion Fallback**: true
  - **Requires Cubic Bezier**: true
  - **Min Stagger Steps**: 5
  - **Min Toast Variants**: 5

## Examples
- @community/example-vercel-toast
- @community/example-linear-toast
- @community/example-radix-toast

## Label
Toast Notification Stack

## Problem
Background success/error feedback (saved, deleted, copied) does not warrant a modal but must still surface visibly without interrupting flow.

## Solution
A fixed-position region in a screen corner. Each toast is a small card with icon + title + optional action (Undo, View) + close button. Auto-dismiss with a thin progress timer; pause on hover/focus.

## Structure
```
    <div
      role="region"
      aria-label="Notifications"
      class="toast-region"
      data-position="bottom-right"
    >
      <ol role="list" aria-live="polite" aria-relevant="additions">
        <li role="status" class="toast" data-tone="success">
          <svg aria-hidden="true"><!-- check --></svg>
          <div class="content">
            <p class="title">Issue created</p>
            <p class="desc">PRM-1029 added to Sprint 14.</p>
          </div>
          <button class="action">Undo</button>
          <button class="close" aria-label="Dismiss notification">
            <svg aria-hidden="true"></svg>
          </button>
          <span class="timer" aria-hidden="true"></span>
        </li>
        <li role="alert" class="toast" data-tone="error">
          <svg aria-hidden="true"></svg>
          <div class="content">
            <p class="title">Save failed</p>
            <p class="desc">Network error - changes kept locally.</p>
          </div>
          <button class="action">Retry</button>
          <button class="close" aria-label="Dismiss notification"></button>
        </li>
      </ol>
    </div>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Auto-dismiss after 4s for success/info, 6s for warnings, persistent for errors (require manual dismiss).
- Pause auto-dismiss on hover or focus inside the toast; resume on leave.
- Stack newest at top; cap visible to 3; older toasts collapse into a 'N more' indicator.
- Each toast slides in from the anchored edge over 180ms; honor `prefers-reduced-motion`.
- Provide an Undo affordance for destructive successes (delete, archive) within the toast lifetime.
- Toasts are dismissable with Esc when focused; clicking the body does not dismiss (only the close button or action).

## A11y
- Container uses `role='region'` with `aria-label='Notifications'` so it appears as a landmark.
- Inner list has `aria-live='polite'` for non-urgent toasts; use `role='alert'` (or `aria-live='assertive'`) only on individual errors.
- Each toast must have a dismiss button with an accessible name like 'Dismiss notification'.
- Do not auto-dismiss errors — require explicit user action so screen reader users can finish reading them.
- Honor `prefers-reduced-motion: reduce` by replacing slide animation with instant appearance.

## Compatible
- @community/pattern-optimistic-update
- @community/pattern-empty-state

## Composition
- **Must Include**:
  - @impeccable/template-spring-config
  - @impeccable/template-easing-curves
  - @community/pattern-stagger-reveal
  - @impeccable/template-fade-stagger
- **Motion Prescriptions**:
  - @impeccable/template-spring-config
  - @community/pattern-stagger-reveal
- **Quality Thresholds**:
  - **Min Keyframes**: 4
  - **Requires Reduced Motion Fallback**: true
  - **Requires Cubic Bezier**: true
  - **Min Stagger Steps**: 5
  - **Min Toast Variants**: 5
