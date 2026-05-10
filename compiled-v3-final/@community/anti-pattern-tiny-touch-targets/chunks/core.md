# TinyTouchTargets [anti-pattern] v1.0.0
Buttons, icon links, and tap targets sized below the WCAG 2.2 AA minimum of 24×24 CSS pixels — typically 16×16 or 20×20 icon-only buttons. On mobile devices, users tap the wrong target, hit two adjacent items at once, or fail to register the tap entirely. The thumb-tip averages ~8mm; targets below 24px require precision the device cannot provide.
domain: accessibility

## Label
Sub-24px Touch Targets On Mobile

## Trap
Designers size icons, not targets. A 16px icon visually 'looks like' a 16px button — and on a high-DPI desktop display with a precision mouse, that works fine. On a phone with a finger, it fails. Engineers translate the 16px icon into a 16×16 button without padding, mirroring the design literally.

## Counter Examples
- @community/counter-example-icon-button-24px

## Detection Heuristics
- Icon-only `<button>` has no padding and contains a 16×16 or 20×20 icon — total hit area below 24×24
- Tap target on a mobile breakpoint measures less than 24×24 CSS px (axe-core, Lighthouse target-size rule)
- Adjacent links/buttons in a list are spaced less than 8px apart with hit areas less than 44×44
- Close (×) button on a modal is 16×16 — common offender
- Pagination numbers, social share icons, table row actions sized purely to the icon glyph
- Footer link list with line-height equal to font size — vertical hit area too short

## Remediation
- Set `min-width: 44px; min-height: 44px;` on all interactive elements on mobile (Apple HIG / Material 3 recommended).
- Minimum WCAG 2.2 SC 2.5.8: 24×24 CSS px hit area. Use 44×44 for comfort.
- Icon buttons: keep the 16×16 SVG but wrap with padding to reach 44×44 (`padding: 14px;`).
- Adjacent targets: ensure at least 8px gap so the 24×24 'AND spacing' rule of SC 2.5.8 is satisfied.
- Use @community/metric-target-size for the canonical thresholds.
- Test on a real device, not just devtools — finger imprecision differs from cursor.

## Severity
high
