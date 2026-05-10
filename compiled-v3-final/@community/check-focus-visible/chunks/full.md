# FocusVisible [check] v1.0.0
Checks that a keyboard-focusable element renders a visible, WCAG-compliant focus indicator when it receives keyboard focus. Verifies: (1) outline is not suppressed, (2) outline is at least 2px wide, (3) outline color achieves 3:1 contrast against adjacent background.
domain: accessibility

signature: (element: DOMElement) -> bool
predicate: computedStyle(element, ':focus-visible').outlineStyle != 'none'
AND computedStyle(element, ':focus-visible').outlineWidth >= 2
AND wcag-contrast-ratio(outlineColor, adjacentColor) >= 3.0

## Evidence
@w3c/fact-wcag-focus-contrast

## Uses Metric
@community/metric-contrast-ratio

## Severity
block

## Failure Message
Element '{element.selector}' has no visible focus indicator or indicator fails contrast. Computed outline: {outline_value}. Add `:focus-visible { outline: 2px solid <accessible-color>; outline-offset: 2px; }`.

## Evaluation Method
automated + manual

## Evidence
@w3c/fact-wcag-focus-contrast

## Uses Metric
@community/metric-contrast-ratio

## Severity
block

## Failure Message
Element '{element.selector}' has no visible focus indicator or indicator fails contrast. Computed outline: {outline_value}. Add `:focus-visible { outline: 2px solid <accessible-color>; outline-offset: 2px; }`.

## Evaluation Method
automated + manual

## See Also
- @community/rule-focus-visible
