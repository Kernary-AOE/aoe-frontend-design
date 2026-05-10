# MotionLoading [pattern] v1.0.0
Loading animation hierarchy: skeleton pulse (1.5s ease-in-out opacity 0.4→0.7 loop) > progress bar > stagger dots (0.6s, 0.15s per-dot delay) > spinner — skeleton is always preferred over spinner for layout-bearing content.
domain: frontend-design

## Problem
Spinners give no spatial context — users can't predict what will appear. Skeleton screens vs spinners vs dots is often chosen by preference, not function. Wrong choice extends perceived wait time.

## Solution
Match loading pattern to context: skeleton for layout-bearing content (cards, tables), progress bar for deterministic operations, stagger dots for indeterminate short waits, spinner only inside small containers (buttons, icon slots).

## Hierarchy
- **1 Skeleton**: Show layout shape immediately. Content fills progressively. Fastest perceived load.
- **2 Progress Bar**: Deterministic progress. User knows how long to wait.
- **3 Stagger Dots**: Indeterminate but lightweight. Acceptable for <3s waits.
- **4 Spinner**: Last resort. No spatial context. Use only in small containers.

## Styles
```
    /* ── Skeleton pulse ──────────────────────────────────────────────────── */
    .skeleton {
      background: oklch(0.85 0 0);
      border-radius: 8px;
      animation: skeleton-pulse 1.5s ease-in-out infinite;
    }
    @keyframes skeleton-pulse {
      0%, 100% { opacity: 0.4; }
      50%       { opacity: 0.7; }
    }

    /* ── Stagger dots ────────────────────────────────────────────────────── */
    .dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: currentColor;
      animation: dot-bounce 0.6s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.15s; }
    .dot:nth-child(3) { animation-delay: 0.30s; }
    @keyframes dot-bounce {
      0%, 100% { transform: translateY(0);   }
      50%       { transform: translateY(-8px); }
    }

    /* ── Reduced motion ──────────────────────────────────────────────────── */
    @media (prefers-reduced-motion: reduce) {
      .skeleton        { animation: none; opacity: 0.5; }
      .dot             { animation: none; }
    }
  
```

## When To Use
- **Skeleton**: Cards, data tables, article body, product grids — anything with a predictable layout
- **Progress Bar**: File uploads, multi-step form submit, determinate API calls with progress events
- **Stagger Dots**: Button loading state, chat typing indicator, inline async operations
- **Spinner**: Icon slot loading, thumbnail loading, avatar placeholder — never full-page

## A11y
- Use aria-busy='true' on the container while loading.
- Announce completion with aria-live='polite' region.
- Skeleton elements should have aria-hidden='true' — they are placeholders, not content.
- All looping animations must stop under prefers-reduced-motion.

## Problem
Spinners give no spatial context — users can't predict what will appear. Skeleton screens vs spinners vs dots is often chosen by preference, not function. Wrong choice extends perceived wait time.

## Solution
Match loading pattern to context: skeleton for layout-bearing content (cards, tables), progress bar for deterministic operations, stagger dots for indeterminate short waits, spinner only inside small containers (buttons, icon slots).

## Hierarchy
- **1 Skeleton**: Show layout shape immediately. Content fills progressively. Fastest perceived load.
- **2 Progress Bar**: Deterministic progress. User knows how long to wait.
- **3 Stagger Dots**: Indeterminate but lightweight. Acceptable for <3s waits.
- **4 Spinner**: Last resort. No spatial context. Use only in small containers.

## Styles
```
    /* ── Skeleton pulse ──────────────────────────────────────────────────── */
    .skeleton {
      background: oklch(0.85 0 0);
      border-radius: 8px;
      animation: skeleton-pulse 1.5s ease-in-out infinite;
    }
    @keyframes skeleton-pulse {
      0%, 100% { opacity: 0.4; }
      50%       { opacity: 0.7; }
    }

    /* ── Stagger dots ────────────────────────────────────────────────────── */
    .dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: currentColor;
      animation: dot-bounce 0.6s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.15s; }
    .dot:nth-child(3) { animation-delay: 0.30s; }
    @keyframes dot-bounce {
      0%, 100% { transform: translateY(0);   }
      50%       { transform: translateY(-8px); }
    }

    /* ── Reduced motion ──────────────────────────────────────────────────── */
    @media (prefers-reduced-motion: reduce) {
      .skeleton        { animation: none; opacity: 0.5; }
      .dot             { animation: none; }
    }
  
```

## When To Use
- **Skeleton**: Cards, data tables, article body, product grids — anything with a predictable layout
- **Progress Bar**: File uploads, multi-step form submit, determinate API calls with progress events
- **Stagger Dots**: Button loading state, chat typing indicator, inline async operations
- **Spinner**: Icon slot loading, thumbnail loading, avatar placeholder — never full-page

## A11y
- Use aria-busy='true' on the container while loading.
- Announce completion with aria-live='polite' region.
- Skeleton elements should have aria-hidden='true' — they are placeholders, not content.
- All looping animations must stop under prefers-reduced-motion.
