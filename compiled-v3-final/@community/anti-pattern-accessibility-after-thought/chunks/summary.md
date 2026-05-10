# AccessibilityAfterThought [anti-pattern] v1.0.0
Treating accessibility as a final-step audit pass: design and build the UI based purely on visual mockups, then add `aria-label`, `role`, and `tabindex` afterwards to silence the audit warnings. The result is technically compliant ARIA on a structurally inaccessible page — wrong heading order, decorative buttons, color-only affordances — papered over with ARIA labels that contradict the actual experience.
domain: accessibility
