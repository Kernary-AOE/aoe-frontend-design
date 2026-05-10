# ConsistentDesignTokenScale [rule] v1.0.0
> All spacing, typography, and border-radius values must come from a defined token scale — never ad-hoc numeric literals. Every value in the codebase must be traceable to a named token or scale step.
domain: frontend-design

## Severity
warning

## Applies When
Setting any spacing, font size, line height, or border radius in a UI.

## Verify By
Check that all values reference a CSS custom property, Tailwind class, or named scale step — not raw px/rem literals. A value like `margin: 13px` with no corresponding token is a violation.

## Rationale
Ad-hoc values fragment visual consistency and make systematic changes (increasing density, adjusting scale) require hunting and patching individual values rather than updating a token. The token scale is what makes the design system a system.

## Severity
warning

## Applies When
Setting any spacing, font size, line height, or border radius in a UI.

## Verify By
Check that all values reference a CSS custom property, Tailwind class, or named scale step — not raw px/rem literals. A value like `margin: 13px` with no corresponding token is a violation.
