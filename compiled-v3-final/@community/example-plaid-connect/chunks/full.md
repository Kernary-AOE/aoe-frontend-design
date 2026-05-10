# PlaidConnect [example] v1.0.0
Plaid Link is a multi-step modal (max-width 380px, fixed height ~600px) embedded via iframe. Steps: (1) intro screen with security messaging, (2) bank search with logo grid (32px logos in 6-column grid), (3) credentials entry with bank-branded header, (4) MFA challenge if needed, (5) success state. Each step has a back-arrow top-left and a step indicator (e.g., '2 of 5') top-right.
domain: visual-design

## Label
Plaid — Bank Account Connection Flow (Plaid Link)

## Url
https://plaid.com/plaid-link

## Observed
2026-Q1

## Brand
plaid

## Pattern Applied
@community/pattern-multi-step-wizard

## Aesthetic Notes
- Modal: 380px wide × 600px tall (fixed dims — never resize during flow), 16px border-radius, white bg.
- Bank logo grid: 6 columns × N rows, each cell 56px square with 32px centered logo, hover bg #F3F4F6.
- Bank-branded header: dynamic — adopts the selected bank's primary color as a 8px top stripe.
- Inputs: 48px tall, 1px solid #D1D5DB, focus ring 2px #1F1F1F (Plaid black), label-on-top 13px/500.
- Step indicator: 12px text top-right '2 of 5' in #6B7280, with a 4px-tall progress bar bg #1F1F1F filled to step ratio.
- CTA: full-width, 48px tall, #1F1F1F bg, white text, 8px border-radius.

## What To Copy
- Fixed modal dimensions across all steps (don't grow/shrink) — prevents layout-shift anxiety in security flows.
- Adopt the selected entity's brand color as a thin top stripe — costs nothing, signals 'we know who you picked'.
- 6-column logo grid is the optimal density for bank/brand selection — 4 feels sparse, 8 feels cluttered.
- Step indicator + progress bar (both numeric AND visual) — security flows benefit from both signals.

## What To Skip
- The MFA step uses a plain text input for SMS code — switch to 6 individual digit boxes (better UX, harder to fat-finger).

## Screenshot Hint
scout query: plaid link bank connection multi step modal logo grid mfa

## Demonstrates
- Security flows benefit from fixed-dimension modals (no resize) — reduces user anxiety.
- Adopting third-party brand colors briefly (header stripe) signals trust handoff.
- 6-column grid is the consensus density for brand/logo selection.

## Label
Plaid — Bank Account Connection Flow (Plaid Link)

## Url
https://plaid.com/plaid-link

## Observed
2026-Q1

## Brand
plaid

## Pattern Applied
@community/pattern-multi-step-wizard

## Aesthetic Notes
- Modal: 380px wide × 600px tall (fixed dims — never resize during flow), 16px border-radius, white bg.
- Bank logo grid: 6 columns × N rows, each cell 56px square with 32px centered logo, hover bg #F3F4F6.
- Bank-branded header: dynamic — adopts the selected bank's primary color as a 8px top stripe.
- Inputs: 48px tall, 1px solid #D1D5DB, focus ring 2px #1F1F1F (Plaid black), label-on-top 13px/500.
- Step indicator: 12px text top-right '2 of 5' in #6B7280, with a 4px-tall progress bar bg #1F1F1F filled to step ratio.
- CTA: full-width, 48px tall, #1F1F1F bg, white text, 8px border-radius.

## What To Copy
- Fixed modal dimensions across all steps (don't grow/shrink) — prevents layout-shift anxiety in security flows.
- Adopt the selected entity's brand color as a thin top stripe — costs nothing, signals 'we know who you picked'.
- 6-column logo grid is the optimal density for bank/brand selection — 4 feels sparse, 8 feels cluttered.
- Step indicator + progress bar (both numeric AND visual) — security flows benefit from both signals.

## What To Skip
- The MFA step uses a plain text input for SMS code — switch to 6 individual digit boxes (better UX, harder to fat-finger).

## Screenshot Hint
scout query: plaid link bank connection multi step modal logo grid mfa

## Demonstrates
- Security flows benefit from fixed-dimension modals (no resize) — reduces user anxiety.
- Adopting third-party brand colors briefly (header stripe) signals trust handoff.
- 6-column grid is the consensus density for brand/logo selection.
