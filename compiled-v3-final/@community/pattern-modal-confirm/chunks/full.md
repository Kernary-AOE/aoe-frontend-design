# ModalConfirm [pattern] v1.0.0
A small centered dialog that interrupts the user to confirm a destructive or consequential action (delete, archive, sign out). Two-button: a Cancel default and a destructive primary button labeled with the verb being performed.
domain: frontend-design

## Facts

## Label
Confirmation Modal

## Problem
Destructive actions (delete account, drop database, sign out) need a deliberate confirmation step. Generic 'Are you sure?' text trains users to ignore the prompt; missing focus management traps screen reader users.

## Solution
A focused dialog with a clear title naming the action + an explanatory body + two buttons. The destructive button is styled red and labeled with the verb ('Delete project'). Cancel is the default focus.

## Structure
```
    <div class="modal-backdrop" aria-hidden="true"></div>
    <dialog
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="cd-title"
      aria-describedby="cd-desc"
      class="modal"
    >
      <header>
        <h2 id="cd-title">Delete project &ldquo;Atlas&rdquo;?</h2>
      </header>
      <p id="cd-desc">
        This will permanently delete the project, 124 issues, and 3 documents.
        This action cannot be undone.
      </p>
      <label class="confirm-typed">
        Type <code>atlas</code> to confirm
        <input type="text" aria-required="true" />
      </label>
      <footer class="actions">
        <button type="button" autofocus>Cancel</button>
        <button type="button" class="danger" disabled>Delete project</button>
      </footer>
    </dialog>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Open: scrim fades in, dialog scales 0.96 -> 1 + opacity 0 -> 1 over 120ms. Body scroll locks.
- Focus moves to Cancel (the safe default) on open — not the destructive button.
- Esc closes (treated as Cancel); clicking the scrim closes (also Cancel) unless data is staged.
- For irreversible actions, require typing the resource name (e.g., 'Type atlas to confirm') to enable the destructive button.
- Tab cycles within the dialog (focus trap); Shift+Tab from first wraps to last.
- On close, focus returns to the element that opened the dialog.
- Destructive button uses verb-specific label: 'Delete project', not 'OK' or 'Confirm'.

## A11y
- Use `role='alertdialog'` (not `dialog`) for confirmation prompts so assistive tech treats them as urgent.
- Set `aria-labelledby` to the title id and `aria-describedby` to the body id.
- Trap focus inside the dialog while open; do NOT allow Tab to escape to background.
- Initial focus should be on the safe action (Cancel), not the destructive one — protects against accidental Enter.
- Do not rely on color alone for the destructive button — use a verb-specific label.

## Examples
- @community/example-github-delete-repo
- @community/example-linear-delete-issue
- @community/example-stripe-delete-customer

## Label
Confirmation Modal

## Problem
Destructive actions (delete account, drop database, sign out) need a deliberate confirmation step. Generic 'Are you sure?' text trains users to ignore the prompt; missing focus management traps screen reader users.

## Solution
A focused dialog with a clear title naming the action + an explanatory body + two buttons. The destructive button is styled red and labeled with the verb ('Delete project'). Cancel is the default focus.

## Structure
```
    <div class="modal-backdrop" aria-hidden="true"></div>
    <dialog
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="cd-title"
      aria-describedby="cd-desc"
      class="modal"
    >
      <header>
        <h2 id="cd-title">Delete project &ldquo;Atlas&rdquo;?</h2>
      </header>
      <p id="cd-desc">
        This will permanently delete the project, 124 issues, and 3 documents.
        This action cannot be undone.
      </p>
      <label class="confirm-typed">
        Type <code>atlas</code> to confirm
        <input type="text" aria-required="true" />
      </label>
      <footer class="actions">
        <button type="button" autofocus>Cancel</button>
        <button type="button" class="danger" disabled>Delete project</button>
      </footer>
    </dialog>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Open: scrim fades in, dialog scales 0.96 -> 1 + opacity 0 -> 1 over 120ms. Body scroll locks.
- Focus moves to Cancel (the safe default) on open — not the destructive button.
- Esc closes (treated as Cancel); clicking the scrim closes (also Cancel) unless data is staged.
- For irreversible actions, require typing the resource name (e.g., 'Type atlas to confirm') to enable the destructive button.
- Tab cycles within the dialog (focus trap); Shift+Tab from first wraps to last.
- On close, focus returns to the element that opened the dialog.
- Destructive button uses verb-specific label: 'Delete project', not 'OK' or 'Confirm'.

## A11y
- Use `role='alertdialog'` (not `dialog`) for confirmation prompts so assistive tech treats them as urgent.
- Set `aria-labelledby` to the title id and `aria-describedby` to the body id.
- Trap focus inside the dialog while open; do NOT allow Tab to escape to background.
- Initial focus should be on the safe action (Cancel), not the destructive one — protects against accidental Enter.
- Do not rely on color alone for the destructive button — use a verb-specific label.

## Compatible
- @community/pattern-toast-stack
