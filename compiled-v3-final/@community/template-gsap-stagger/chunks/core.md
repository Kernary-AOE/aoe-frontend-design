# GsapStagger [template] v1.0.0
GSAP stagger pattern using gsap.from with stagger: { each: 0.07, from: 'start' } and ease: 'power3.out' — grid-aware stagger, SplitText character stagger, and prefers-reduced-motion guard via gsap.matchMedia().
domain: frontend-design

## Language
javascript

## Body
```
    <script type="module">
      import gsap from "gsap";
      import { SplitText } from "gsap/SplitText";

      gsap.registerPlugin(SplitText);

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {

        // ── Pattern A: Card grid stagger (page load) ──────────────────────
        gsap.from(".card", {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: {
            each: 0.07,     // 70ms between siblings — perceived as continuous
            from: "start",  // reading order
            grid: "auto",   // respects grid column count
          },
        });

        // ── Pattern B: ScrollTrigger-triggered list stagger ───────────────
        // import { ScrollTrigger } from "gsap/ScrollTrigger";
        // gsap.registerPlugin(ScrollTrigger);
        // gsap.from(".list-item", {
        //   x: -30, opacity: 0, duration: 0.5, ease: "power2.out",
        //   stagger: { each: 0.05, from: "start" },
        //   scrollTrigger: { trigger: ".list", start: "top 80%", toggleActions: "play none none reverse" },
        // });

        // ── Pattern C: SplitText character stagger ────────────────────────
        const split = new SplitText(".hero-heading", { type: "chars,words", charsClass: "char" });
        gsap.from(split.chars, {
          y: 40,
          opacity: 0,
          rotateX: -90,
          stagger: 0.03,       // 30ms per character — fast but legible
          duration: 0.8,
          ease: "back.out(1.7)",
        });

        // ── Pattern D: Persona stagger variants ───────────────────────────
        // Swiss Modernist — grid-aware reading order:
        // stagger: { each: 0.08, grid: "auto", from: "start" }

        // Editorial / Luxury — generous overlap, slow:
        // duration: 1.2, stagger: { each: 0.15, from: "start" }

        // Tokyo Minimal — one tween, no stagger:
        // gsap.from(".content", { y: 20, opacity: 0, duration: 0.6, ease: "power1.out" })

      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".card, .list-item, .hero-heading", { opacity: 1, y: 0, x: 0 });
      });
    </script>
  
```

## Usage Notes
- each: 0.07 (70ms) is the sweet-spot — perceived as continuous motion, not separate animations.
- Cap stagger lists at 10-12 items; above that, only stagger the first 8 and show the rest instantly.
- Total animation duration = (n-1) × each + duration — keep below 800ms for lists.
- SplitText is now free via 'npm install gsap' since 2025-04-30 Webflow acquisition.
- grid: 'auto' makes stagger follow the visual grid layout rather than DOM order.
- Use from: 'center' for symmetrical reveals (hero grids, icon arrays).

## Accessibility
- gsap.matchMedia reduce branch must instant-show all staggered items.
- SplitText wraps text in spans — verify screen reader reading order is preserved (DOM order is correct).
- LCP elements (above-the-fold headings) should NOT be staggered — delays Largest Contentful Paint metric.
