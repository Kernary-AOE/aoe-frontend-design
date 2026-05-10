# ButtonHierarchy [category] v1.0.0
The hierarchical grouping of button styles within a UI surface. Hierarchy clarity — which action is the primary, which is alternative, which is optional — is the single most important driver of action discoverability. This category covers the structural rules for composing buttons; @community/taxonomy-cta-styles enumerates the individual styles.
domain: visual-design

## Label
Button / Action Hierarchy

## Parent
@community/category-actions

## Members
- primary
- secondary
- tertiary
- destructive
- ghost

## Composition Rules
-
  - **Rule**: single-primary-per-region
  - **Detail**: At most one primary button visible per logical decision region (modal footer, form actions, page hero CTA). Two primaries split user attention and dilute the call-to-action.
-
  - **Rule**: primary-rightmost-on-desktop
  - **Detail**: On desktop, place primary action to the right of secondary in horizontal action rows (Material, Chrome, macOS conventions). On iOS modals, primary is left and bold (Apple HIG).
-
  - **Rule**: destructive-not-primary
  - **Detail**: Destructive should never visually compete with primary on default view. Reveal destructive only after user-initiated intent (e.g. 'Delete' on a confirmation modal that the user opened).
-
  - **Rule**: tertiary-for-optional
  - **Detail**: Optional/dismissive actions (Cancel, Skip, Maybe later) are tertiary or ghost — never secondary if a primary exists.
-
  - **Rule**: icon-only-needs-label
  - **Detail**: Icon-only buttons require aria-label (see @community/check-aria-label-required) and ideally a tooltip for sighted users.

## Hierarchy Tiers
- **Primary**:
  - **Tier**: 1
  - **Visual Weight**: highest — solid fill, brand color, bold weight
  - **Max Per Region**: 1
  - **Role**: the main action the user came to take
- **Secondary**:
  - **Tier**: 2
  - **Visual Weight**: medium — outlined or low-fill
  - **Max Per Region**: multiple acceptable for equal-weight choices
  - **Role**: alternative or paired action (e.g. Cancel next to Submit)
- **Tertiary**:
  - **Tier**: 3
  - **Visual Weight**: low — text-only or minimal styling
  - **Max Per Region**: many acceptable
  - **Role**: optional, supplementary, or dismissive
- **Destructive**:
  - **Tier**: special
  - **Visual Weight**: high but RED-coded
  - **Max Per Region**: 1
  - **Role**: irreversible negative action; always paired with confirmation
- **Ghost**:
  - **Tier**: special
  - **Visual Weight**: minimal at rest, visible on hover/focus
  - **Max Per Region**: many
  - **Role**: compact toolbar/inline action where space is scarce

## Example Compositions
-
  - **Surface**: Modal footer (form submit)
  - **Buttons**:
    - Cancel (tertiary, left)
    - Submit (primary, right)
-
  - **Surface**: Settings page section
  - **Buttons**:
    - Save changes (primary)
    - Cancel (tertiary)
    - Delete account (destructive, separated visually)
-
  - **Surface**: Marketing hero
  - **Buttons**:
    - Get started free (primary)
    - View demo (secondary)
-
  - **Surface**: Empty state
  - **Buttons**:
    - Add your first item (primary, centered, prominent)
