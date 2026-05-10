# NielsenErrorPrevention [principle] v1.0.0
Nielsen Heuristic 5: careful design that prevents problems from occurring is better than good error messages; eliminate error-prone conditions or present confirmation before commitment.
> Even better than good error messages is a careful design which prevents a problem from occurring in the first place. Either eliminate error-prone conditions or check for them and present users with a confirmation option before they commit to the action.
domain: ux-design

## Attributed To
Jakob Nielsen, 1994

## Applies To
- form validation: inline constraints shown before submission
- destructive actions: confirmation gates for irreversible operations
- date/time input: constrained pickers rather than free-text fields
- file operations: warnings before overwriting existing files
- data entry: input masking, character limits, and format hints visible upfront
- navigation: warning before leaving a page with unsaved changes

## Counter Examples
- A 'Delete All' button placed adjacent to 'Save All' with the same visual weight — no spacing, color, or confirmation separating a safe from a catastrophic action.
- A form that accepts any date string in a free-text field and only surfaces a parse error after submission.
- An admin panel where bulk-sending emails is a single click with no preview or confirmation step — wrong audience selections can't be recalled.
