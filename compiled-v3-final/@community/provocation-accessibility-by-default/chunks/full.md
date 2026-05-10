# AccessibilityByDefault [provocation] v1.0.0
domain: accessibility

## Label
If Accessibility Is a Feature, You Will Always Cut It

## Trigger
team treating accessibility as a separate workstream, a 'phase 2' commitment, an a11y-audit at launch, or a checklist that ships at the end of the sprint

## Question
If accessibility is a feature on your roadmap, ask yourself: when was the last time a feature on the roadmap was prioritized higher than a customer-facing growth metric? Now project: at the end of this quarter, when revenue targets slip and the design team is overloaded, which feature gets cut? Accessibility-as-a-feature is accessibility-as-a-cuttable-line-item. The only configuration that survives quarterly priority reviews is accessibility as a non-negotiable property of every shipped surface — like 'doesn't crash' or 'doesn't leak credit cards.'

## Intent
Treating accessibility as a deliverable is the root cause of most accessibility failures. Deliverables get scoped, deprioritized, and cut. The shift required is from 'we will add accessibility' to 'we cannot ship something inaccessible' — which means tooling, code review, design review, and definition-of-done must enforce a baseline at every gate. The provocation forces teams to confront that 'accessibility-when-we-have-time' is functionally identical to 'accessibility-never.'

## Resolution Paths
-
  - **Context**: A11y is a backlog item / phase-2 / pre-launch audit
  - **Answer**: Move it out of the backlog and into definition-of-done. No PR merges without axe-core CI passing. No design ships without contrast and focus checks. Make it a property, not a task.
-
  - **Context**: Team has no a11y expertise
  - **Answer**: Hire one consultant for 4 weeks to set up: CI tooling (@community/tool-axe-core), design system primitives (Radix/Headless UI), and a definition-of-done checklist. Then maintain via tooling, not headcount.
-
  - **Context**: Existing product with massive a11y debt
  - **Answer**: Stop the bleed first: a11y CI on new code only (no merges with violations). Then prioritize debt by user impact: keyboard navigation > color contrast > ARIA labels > screen-reader narration.
-
  - **Context**: Team claims 'our users don't need it'
  - **Answer**: 1.3 billion people have a disability. ~15% of any audience uses some assistive tech. Your users do need it — you've just designed a product that excludes them, which is selection bias not market signal.

## Enforcement Mechanisms
- axe-core / @axe-core/playwright in CI — fail PR on critical/serious violations
- ESLint plugins: eslint-plugin-jsx-a11y, eslint-plugin-vuejs-accessibility
- Design tokens enforce minimum contrast (color pairs are pre-validated)
- Component primitives (Radix, Headless UI, ARIA Patterns) handle focus/keyboard correctly by default
- Definition-of-done includes: keyboard navigable, screen reader announces, contrast ≥ 4.5:1
- Design review checklist includes focus-visible, target size, motion preference
