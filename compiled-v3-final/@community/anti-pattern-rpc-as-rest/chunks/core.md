# RpcAsRest [anti-pattern] v1.0.0
An API that uses HTTP+JSON but ignores REST semantics: verb-in-URL paths, status codes that don't match operations, GET with side effects, POST for everything. The result is a worst-of-both-worlds API that loses RPC's type safety AND REST's tooling compatibility.
domain: api-design

## Label
RPC Disguised as REST

## Why Bad
RPC-as-REST tries to look modern (HTTP, JSON) while behaving like a 1990s SOAP API. Symptoms: every endpoint is POST regardless of operation; URLs encode verbs (`/createUser`, `/deleteOrder`); errors return 200 OK with `{ success: false }`; GET is used for mutations because 'POST is awkward from browsers'; resources are conflated with actions in arbitrary ways. The cost: (1) HTTP caches cannot cache responses (POST is non-idempotent by spec); (2) API gateways cannot enforce per-method rate limits or auth policies; (3) OpenAPI generators produce useless schemas; (4) client retry logic cannot distinguish safe-to-retry GET from unsafe-to-retry POST; (5) SDK generators cannot infer types correctly. If you wanted RPC, gRPC or tRPC give you better type safety, smaller payloads, and bidirectional streaming. If you wanted REST, follow REST. RPC-as-REST gets neither.

## Instead Do
Choose intentionally. For internal/microservice traffic with strict typing requirements: use gRPC (Protobuf wire format, strict contracts, code generation, streaming). For browser-callable internal APIs in a TypeScript monorepo: use tRPC (type inference end-to-end, no IDL). For public APIs and broad ecosystem compatibility: use REST properly (resource paths, HTTP methods carry meaning, status codes follow RFC 9110, hypermedia links per HAL or JSON:API, ETags for caching, idempotency keys for retries). Document the choice. The worst outcome is mixing styles within a single API surface.

## Structure
```
    /* WRONG — RPC dressed in HTTP clothing */
    POST /api?action=createUser  { name, email }    → 200 { success: true, id: 1 }
    POST /api?action=getUser     { id: 1 }          → 200 { success: true, user: {...} }
    POST /api?action=deleteUser  { id: 1 }          → 200 { success: true }
    POST /api?action=getUser     { id: 999 }        → 200 { success: false, error: 'not_found' }

    Problems:
      - Every operation is POST; no caching possible
      - Errors hidden behind 200 OK; HTTP-aware monitors can't alert on failures
      - URL is meaningless; routing layer cannot enforce per-resource auth
      - Client retry libraries cannot distinguish safe vs unsafe operations

    /* CORRECT — REST with HTTP semantics */
    POST   /v1/users                { name, email }
           → 201 Created  Location: /v1/users/u_abc  { id, name, email, created_at }
    GET    /v1/users/u_abc
           → 200 OK   ETag: "..."   Cache-Control: private, max-age=60   { ... }
    GET    /v1/users/u_999
           → 404 Not Found  { error: { code: 'user_not_found', message: '...' } }
    DELETE /v1/users/u_abc
           → 204 No Content
    PATCH  /v1/users/u_abc          { name: 'new' }
           → 200 OK   { id, name, ... }

    /* OR if you wanted RPC — use a real RPC framework */
    // gRPC service
    service Users {
      rpc Create(CreateUserRequest) returns (User);
      rpc Get(GetUserRequest) returns (User);
      rpc Delete(DeleteUserRequest) returns (google.protobuf.Empty);
    }
    // Strict types, codegen for every language, HTTP/2, streaming.
  
```
