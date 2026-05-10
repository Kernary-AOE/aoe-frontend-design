# StripeCheckout [example] v1.0.0
Stripe Checkout renders a two-column layout: left side (~480px) shows the merchant's logo and an itemized summary on a #FAFBFC background; right side (~520px) is the payment form on white #FFFFFF with email input, card field (number + expiry + CVC inline), and a 'Pay $X' button in Stripe purple #635BFF. The card input uses dynamic icon switching (Visa/MC/Amex) as the user types.
domain: visual-design

## Label
Stripe Checkout — Hosted Payment Flow

## Url
https://checkout.stripe.com

## Observed
2026-Q1

## Brand
stripe

## Pattern Applied
@community/pattern-checkout-summary

## Aesthetic Notes
- Layout: 480px summary + 520px form, no sidebar, no header — pure transaction focus.
- Form field: 44px tall, 1px solid #E3E8EE border, 6px border-radius, focus state 2px #635BFF outline.
- Card field: number/expiry/CVC merged into a single field with embedded icons that animate to detected brand.
- Pay button: 48px tall, full-width, #635BFF background, 16px/500 white text, 8px border-radius.
- Summary: line-items in 14px #425466, total in 18px/600 #1A1F36 with a 1px #E3E8EE divider above.
- Trust signals: 'Powered by Stripe' lockup + Apple Pay/Google Pay buttons above email field.

## What To Copy
- Two-column 'summary | form' beats single-column for payment — context stays visible during entry.
- Merge card number + expiry + CVC into one logical field with embedded brand icon — fewer focus jumps.
- 44px form fields are the minimum for comfortable entry; 36px feels cramped for credit cards.
- Show wallet shortcuts (Apple/Google Pay) ABOVE the form, not below — many users abandon if they have to scroll.

## What To Skip
- The 'remember me' checkbox below the form is opt-in by design but easy to miss; surface it earlier in the flow.

## Screenshot Hint
scout query: stripe checkout two column payment form purple cta card brand icons

## Demonstrates
- Conversion-critical forms benefit from radical focus (no nav, no sidebar, no footer).
- Inline brand-icon switching is a microinteraction that signals intelligence without flashiness.
- Wallet shortcuts above the manual form respect the 'fast path first' principle.

## Label
Stripe Checkout — Hosted Payment Flow

## Url
https://checkout.stripe.com

## Observed
2026-Q1

## Brand
stripe

## Pattern Applied
@community/pattern-checkout-summary

## Aesthetic Notes
- Layout: 480px summary + 520px form, no sidebar, no header — pure transaction focus.
- Form field: 44px tall, 1px solid #E3E8EE border, 6px border-radius, focus state 2px #635BFF outline.
- Card field: number/expiry/CVC merged into a single field with embedded icons that animate to detected brand.
- Pay button: 48px tall, full-width, #635BFF background, 16px/500 white text, 8px border-radius.
- Summary: line-items in 14px #425466, total in 18px/600 #1A1F36 with a 1px #E3E8EE divider above.
- Trust signals: 'Powered by Stripe' lockup + Apple Pay/Google Pay buttons above email field.

## What To Copy
- Two-column 'summary | form' beats single-column for payment — context stays visible during entry.
- Merge card number + expiry + CVC into one logical field with embedded brand icon — fewer focus jumps.
- 44px form fields are the minimum for comfortable entry; 36px feels cramped for credit cards.
- Show wallet shortcuts (Apple/Google Pay) ABOVE the form, not below — many users abandon if they have to scroll.

## What To Skip
- The 'remember me' checkbox below the form is opt-in by design but easy to miss; surface it earlier in the flow.

## Screenshot Hint
scout query: stripe checkout two column payment form purple cta card brand icons

## Demonstrates
- Conversion-critical forms benefit from radical focus (no nav, no sidebar, no footer).
- Inline brand-icon switching is a microinteraction that signals intelligence without flashiness.
- Wallet shortcuts above the manual form respect the 'fast path first' principle.
