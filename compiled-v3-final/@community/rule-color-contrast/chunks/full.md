# ColorContrast [rule] v1.0.0
Enforces WCAG 2.2 color contrast requirements across all text and UI component elements in an HTML artifact. Covers SC 1.4.3 (text), SC 1.4.11 (non-text/UI), and SC 2.4.11 (focus ring).
domain: accessibility

## Checks
- [ ] @community/check-contrast-aa
- [ ] @community/check-focus-visible
- [ ] @community/check-contrast-ui

## Applies To
@community/type-html-artifact

## Severity Combination
```
any-check fails with severity=block → rule result: BLOCK
any-check fails with severity=warn  → rule result: WARN
all checks pass                     → rule result: PASS
```

## Remediation
- For text contrast failures: adjust foreground color lightness in oklch() — decrease L for dark-on-light, increase L for light-on-dark — until ratio ≥ 4.5:1.
- For UI component contrast failures: ensure icon/border colors achieve 3:1 against adjacent background.
- For focus ring failures: set `outline-color` to a color that achieves 3:1 against both the component and its background.
- Use @community/transform-rgb-to-oklch + @community/metric-contrast-ratio to calculate and verify ratios.

## Applies To
@community/type-html-artifact

## Severity Combination
```
any-check fails with severity=block → rule result: BLOCK
any-check fails with severity=warn  → rule result: WARN
all checks pass                     → rule result: PASS
```

## Remediation
- For text contrast failures: adjust foreground color lightness in oklch() — decrease L for dark-on-light, increase L for light-on-dark — until ratio ≥ 4.5:1.
- For UI component contrast failures: ensure icon/border colors achieve 3:1 against adjacent background.
- For focus ring failures: set `outline-color` to a color that achieves 3:1 against both the component and its background.
- Use @community/transform-rgb-to-oklch + @community/metric-contrast-ratio to calculate and verify ratios.
