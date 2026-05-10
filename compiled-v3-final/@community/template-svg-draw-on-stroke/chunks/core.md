# SvgDrawOnStroke [template] v1.0.0
SVG draw-on stroke animation using the pathLength='1' normalization technique — eliminates getTotalLength() JS calls by normalizing path length to 1, enabling pure CSS stroke-dashoffset animation. Includes IntersectionObserver scroll-trigger variant and reduced-motion fallback.
domain: frontend-design

## Language
html-css

## Body
```
    <!-- pathLength="1" normalises the path length to exactly 1 unit.
         stroke-dasharray: 1 = one full dash; stroke-dashoffset: 1 = fully hidden;
         animate dashoffset from 1 → 0 to draw the path. No JS getTotalLength() needed. -->

    <svg class="checkmark-svg" viewBox="0 0 52 52" fill="none"
         aria-label="Success checkmark" role="img">
      <circle class="checkmark-circle" cx="26" cy="26" r="24" pathLength="1" />
      <path   class="checkmark-tick"   d="M14 27 L22 35 L38 18" pathLength="1"
              stroke-linecap="round" stroke-linejoin="round" />
    </svg>

    <style>
      .checkmark-svg { width: 80px; height: 80px; }

      .checkmark-circle,
      .checkmark-tick {
        stroke: oklch(0.55 0.18 145); /* success green */
        stroke-width: 3;
        fill: none;
        stroke-dasharray: 1;
        stroke-dashoffset: 1;           /* fully hidden at start */
      }

      /* Autoplay on load */
      .checkmark-circle {
        animation: draw-stroke 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards;
      }
      .checkmark-tick {
        animation: draw-stroke 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.45s forwards;
      }

      @keyframes draw-stroke {
        from { stroke-dashoffset: 1; }
        to   { stroke-dashoffset: 0; }
      }

      /* Scroll-trigger variant: add .draws-on-scroll + JS below */
      .draws-on-scroll .checkmark-circle,
      .draws-on-scroll .checkmark-tick  { animation: none; }

      .draws-on-scroll.is-drawing .checkmark-circle {
        transition: stroke-dashoffset 0.6s cubic-bezier(0.65, 0, 0.35, 1);
        stroke-dashoffset: 0;
      }
      .draws-on-scroll.is-drawing .checkmark-tick {
        transition: stroke-dashoffset 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.45s;
        stroke-dashoffset: 0;
      }

      /* Reduced motion: instantly reveal the full stroke */
      @media (prefers-reduced-motion: reduce) {
        .checkmark-circle,
        .checkmark-tick {
          stroke-dashoffset: 0 !important;
          animation: none !important;
          transition: none !important;
        }
      }
    </style>

    <!-- Optional IntersectionObserver trigger (omit for autoplay) -->
    <script>
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) {
        document.querySelectorAll(".draws-on-scroll").forEach(svg => svg.classList.add("is-drawing"));
      } else {
        const obs = new IntersectionObserver(
          entries => entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.classList.add("is-drawing");
            obs.unobserve(e.target);
          }),
          { threshold: 0.4 }
        );
        document.querySelectorAll(".draws-on-scroll").forEach(svg => obs.observe(svg));
      }
    </script>
  
```

## Usage Notes
- pathLength='1' normalises path/circle length to 1 — no JS getTotalLength() required.
- stroke-dashoffset: 1 = fully hidden; 0 = fully drawn. Animate between them.
- For drawing direction control: negative offset (-1) draws from end to start.
- For GSAP partial/runtime-controlled draws, use the DrawSVGPlugin instead.
- stroke-linecap: round on checkmarks — sharp endpoints look amateur at any size.
- Total budget: circle 600ms → tick 400ms (delay 450ms) = 850ms ceremonial but not slow.

## Gotchas
- animation: none in .draws-on-scroll resets the offset — required or the circle draws on load AND on scroll.
- Use transition not animation for scroll-trigger variant — class addition triggers the CSS transition.
- Always implement reduced-motion fallback: show full stroke immediately via stroke-dashoffset: 0.
