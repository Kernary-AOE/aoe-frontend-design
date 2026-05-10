# InteractionStates [pattern] v1.0.0
Every interactive element must implement all 8 distinct states — default, hover, focus, active, disabled, loading, error, and success — with visually distinguishable styles for each.
domain: frontend-design

## Problem
Components built with only default and hover states fail keyboard users (no focus state), blind users (no announced state changes), and leave users confused when actions are processing or have failed.

## Solution
Design and code all 8 states before shipping any interactive component.

## States
- default: base styling at rest
- hover: subtle lift or color shift — only on pointer:fine devices via @media (hover:hover)
- focus: visible ring ≥ 2px solid offset:2px matching brand hue — :focus-visible only
- active: pressed-in appearance, darker bg, scale(0.97) — :active
- disabled: 40–50% opacity, cursor:not-allowed, aria-disabled='true', pointer-events:none
- loading: inline spinner or skeleton replacing content, aria-busy='true'
- error: red/destructive color, aria-invalid='true', associated error message
- success: green/affirming color, short 200ms confirmation animation

## Css Skeleton
```
    /* Focus — always :focus-visible, never :focus */
    .btn:focus-visible {
      outline: 2px solid oklch(65% 0.2 260);
      outline-offset: 2px;
    }
    /* Hover — pointer devices only */
    @media (hover: hover) and (pointer: fine) {
      .btn:hover { background: oklch(48% 0.2 260); }
    }
    /* Active — asymmetric timing */
    .btn:active { transform: scale(0.97); transition: transform 80ms ease; }
    /* Disabled */
    .btn:disabled, .btn[aria-disabled='true'] {
      opacity: 0.45;
      pointer-events: none;
      cursor: not-allowed;
    }
  
```
