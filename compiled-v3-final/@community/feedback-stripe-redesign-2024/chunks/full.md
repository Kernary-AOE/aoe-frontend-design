# StripeRedesign2024 [feedback] v1.0.0
Post-hoc analysis of Stripe's late-2023/2024 dashboard and marketing-site refresh. Stripe has long been an industry benchmark for fintech UI; this redesign tightened density, introduced a softer brand palette, modernized typography, and rebuilt the navigation taxonomy. Lessons distilled from publicly-shipped surfaces (dashboard.stripe.com, stripe.com, docs.stripe.com).
domain: frontend-design

## Target
@community/example-stripe-dashboard

## Observations
- **Sample Size**: 1
- **Period**: 2023-Q4 to 2024-Q4
- **Success Rate**: 0.88
- **Wins**:
  -
    - **Area**: typography hierarchy
    - **Observation**: moved to a tighter scale (1.25 ratio) with clearer weight contrast — 400 body / 500 emphasis / 600 headings. Eliminated the prior 700 hero weight.
    - **Impact**: improved scan-ability of dashboard tables; reduced visual noise on settings pages
  -
    - **Area**: color system
    - **Observation**: shifted from a single brand-purple to a calibrated multi-hue palette (purple for primary, green for success, amber for warning, red for destructive) with consistent oklch lightness steps
    - **Impact**: clearer affordance signaling; better dark-mode parity
  -
    - **Area**: navigation
    - **Observation**: primary nav reduced from 8 top-level items to 5; secondary nav uses progressive disclosure
    - **Impact**: first-time-user task completion improved on dashboard
- **Common Failures**:
  -
    - **Step**: dark-mode rollout cadence
    - **Failure**: dark mode rolled out on dashboard before docs site, creating inconsistency for users moving between surfaces
    - **Frequency**: 1
    - **Impact**: visible flash-of-light-content for users with system dark preference visiting docs after dashboard
    - **Mitigation**: ship dark mode atomically across all customer-facing surfaces, or scope it explicitly per surface and announce
  -
    - **Step**: typography migration
    - **Failure**: third-party embeds (Stripe.js Checkout) lagged the host site's typography upgrade by 2+ months
    - **Frequency**: 1
    - **Impact**: visual mismatch when Checkout iframes were embedded in upgraded merchant sites
    - **Mitigation**: version embed assets and ship updates synchronously with host-site changes
- **Confidence Adjustments**:
  - **@Community/Principle Color System Foundation**: 0.95
  - **@Community/Principle Typography Hierarchy**: 0.92
  - **@Community/Fact Fintech Number Display**: 0.9

## Ai Confidence
0.78

## Lessons
- Multi-hue semantic palettes outperform single-brand-color extensions for dashboards rich in status states.
- Reducing top-level nav items beats adding more — Hick's Law applies even to expert audiences (see @community/fact-hick-law).
- Cross-surface consistency (marketing ↔ docs ↔ dashboard) requires coordinated release, not just shared tokens.
- Numeric-heavy fintech UIs benefit from tabular-figures and right-aligned monetary columns — verified by Stripe's own balance/payout tables.
