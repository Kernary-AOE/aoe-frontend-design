# Frontend Design model

`model/prime-model.yaml` is the root of the external Model Package. It uses the
`prime/model/v2` compatibility protocol identifier and includes six declaration
files:

- `types.yaml`
- `relations.yaml`
- `projections.yaml`
- `retrieval/six-axis.yaml`
- `retrieval/severity.yaml`
- `tools/design-actions.yaml`

The model owns every Frontend Design type, field, relation behavior, projection,
retrieval feature, severity rule, tool input, and action provider binding. The
Kernary engine validates and executes these declarations without importing this
repository.

Change the model when a domain contract changes. Change an adapter only when the
external implementation of a declared generator, validator, or provider changes.
Do not add a domain type to the engine parser.

Validate with:

```bash
bun run model:check
```

The command loads the real model, checks references and provider declarations,
and fails when the package is incomplete. `model.lock` is generated during the
Corpus build; do not edit it here or in `corpus/dist/`.
