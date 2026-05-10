# DashboardAnimations [pattern] v1.0.0
Three precise CSS animation patterns used in admin dashboards: sidebar collapse transition, accordion/collapsible content expand, and button press micro-interaction. All should respect prefers-reduced-motion.
domain: frontend-design

## Label
Dashboard Animation Patterns

## Problem
Dashboard interactions without animation feel abrupt; dashboard interactions with excessive or poorly-timed animation feel slow. Three transitions are needed repeatedly: sidebar collapse, expandable sections, and button feedback.

## Solution
Use targeted CSS transitions with short durations (200ms or less). Sidebar collapses on left/right/width simultaneously. Accordions use a Radix/CSS custom property height animation. Buttons use a 1px translateY press. Always gate all animations behind prefers-reduced-motion media query.

## Structure
```
    <style>
      /* 1. Sidebar collapse: animate left, right, and width together */
      .sidebar {
        transition: left 200ms ease-linear,
                    right 200ms ease-linear,
                    width 200ms ease-linear;
      }

      /* 2. Accordion / collapsible expand */
      @keyframes accordion-down {
        from { height: 0; overflow: hidden; }
        to   { height: var(--radix-accordion-content-height); }
      }
      @keyframes accordion-up {
        from { height: var(--radix-accordion-content-height); }
        to   { height: 0; overflow: hidden; }
      }
      .accordion-content[data-state="open"] {
        animation: accordion-down 0.2s ease-out;
      }
      .accordion-content[data-state="closed"] {
        animation: accordion-up 0.2s ease-out;
      }

      /* 3. Button press micro-interaction */
      button:active {
        transform: translateY(1px);
      }

      /* 4. Respect reduced motion — disable all */
      @media (prefers-reduced-motion: reduce) {
        .sidebar,
        .accordion-content,
        button {
          transition: none;
          animation: none;
        }
      }
    </style>
  
```
