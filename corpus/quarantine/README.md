# Quarantine — units removed from the release set by the L14-A licence audit

102 of the 899 published units are inadmissible under this package's own
declared `license.policy`. They are **moved, not deleted**: the files are in
`quarantine/<reason>/` so a later round can re-admit any unit whose terms get
established. Method, counts and the three-way classification are in
`../../../docs/analysis/corpus-licence-audit.md`.

`primes/` is untouched. Rejection is scoped to *this package's redistribution*;
`primes/` is unpublished, so nothing here bears on deleting from it.

| reason | units | policy basis | re-admissible? |
|---|---:|---|---|
| `gpl-3.0` | 73 | `policy.deny` | No. GPL-3.0 §5 puts the whole conveyed work under GPL-3.0. |
| `cc-by-nc-sa-4.0` | 12 | `policy.deny` | No. Non-commercial + share-alike is incompatible with Apache-2.0 in both directions. |
| `undeclared-provenance` | 17 | `requireDeclared: true` | Yes, once the named upstream's terms are established and recorded. |

## `gpl-3.0` — 73 units

All trace to `github.com/spencergoldade/cursor-designer`, whose legacy atoms declare
`source.license: GPL-3.0` (167 such files in `primes/`). `evidence` names how each was
established: `self` = the v3 unit's own `notes`/`attributed-to` names GPL-3.0 or the repo;
`edge` = the reconciliation manifest maps it to a GPL-3.0 legacy unit; `slug` = a direct
kind-stripped slug match to one. Any single signal is sufficient; most carry two or three.

| unit | evidence |
|---|---|
| `@community/anti-pattern-cherry-picking-evidence` | slug |
| `@community/anti-pattern-cramped-ui` | slug |
| `@community/anti-pattern-deep-branching-nav` | edge |
| `@community/anti-pattern-icon-only-expansion-triggers` | edge |
| `@community/anti-pattern-multi-change-experiment` | slug |
| `@community/anti-pattern-vanity-metrics` | slug |
| `@community/constraint-no-account-existence-disclosure` | edge+slug |
| `@community/constraint-three-viewport-breakpoints` | edge |
| `@community/fact-component-anatomy-three-layers` | edge+slug |
| `@community/fact-required-interaction-states` | self+edge+slug |
| `@community/fact-visibility-system-status` | edge |
| `@community/method-design-qa-pre-ship` | edge |
| `@community/method-research-finding-structure` | self |
| `@community/method-rule-authoring-checklist` | self+edge+slug |
| `@community/pattern-enterprise-global-frame` | self+edge |
| `@community/pattern-multi-step-flow-feedback` | edge |
| `@community/pattern-ux-experiment-hypothesis` | edge |
| `@community/principle-clear-user-mental-model` | edge+slug |
| `@community/principle-consistent-cross-platform-mental-models` | edge+slug |
| `@community/principle-error-prevention-and-recovery` | edge+slug |
| `@community/principle-navigation-scope-taxonomy` | edge+slug |
| `@community/principle-security-copy` | self+slug |
| `@community/principle-tone-calibration` | self |
| `@community/principle-visual-hierarchy-action-distinction` | edge+slug |
| `@community/rule-access-change-consequence-disclosure` | edge+slug |
| `@community/rule-active-voice-in-ui-copy` | edge+slug |
| `@community/rule-auth-flow-reversibility` | edge+slug |
| `@community/rule-collapse-multi-column-mobile` | edge |
| `@community/rule-composable-layout-primitives` | edge+slug |
| `@community/rule-consistent-design-token-scale` | edge+slug |
| `@community/rule-consistent-form-action-placement` | edge+slug |
| `@community/rule-consistent-product-terminology` | edge+slug |
| `@community/rule-cross-platform-accessibility-parity` | edge+slug |
| `@community/rule-cross-platform-flow-step-consistency` | edge+slug |
| `@community/rule-cross-platform-handoff-points` | edge+slug |
| `@community/rule-culturally-neutral-copy` | edge+slug |
| `@community/rule-current-location-indicator` | edge+slug |
| `@community/rule-custom-component-aria-role` | edge+slug |
| `@community/rule-design-decisions-cite-research` | edge+slug |
| `@community/rule-design-qa-definition-of-done` | edge+slug |
| `@community/rule-destructive-action-differentiation` | edge+slug |
| `@community/rule-explicit-trade-off-disclosure` | edge+slug |
| `@community/rule-flow-ordering-mental-model` | edge |
| `@community/rule-group-related-form-fields` | edge+slug |
| `@community/rule-heading-hierarchy-logical` | edge |
| `@community/rule-ia-group-by-user-tasks-not-org` | edge+slug |
| `@community/rule-no-aria-patching-native` | edge |
| `@community/rule-no-fixed-widths-narrow` | edge |
| `@community/rule-no-heavy-shadows-per-component` | edge |
| `@community/rule-no-hidden-focus-outline` | edge+slug |
| `@community/rule-no-keyboard-trap` | edge |
| `@community/rule-no-pointer-only-components` | edge |
| `@community/rule-no-shipping-a11y-violations` | edge |
| `@community/rule-no-silent-a11y-sacrifice` | edge+slug |
| `@community/rule-no-undocumented-platform-concept-rename` | edge+slug |
| `@community/rule-no-uniform-spacing-without-headings` | edge+slug |
| `@community/rule-permissions-human-readable` | edge+slug |
| `@community/rule-preserve-user-input-on-error` | edge+slug |
| `@community/rule-prioritize-critical-errors-first` | self+edge+slug |
| `@community/rule-progress-feedback-long-operations` | self+edge |
| `@community/rule-propose-starter-tokens` | self |
| `@community/rule-reading-order-matches-visual-order` | self+edge+slug |
| `@community/rule-screen-reader-friendly-copy` | self+edge+slug |
| `@community/rule-semantic-html-for-interactive-elements` | self+edge+slug |
| `@community/rule-semantic-structure-over-visual-positioning` | self+edge+slug |
| `@community/rule-single-primary-action-per-component` | edge+slug |
| `@community/rule-single-primary-action-per-screen` | edge+slug |
| `@community/rule-success-confirmation-visual-change` | edge |
| `@community/rule-success-message-next-step` | edge+slug |
| `@community/rule-suspicious-activity-next-step` | edge |
| `@community/rule-ux-flow-task-completion` | edge+slug |
| `@community/rule-verb-based-cta-labels` | edge+slug |
| `@community/rule-wcag-aa-default-target` | edge+slug |

## `cc-by-nc-sa-4.0` — 12 units

Recovered from the legacy counterpart's `source.license`.

| unit | evidence |
|---|---|
| `@community/fact-aesthetic-usability-effect` | edge+slug |
| `@community/fact-doherty-threshold` | edge+slug |
| `@community/fact-fitts-law` | edge+slug |
| `@community/fact-goal-gradient-effect` | edge+slug |
| `@community/fact-hick-law` | edge |
| `@community/fact-jakob-law` | edge |
| `@community/fact-occams-razor` | edge+slug |
| `@community/fact-pareto-principle` | edge+slug |
| `@community/fact-peak-end-rule` | edge+slug |
| `@community/fact-postel-law` | edge |
| `@community/fact-tesler-law` | edge |
| `@community/fact-zeigarnik-effect` | edge+slug |

## `undeclared-provenance` — 17 units

Each names an upstream **code repository** in its own text and records no terms. These
are the only population for which `unknown` is the honest answer: something indicates an
upstream, and nothing establishes the licence. Listed with the repo each one names.

| unit | upstream named |
|---|---|
| `@community/check-secrets-not-in-git` | github.com/gitleaks/gitleaks |
| `@community/constraint-section-spacing` | github.com/Blazity/next-saas-starter, github.com/cruip/open-react-template, github.com/leoMirandaa/shadcn-landing-page |
| `@community/pattern-dashboard-layout` | github.com/arhamkhnz/next-shadcn-admin-dashboard |
| `@community/pattern-features-grid` | github.com/Blazity/next-saas-starter, github.com/cruip/open-react-template, github.com/leoMirandaa/shadcn-landing-page |
| `@community/pattern-hero-3-layouts` | github.com/Blazity/next-saas-starter, github.com/cruip/open-react-template, github.com/leoMirandaa/shadcn-landing-page |
| `@community/pattern-landing-footer` | github.com/Blazity/next-saas-starter, github.com/cruip/open-react-template, github.com/leoMirandaa/shadcn-landing-page |
| `@community/pattern-landing-navigation` | github.com/Blazity/next-saas-starter, github.com/cruip/open-react-template, github.com/leoMirandaa/shadcn-landing-page |
| `@community/pattern-pricing-section` | github.com/Blazity/next-saas-starter, github.com/cruip/open-react-template, github.com/leoMirandaa/shadcn-landing-page |
| `@community/pattern-testimonials-section` | github.com/Blazity/next-saas-starter, github.com/cruip/open-react-template, github.com/leoMirandaa/shadcn-landing-page |
| `@community/principle-landing-page-sections` | github.com/Blazity/next-saas-starter, github.com/cruip/open-react-template, github.com/leoMirandaa/shadcn-landing-page |
| `@community/principle-train-serve-skew` | Google, 'Rules of Machine Learning: Best Practices for ML Engineering' (Martin Zinkevich,  |
| `@community/rule-chart-never-alone` | github.com/bitjaru/styleseed |
| `@community/rule-kpi-card-secondary-variation` | github.com/bitjaru/styleseed |
| `@community/rule-number-unit-ratio` | github.com/bitjaru/styleseed |
| `@community/rule-pill-toggle-no-dropdowns-in-cards` | github.com/bitjaru/styleseed |
| `@community/rule-uppercase-labels-tracking` | github.com/bitjaru/styleseed |
| `@community/rule-whisper-shadows` | github.com/bitjaru/styleseed |

