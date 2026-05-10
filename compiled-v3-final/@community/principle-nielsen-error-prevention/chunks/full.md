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

## Sources

## Examples
- Google Forms disables the Submit button and highlights incomplete required fields in real time — users see what is missing before attempting submission.
- GitHub's repository delete flow requires typing the repository name to confirm — the friction is proportional to the severity of the irreversible action.
- Figma's date/time fields use constrained pickers, not free-text, eliminating the entire class of format-parsing errors.

## Source
- Jakob Nielsen, 'Heuristic Evaluation', in Nielsen & Mack (eds.), Usability Inspection Methods (1994)
- https://www.nngroup.com/articles/ten-usability-heuristics/
