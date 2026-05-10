# ErrorPreventionAndRecovery [principle] v1.0.0
> Interfaces should prevent mistakes by design first (constraints, confirmation, input validation) and provide clear, actionable recovery paths when errors do occur anyway. Prevention is cheaper than correction, but recovery preserves user confidence when prevention fails.
domain: frontend-design

## Implications
- Prevent errors: constrain inputs to valid values, disable actions that would produce errors, show inline validation before form submission.
- Recover from errors: show specific error messages naming the problem and the fix (@community/rule-actionable-error-messages).
- Never blame the user: 'Invalid input' is a prevention failure dressed as a user mistake.
- Destructive actions require confirmation dialogs that name the specific destructive consequence.

## Sources

## Rationale
Errors disrupt flow and erode trust. Every error that reaches a user represents either a prevention failure (the design allowed an impossible input) or a recovery failure (the error message didn't help the user correct the situation). Both are design failures — not user failures.

## Source
- Nielsen Norman Group — Heuristic #5 Error Prevention and #9 Help Users Recognize, Diagnose, and Recover
