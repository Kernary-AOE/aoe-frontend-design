# Frontend Design for Kernary

<img src="docs/assets/kernary-logo.svg" alt="Kernary" width="420">

This repository is a complete Domain Package built on Kernary. It owns the
Frontend Design model, curated corpus, retrieval profiles, validators, adapters,
tools, and an optional Agent Skill.

Nothing here is built into the Kernary engine. This package is a worked example
of how a domain defines its own types and relations, compiles a versioned
snapshot, and exposes domain tools without changing Core.

```text
model/       types, relations, projections, retrieval, actions, and migrations
corpus/      declaration, 797 publishable sources, quarantine, eval, and dist
adapters/    intent, ranking, resolution, standards, validation, and Scout
mcp/         seven tools projected from the domain model
skills/      optional Agent consumption workflow
benchmarks/  fixed domain evaluation tasks
```

## Verify the package

Clone the Kernary engine at the current compatibility path
`../kernary-engine`, then run:

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

The release build compiles exactly 797 sources whose licence policy permits
publication. Another 102 units remain in `corpus/quarantine/`; they cannot enter
a release until their disposition is explicit. `corpus/dist/` is generated and
must not be edited by hand.

## Domain tools

The Model Package projects seven compatibility-prefixed MCP tools:

- `prime_design_plan`
- `prime_design_resolve`
- `prime_design_validate`
- `prime_design_related`
- `prime_design_mandate`
- `prime_design_checklist`
- `prime_design_scout`

The prefix remains during the Kernary v0.2 compatibility window. The generic
query, plan, and resource tools belong to the engine. Both surfaces mount the
same immutable snapshot and verify the same `model.lock`.

## Optional Skill

`skills/prime-design` teaches an Agent how to combine the seven domain tools.
The folder name is retained for compatibility. It is not required to use the
SDK, MCP, or HTTP contracts, and it cannot edit the model, corpus, or generated
bundle during an ordinary design task.

## Ownership

- Change a Frontend Design type, field, relation, projection, retrieval profile,
  action, or migration in `model/`.
- Add or revise knowledge in `corpus/sources/`.
- Connect external systems in `adapters/`.
- Change Agent workflow guidance in `skills/`.
- Do not patch Kernary Core for Frontend Design semantics.

Start with [the domain overview](docs/overview.md), then read the
[model](docs/model.md), [Corpus policy](docs/corpus.md),
[retrieval](docs/retrieval.md), [tools](docs/mcp-tools.md),
[HTML validation](docs/validator-html.md), [Scout](docs/scout.md), and
[release operations](docs/operations.md). The architectural walkthrough is in
the [case study](docs/case-study.md).
