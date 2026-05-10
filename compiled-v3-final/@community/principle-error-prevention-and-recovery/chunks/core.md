# ErrorPreventionAndRecovery [principle] v1.0.0
> Interfaces should prevent mistakes by design first (constraints, confirmation, input validation) and provide clear, actionable recovery paths when errors do occur anyway. Prevention is cheaper than correction, but recovery preserves user confidence when prevention fails.
domain: frontend-design

## Implications
- Prevent errors: constrain inputs to valid values, disable actions that would produce errors, show inline validation before form submission.
- Recover from errors: show specific error messages naming the problem and the fix (@community/rule-actionable-error-messages).
- Never blame the user: 'Invalid input' is a prevention failure dressed as a user mistake.
- Destructive actions require confirmation dialogs that name the specific destructive consequence.
