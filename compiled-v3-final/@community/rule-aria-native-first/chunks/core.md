# AriaNativeFirst [rule] v1.0.0
Use a native HTML element before applying ARIA roles, states, or properties — native semantics are more robust, require less maintenance, and have broader assistive technology support than ARIA overrides (ARIA in HTML spec §2.1 'First Rule of ARIA Use').
domain: frontend-design

## Rule
```
Decision order:
1. Does a native HTML element express this semantics? → Use it. Done.
2. Is the native element stylistically impossible to theme? → Use it + CSS (e.g. <button>/<select> with appearance: none).
3. No native element exists for this pattern (combobox, listbox, tree, grid)? → Build with ARIA roles + full keyboard pattern.
```

## Counter Examples
- @community/counter-example-aria-bandaid
- @community/counter-example-div-button-no-tabindex
- @community/counter-example-div-onclick-dropdown

## Severity
warning

## Verification
Search codebase for role='button' | role='link' | role='checkbox' | role='radio' | role='tab' on non-semantic elements; verify each has no native equivalent.
