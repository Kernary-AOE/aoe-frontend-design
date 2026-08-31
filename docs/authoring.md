# Source authoring

Humans and Agents edit `corpus/sources/`. They do not write into
`corpus/dist/`.

Before adding a Unit, load the owning Model Package and choose a declared type,
field set, and relation. Existing sources are style examples, not schema
authority. If the model has no suitable declaration, change `model/` in a
reviewed model release; do not patch Kernary Core.

Every publishable source must preserve the Corpus namespace and ID convention,
record required provenance and licence metadata, and use only declared relation
semantics. Never infer a licence from an absent field.

The optional `prime-author` compatibility Skill can guide an Agent through this
workflow. It does not publish automatically and it cannot bypass model, Corpus,
signature, or release gates.

Validate through the owning package:

```bash
bun run model:check
bun run corpus:build
bun run corpus:check
bun run corpus:verify
```

Source authoring creates a proposed release. Runtime Action execution is a
different path: it calls a declared provider under capability, policy,
preflight, approval, idempotency, and event evidence.
