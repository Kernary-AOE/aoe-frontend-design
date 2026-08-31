# Prime Frontend Design

The reference external domain package for Prime. It owns all frontend-design
semantics and data; the Prime engine owns none of them.

```text
model/       prime-design types, relations, projections, retrieval and actions
corpus/      declaration, 797 licensed sources, quarantine, eval and generated dist
adapters/    intent, six-axis ranking, resolution, standards, validation and Scout
mcp/         seven model-projected domain tools
skills/      Agent consumption and source-authoring workflows
benchmarks/  fixed domain evaluation tasks
```

## Verify

Clone `prime-system` as a sibling directory, then:

```bash
bun install
bun run typecheck
bun run test
bun run model:check
bun run corpus:build
bun run corpus:check
bun run corpus:verify
bun run smoke
```

The build compiles exactly 797 publishable `.prime` sources. Another 102 units
remain in `corpus/quarantine/` and cannot enter a release until their licence
policy is resolved. `corpus/dist/` is generated and must not be edited manually.

## Tools

The Model Package projects these MCP tools; their schemas are not handwritten:

- `prime_design_plan`
- `prime_design_resolve`
- `prime_design_validate`
- `prime_design_related`
- `prime_design_mandate`
- `prime_design_checklist`
- `prime_design_scout`

The generic `prime_query`, `prime_plan` and `prime_resource` tools remain owned by
Prime System. Both compositions mount the same immutable bundle and verify the
same `model.lock`.

## Ownership rule

Add or change a frontend-design kind, field, relation, profile or action in
`model/`. Add knowledge in `corpus/sources/`. Add external integration code in
`adapters/`. Do not patch Prime System for domain semantics.
