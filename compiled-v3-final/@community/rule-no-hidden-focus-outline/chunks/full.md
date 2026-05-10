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

## Rationale
Keyboard users and switch device users rely entirely on visible focus indicators to know where they are on the page. WCAG 2.1 SC 2.4.7 requires a visible focus indicator; WCAG 2.2 SC 2.4.11 requires minimum focus appearance (3:1 contrast, 2px outline).

## Severity
critical

## Forbidden
- * { outline: none } — global suppression
- .btn:focus { outline: 0 } — without a replacement
- a:focus { outline: none } — removes browser default without alternative

## Correct
- .btn:focus-visible { outline: 2px solid oklch(65% 0.2 260); outline-offset: 2px; }
- Using :focus-visible instead of :focus so mouse clicks don't show the ring unnecessarily
