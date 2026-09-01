# Build, publish, and smoke

Use the repository scripts as the release contract:

```bash
bun run typecheck
bun run test
bun run model:check
bun run corpus:build
bun run corpus:check
bun run corpus:verify
bun run smoke
```

`corpus:build` binds the model, Corpus namespace, and declared release date.
`corpus:verify` requires the signature and recomputes snapshot content. `smoke`
boots the generic and domain MCP compositions against the same `model.lock` and
executes a real selection query.

Publishing to a Registry and activating a Runtime are separate mutations. Do
not infer publication from a successful local build. Keep the previous immutable
snapshot addressable for rollback.

The local dependency path is `../kernary-engine`. The package and CI workflow use
the same path, so a fresh clone does not depend on the former repository name.
