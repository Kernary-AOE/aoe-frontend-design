# GsapNowFree [rule] v1.0.0
Since Webflow acquired GreenSock on 2025-04-30, all GSAP plugins (ScrollTrigger, SplitText, MorphSVG, DrawSVG, Flip, ScrollSmoother) are free for commercial use via a single 'npm install gsap' — default to GSAP for any animation beyond simple CSS transitions.
> In any project with a JS bundler and node_modules, GSAP is the default animation engine for anything beyond simple :hover CSS transitions. The paywall that previously justified CSS-only defaults has been removed. Decision rule: CSS for micro-interactions (hover, focus, toggle); GSAP for choreography (sequenced timelines, scroll-linked animation, SVG morphing, text splitting, layout transitions).
domain: frontend-design

## Applies When
- Any npm-based project needing animation beyond simple CSS transitions
- Scroll-linked animation (scrub, pin, parallax)
- Sequenced multi-element timelines
- SVG path draw/morph animation
- Text character/word stagger animation via SplitText
- Layout transitions on DOM reorder/reparent via Flip

## Exceptions
- Plain HTML files without a bundler — CSS-only remains correct
- React-only codebases with simple enter/exit — Motion.dev (Framer Motion) is valid alternative
- 3 or fewer animation-delay values — CSS is sufficient
- No scroll-position dependency — CSS transitions are sufficient

## Installation
```
    # Single package — all plugins included
    npm install gsap

    # React integration (auto cleanup + scoped selectors)
    npm install gsap @gsap/react
  
```

## Reduced Motion
```
    // gsap.matchMedia() — cleanest pattern
    const mm = gsap.matchMedia();
    mm.add({
      isReduced: "(prefers-reduced-motion: reduce)",
      isFull:    "(prefers-reduced-motion: no-preference)",
    }, (ctx) => {
      if (ctx.conditions.isReduced) {
        gsap.set(".section", { opacity: 1, y: 0 });
        return;
      }
      // full motion experience here
    });
  
```
