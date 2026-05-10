# AriaBandaid [counter-example] v1.0.0
A modal dialog where the engineer added `role='dialog'`, `aria-label`, and `aria-modal='true'` after the audit complained — but kept the underlying `<div onClick>` for the close button, kept the heading as a `<p>` because the design used a 14px label, and kept the focus loose (no trap). ARIA contradicts the actual structure.
domain: accessibility
