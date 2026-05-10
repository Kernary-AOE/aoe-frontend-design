# ScrollDrivenProgressBar [template] v1.0.0
Reading-progress bar using CSS animation-timeline: scroll(root) with scaleX transform (compositor-only, zero paint cost) — includes @supports fallback for Firefox and prefers-reduced-motion hide.
domain: frontend-design

## Language
css

## Body
```
    <style>
      /* ── CSS scroll-driven progress bar ──────────────────────────────────
         Requires Chrome 115+, Edge 115+, Safari 26+.
         Firefox: hidden via @supports not ().
         aria-hidden="true" — this is decorative.
         scaleX not width — no layout recalc on scroll.                  */
      .scroll-progress {
        position: fixed;
        top: 0; left: 0;
        width: 100%;
        height: 3px;
        background: oklch(0.55 0.22 256);
        transform-origin: left center;
        z-index: 9999;

        /* animation-timeline drives keyframe progress via scroll position */
        animation: progress-expand linear both;
        animation-timeline: scroll(root);
      }

      @keyframes progress-expand {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }

      /* ── Reduced motion: hide entirely (decorative element) ────────────── */
      @media (prefers-reduced-motion: reduce) {
        .scroll-progress { display: none; }
      }

      /* ── Progressive enhancement: hide in unsupported browsers ─────────── */
      @supports not (animation-timeline: scroll()) {
        .scroll-progress { display: none; }
      }

      /* ── GSAP fallback for Firefox (when coverage required) ─────────────
         Uncomment and add via JS if Firefox support is needed:

         import gsap from "gsap";
         import { ScrollTrigger } from "gsap/ScrollTrigger";
         gsap.registerPlugin(ScrollTrigger);
         const mm = gsap.matchMedia();
         mm.add("(prefers-reduced-motion: no-preference)", () => {
           gsap.to(".scroll-progress", {
             scaleX: 1, ease: "none",
             scrollTrigger: { scrub: true, start: "top top", end: "bottom bottom" },
           });
         });
      */
    </style>

    <!-- HTML:
      <div class="scroll-progress" aria-hidden="true"></div>
    -->
  
```

## Usage Notes
- animation-timeline: scroll(root) — 'root' refers to document.documentElement (the page scroller).
- For a scroller other than root: animation-timeline: scroll(nearest) or name a scroll container.
- 3px height is the standard reading progress bar convention; 2px is also common.
- Color should use brand primary — oklch ensures perceptual consistency across themes.
- Chrome/Edge/Safari ~80% global coverage. GSAP ScrollTrigger + scrub: true for 100% coverage.

## Accessibility
- aria-hidden='true' — screen readers gain no useful information from a progress bar.
- Hide under prefers-reduced-motion — the bar scrolls horizontally continuously, which is motion-sensitive.
