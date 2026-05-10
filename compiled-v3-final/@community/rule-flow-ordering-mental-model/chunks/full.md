# FlowOrderingMentalModel [rule] v1.0.0
> Multi-step flows must sequence steps in the order users expect based on domain conventions. Never present a step before users have the context needed to complete it — and never ask for irreversible commitment before users have seen what they are committing to.
domain: frontend-design

## Severity
warning

## Applies When
Designing any multi-step flow: checkout, onboarding, form wizard, setup flow.

## Verify By
Walk the flow as a first-time user and ask at each step: 'Do I have enough context to complete this step?' If the answer is no, the step is out of order.

## Anti Pattern
Asking for payment before showing what will be purchased. Asking for account creation before showing the product's value. Asking for personal information before explaining why it is needed.

## Use Instead
- Checkout: cart → review → shipping → payment → confirmation
- Onboarding: value proposition → account creation → setup → first value moment
- Permission requests: explain why → request → confirm → use

## Rationale
Unexpected step ordering breaks users' mental model, causing confusion and loss of trust in the flow. When users reach a step they are not ready for, they abandon rather than continue.

## Severity
warning

## Applies When
Designing any multi-step flow: checkout, onboarding, form wizard, setup flow.

## Verify By
Walk the flow as a first-time user and ask at each step: 'Do I have enough context to complete this step?' If the answer is no, the step is out of order.

## Anti Pattern
Asking for payment before showing what will be purchased. Asking for account creation before showing the product's value. Asking for personal information before explaining why it is needed.

## Use Instead
- Checkout: cart → review → shipping → payment → confirmation
- Onboarding: value proposition → account creation → setup → first value moment
- Permission requests: explain why → request → confirm → use
