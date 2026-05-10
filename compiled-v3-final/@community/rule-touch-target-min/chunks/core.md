# TouchTargetMin [rule] v1.0.0
All interactive targets (buttons, links, form controls, custom widgets) on touch surfaces MUST present a hit area of at least 44×44 CSS pixels, per Apple Human Interface Guidelines and WCAG 2.2 SC 2.5.8 (Target Size, Minimum: 24×24).
domain: accessibility

## Checks
- [ ] @community/check-touch-target-min

## Applies To
@community/type-html-artifact

## Severity
high

## Severity Combination
```
interactive element < 24×24 CSS px (WCAG AA fail)             → BLOCK
interactive element 24×24 to 44×44 CSS px (HIG miss, WCAG ok) → WARN
interactive element ≥ 44×44 CSS px                            → PASS
```

## Failure Mode
Users mis-tap adjacent controls; mobile error rates spike; users with motor impairment are excluded; older users abandon. WCAG 2.2 SC 2.5.8 fails Level AA conformance.

## Remediation
- Add `min-height: 44px; min-width: 44px;` to the button base style — visual size can stay smaller via inner padding.
- For icon-only buttons, expand the hit-area with `padding: 12px` (yielding 24+padding ≥ 44).
- For inline links inside dense text, ensure ≥ 24×24 by using `padding: 0.25em 0` and adequate line-height.
- For custom widgets, wrap the visual icon in a `<button>` with `display: inline-flex; align-items: center; justify-content: center;` and a 44px box.

## Exceptions
-
  - **Case**: Inline text link
  - **Allowed When**: The control is a link inside a paragraph; WCAG 2.2 explicitly exempts inline links provided 24×24 is met.
-
  - **Case**: Equivalent control adjacent
  - **Allowed When**: A small target has a same-action sibling control ≥ 44px (e.g. tiny X close + large 'Cancel' button).
-
  - **Case**: User-agent default control
  - **Allowed When**: A native `<select>` arrow or scrollbar is sized by the platform.
