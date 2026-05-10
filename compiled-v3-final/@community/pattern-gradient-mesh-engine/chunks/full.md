# GradientMeshEngine [pattern] v1.0.0
domain: frontend-design

## Label
Gradient Mesh Engine — Multi-Layer Radial Atmosphere

## Problem
Atmospheric backgrounds require the appearance of richness and depth without a heavy asset pipeline. A single gradient reads as trivial; a generated mesh gradient from a design tool produces baked-in markup that cannot be themed or adapted to dark mode.

## Solution
Stack 3–5 radial-gradient layers in CSS, each positioned at a different quadrant, at very low alpha (0.04–0.10 per layer). Use OKLCH for stop colors to prevent gray dead zones at midpoints. This creates a perceptually rich, infinitely scalable mesh that adapts to dark mode via CSS custom property overrides.

## Structure
```
    /* Gradient Mesh Engine — parameterised by CSS custom properties */
    .mesh-bg {
      background:
        radial-gradient(
          ellipse 70% 60% at 15% 45%,
          oklch(var(--mesh-l1) var(--mesh-c1) var(--mesh-h1) / var(--mesh-a1, 0.06)) 0%,
          transparent 60%
        ),
        radial-gradient(
          ellipse 65% 55% at 85% 15%,
          oklch(var(--mesh-l2) var(--mesh-c2) var(--mesh-h2) / var(--mesh-a2, 0.04)) 0%,
          transparent 55%
        ),
        radial-gradient(
          ellipse 60% 50% at 55% 88%,
          oklch(var(--mesh-l3) var(--mesh-c3) var(--mesh-h3) / var(--mesh-a3, 0.04)) 0%,
          transparent 52%
        ),
        var(--color-bg);
    }

    /* Light mode defaults */
    :root {
      --mesh-l1: 0.55; --mesh-c1: 0.10; --mesh-h1: 220;
      --mesh-l2: 0.60; --mesh-c2: 0.08; --mesh-h2: 255;
      --mesh-l3: 0.50; --mesh-c3: 0.09; --mesh-h3: 195;
    }

    /* Dark mode — same hues, reduced chroma + adjusted lightness */
    [data-theme="dark"] {
      --mesh-l1: 0.35; --mesh-c1: 0.08; --mesh-h1: 220;
      --mesh-l2: 0.30; --mesh-c2: 0.06; --mesh-h2: 255;
      --mesh-l3: 0.28; --mesh-c3: 0.07; --mesh-h3: 195;
      --mesh-a1: 0.08;
      --mesh-a2: 0.06;
      --mesh-a3: 0.05;
    }
  
```

## Label
Gradient Mesh Engine — Multi-Layer Radial Atmosphere

## Problem
Atmospheric backgrounds require the appearance of richness and depth without a heavy asset pipeline. A single gradient reads as trivial; a generated mesh gradient from a design tool produces baked-in markup that cannot be themed or adapted to dark mode.

## Solution
Stack 3–5 radial-gradient layers in CSS, each positioned at a different quadrant, at very low alpha (0.04–0.10 per layer). Use OKLCH for stop colors to prevent gray dead zones at midpoints. This creates a perceptually rich, infinitely scalable mesh that adapts to dark mode via CSS custom property overrides.

## Structure
```
    /* Gradient Mesh Engine — parameterised by CSS custom properties */
    .mesh-bg {
      background:
        radial-gradient(
          ellipse 70% 60% at 15% 45%,
          oklch(var(--mesh-l1) var(--mesh-c1) var(--mesh-h1) / var(--mesh-a1, 0.06)) 0%,
          transparent 60%
        ),
        radial-gradient(
          ellipse 65% 55% at 85% 15%,
          oklch(var(--mesh-l2) var(--mesh-c2) var(--mesh-h2) / var(--mesh-a2, 0.04)) 0%,
          transparent 55%
        ),
        radial-gradient(
          ellipse 60% 50% at 55% 88%,
          oklch(var(--mesh-l3) var(--mesh-c3) var(--mesh-h3) / var(--mesh-a3, 0.04)) 0%,
          transparent 52%
        ),
        var(--color-bg);
    }

    /* Light mode defaults */
    :root {
      --mesh-l1: 0.55; --mesh-c1: 0.10; --mesh-h1: 220;
      --mesh-l2: 0.60; --mesh-c2: 0.08; --mesh-h2: 255;
      --mesh-l3: 0.50; --mesh-c3: 0.09; --mesh-h3: 195;
    }

    /* Dark mode — same hues, reduced chroma + adjusted lightness */
    [data-theme="dark"] {
      --mesh-l1: 0.35; --mesh-c1: 0.08; --mesh-h1: 220;
      --mesh-l2: 0.30; --mesh-c2: 0.06; --mesh-h2: 255;
      --mesh-l3: 0.28; --mesh-c3: 0.07; --mesh-h3: 195;
      --mesh-a1: 0.08;
      --mesh-a2: 0.06;
      --mesh-a3: 0.05;
    }
  
```
