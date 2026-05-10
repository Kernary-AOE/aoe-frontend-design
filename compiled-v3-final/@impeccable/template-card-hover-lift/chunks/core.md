# CardHoverLift [template] v1.0.0
Card / button hover lift with shadow deepening — the Linear / Vercel micro-interaction signature. Includes active-press snap-back, focus-visible parity for keyboard, and full reduced-motion fallback. ~30 lines, production-ready.
domain: motion

## Language
html-css

## Body
```
    <style>
      .card {
        display: block;
        background: oklch(99% 0.005 240);
        border: 1px solid oklch(90% 0.01 240);
        border-radius: 12px;
        padding: 16px;
        box-shadow: {SHADOW_REST};
        transition:
          transform   {TRANSITION_DURATION} {EASING},
          box-shadow  {TRANSITION_DURATION} {EASING},
          border-color {TRANSITION_DURATION} {EASING};
        will-change: transform;
        cursor: pointer;
      }

      .card:hover {
        transform: translateY(calc(-1 * {LIFT_AMOUNT}));
        box-shadow: {SHADOW_HOVER};
        border-color: oklch(82% 0.02 240);
      }

      .card:active {
        transform: translateY(0);
        transition-duration: 80ms;
        box-shadow: {SHADOW_REST};
      }

      .card:focus-visible {
        transform: translateY(calc(-1 * {LIFT_AMOUNT}));
        box-shadow: {SHADOW_HOVER};
        outline: 2px solid oklch(54% 0.22 250);
        outline-offset: 2px;
      }

      @media (prefers-reduced-motion: reduce) {
        .card { transition: none; will-change: auto; }
        .card:hover,
        .card:focus-visible {
          transform: none;
          box-shadow: 0 4px 12px oklch(20% 0.04 240 / 0.12);
        }
      }
    </style>

    <a href="#" class="card">
      <strong>Card title</strong>
      <p>Card body — hover for lift</p>
    </a>
  
```

## Usage Notes
- Default 2px lift. 1px reads as 'noticed'; 3px as 'enthusiastic'; 4px+ as 'cartoon'.
- Put transition on .card (not .card:hover) — otherwise leave-state has no animation.
- will-change: transform promotes to GPU layer; remove on rarely-hovered elements (memory cost).
- active-state shrinks duration to 80ms so press feels physical, not delayed.
- focus-visible MUST mirror hover visuals — keyboard users deserve the same affordance signal.
- Reduced-motion keeps the elevated shadow as a static state — never strip the affordance entirely.

## Tested In
- Chrome 120+
- Firefox 121
- Safari 17

## Accessibility
- prefers-reduced-motion disables transform but preserves shadow — affordance stays visible.
- focus-visible state matches hover for keyboard parity.
- outline kept (not outline:none) so high-contrast / forced-colors mode still shows focus.
- cursor: pointer signals interactivity without relying on motion.
