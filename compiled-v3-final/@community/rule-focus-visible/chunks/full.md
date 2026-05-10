# FocusVisible [rule] v1.0.0
Every keyboard-focusable interactive element MUST present a visible focus indicator that meets WCAG 2.2 SC 2.4.7 (Focus Visible) and SC 2.4.11 (Focus Not Obscured). Authors MUST style `:focus-visible` and MUST NOT remove the indicator with `outline: none` unless a replacement is provided in the same rule block.
domain: accessibility

## Checks
- [ ] @community/check-focus-visible

## Applies To
@community/type-html-artifact

## Severity
critical

## Severity Combination
```
`outline: none` without replacement indicator → BLOCK  (SC 2.4.7)
indicator < 2px or contrast < 3:1             → BLOCK  (SC 2.4.11)
indicator only visible on `:focus` (not `:focus-visible`) → WARN  (mouse users see flicker)
proper :focus-visible style present           → PASS
```

## Failure Mode
Keyboard users (screen-reader users, users with motor impairments, power users on tab-only flows) cannot tell which element will activate on Enter. The artifact fails WCAG Level AA conformance and is unusable without a pointer.

## Remediation
- Replace `*:focus { outline: none }` with `*:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }`.
- Use `:focus-visible` (not `:focus`) so mouse users don't see the ring on click.
- For dark backgrounds, define `--color-focus: oklch(80% 0.18 240)`; for light backgrounds, `oklch(40% 0.18 240)`. Verify ≥ 3:1 against both the element and its background.
- For custom widgets that fake focus (e.g. roving tabindex), apply the same indicator styles to the visually-focused child.

## Exceptions
-
  - **Case**: Programmatically-focused container during route transition
  - **Allowed When**: A `tabindex='-1'` container is given focus to anchor screen readers; suppress the visible ring via `:focus-visible:not([tabindex='-1'])`.

## Applies To
@community/type-html-artifact

## Severity
critical

## Validates With
- @w3c/fact-wcag-focus-contrast
- @w3c/source-wcag-22

## Severity Combination
```
`outline: none` without replacement indicator → BLOCK  (SC 2.4.7)
indicator < 2px or contrast < 3:1             → BLOCK  (SC 2.4.11)
indicator only visible on `:focus` (not `:focus-visible`) → WARN  (mouse users see flicker)
proper :focus-visible style present           → PASS
```

## Failure Mode
Keyboard users (screen-reader users, users with motor impairments, power users on tab-only flows) cannot tell which element will activate on Enter. The artifact fails WCAG Level AA conformance and is unusable without a pointer.

## Remediation
- Replace `*:focus { outline: none }` with `*:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }`.
- Use `:focus-visible` (not `:focus`) so mouse users don't see the ring on click.
- For dark backgrounds, define `--color-focus: oklch(80% 0.18 240)`; for light backgrounds, `oklch(40% 0.18 240)`. Verify ≥ 3:1 against both the element and its background.
- For custom widgets that fake focus (e.g. roving tabindex), apply the same indicator styles to the visually-focused child.

## Exceptions
-
  - **Case**: Programmatically-focused container during route transition
  - **Allowed When**: A `tabindex='-1'` container is given focus to anchor screen readers; suppress the visible ring via `:focus-visible:not([tabindex='-1'])`.
