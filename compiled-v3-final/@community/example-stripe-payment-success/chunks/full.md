# StripePaymentSuccess [example] v1.0.0
After a successful payment, Stripe Checkout displays a 56px circle that draws itself in (~400ms), then a checkmark path strokes through (~300ms), then the words 'Payment successful' fade up (~200ms). Total animation ≈ 900ms. Uses SVG stroke-dasharray + stroke-dashoffset for the draw-on effect — no external libraries, pure CSS animations.
domain: motion

## Label
Stripe — Payment Success Checkmark Animation

## Url
https://checkout.stripe.com

## Observed
2026-Q1

## Brand
stripe

## Pattern Applied
@community/pattern-button-press-feedback

## Aesthetic Notes
- Circle: 56px diameter, stroke #00D4A4 (Stripe success green), stroke-width 3.5, fill transparent.
- Circle draw: stroke-dasharray = circumference (≈ 175.93 for r=28); stroke-dashoffset animates from 175.93 → 0 over 420ms with cubic-bezier(0.65, 0, 0.35, 1).
- Checkmark path: M 16 28 L 24 36 L 40 20 — three points, two strokes. stroke-linecap: round, stroke-linejoin: round (avoids the chiseled corner at the bend).
- Checkmark draw: stroke-dasharray = path length (≈ 36); animates from 36 → 0 over 280ms, delay 380ms (starts as circle finishes).
- Subtle scale pulse on the circle 60ms AFTER the checkmark lands: scale(1) → scale(1.06) → scale(1). 220ms total. Sells the 'confirmed' beat.
- Text: 'Payment successful' fades in opacity 0 → 1 + translateY(8px → 0) over 200ms with delay 740ms.
- Background: full white #FFFFFF with no shadow on the circle — Stripe deliberately keeps it 'flat' for trust.

## What To Copy
- stroke-dashoffset animation is THE technique for 'drawn in real time' SVG effects. Pre-compute the path length once with getTotalLength(), then animate.
- Sequence: circle THEN checkmark THEN text. Parallel feels chaotic; sequential feels considered. Each step is its own beat.
- stroke-linecap: round on the checkmark — sharp endpoints look amateur even at small sizes.
- 60ms pulse AFTER the check completes is the 'confirmation' beat. Without it, the animation feels truncated.
- Total budget 900ms — long enough to feel ceremonial (matches the emotional weight of 'money just left my account'), short enough that users move on.
- Stripe green (#00D4A4) only at this moment — it's not in the rest of the checkout. Reserved color = signal of importance.

## What To Skip
- Don't add a confetti burst. Stripe specifically doesn't because 'we processed your money' isn't a celebration — it's a contract.
- Skip ease-in on the circle draw (cubic-bezier(0.65, 0, 0.35, 1) is ease-in-out). Pure ease-out makes the circle 'whoosh' which feels frivolous.
- Don't replay on re-renders — once the success is acknowledged, freeze on final state. Repeat triggers are anxiety-inducing.
- Avoid stroke-width >4 — at 56px diameter the checkmark starts looking cartoonish.

## Screenshot Hint
scout query: stripe checkout payment success green checkmark circle animation

## Demonstrates
- Sequenced micro-animations (A then B then C) feel more deliberate than parallel ones, even when total duration is identical.
- stroke-dashoffset is the universal technique for 'self-drawing' line art — works for checkmarks, X's, signatures, any path.
- Reserved color (Stripe green only at success) earns more semantic weight than always-on accents.
- Restraint sells trust: no confetti, no shadow, no scale-bounce — the animation respects the user's money.

## Label
Stripe — Payment Success Checkmark Animation

## Url
https://checkout.stripe.com

## Observed
2026-Q1

## Brand
stripe

## Pattern Applied
@community/pattern-button-press-feedback

## Aesthetic Notes
- Circle: 56px diameter, stroke #00D4A4 (Stripe success green), stroke-width 3.5, fill transparent.
- Circle draw: stroke-dasharray = circumference (≈ 175.93 for r=28); stroke-dashoffset animates from 175.93 → 0 over 420ms with cubic-bezier(0.65, 0, 0.35, 1).
- Checkmark path: M 16 28 L 24 36 L 40 20 — three points, two strokes. stroke-linecap: round, stroke-linejoin: round (avoids the chiseled corner at the bend).
- Checkmark draw: stroke-dasharray = path length (≈ 36); animates from 36 → 0 over 280ms, delay 380ms (starts as circle finishes).
- Subtle scale pulse on the circle 60ms AFTER the checkmark lands: scale(1) → scale(1.06) → scale(1). 220ms total. Sells the 'confirmed' beat.
- Text: 'Payment successful' fades in opacity 0 → 1 + translateY(8px → 0) over 200ms with delay 740ms.
- Background: full white #FFFFFF with no shadow on the circle — Stripe deliberately keeps it 'flat' for trust.

## What To Copy
- stroke-dashoffset animation is THE technique for 'drawn in real time' SVG effects. Pre-compute the path length once with getTotalLength(), then animate.
- Sequence: circle THEN checkmark THEN text. Parallel feels chaotic; sequential feels considered. Each step is its own beat.
- stroke-linecap: round on the checkmark — sharp endpoints look amateur even at small sizes.
- 60ms pulse AFTER the check completes is the 'confirmation' beat. Without it, the animation feels truncated.
- Total budget 900ms — long enough to feel ceremonial (matches the emotional weight of 'money just left my account'), short enough that users move on.
- Stripe green (#00D4A4) only at this moment — it's not in the rest of the checkout. Reserved color = signal of importance.

## What To Skip
- Don't add a confetti burst. Stripe specifically doesn't because 'we processed your money' isn't a celebration — it's a contract.
- Skip ease-in on the circle draw (cubic-bezier(0.65, 0, 0.35, 1) is ease-in-out). Pure ease-out makes the circle 'whoosh' which feels frivolous.
- Don't replay on re-renders — once the success is acknowledged, freeze on final state. Repeat triggers are anxiety-inducing.
- Avoid stroke-width >4 — at 56px diameter the checkmark starts looking cartoonish.

## Screenshot Hint
scout query: stripe checkout payment success green checkmark circle animation

## Demonstrates
- Sequenced micro-animations (A then B then C) feel more deliberate than parallel ones, even when total duration is identical.
- stroke-dashoffset is the universal technique for 'self-drawing' line art — works for checkmarks, X's, signatures, any path.
- Reserved color (Stripe green only at success) earns more semantic weight than always-on accents.
- Restraint sells trust: no confetti, no shadow, no scale-bounce — the animation respects the user's money.
