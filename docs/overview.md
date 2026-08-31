# Frontend Design Domain Package

This repository is an external Kernary domain. Its model and release policy,
not the engine, decide what a Frontend Design Unit looks like and how it is
retrieved or acted on.

## Owned surfaces

- `model/` declares domain types, relation semantics, projection rules,
  retrieval profiles, functions, actions, and migrations.
- `corpus/sources/` contains the 797 sources eligible for the current release.
- `corpus/quarantine/` contains 102 units with unresolved publication policy.
- `corpus/dist/` is the generated, signed snapshot.
- `adapters/` implements domain ranking, intent, standards, validation,
  resolution, and the external Scout catalogue.
- `mcp/` exposes seven model-projected domain tools.
- `skills/` contains optional Agent workflow guidance.

## What is domain-specific

The model uses design concepts such as persona, principle, rule, pattern,
template, typography, color, motion, and accessibility. The retrieval adapters
use six design axes. The HTML validator and Scout catalogue also belong to this
domain.

None of those concepts is a Kernary Core type. A Security or Ticket package can
declare different types, relations, projections, constraints, and tools while
using the same compiler, snapshot, query, action, and transport contracts.

## Release inventory

The active release has 797 publishable sources. A source enters the release only
when model conformance, relation integrity, provenance, and licence policy pass.
Quarantined units are preserved for disposition; they are not counted as a
successful migration and are not copied into `corpus/dist/`.

Run `bun run corpus:build && bun run corpus:verify` to reproduce and verify the
release. Historical inventories and paths are kept under `docs/legacy/`.

## Read next

- [Retrieval](retrieval.md) explains the domain's six-axis selection adapter.
- [MCP tools](mcp-tools.md) lists the seven model-projected tools.
- [HTML validator](validator-html.md) documents the supported artifact path.
- [Source authoring](authoring.md) covers the compatibility `.prime` source form.
