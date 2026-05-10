# ColorOklchRequired [rule] v1.0.0
All new color declarations in CSS / inline styles MUST use the oklch() color function. Hex (#rrggbb), rgb(), and hsl() are prohibited for new code because they encode color in non-perceptual spaces, making consistent lightness ramps and dark-mode mirroring mathematically painful.
domain: visual-design

## Checks
- [ ] @community/check-color-oklch-required

## Applies To
@community/type-html-artifact

## Severity
medium

## Severity Combination
```
any non-oklch color in author CSS → WARN
any non-oklch color in design tokens → BLOCK
all colors are oklch()             → PASS
```

## Failure Mode
Designers cannot reason about lightness consistency across hues; dark-mode mirroring requires bespoke tweaks per token; the palette drifts perceptually across components.

## Remediation
- Convert hex tokens with @community/transform-rgb-to-oklch — feed the hex, store the oklch().
- Adopt @impeccable/template-oklch-palette as the starting scaffold (12 lightness stops × N hues).
- Add a stylelint rule `color-no-hex` and `color-named: never` plus a custom matcher that requires the `oklch(` token.

## Exceptions
-
  - **Case**: Vendor / third-party CSS
  - **Allowed When**: The CSS is shipped by an external library and not authored by the team; track but do not block.
-
  - **Case**: Color values inside SVG <path fill='...'> imported from a designer asset
  - **Allowed When**: Asset is treated as a binary; flag for follow-up but do not block PR.

## Applies To
@community/type-html-artifact

## Severity
medium

## Validates With
- @impeccable/template-oklch-palette
- @impeccable/template-oklch-dark-mode-cascade

## Severity Combination
```
any non-oklch color in author CSS → WARN
any non-oklch color in design tokens → BLOCK
all colors are oklch()             → PASS
```

## Failure Mode
Designers cannot reason about lightness consistency across hues; dark-mode mirroring requires bespoke tweaks per token; the palette drifts perceptually across components.

## Remediation
- Convert hex tokens with @community/transform-rgb-to-oklch — feed the hex, store the oklch().
- Adopt @impeccable/template-oklch-palette as the starting scaffold (12 lightness stops × N hues).
- Add a stylelint rule `color-no-hex` and `color-named: never` plus a custom matcher that requires the `oklch(` token.

## Exceptions
-
  - **Case**: Vendor / third-party CSS
  - **Allowed When**: The CSS is shipped by an external library and not authored by the team; track but do not block.
-
  - **Case**: Color values inside SVG <path fill='...'> imported from a designer asset
  - **Allowed When**: Asset is treated as a binary; flag for follow-up but do not block PR.

## See Also
- @community/check-color-oklch-required
