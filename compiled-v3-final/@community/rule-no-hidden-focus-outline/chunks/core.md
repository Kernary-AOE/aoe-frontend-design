# NoHiddenFocusOutline [rule] v1.0.0
Focus outlines must not be removed unless an equivalent visible focus indicator with at least 3:1 contrast ratio replaces them — outline:none without a replacement is forbidden.
domain: frontend-design

## Severity
critical

## Forbidden
- * { outline: none } — global suppression
- .btn:focus { outline: 0 } — without a replacement
- a:focus { outline: none } — removes browser default without alternative

## Correct
- .btn:focus-visible { outline: 2px solid oklch(65% 0.2 260); outline-offset: 2px; }
- Using :focus-visible instead of :focus so mouse clicks don't show the ring unnecessarily
