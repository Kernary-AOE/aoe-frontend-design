# CrampedUi [anti-pattern] v1.0.0
Overly tight spacing that impairs content scanning and makes tap targets touch or overlap, failing both readability and touch-device accessibility.
domain: frontend-design

## Label
Cramped UI

## Trap
Attempting to show more content above the fold or reducing perceived whitespace by packing elements with minimal gaps. On touch devices, targets that touch or overlap cause mis-taps; visually, cramped UIs signal lack of craft.

## Remediation
- Increase spacing using the next token step up on the defined scale.
- Verify all tap targets meet minimum 44px height requirement (@community/rule-touch-target-min).
- Apply the principle: tight groupings within a section + generous separation between sections creates rhythm without overall density.
