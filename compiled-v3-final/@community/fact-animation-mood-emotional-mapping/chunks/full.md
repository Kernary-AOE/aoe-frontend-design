# AnimationMoodEmotionalMapping [fact] v1.0.0
Animation duration and easing curve combinations produce distinct emotional tones: slow+ease-out reads as 'confident/luxury', fast+spring reads as 'playful/energetic', instant+linear reads as 'precise/technical' — matching motion to brand persona is as important as matching color.
> Users perceive motion character before they consciously notice it. A 1200ms ease-out entrance feels editorial; a 250ms spring feels app-like; a 80ms linear press feels precise. Duration, easing type, distance, and whether physics is used (spring vs curve) combine to create the personality of a product's motion system. Mismatched motion creates subconscious dissonance even when visual design is correct.
domain: frontend-design

## Confidence
strong

## Mood Map
- **Confident / Authoritative**:
  - **Duration**: 400-800ms
  - **Easing**: ease-out (cubic-bezier(0.16, 1, 0.3, 1))
  - **Distance**: moderate (20-40px)
  - **Spring**: false
  - **Examples**: Government, financial, healthcare, enterprise SaaS
- **Luxury / Editorial**:
  - **Duration**: 800-1400ms
  - **Easing**: ease-out or ease-in-out (cubic-bezier(0.4, 0, 0.2, 1))
  - **Distance**: generous (40-80px)
  - **Spring**: false
  - **Examples**: Fashion brands, luxury products, editorial publications
- **Playful / Consumer**:
  - **Duration**: 200-400ms
  - **Easing**: spring or ease-spring (cubic-bezier(0.34, 1.56, 0.64, 1))
  - **Distance**: exaggerated (overshoot)
  - **Spring**: true
  - **Examples**: Consumer apps, games, social platforms, onboarding
- **Precise / Technical**:
  - **Duration**: 80-200ms
  - **Easing**: ease-out or linear for data viz
  - **Distance**: small (4-8px)
  - **Spring**: false
  - **Examples**: Developer tools, IDEs, data dashboards, terminal UIs
- **Warm / Approachable**:
  - **Duration**: 250-400ms
  - **Easing**: ease-out
  - **Distance**: small to moderate (8-20px)
  - **Spring**: false
  - **Examples**: Healthcare patient portals, educational apps, community platforms
- **Minimal / Neutral**:
  - **Duration**: 150-250ms
  - **Easing**: ease-out
  - **Distance**: very small (4-12px)
  - **Spring**: false
  - **Examples**: Productivity tools, document editors, system UIs

## Applies To
- Choosing duration scale for a new design system
- Aligning motion to persona (see @community/persona-*)
- Diagnosing motion-brand mismatch ('this feels too playful for a B2B tool')

## Sources

## Confidence
strong

## Source
- Val Head, 'Designing Interface Animation' (Rosenfeld, 2016) — motion personality systems
- IBM Carbon Design System — motion guidelines 2023
- Apple HIG — Motion: duration and easing by context
- Stripe Design — motion principles (observed)

## Mood Map
- **Confident / Authoritative**:
  - **Duration**: 400-800ms
  - **Easing**: ease-out (cubic-bezier(0.16, 1, 0.3, 1))
  - **Distance**: moderate (20-40px)
  - **Spring**: false
  - **Examples**: Government, financial, healthcare, enterprise SaaS
- **Luxury / Editorial**:
  - **Duration**: 800-1400ms
  - **Easing**: ease-out or ease-in-out (cubic-bezier(0.4, 0, 0.2, 1))
  - **Distance**: generous (40-80px)
  - **Spring**: false
  - **Examples**: Fashion brands, luxury products, editorial publications
- **Playful / Consumer**:
  - **Duration**: 200-400ms
  - **Easing**: spring or ease-spring (cubic-bezier(0.34, 1.56, 0.64, 1))
  - **Distance**: exaggerated (overshoot)
  - **Spring**: true
  - **Examples**: Consumer apps, games, social platforms, onboarding
- **Precise / Technical**:
  - **Duration**: 80-200ms
  - **Easing**: ease-out or linear for data viz
  - **Distance**: small (4-8px)
  - **Spring**: false
  - **Examples**: Developer tools, IDEs, data dashboards, terminal UIs
- **Warm / Approachable**:
  - **Duration**: 250-400ms
  - **Easing**: ease-out
  - **Distance**: small to moderate (8-20px)
  - **Spring**: false
  - **Examples**: Healthcare patient portals, educational apps, community platforms
- **Minimal / Neutral**:
  - **Duration**: 150-250ms
  - **Easing**: ease-out
  - **Distance**: very small (4-12px)
  - **Spring**: false
  - **Examples**: Productivity tools, document editors, system UIs

## Applies To
- Choosing duration scale for a new design system
- Aligning motion to persona (see @community/persona-*)
- Diagnosing motion-brand mismatch ('this feels too playful for a B2B tool')
