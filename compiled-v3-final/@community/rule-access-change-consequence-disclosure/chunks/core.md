# AccessChangeConsequenceDisclosure [rule] v1.0.0
> When a user's access level changes (role assignment, permission upgrade or downgrade, account access modification), the UI must display a before/after delta and explicitly label any irreversible consequences before the user confirms.
domain: frontend-design

## Severity
block

## Applies When
Implementing role assignment, permission upgrade or downgrade, or account access modification flows.

## Verify By
Confirm UI shows a summary of what will change and explicitly labels destructive or irreversible effects. An 'Are you sure?' prompt without a change summary is insufficient.
