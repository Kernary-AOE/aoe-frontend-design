# ConsistentFormActionPlacement [rule] v1.0.0
Primary and secondary form actions (submit, cancel, back) must use clear, consistent labels and be placed in a predictable position throughout a product, so users build reliable spatial memory for action buttons.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
warning

## Placement Convention
- **Desktop**: Primary action right-aligned in the form footer; secondary (Cancel/Back) to its left.
- **Mobile**: Primary action full-width; secondary as a text link below or styled as a secondary button.
- **Multi Step**: Back left, Continue/Next right — consistent across all steps.

## Label Rules
- Use verb + noun: 'Save changes', 'Create account', 'Place order', 'Send message'.
- Never use 'Submit', 'OK', 'Confirm' without a noun clarifying what is being confirmed.
- Destructive actions (Delete, Remove) must use a distinct color (error/red tone) and a confirmation step.
- On the final step of a wizard, change 'Continue' to the final action label: 'Create workspace'.
