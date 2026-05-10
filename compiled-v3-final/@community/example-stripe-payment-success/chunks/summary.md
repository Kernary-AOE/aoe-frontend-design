# StripePaymentSuccess [example] v1.0.0
After a successful payment, Stripe Checkout displays a 56px circle that draws itself in (~400ms), then a checkmark path strokes through (~300ms), then the words 'Payment successful' fade up (~200ms). Total animation ≈ 900ms. Uses SVG stroke-dasharray + stroke-dashoffset for the draw-on effect — no external libraries, pure CSS animations.
domain: motion
