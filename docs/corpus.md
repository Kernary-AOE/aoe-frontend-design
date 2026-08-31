# Corpus and release policy

`corpus/prime-corpus.yaml` is the source declaration for the Frontend Design
Corpus Package. It is distinct from the generated
`corpus/dist/corpus.manifest.json`.

The declaration owns:

- corpus namespace and version;
- compatible Model Package range;
- source sets and per-set provenance;
- per-Unit licence requirements and citations;
- assets and publication policy;
- default retrieval and evaluation configuration.

## Current inventory

The publishable release contains 797 `.prime` sources. Each carries explicit
protocol metadata and a licence accepted by the Corpus policy. Another 102 Units
are retained under `corpus/quarantine/` because their upstream terms are
non-publishable or unresolved.

Quarantine is not deletion and it is not a passing release. Each excluded Unit
keeps a recorded disposition so a later rights decision can be audited.

## Build and verify

```bash
bun run corpus:build
bun run corpus:check
bun run corpus:verify
```

The build writes to staging and atomically replaces `corpus/dist/` only after
the compiler, graph checks, manifest, lock, signature, and strict runtime load
pass. Never edit generated projections, indexes, manifests, locks, or signatures.
