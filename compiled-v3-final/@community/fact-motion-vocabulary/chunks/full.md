# MotionVocabulary [fact] v1.0.0
Motion vocabulary: transitions (state A → state B with CSS transition property) are continuous with a reversal; animations (CSS @keyframes / GSAP tween) are scripted sequences; spring physics has stiffness/damping/mass — precise terminology prevents category errors in implementation.
> UI motion divides into three distinct categories with different implementation paths: (1) Transitions — CSS transition property, fire on property change, reverse on removal, best for hover/focus/toggle; (2) Animations — CSS @keyframes or GSAP, scripted start-to-end, do not auto-reverse, best for entrance/exit/loading; (3) Spring physics — no fixed duration, governed by stiffness (restoring force), damping (friction), and mass (inertia) — best for physical interactions, draggable elements, and indicator tracking.
domain: frontend-design

## Confidence
strong

## Vocabulary
- **Transition**:
  - **Definition**: Smoothly interpolates between two CSS property values when a property change is triggered by a state change (:hover, :focus, class toggle).
  - **Reversal**: Automatic — removing the trigger reverses the transition.
  - **Best For**: hover lifts, focus rings, color changes, dropdown opacity
  - **Css**: transition: property duration easing delay
- **Animation**:
  - **Definition**: Scripted keyframe sequence that runs independently of current property value. Fires once (or loops), does not auto-reverse.
  - **Reversal**: Manual — must set animation-direction: reverse or script a second animation.
  - **Best For**: entrance/exit, loading indicators, decorative ambient motion
  - **Css**: @keyframes name { from {} to {} } + animation: name duration easing
- **Spring**:
  - **Definition**: Physics simulation with no fixed duration. Stiffness controls restoring force (higher = snappier), damping controls friction (higher = less wobble), mass controls inertia (higher = more weight).
  - **Reversal**: Automatic — spring re-simulates toward new target value.
  - **Best For**: draggable release, tab indicators, toggles, modal slide-in
  - **Parameters**: stiffness: 80-400, damping: 8-40, mass: 0.5-3
- **Tween**:
  - **Definition**: GSAP terminology for a single animated property change from A to B with a fixed duration and easing curve. Equivalent to a CSS transition but imperative and JS-controlled.
  - **Context**: GSAP-specific term; 'animation' in CSS spec vocabulary.
- **Timeline**:
  - **Definition**: GSAP construct for sequencing multiple tweens with relative timing offsets (+=, -=). Enables choreographed multi-element motion.
  - **Context**: GSAP-specific. Motion.dev equivalent: sequence() or AnimatePresence.
- **Stagger**:
  - **Definition**: Applying the same animation to multiple elements with a successive delay between each, creating a cascade or wave effect.
  - **Parameters**: each: delay between siblings (50-100ms), from: start position

## Decision Guide
- Property value change on user interaction → CSS transition
- Element entering or leaving the DOM → CSS animation or AnimatePresence
- Physical, interruptible, draggable → spring physics
- Scripted multi-step sequence → GSAP timeline or CSS @keyframes
- Scroll-linked (progress bar, reveal) → CSS scroll-driven or GSAP ScrollTrigger

## Sources

## Confidence
strong

## Source
- CSS Transitions Level 1 specification — MDN
- CSS Animations Level 1 specification — W3C
- GSAP documentation — 'Tweens vs Timelines'
- Framer Motion / Motion.dev — 'Spring vs Tween'

## Vocabulary
- **Transition**:
  - **Definition**: Smoothly interpolates between two CSS property values when a property change is triggered by a state change (:hover, :focus, class toggle).
  - **Reversal**: Automatic — removing the trigger reverses the transition.
  - **Best For**: hover lifts, focus rings, color changes, dropdown opacity
  - **Css**: transition: property duration easing delay
- **Animation**:
  - **Definition**: Scripted keyframe sequence that runs independently of current property value. Fires once (or loops), does not auto-reverse.
  - **Reversal**: Manual — must set animation-direction: reverse or script a second animation.
  - **Best For**: entrance/exit, loading indicators, decorative ambient motion
  - **Css**: @keyframes name { from {} to {} } + animation: name duration easing
- **Spring**:
  - **Definition**: Physics simulation with no fixed duration. Stiffness controls restoring force (higher = snappier), damping controls friction (higher = less wobble), mass controls inertia (higher = more weight).
  - **Reversal**: Automatic — spring re-simulates toward new target value.
  - **Best For**: draggable release, tab indicators, toggles, modal slide-in
  - **Parameters**: stiffness: 80-400, damping: 8-40, mass: 0.5-3
- **Tween**:
  - **Definition**: GSAP terminology for a single animated property change from A to B with a fixed duration and easing curve. Equivalent to a CSS transition but imperative and JS-controlled.
  - **Context**: GSAP-specific term; 'animation' in CSS spec vocabulary.
- **Timeline**:
  - **Definition**: GSAP construct for sequencing multiple tweens with relative timing offsets (+=, -=). Enables choreographed multi-element motion.
  - **Context**: GSAP-specific. Motion.dev equivalent: sequence() or AnimatePresence.
- **Stagger**:
  - **Definition**: Applying the same animation to multiple elements with a successive delay between each, creating a cascade or wave effect.
  - **Parameters**: each: delay between siblings (50-100ms), from: start position

## Decision Guide
- Property value change on user interaction → CSS transition
- Element entering or leaving the DOM → CSS animation or AnimatePresence
- Physical, interruptible, draggable → spring physics
- Scripted multi-step sequence → GSAP timeline or CSS @keyframes
- Scroll-linked (progress bar, reveal) → CSS scroll-driven or GSAP ScrollTrigger
