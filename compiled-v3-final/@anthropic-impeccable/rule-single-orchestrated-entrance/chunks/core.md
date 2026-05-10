# SingleOrchestratedEntrance [rule] v1.0.0
> A single orchestrated page-load sequence with staggered reveals produces more delight than micro-interactions scattered across the interface. Motion budget should be concentrated at high-impact moments rather than spread uniformly.
domain: frontend-design

## Label
Prefer One Well-Orchestrated Page Load Over Scattered Micro-Interactions

## Budget Guidance
- Allocate most of the motion budget to the page-load entrance sequence.
- Reserve micro-interactions for state changes with direct feedback meaning (button press, toggle, form validation).
- Hover animations should be subtle and fast (100-200ms) — they are confirmation, not spectacle.
- Do not animate elements that the user did not interact with and did not scroll to; reserve scroll-triggered reveals for intentional scroll experiences.
