# SuccessConfirmationVisualChange [rule] v1.0.0
> After any create, update, delete, or submit action completes successfully, confirm what changed with explicit language and a corresponding visible UI update — a toast alone is insufficient if the affected element is in view.
domain: frontend-design

## Severity
warning

## Applies When
any create, update, delete, or submit action completes successfully

## Verify By
Confirm that (1) a message names the completed action, and (2) the affected UI element reflects the change visually (updated list item, changed button state, new badge, removed row).

## Examples
- Saving a profile: 'Profile updated' toast + input fields briefly flash a success ring + Save button returns to idle state.
- Deleting a task: row animates out + 'Task deleted. Undo' toast appears + item count badge decrements.
- Publishing a post: button label changes to 'Published' with a checkmark + status badge updates inline.
- Bad: Submit button spins → stops → nothing changes visually → bare 'Done' toast appears. User unsure if the save took.

## Rationale
Without explicit confirmation, users may repeat an action or doubt it occurred. Bare 'Saved' toasts without visual change in the affected area create uncertainty — users re-check, re-click, or lose trust in the system state.

## Severity
warning

## Applies When
any create, update, delete, or submit action completes successfully

## Verify By
Confirm that (1) a message names the completed action, and (2) the affected UI element reflects the change visually (updated list item, changed button state, new badge, removed row).
