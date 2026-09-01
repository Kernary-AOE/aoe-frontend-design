# Six-axis retrieval

Six-axis retrieval is a Frontend Design profile, not a Kernary Core pipeline.
The declaration lives in `model/retrieval/six-axis.yaml`; the candidate
generators and feature extraction live in `adapters/design-ranker/`.

## Axes

| Axis | Candidate intent |
|---|---|
| register | Persona or design-school fit |
| pattern | Structural patterns and templates |
| motion | Motion, easing, animation, and transition guidance |
| typography | Font, hierarchy, readability, and line treatment |
| color | Palette, contrast, theme, and color-system guidance |
| rules | High-leverage rules, constraints, and checks |

The model also declares the five scored features, the `forbidden-atoms` hard
constraint, per-axis candidate predicates, fallbacks, and the default axis
budget. The adapter registers those generator names with Kernary's Query Engine.

Ranking happens before the per-axis budget is sliced. Visibility is enforced by
the generic engine before a candidate provider can leak a private Unit. The
result is a normal Selection Plan with score contributions, constraint
decisions, projection loads, and diagnostics.

Use `aoe_design_plan` for the composed domain workflow. Use the generic
compatibility `aoe_plan` when inspecting exact selection arithmetic.
