# A11yAuditV1Feedback [feedback] v1.0.0
Accumulated execution feedback for @community/method-a11y-audit version 1.x. Summarizes observed success rates, common failure modes, and confidence adjustments derived from real audit runs.
domain: accessibility

## Target
@community/method-a11y-audit

## Observations
- **Sample Size**: 47
- **Period**: 2025-Q1 to 2026-Q1
- **Success Rate**: 0.82
- **Common Failures**:
  -
    - **Step**: @community/tool-axe-core
    - **Failure**: axe-core not available in agent sandbox — falls back to visual-only analysis
    - **Frequency**: 0.31
    - **Impact**: reduces coverage from ~57% to ~15% automated; increases false-negative rate
    - **Mitigation**: always check @community/scope-frontend-review preconditions before starting
  -
    - **Step**: merge-deduplicate violations
    - **Failure**: duplicate violations from axe-core and Lighthouse reported twice, inflating violation count
    - **Frequency**: 0.18
    - **Impact**: user confusion — reported violations > actual violations
    - **Mitigation**: deduplicate by (element-selector, criterion-id) before reporting
  -
    - **Step**: focus-order check
    - **Failure**: DOM order does not reflect visual order due to CSS Flexbox/Grid reordering — false negatives on focus order
    - **Frequency**: 0.24
    - **Impact**: SC 2.4.3 failures missed in automated pass
    - **Mitigation**: flag any use of `order:` CSS property or `flex-direction: row-reverse` for manual review
- **Confidence Adjustments**:
  - **@Community/Check Contrast Aa**: 0.95
  - **@Community/Check Focus Visible**: 0.87
  - **@Community/Check Keyboard Reachable**: 0.71

## Ai Confidence
0.79
