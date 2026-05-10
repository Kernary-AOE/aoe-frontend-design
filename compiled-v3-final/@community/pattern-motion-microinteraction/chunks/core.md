# MotionMicrointeraction [pattern] v1.0.0
Microinteraction animation system: hover lift (transform 200ms cubic-bezier(0.16,1,0.3,1)), button press scale(0.97) at 80ms instant, toggle switch 200ms spring, icon rotation 150ms — all under 250ms to stay below perceptual threshold.
domain: frontend-design

## Problem
Scattered :hover styles with inconsistent durations (some 100ms, some 300ms, some transition: all) create an incoherent tactile feel. Microinteractions must feel instantaneous — if they're slow, UI feels unresponsive.

## Solution
Categorise microinteractions by duration tier: Instant (≤80ms) for press/click feedback; Fast (150ms) for icon rotations and toggle flips; Base (200-250ms) for hover lifts and focus rings. Never exceed 250ms for any microinteraction.

## Timing
- **Press Feedback**: 80ms — scale(0.97) on mousedown; instantly perceived as physical press
- **Icon Rotate**: 150ms cubic-bezier(0.16, 1, 0.3, 1) — chevron open/close, hamburger morph
- **Hover Lift**: 200ms cubic-bezier(0.16, 1, 0.3, 1) — translateY(-2px) + shadow expand
- **Toggle Switch**: 200ms cubic-bezier(0.34, 1.56, 0.64, 1) — spring overshoot feels physical
- **Focus Ring**: 150ms ease-out — box-shadow expand to 3px

## Styles
```
    /* ── Hover lift ──────────────────────────────────────────────────────── */
    .interactive-card {
      transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .interactive-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px oklch(0 0 0 / 0.12);
    }

    /* ── Button press (use JS mousedown/mouseup for reliability) ─────────── */
    .btn { transition: transform 80ms ease-out; }
    .btn:active { transform: scale(0.97); }

    /* ── Icon rotation ───────────────────────────────────────────────────── */
    .chevron {
      transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .chevron[data-open="true"] { transform: rotate(180deg); }

    /* ── Toggle switch ───────────────────────────────────────────────────── */
    .toggle-thumb {
      transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .toggle[aria-checked="true"] .toggle-thumb {
      transform: translateX(20px);
    }

    /* ── Focus ring ──────────────────────────────────────────────────────── */
    .interactive-card:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px oklch(0.65 0.15 220 / 40%);
    }

    /* ── Reduced motion ──────────────────────────────────────────────────── */
    @media (prefers-reduced-motion: reduce) {
      .interactive-card, .btn, .chevron, .toggle-thumb {
        transition: none;
      }
    }
  
```

## A11y
- Every :hover microinteraction must also apply on :focus-visible — keyboard parity.
- Press feedback (scale) should not shift layout — use transform only.
- Toggle and chevron animations must complete before accepting next input to avoid double-fire.
