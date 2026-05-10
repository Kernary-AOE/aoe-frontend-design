# HoverFocusAnimationParity [rule] v1.0.0
When a card lifts 4px on :hover, keyboard-focused cards must also lift 4px. When a button darkens and scales on :hover, the same must happen on :focus-visible. The focus-visible outline or ring is required but is NOT a substitute for the hover motion — it is additive. Motion feedback communicates 'this element is interactive and responding to your attention.'
> Every CSS animation or transition applied on :hover must also be applied identically on :focus-visible — keyboard users must receive the same visual motion feedback as mouse users, not just a static outline.
domain: frontend-design

## Code
```
    /* ── Correct: combined :hover and :focus-visible selector ─────────────── */
    .card:hover,
    .card:focus-visible {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px oklch(0 0 0 / 0.12);
    }

    /* Focus ring is ADDITIVE — not a replacement for the motion */
    .card:focus-visible {
      outline: 2px solid oklch(0.65 0.15 220);
      outline-offset: 3px;
    }

    /* Button with press feedback */
    .btn:active { transform: scale(0.97); }
    .btn:hover  { background: oklch(0.50 0.20 256); }
    .btn:focus-visible {
      background: oklch(0.50 0.20 256); /* same as hover */
      outline: 2px solid oklch(0.65 0.15 220);
    }

    /* Transition must be on the base element — applies to both states */
    .card {
      transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* ── Reduced motion: disable transform, keep outline ─────────────────── */
    @media (prefers-reduced-motion: reduce) {
      .card:hover, .card:focus-visible {
        transform: none;
        box-shadow: 0 0 0 2px oklch(0.65 0.15 220);
      }
    }
  
```

## Wrong
```
    /* Wrong: hover gets lift animation, focus gets only outline */
    .card:hover         { transform: translateY(-4px); box-shadow: ...; }
    .card:focus-visible { outline: 2px solid blue; }  /* no lift! */
  
```

## Verification
Tab to each interactive element. Confirm the same visual state appears on keyboard focus as on mouse hover.
