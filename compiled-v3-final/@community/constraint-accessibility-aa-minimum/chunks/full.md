# AccessibilityAaMinimum [constraint] v1.0.0
Every shipped page must meet WCAG 2.2 Level AA at minimum. Internal tools, prototypes, and feature flags do not relax this requirement once exposed to end users.
domain: accessibility

## Target
- all production-grade pages
- shipped product UI
- marketing pages on a public domain

## Severity
critical

## Values
-
  - **Criterion**: 1.4.3 Contrast (Minimum)
  - **Threshold**: 4.5:1 normal text / 3:1 large text
-
  - **Criterion**: 1.4.11 Non-text Contrast
  - **Threshold**: 3:1 for UI components and graphical objects
-
  - **Criterion**: 2.1.1 Keyboard
  - **Threshold**: all functionality operable from keyboard
-
  - **Criterion**: 2.4.7 Focus Visible
  - **Threshold**: visible focus indicator on every interactive element
-
  - **Criterion**: 2.4.11 Focus Not Obscured (Minimum)
  - **Threshold**: focused element not entirely hidden by sticky elements
-
  - **Criterion**: 1.3.1 Info and Relationships
  - **Threshold**: semantic markup conveys structure
-
  - **Criterion**: 4.1.2 Name, Role, Value
  - **Threshold**: every control has accessible name + role

## Exceptions
- Decorative imagery (alt-text exempt).
- Logotypes (exempt from contrast).
- Disabled controls (exempt from 1.4.11 contrast).
- Pre-release prototypes behind authenticated test flags with no end-user exposure.

## Approved Alternatives
- Aim AAA where reading-heavy (long-form prose, documentation).
- Pair @community/rule-color-contrast + @community/rule-keyboard-accessible + @community/check-focus-visible as a baseline gate.
- Run @community/tool-axe-core and @community/tool-lighthouse in CI.

## Enforcement
CI: axe-core + Lighthouse a11y score ≥ 95 as PR-blocking. Manual: keyboard-only walkthrough on every new page. Quarterly: full WCAG 2.2 AA audit.

## Rationale
WCAG AA is the de-facto legal floor in the EU (EAA 2025), the US (DOJ 2024 Title II rule), and most procurement processes. Below AA the product is liable, unusable for ~15% of the population, and demonstrably worse for everyone (low-light contexts, glare, ageing eyes). AAA is aspirational; AA is the floor.
