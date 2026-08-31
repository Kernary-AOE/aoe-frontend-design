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

The current local dependency path is `../prime-system`. It changes to
`../kernary-engine` only after the external repository rename is complete and
clone/build CI has verified the new layout.
