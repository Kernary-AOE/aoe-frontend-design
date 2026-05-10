# NoUndocumentedPlatformConceptRename [rule] v1.0.0
Core feature and concept names must not differ between platforms unless the renaming decision is explicitly documented and justified in a design decision record.
domain: frontend-design

## Severity
warning

## Process
- Before renaming a concept: create a decision record noting the old name, new name, rationale, and affected surfaces.
- If the rename is platform-specific (not global), document why the platform requires a different term.
- Cross-link the decision record from the platform-specific component or screen spec.

## Exceptions
-
  - **Case**: Platform UI convention that has a native term
  - **Allowed When**: e.g. iOS calls the navigation component a 'navigation bar' — using that in iOS specs is correct even if web calls it 'top nav'. The underlying concept is the same; only the component name follows platform convention.

## Rationale
Undocumented renames create silent inconsistency: future designers and engineers building new features will use different names in different contexts, compounding the divergence. Documentation forces intentionality.

## Severity
warning

## Process
- Before renaming a concept: create a decision record noting the old name, new name, rationale, and affected surfaces.
- If the rename is platform-specific (not global), document why the platform requires a different term.
- Cross-link the decision record from the platform-specific component or screen spec.

## Exceptions
-
  - **Case**: Platform UI convention that has a native term
  - **Allowed When**: e.g. iOS calls the navigation component a 'navigation bar' — using that in iOS specs is correct even if web calls it 'top nav'. The underlying concept is the same; only the component name follows platform convention.
