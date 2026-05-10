# Accessible Frontend Review [collection] v1.0.0
A comprehensive skill for reviewing any frontend artifact for accessibility compliance (WCAG 2.2 AA) and design quality (Nielsen heuristics). Covers automated and manual accessibility checks, keyboard navigation, color contrast, focus management, and design system quality.

## Includes
- @community/rule-color-contrast
- @community/rule-keyboard-accessible
- @community/method-a11y-audit
- @community/method-heuristic-review
- @nielsen/taxonomy-10-heuristics
- @community/check-contrast-aa
- @community/check-focus-visible
- @community/anti-pattern-outline-suppression
- @impeccable/anti-pattern-ai-slop-palette
- @impeccable/constraint-font-blacklist
- @community/constraint-reduced-motion
- @community/tool-axe-core
- @community/tool-lighthouse
- @w3c/fact-wcag-contrast-aa
- @w3c/fact-wcag-focus-contrast
orchestration: @community/method-a11y-audit

## Target
claude-code

## Orchestration
@community/method-a11y-audit

## Entry Point
```
    When activated:
    1. Ask for the artifact (URL, file path, or paste HTML).
    2. Run @community/method-a11y-audit with wcag-level="AA".
    3. Run @community/method-heuristic-review with depth="quick".
    4. Merge reports: show a11y violations first (by severity), then heuristic scores.
    5. Offer "deep" mode for any heuristic scoring < 3.
    6. Provide specific remediation code for each critical/serious violation.
  
```
