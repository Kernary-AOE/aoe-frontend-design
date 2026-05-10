# PublicApi [scope] v1.0.0
Defines applicability for atoms whose guidance applies only to public API surfaces — endpoints exposed beyond the controlling team. Internal APIs (single-team monorepo) may relax some constraints; public APIs MUST satisfy them all due to long-term contract obligations.
domain: api-design

## Label
Public-Facing REST/RPC API Surfaces

## Preconditions
-
  - **Id**: consumed-by-external-clients
  - **Check**: API is consumed by at least one consumer outside the producing team — partner integrations, third-party developers, separate product-team frontends, public SDK users
  - **On Fail**: Atom may not apply. Internal APIs can iterate freely; public APIs cannot.
-
  - **Id**: versioning-strategy-defined
  - **Check**: API has an explicit versioning strategy (path /v1/, header-based, semver) and a documented deprecation policy
  - **On Fail**: Define the versioning strategy before opening the API to external consumers.
-
  - **Id**: openapi-or-equivalent-contract
  - **Check**: API surface is described by an OpenAPI 3.x spec (REST), Protocol Buffer (gRPC), or GraphQL SDL — the contract is machine-readable and validated in CI
  - **On Fail**: Generate or author a contract spec before public release; SDK generation and partner integration require it.

## Applies To
- Public REST APIs (api.example.com/v1/*)
- Partner-facing webhook receivers — consumers depend on payload schema
- SDKs published to npm, PyPI, Maven Central — consumers pin versions
- GraphQL endpoints exposed to third-party clients
- OAuth-protected APIs that external developers register applications for

## Out Of Scope
- Internal microservice-to-microservice traffic within a single team's blast radius
- Backend-for-frontend (BFF) endpoints owned and consumed by the same product team
- Experimental APIs behind a feature flag with documented contract instability
- Admin tools used only by employees

## Environment
- **Runtime**: Any HTTP-capable backend (Node.js, Go, Rust, Python, Java)
- **Api Gateway**: Often present (Kong, Tyk, Zuul, AWS API Gateway, Cloudflare Workers)
- **Required Tooling**:
  - OpenAPI spec generator
  - Schema-based validation (zod, ajv)
  - Idempotency key store (Redis)
- **Monitoring**:
  - per-endpoint latency p99
  - error rate by status code
  - rate-limit headers
