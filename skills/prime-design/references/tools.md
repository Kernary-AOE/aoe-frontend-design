# Prime design tools

| Tool | Use |
|---|---|
| `prime_design_plan` | Convert a brief into declared design intent |
| `prime_design_resolve` | Produce a concrete typed design specification from corpus retrieval |
| `prime_design_mandate` | Load blocking severity requirements |
| `prime_design_checklist` | Rank checks for the current task |
| `prime_design_related` | Traverse bounded relations from a known unit |
| `prime_design_scout` | Search external reference catalogues with provenance |
| `prime_design_validate` | Validate an HTML artifact and produce actionable feedback |

The generic `prime_query`, `prime_plan` and `prime_resource` tools expose the
domain-neutral bundle surface. Prefer the domain tools for the composed design
workflow and generic tools for inspecting exact units or selection arithmetic.

A tool refusal is part of the contract. Surface codes such as
`CORPUS_NOT_BOUND`, `PROJECTION_READER_NOT_BOUND` or `SCOUT_NOT_BOUND`; do not
turn them into an empty successful result.
