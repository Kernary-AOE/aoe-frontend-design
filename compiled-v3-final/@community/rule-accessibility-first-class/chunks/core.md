# AccessibilityFirstClass [rule] v1.0.0
Accessibility must be treated as a core product requirement from the design phase onward — not a post-launch audit — because retrofitting WCAG AA compliance after launch costs 10–100× more than building it in, and inaccessible products exclude users and create legal liability.
domain: frontend-design

## Rule
```
// Accessibility enters the checklist at:
// Design phase: color contrast tokens, focus state designs, touch target sizing, motion decisions
// Component build: semantic HTML first, ARIA second, keyboard patterns with every component
// Code review: axe-core zero-error gate; check-focus-visible; check-skip-link; check-aria-label-required
// QA: manual keyboard-only navigation; screen reader (VoiceOver/NVDA) smoke test
```

## Implementation Checklist
- Design: color tokens pass 4.5:1 AA contrast; dark-mode tokens also checked
- Design: touch targets ≥ 44px documented; focus states drawn for every interactive component
- Build: semantic HTML elements chosen before ARIA roles (see @community/rule-aria-native-first)
- Build: every interactive component has an accessible name strategy
- Build: keyboard interaction pattern documented and implemented for custom widgets
- CI: axe-core Playwright tests block merges on accessibility violations
- Release: VoiceOver + keyboard-only smoke test on critical user flows

## Severity
block

## Anti Pattern
@community/anti-pattern-accessibility-after-thought
