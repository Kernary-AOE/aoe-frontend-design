# PerfBudgetRollout [feedback] v1.0.0
Accumulated execution feedback from teams adopting Core Web Vitals performance budgets via @community/collection-performance-budget. Documents the observed friction between budget definition, CI enforcement, and sustained compliance over 3+ months.
domain: performance

## Target
@community/collection-performance-budget

## Observations
- **Sample Size**: 8
- **Period**: 2025-Q1 to 2026-Q1
- **Success Rate**: 0.62
- **Common Failures**:
  -
    - **Step**: Lighthouse CI gating
    - **Failure**: Lighthouse synthetic results vary ±15% run-to-run; team disables gating after first false positive; reverts to no enforcement
    - **Frequency**: 0.62
    - **Impact**: budget exists on paper, no enforcement, regressions ship
    - **Mitigation**: run Lighthouse 5x per PR and use median; require 3 of 5 runs below threshold; allow CI re-run on suspected variance
  -
    - **Step**: RUM data interpretation
    - **Failure**: team alarms on p75 LCP spike; investigation reveals it's a small subset of users on slow connections in remote regions; no actionable fix
    - **Frequency**: 0.5
    - **Impact**: alert fatigue; team learns to dismiss vitals alerts
    - **Mitigation**: segment RUM by device class + connection effective-type + country; alert only on top-50-traffic segments; long-tail goes to a quarterly review, not pager
  -
    - **Step**: @community/anti-pattern-blocking-third-party
    - **Failure**: marketing team adds a new tag (chat widget, A/B test platform, vendor pixel); engineering only learns when LCP regresses
    - **Frequency**: 0.75
    - **Impact**: every quarter LCP creeps up by 100-300ms from third-party sprawl
    - **Mitigation**: third-party additions require an engineering review + budget impact estimate before merge; CSP allowlist gates new domains
  -
    - **Step**: @community/pattern-image-lcp-priority
    - **Failure**: CMS-managed hero images uploaded by content team without explicit dimensions; LCP regresses on every campaign launch
    - **Frequency**: 0.5
    - **Impact**: marketing pages fail LCP gate intermittently
    - **Mitigation**: CMS enforces image dimensions at upload; render layer always emits width/height; CMS plugin auto-converts to AVIF
- **Confidence Adjustments**:
  - **@Community/Rule Cls Budget**: 0.91
  - **@Community/Pattern Image Lcp Priority**: 0.86
  - **@Community/Anti Pattern Blocking Third Party**: 0.74
  - **@Community/Principle Perceived Vs Actual**: 0.82

## Ai Confidence
0.76

## Lessons
- CI gating MUST tolerate Lighthouse variance — single-run gates are noise, not signal.
- RUM segmentation is the difference between actionable and aspirational. p75 over all users is too noisy to act on.
- Third-party drift is the single biggest source of long-term performance regression. Process gates beat technical gates.
- CMS-driven content (marketing-uploaded images) needs platform discipline; engineering-set rules without CMS enforcement degrade weekly.
- Quarterly perf review with leadership creates accountability; without it, budgets become dead documents within 6 months.
