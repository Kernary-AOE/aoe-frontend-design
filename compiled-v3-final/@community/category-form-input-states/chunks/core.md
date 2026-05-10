# FormInputStates [category] v1.0.0
The visual states an input control passes through during user interaction. A complete form-input system specifies the visual treatment for each state and the transitions between them. Incomplete state coverage (e.g. missing focus state, no disabled affordance) is a recurring source of confusion and accessibility regressions.
domain: visual-design

## Label
Form / Input States

## Parent
@community/category-forms

## Members
- default
- hover
- focus
- focus-visible
- active
- filled
- disabled
- readonly
- error
- warning
- success
- loading

## State Rules
- **Default**:
  - **Visual**: neutral border (1px), neutral background, placeholder text optional
  - **A11y**: label MUST be associated via for/id or wrapping <label>
- **Hover**:
  - **Visual**: border darkens by ~10% lightness; subtle bg tint optional
  - **Caveat**: Touch devices have no hover — never rely on it for affordance discovery
- **Focus Visible**:
  - **Visual**: 2px outline at 2px offset (see @community/value-focus-outline-width); brand-colored ring; box-shadow alternative for rounded corners
  - **A11y**: REQUIRED. WCAG 2.4.7 Focus Visible (AA) — see @community/term-focus-ring
- **Filled**:
  - **Visual**: label may shift to a smaller floating-label position; chevron/clear-button may appear
  - **Caveat**: Floating labels MUST remain readable against the input background; do not hide the label entirely
- **Disabled**:
  - **Visual**: reduced opacity (~50–60%), neutral grayscale, no border emphasis
  - **A11y**: Use disabled attribute on form controls (removes from tab order). For aria-disabled='true' (still in tab order), provide context.
  - **Contrast**: Disabled text contrast may go below 4.5:1 (WCAG SC 1.4.3 exception for disabled controls), but ≥3:1 is recommended for legibility
- **Readonly**:
  - **Visual**: subtly de-emphasized but DIFFERENT from disabled (e.g. no border, normal text color)
  - **A11y**: readonly attribute keeps element in tab order and copyable; disabled does not
- **Error**:
  - **Visual**: red/destructive-colored border; error icon; inline error text directly below input
  - **A11y**: aria-invalid='true' + aria-describedby pointing to error message id (see @community/step-validate-required-fields)
  - **Caveat**: Color-only error indication violates SC 1.4.1; pair with icon and text
- **Warning**:
  - **Visual**: amber-colored border or icon; soft helper text
  - **Use Case**: weak password, deprecated value, recommended-not-required field issue
- **Success**:
  - **Visual**: green checkmark icon (post-validation); subtle border tint
  - **Caveat**: Avoid permanent green borders — too visually noisy; use for transient confirmation
- **Loading**:
  - **Visual**: spinner adjacent to or inside the input; disabled while loading
  - **A11y**: aria-busy='true'; aria-live region announces status
