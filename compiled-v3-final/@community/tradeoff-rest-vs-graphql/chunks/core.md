# RestVsGraphql [tradeoff] v1.0.0
Choosing between REST (resource-oriented, HTTP-native) and GraphQL (query-oriented, schema-flexible) for a new API. Each optimizes for different consumer patterns; the wrong choice imposes friction across years of API evolution.
domain: api-design

## Label
REST vs GraphQL for API Design

## Axes
- consumer-shape
- data-fetching-pattern
- caching-needs
- team-experience
- ecosystem-coverage

## Decision
```
if api-consumers == "broad public ecosystem (third-party developers, SDK users, partners)":
→ REST
reasons: "Lower learning curve, every HTTP tool understands it, CDN caching free, OpenAPI ecosystem mature"

elif api-consumers == "single mobile + web frontend, query-heavy product (feeds, dashboards)":
→ GraphQL
reasons: "Avoid over-fetching, type-safe codegen, single endpoint reduces round-trips, frontend chooses fields"

elif api-consumers == "internal microservices, strict typing requirements":
→ gRPC (neither REST nor GraphQL, but worth considering)
reasons: "Protobuf wire format, strict contracts, bidirectional streaming, smallest payloads"

elif api-consumers == "TypeScript monorepo end-to-end (web + mobile via React Native)":
→ tRPC (also worth considering)
reasons: "Type inference end-to-end without code generation, fastest iteration"

else:
→ REST (default)
reasons: "Familiar to most engineers; harder to misuse than GraphQL; sufficient for >80% of API needs"
```

## Cost Of Rest
- Multiple round-trips for nested data (N+1 fetches: GET /user, GET /user/{id}/posts, GET /post/{id}/comments)
- Over-fetching: endpoint returns all fields; client uses 3 of 30
- Versioning is path-based and ages awkwardly (/v1/, /v2/, /v3/ proliferate)
- Contract less expressive — separate docs for fields, types, errors per endpoint
- Custom actions (POST /users/{id}/cancel) feel like bolted-on RPC

## Cost Of Graphql
- N+1 server-side problem requires DataLoader (extra discipline)
- Caching is a deliberate design (Apollo, Relay) — HTTP cache layers do NOT work natively
- Authorization complexity scales with field-count (every field is a permission decision)
- Single endpoint defeats per-route rate limiting and CDN caching
- Query complexity attacks: malicious nested queries DoS the server unless cost-limited
- Public GraphQL is harder than REST for third parties to consume — fewer SDK generators
- Schema-first commitment: changing types is a breaking change; deprecation requires care

## Cost Of Grpc
- Browser support requires gRPC-Web proxy (envoy, grpc-web) — more infrastructure
- Debugging tools less mature than REST (curl, Postman just work for REST)
- Streaming is powerful but adds operational complexity
- Public-facing gRPC is rare (Cloudflare, Google offer it; most others don't)
