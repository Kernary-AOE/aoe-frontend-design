# LenisSmoothScroll [template] v1.0.0
Lenis v1.3.21 smooth scroll minimum-safe integration: skip on prefers-reduced-motion and touch devices (hover:none), syncTouch:false, duration:1.2s expo-ease — includes GSAP ScrollTrigger integration pattern and destroy() on reduced-motion change.
domain: frontend-design

## Language
javascript

## Body
```
    <script type="module">
      // npm install lenis
      import Lenis from "lenis";

      let lenis = null;

      function initLenis() {
        // ── Guard 1: reduced motion — never run Lenis ─────────────────────
        const reducedMM = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (reducedMM.matches) return;

        // ── Guard 2: touch-primary devices — Lenis hurts mobile ───────────
        if (window.matchMedia("(hover: none)").matches) return;

        // ── Create Lenis ──────────────────────────────────────────────────
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease
          smoothWheel: true,
          syncTouch: false,   // NEVER smooth on touch — breaks mobile scroll
          touchMultiplier: 1,
        });

        // ── rAF loop ──────────────────────────────────────────────────────
        // If using GSAP ScrollTrigger, replace rAF with:
        // lenis.on("scroll", ScrollTrigger.update);
        // gsap.ticker.add((time) => lenis.raf(time * 1000));
        // gsap.ticker.lagSmoothing(0);

        function raf(time) {
          lenis?.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // ── React to runtime reduced-motion toggle ────────────────────────
        reducedMM.addEventListener("change", (e) => {
          if (e.matches && lenis) {
            lenis.destroy();
            lenis = null;
            // Resync scroll position
            window.scrollTo({ top: document.documentElement.scrollTop, behavior: "instant" });
          }
        });
      }

      initLenis();
      export { lenis };
    </script>

    <!--
      React integration (Client Component):

      "use client";
      import { useEffect } from "react";
      import Lenis from "lenis";

      export function LenisProvider({ children }) {
        useEffect(() => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          if (window.matchMedia("(hover: none)").matches) return;

          const lenis = new Lenis({ duration: 1.2, syncTouch: false });
          function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
          const id = requestAnimationFrame(raf);
          return () => { cancelAnimationFrame(id); lenis.destroy(); };
        }, []);
        return <>{children}</>;
      }

      ── Before adding Lenis, check all boxes ──
      [ ] Is this editorial/agency requiring scroll-has-weight as design requirement?
      [ ] Is GSAP ScrollTrigger scrub the primary reason?
      [ ] Is css scroll-behavior: smooth insufficient?
      [ ] Will syncTouch: false be set?
      [ ] Is prefers-reduced-motion handled with lenis.destroy()?
      [ ] Tested with VoiceOver / NVDA?
      [ ] scroll-snap removed or reimplemented in JS?

      If > 2 unchecked: DO NOT add Lenis.
    -->
  
```

## Usage Notes
- Lenis v1.3.21 (npm install lenis) — maintained by darkroom.engineering as of 2026.
- syncTouch: false is mandatory — Lenis breaks native iOS momentum scrolling on touch devices.
- destroy() is the correct reduced-motion fallback — native scroll resumes immediately.
- Lenis is a tradeoff: breaks overscroll, CSS scroll-snap, assistive tech programmatic scroll.
- Use only for editorial/agency sites where scroll-has-weight is a core brand statement.
- CSS scroll-behavior: smooth handles 95% of smooth-scroll needs with 0 KB of JS (see rule-smooth-scroll-css).

## Accessibility
- Lenis can desync DOM scrollTop from visual scroll position — screen readers may jump to wrong positions.
- Mandatory: destroy on prefers-reduced-motion.
- Mandatory: skip on touch (hover: none) — protects mobile assistive technology.
- Test with NVDA on Windows and VoiceOver on macOS before deploying.
