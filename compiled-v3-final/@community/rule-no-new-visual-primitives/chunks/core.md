# NoNewVisualPrimitives [rule] v1.0.0
New colors, fonts, or icon families not grounded in the existing token system must not be introduced without explicit token extension — raw visual primitive values outside the token layer are forbidden.
domain: frontend-design

## Severity
high

## Forbidden
- color: #e85d2f — raw hex outside token system
- font-family: 'Playfair Display' — new font import without token
- Importing a second icon library alongside the existing one without migration plan
- box-shadow: 0 4px 20px rgba(0,100,255,0.3) — novel shadow outside elevation scale

## Correct
- color: var(--color-accent-600) — token reference
- Adding --font-display: 'Playfair Display' to tokens.css AND updating the token docs
