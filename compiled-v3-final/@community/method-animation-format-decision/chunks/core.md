# AnimationFormatDecision [method] v1.0.0
A decision tree for choosing between Pure SVG+GSAP, Rive, and Lottie based on interactivity requirements, designer toolchain, bundle budget, and file-size constraints.
domain: frontend-design

## Decision Tree
- Is animation purely decorative AND simple enough to hand-code? → Pure SVG + CSS / GSAP (0 KB runtime)
- Does it respond to user interaction (hover, drag, state machine)? → Rive (@rive-app/react-canvas ~40 KB)
- Does the design team use After Effects exclusively? → Lottie (lottie-react ~60 KB)
- Is bundle size critical (< 5 KB runtime)? → Pure SVG + CSS
- New work with Rive editor / Figma? → Rive
- Existing .aep source file only? → Lottie
- Default preference order: SVG+GSAP > Rive > Lottie

## Format Comparison
- SVG+GSAP: runtime 0–25 KB, no interactivity built-in, full a11y, scroll-scrubbing via GSAP ScrollTrigger
- Rive: runtime ~40 KB, state machines built-in, canvas (not DOM), .riv file very compact
- Lottie: runtime ~60 KB, playback only (no interactivity), JSON file can be large

## Reduced Motion
- SVG+GSAP: use gsap.matchMedia() to disable animations
- Rive: set autoplay:false when prefers-reduced-motion:reduce matches; pause via rive.pause() in onLoad
- Lottie: check prefers-reduced-motion before rendering; skip or freeze at frame 0
