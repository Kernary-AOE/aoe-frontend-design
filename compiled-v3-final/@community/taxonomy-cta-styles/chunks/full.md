# CtaStyles [taxonomy] v1.0.0
A taxonomy of button styles by hierarchy and intent. Distinct visual treatments are how a UI signals which action is primary, secondary, optional, or destructive. Conflating these styles (e.g. two primary buttons in one view) is the most common cause of weak action hierarchy.
domain: visual-design

## Label
Call-To-Action (Button) Style Hierarchy

## Members
- primary
- secondary
- tertiary
- ghost
- link
- destructive
- destructive-secondary
- icon-only

## Styles
- **Primary**:
  - **Purpose**: The single most important action on a view — submit, continue, save, sign-up.
  - **Visual**: Solid filled background with brand color; high-contrast text; bold weight.
  - **Density Rule**: AT MOST ONE primary button visible per logical action region.
  - **Example Tokens**: bg: var(--color-brand-500); color: var(--color-on-brand); border: none; weight: 500–600
- **Secondary**:
  - **Purpose**: Important alternative action that pairs with primary — cancel, back, learn more.
  - **Visual**: Outlined or low-fill background; brand-colored or neutral text.
  - **Density Rule**: Typically paired with primary; multiple secondaries acceptable for equal-weight options.
  - **Example Tokens**: bg: transparent; border: 1px solid var(--color-border); color: var(--color-text-primary)
- **Tertiary**:
  - **Purpose**: Optional or low-priority action — view details, see all, dismiss.
  - **Visual**: No background, no border; brand-colored text with subtle hover.
  - **Example Tokens**: bg: transparent; border: none; color: var(--color-text-secondary)
- **Ghost**:
  - **Purpose**: Inline action that should recede until hovered/focused — header utility actions, table row actions.
  - **Visual**: Transparent background and border; only text or icon visible at rest; subtle bg on hover.
  - **Notes**: Often used for icon-only buttons where the icon must be discoverable but not visually heavy.
- **Link**:
  - **Purpose**: Inline navigational action that looks like text — 'Learn more', 'Read the docs'.
  - **Visual**: Brand-colored text with optional underline; same line-height as surrounding copy.
  - **A11y**: Use <a href=> for navigation; use <button> for action that does not change URL. NEVER style a div as a link.
- **Destructive**:
  - **Purpose**: Irreversible negative action — delete, remove, unsubscribe.
  - **Visual**: Solid red/error fill; white text; bold weight.
  - **Density Rule**: Pair with confirmation dialog (see @community/principle-error-prevention-and-recovery). Never make destructive primary on default view; require user-initiated reveal.
  - **Example Tokens**: bg: var(--color-destructive-500); color: white; weight: 500
- **Destructive Secondary**:
  - **Purpose**: Cancel button on a destructive confirmation modal — softer than primary destructive but distinguishable.
  - **Visual**: Outlined red border, red text on transparent bg.
- **Icon Only**:
  - **Purpose**: Compact action where space is constrained — toolbar, table row, header utility.
  - **Visual**: Icon only, optional bg on hover. MUST have aria-label and tooltip.
  - **A11y**: min 44×44 touch target (see @community/value-touch-target-min); aria-label required (see @community/check-aria-label-required).

## Invariants
- Within a single decision point (modal footer, form actions row), there must be exactly ONE primary button.
- Destructive primary must never be the visually-emphasized default action — use destructive style only AFTER user explicitly initiates the destructive flow.
- Link buttons (<button> styled as link) must NOT navigate; use <a href> for navigation. Use the link style for in-flow text actions only.
- All button styles must satisfy WCAG 2.2 AA contrast at default, hover, focus, active, and disabled states (4.5:1 text, 3:1 non-text UI).

## Label
Call-To-Action (Button) Style Hierarchy

## Members
- primary
- secondary
- tertiary
- ghost
- link
- destructive
- destructive-secondary
- icon-only

## Styles
- **Primary**:
  - **Purpose**: The single most important action on a view — submit, continue, save, sign-up.
  - **Visual**: Solid filled background with brand color; high-contrast text; bold weight.
  - **Density Rule**: AT MOST ONE primary button visible per logical action region.
  - **Example Tokens**: bg: var(--color-brand-500); color: var(--color-on-brand); border: none; weight: 500–600
- **Secondary**:
  - **Purpose**: Important alternative action that pairs with primary — cancel, back, learn more.
  - **Visual**: Outlined or low-fill background; brand-colored or neutral text.
  - **Density Rule**: Typically paired with primary; multiple secondaries acceptable for equal-weight options.
  - **Example Tokens**: bg: transparent; border: 1px solid var(--color-border); color: var(--color-text-primary)
- **Tertiary**:
  - **Purpose**: Optional or low-priority action — view details, see all, dismiss.
  - **Visual**: No background, no border; brand-colored text with subtle hover.
  - **Example Tokens**: bg: transparent; border: none; color: var(--color-text-secondary)
- **Ghost**:
  - **Purpose**: Inline action that should recede until hovered/focused — header utility actions, table row actions.
  - **Visual**: Transparent background and border; only text or icon visible at rest; subtle bg on hover.
  - **Notes**: Often used for icon-only buttons where the icon must be discoverable but not visually heavy.
- **Link**:
  - **Purpose**: Inline navigational action that looks like text — 'Learn more', 'Read the docs'.
  - **Visual**: Brand-colored text with optional underline; same line-height as surrounding copy.
  - **A11y**: Use <a href=> for navigation; use <button> for action that does not change URL. NEVER style a div as a link.
- **Destructive**:
  - **Purpose**: Irreversible negative action — delete, remove, unsubscribe.
  - **Visual**: Solid red/error fill; white text; bold weight.
  - **Density Rule**: Pair with confirmation dialog (see @community/principle-error-prevention-and-recovery). Never make destructive primary on default view; require user-initiated reveal.
  - **Example Tokens**: bg: var(--color-destructive-500); color: white; weight: 500
- **Destructive Secondary**:
  - **Purpose**: Cancel button on a destructive confirmation modal — softer than primary destructive but distinguishable.
  - **Visual**: Outlined red border, red text on transparent bg.
- **Icon Only**:
  - **Purpose**: Compact action where space is constrained — toolbar, table row, header utility.
  - **Visual**: Icon only, optional bg on hover. MUST have aria-label and tooltip.
  - **A11y**: min 44×44 touch target (see @community/value-touch-target-min); aria-label required (see @community/check-aria-label-required).

## Invariants
- Within a single decision point (modal footer, form actions row), there must be exactly ONE primary button.
- Destructive primary must never be the visually-emphasized default action — use destructive style only AFTER user explicitly initiates the destructive flow.
- Link buttons (<button> styled as link) must NOT navigate; use <a href> for navigation. Use the link style for in-flow text actions only.
- All button styles must satisfy WCAG 2.2 AA contrast at default, hover, focus, active, and disabled states (4.5:1 text, 3:1 non-text UI).
