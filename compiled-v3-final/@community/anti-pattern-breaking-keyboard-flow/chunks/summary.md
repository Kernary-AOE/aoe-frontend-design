# BreakingKeyboardFlow [anti-pattern] v1.0.0
Re-implementing a `<button>`, `<a>`, `<input>`, or `<select>` as a custom `<div>` for styling reasons, without restoring the native keyboard semantics. The `<div onClick>` is unreachable by Tab, doesn't activate on Enter or Space, doesn't have a role, and isn't announced as interactive by screen readers. Tab order silently skips the entire control.
domain: accessibility
