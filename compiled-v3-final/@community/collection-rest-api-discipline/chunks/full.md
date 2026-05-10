# REST API Discipline Bundle [collection] v1.0.0
Atoms required to design, ship, and evolve a REST API that survives migration, scales beyond 10K rows per collection, and stays compatible with API gateways, SDK generators, and CDN caches. Combines resource modeling, pagination, error envelope, idempotency, and HTTP method semantics.

## Includes
- @community/fact-http-method-semantics
- @community/rule-resource-not-action
- @community/principle-pagination-first
- @community/pattern-cursor-pagination
- @community/type-pagination-cursor
- @community/type-error-shape
- @community/principle-idempotent-writes
- @community/rule-event-schema-versioning
- @community/anti-pattern-rpc-as-rest

## Target
claude-code

## Entry Point
```
    When designing or reviewing a REST API surface, the bundle enforces:

    1. RESOURCE MODELING
       - Paths are nouns (collections plural): /users, /orders, /products.
       - Verbs go on HTTP methods (GET/POST/PUT/PATCH/DELETE).
       - Non-CRUD actions become sub-resources: POST /shipments/{id}/cancellations.
       - See @community/rule-resource-not-action.

    2. HTTP METHOD SEMANTICS (RFC 9110)
       - GET: safe + idempotent + cacheable. No side effects.
       - POST: not safe; idempotent ONLY when paired with Idempotency-Key.
       - PUT: idempotent full replacement.
       - PATCH: partial update — document the patch format (JSON Patch / Merge Patch).
       - DELETE: idempotent removal.

    3. STATUS CODES (RFC 9110)
       - 200/201/204 success; 301/302/307/308 redirect; 4xx client error; 5xx server error.
       - 201 Created MUST include Location header.
       - 429 / 503 MUST include Retry-After header.
       - NEVER 200 OK with `{ success: false }` — use the right status code.

    4. PAGINATION (Day One)
       - Every list endpoint paginates from launch. No exceptions.
       - Default page size 20-50; max 100; enforced server-side.
       - Cursor-based for high-cardinality / mutable collections; offset acceptable for stable < 1000 rows.
       - Response envelope: @community/type-pagination-cursor.

    5. ERROR ENVELOPE (RFC 9457)
       - Content-Type: application/problem+json
       - Body shape: @community/type-error-shape (type, title, status, detail, code, instance, request-id).
       - Stable `code` field for client dispatch; localized `title` and `detail`.

    6. IDEMPOTENCY
       - POST mutations accept `Idempotency-Key` header (client-supplied UUID).
       - Server stores key + response for 24-hour replay window.
       - Repeated POST with same key returns cached original response.
       - See @community/principle-idempotent-writes.

    7. VERSIONING
       - Major version in path: /v1/, /v2/.
       - Breaking changes ship on a new major; old version supported for ≥ 12 months.
       - Webhook payloads carry explicit schema version (@community/rule-event-schema-versioning).

    8. AUTHENTICATION
       - Bearer tokens or OAuth 2.1; never API keys in URLs (logged everywhere).
       - 401 (auth missing/invalid) vs 403 (auth correct but no permission).
       - WWW-Authenticate header on 401 indicates the auth scheme.

    9. RATE LIMITING
       - X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset headers on every response.
       - 429 Too Many Requests with Retry-After when exceeded.

    10. OPENAPI CONTRACT
        - Spec generated from code (not hand-written) and validated in CI.
        - SDK generation from OpenAPI: openapi-generator, fern, stainless.
  
```

## Recommended Implementation
```
    Stack: TypeScript + Fastify or Express + zod schemas + openapi-zod-router (auto-generates spec from code).
    Or: Go + huma (OpenAPI-first); Python + FastAPI (auto-generates spec); Rust + utoipa.

    Pagination: implement cursor in core ORM layer; expose helper `paginate(query, cursor, limit)`.
    Errors: middleware that maps domain errors to RFC 9457 envelope.
    Idempotency: middleware that intercepts POST + Idempotency-Key, stores in Redis with 24h TTL.

    Stripe / GitHub / Linear API documentation are gold-standard references for layout and tone.
  
```
