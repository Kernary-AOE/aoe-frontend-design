# Frontend Design tools

The Domain Package exposes seven MCP tools. Their `aoe_design_*` prefix is a
v0.2 compatibility identifier; the schemas are projected from the external
model rather than handwritten into Kernary Core.

| Tool | Use it for |
|---|---|
| `aoe_design_plan` | Turn a brief into explicit design intent and a domain selection plan |
| `aoe_design_resolve` | Resolve selected knowledge into a concrete typed design specification |
| `aoe_design_mandate` | Load blocking design requirements for the current task |
| `aoe_design_checklist` | Rank checks that should run before delivery |
| `aoe_design_related` | Traverse bounded domain relations from a known Unit |
| `aoe_design_scout` | Search the external reference catalogue with provenance and licence data |
| `aoe_design_validate` | Validate a supported HTML artifact and return actionable findings |

## Typical flow

1. Call `aoe_design_plan` with the original brief.
2. Use `aoe_design_resolve` when implementation needs concrete typography,
   color, layout, motion, or persona decisions.
3. Load `aoe_design_mandate` and `aoe_design_checklist` before implementation
   or review.
4. Use `aoe_design_related` for bounded exploration and `aoe_design_scout`
   only when external visual references materially help.
5. Write the user's artifact outside this repository.
6. For HTML, run `aoe_design_validate`, repair supported failures, and validate
   again with a bounded loop.

## Refusals are results

The domain tools fail closed when a corpus, projection reader, provider, or
Scout payload is not bound. Preserve refusal codes such as `CORPUS_NOT_BOUND`,
`PROJECTION_READER_NOT_BOUND`, and `SCOUT_NOT_BOUND`. Do not convert them into an
empty successful plan.

The generic Kernary query, plan, and resource surface remains available for
inspecting exact Units and selection arithmetic. It reads the same verified
snapshot.
