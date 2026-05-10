# WebAnimationsApi [template] v1.0.0
Web Animations API (element.animate()) pattern for imperative JS-driven animations with full playback control — .cancel(), .pause(), await .finished — at cubic-bezier(0.16,1,0.3,1) with prefers-reduced-motion snap-to-end path.
domain: frontend-design

## Language
javascript

## Body
```
    <script>
      /**
       * Web Animations API wrapper with reduced-motion support.
       * Returns the Animation object (pause/cancel/await .finished).
       *
       * Usage:
       *   const anim = fadeIn(el);
       *   await anim.finished;
       *   anim.cancel();
       */

      const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

      // ── Utility: snap to end if reduced motion ────────────────────────
      function waanim(el, keyframes, options) {
        if (REDUCED.matches) {
          // Jump to final keyframe instantly
          const lastFrame = Array.isArray(keyframes)
            ? keyframes[keyframes.length - 1]
            : keyframes;
          return el.animate([lastFrame, lastFrame], { duration: 1, fill: 'forwards' });
        }
        return el.animate(keyframes, options);
      }

      // ── Fade in ───────────────────────────────────────────────────────
      function fadeIn(el, duration = 300) {
        return waanim(el,
          [{ opacity: 0 }, { opacity: 1 }],
          { duration, easing: 'ease-out', fill: 'forwards' }
        );
      }

      // ── Slide up reveal ───────────────────────────────────────────────
      function slideUpReveal(el, duration = 400) {
        return waanim(el,
          [
            { opacity: 0, transform: 'translateY(20px)' },
            { opacity: 1, transform: 'translateY(0)'    }
          ],
          { duration, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
        );
      }

      // ── Press feedback (80ms scale) ────────────────────────────────────
      function pressFeedback(el) {
        return waanim(el,
          [
            { transform: 'scale(1)'    },
            { transform: 'scale(0.97)', offset: 0.5 },
            { transform: 'scale(1)'    }
          ],
          { duration: 160, easing: 'ease-out' }
        );
      }

      // ── Stagger list items (uses Promise.all on Animation.finished) ───
      async function staggerReveal(items, each = 70, duration = 400) {
        const animations = [...items].map((item, i) => {
          return new Promise(resolve => {
            setTimeout(() => {
              const anim = slideUpReveal(item, duration);
              anim.finished.then(resolve);
            }, i * each);
          });
        });
        await Promise.all(animations);
      }

      // ── Sequence example ──────────────────────────────────────────────
      // (async () => {
      //   await fadeIn(hero).finished;
      //   await slideUpReveal(subtitle).finished;
      //   staggerReveal(document.querySelectorAll('.card'));
      // })();

      // ── Listen for runtime reduced-motion preference change ───────────
      REDUCED.addEventListener('change', (e) => {
        if (e.matches) {
          // Cancel all in-progress animations on page
          document.getAnimations().forEach(a => {
            if (a.effect && a.effect.target) {
              a.cancel();
            }
          });
        }
      });

      window.waanim = waanim;
      window.fadeIn = fadeIn;
      window.slideUpReveal = slideUpReveal;
      window.pressFeedback = pressFeedback;
      window.staggerReveal = staggerReveal;
    </script>
  
```

## Usage Notes
- el.animate() returns an Animation object — always store it if you need .cancel() or .finished.
- fill: 'forwards' persists the final state — without it, element snaps back after animation ends.
- cubic-bezier(0.16, 1, 0.3, 1) — ease-out with slight tail deceleration — is the recommended default.
- Web Animations API is Baseline (Chrome 84+, Firefox 75+, Safari 13.1+) — no polyfill needed.
- For spring physics without a library, use @impeccable/template-spring-config which simulates spring via WAAPI.
- GSAP is preferred for complex timelines — WAAPI is best for simple programmatic animations without a build step.

## Accessibility
- Always check window.matchMedia('(prefers-reduced-motion: reduce)').matches before animating.
- The snap-to-end path in waanim() returns a real Animation object — consumer code is identical.
- Listen for runtime changes: REDUCED.addEventListener('change') handles OS preference toggles mid-session.
