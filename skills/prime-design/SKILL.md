---
name: prime-design
description: Use the Kernary Frontend Design Domain Package tools to plan, implement, research, and validate HTML or frontend UI work. Apply when the user asks to design or revise a frontend artifact. The skill and prime_design tool prefix are compatibility names; do not use this skill to edit corpus sources.
---

# Kernary Frontend Design

The Frontend Design Domain Package supplies design knowledge, constraints and
validation through Kernary. The Agent writes the user's project code; the model,
corpus, and compiled snapshot remain read-only during this flow.

## Workflow

1. Call `prime_design_plan` with the brief to make intent and ambiguity explicit.
2. Call `prime_design_resolve` before implementation when concrete typography,
   colour, layout, motion or persona decisions are needed.
3. Use `prime_design_mandate` and `prime_design_checklist` for non-negotiables and
   task-specific checks. Use `prime_design_related` when exploring one known unit.
4. Call `prime_design_scout` only when external visual references materially help;
   preserve the returned provenance and licence information.
5. Implement or revise the artifact in the user's project.
6. For HTML output, call `prime_design_validate` with the artifact path and the
   original brief. Repair supported failures and validate again with a bounded
   loop. Report skipped evaluation layers as skipped.

Read [references/tools.md](references/tools.md) when choosing among the seven
tools or interpreting a refusal.

## Boundaries

- Do not invent a design result when a corpus-backed tool reports that no corpus,
  projection reader or Scout payload is bound.
- Do not edit Model, Corpus source or generated bundle files during ordinary
  frontend work.
- Treat plans and retrieved units as guidance; reconcile them with the user's
  explicit requirements and the existing application.
- `prime_design_validate` validates HTML. For another artifact type, apply the
  usable plan/checklist and state that the HTML validator was not applicable.
