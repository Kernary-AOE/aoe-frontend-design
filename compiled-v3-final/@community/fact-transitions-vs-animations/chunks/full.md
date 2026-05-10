# TransitionsVsAnimations [fact] v1.0.0
CSS transitions (property-triggered, auto-reversible) and CSS animations (@keyframes, scripted sequence) serve different purposes — transitions for state-toggled UI feedback, animations for entrances/exits/loading — mixing them incorrectly creates brittle, non-reversing motion.
> CSS transitions and CSS animations are not interchangeable. A CSS transition fires when a CSS property value changes and automatically reverses when the trigger is removed — making it correct for hover, focus, and toggle states. A CSS animation (@keyframes) runs a scripted sequence independently of current property value, does not auto-reverse, and is correct for entrance/exit and looping motion. The most common mistake: using @keyframes animation for hover states (no auto-reverse) or CSS transition for entrance animations (requires a trigger to exist before mounting).
domain: frontend-design

## Confidence
strong

## Decision Table
- **Hover/Focus/Active State**: transition — auto-reverses when state removed
- **Element Entrance (Mount)**: animation — no trigger needed, fires on load
- **Element Exit (Unmount)**: animation — JS class swap + animationend listener
- **Loading Indicator Loop**: animation with iteration-count: infinite
- **Toggle (Open/Close)**: transition — trigger is class change
- **Scroll Linked Progress**: animation-timeline: scroll() — CSS scroll-driven
- **Spring Physics**: JS (GSAP / Motion.dev / Web Animations API)

## Code Examples
```
    /* ── Transition: correct for :hover (auto-reverses) ─────────────────── */
    .card {
      transform: translateY(0);
      transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .card:hover { transform: translateY(-4px); }
    /* Correct: mouse-leave auto-reverses the transition back to translateY(0) */

    /* ── Animation: correct for entrance ────────────────────────────────── */
    .card {
      animation: slide-up 300ms cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    /* Correct: fires once on mount, no trigger needed */

    /* ── Wrong: @keyframes for hover (no auto-reverse) ───────────────────── */
    /* .card:hover { animation: hover-lift 200ms; } ← this NEVER reverses! */
  
```

## Sources

## Confidence
strong

## Source
- CSS Transitions Level 1 — W3C specification
- CSS Animations Level 1 — W3C specification
- MDN: Using CSS transitions
- MDN: Using CSS animations

## Decision Table
- **Hover/Focus/Active State**: transition — auto-reverses when state removed
- **Element Entrance (Mount)**: animation — no trigger needed, fires on load
- **Element Exit (Unmount)**: animation — JS class swap + animationend listener
- **Loading Indicator Loop**: animation with iteration-count: infinite
- **Toggle (Open/Close)**: transition — trigger is class change
- **Scroll Linked Progress**: animation-timeline: scroll() — CSS scroll-driven
- **Spring Physics**: JS (GSAP / Motion.dev / Web Animations API)

## Code Examples
```
    /* ── Transition: correct for :hover (auto-reverses) ─────────────────── */
    .card {
      transform: translateY(0);
      transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .card:hover { transform: translateY(-4px); }
    /* Correct: mouse-leave auto-reverses the transition back to translateY(0) */

    /* ── Animation: correct for entrance ────────────────────────────────── */
    .card {
      animation: slide-up 300ms cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    /* Correct: fires once on mount, no trigger needed */

    /* ── Wrong: @keyframes for hover (no auto-reverse) ───────────────────── */
    /* .card:hover { animation: hover-lift 200ms; } ← this NEVER reverses! */
  
```
