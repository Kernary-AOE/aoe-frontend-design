# NoHeavyShadowsPerComponent [rule] v1.0.0
Components must not define their own novel box-shadow values — all shadow styles must come from the design token system's elevation scale.
domain: frontend-design

## Severity
medium

## Forbidden
- box-shadow: 0 12px 40px rgba(0,0,0,0.25) — raw value outside token system
- Matching shadow color to component accent color — creates brand-inconsistent lighting
- Multiple shadow layers per component (more than 2) without token backing

## Correct
- box-shadow: var(--shadow-md) — token-backed
- box-shadow: var(--shadow-card) — semantic token
