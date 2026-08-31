# HTML validation

`adapters/html-validator/` implements the provider bound to the model-declared
`validate` Action. The MCP projection is `prime_design_validate` during the v0.2
compatibility window.

The action accepts an absolute HTML path and the original brief. Its capability
is `filesystem:read`; it does not modify the artifact.

## Report

The `ValidationReport` type is declared in
`model/tools/design-actions.yaml`. It separates:

- L1 structural and accessibility findings;
- L2 aesthetic alignment, including an explicit skipped state when no evaluator
  provider is available;
- L3 evidence that required or forbidden composition signatures are honored;
- a final pass value and repair feedback.

An unsupported question cannot pass merely because the evaluator did not
understand it. Missing providers and unverifiable design principles remain
visible in the report.

Run the domain tests with `bun test adapters/html-validator test`. For an Agent
workflow, validate after implementation, repair supported failures, and repeat
with a bounded loop.
