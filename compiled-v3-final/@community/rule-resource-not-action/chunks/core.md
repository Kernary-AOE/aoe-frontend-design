# ResourceNotAction [rule] v1.0.0
REST URLs MUST identify resources, not actions. Use nouns for paths and HTTP verbs for operations. URLs containing verbs (`/createUser`, `/getOrders`, `/deleteCart`) violate REST and produce inconsistent, ambiguous APIs.
> Every URL path is a noun phrase identifying a resource or collection. State changes occur via HTTP methods: GET (read), POST (create), PUT (full replace), PATCH (partial update), DELETE (remove). For non-CRUD operations that don't fit standard verbs (e.g. 'send email', 'cancel subscription'), introduce a resource sub-collection (`POST /subscriptions/{id}/cancellations`) or use action-as-resource framing (`POST /transcoding-jobs`). Forbidden: verbs in path segments (`/getOrder`, `/listUsers`, `/deleteFile`). Forbidden: passing the operation in a query parameter (`?action=delete`). Forbidden: GET with side effects.
domain: api-design

## Applies To
- Public REST APIs (v1+ stable contracts)
- Internal microservices over HTTP
- Backend-for-frontend (BFF) endpoints
- Webhook receivers
- API gateways and load balancer rules

## Implementation Checklist
- Path segments are nouns (collections plural: /users, /orders, /products)
- HTTP method conveys operation: GET / POST / PUT / PATCH / DELETE
- Sub-resources nested when ownership is clear: /users/{id}/preferences (1-to-1) or /orders/{id}/line-items (1-to-N)
- Custom actions framed as sub-resources: POST /shipments/{id}/cancellations, POST /jobs/{id}/runs
- GET requests have NO side effects (idempotent + safe per RFC 9110)
- OpenAPI spec validates structure; CI fails if a path contains a known verb (createX, getX, deleteX, listX)

## Severity
warn

## Counter Examples
- POST /createUser — verb in URL; should be POST /users.
- GET /deleteOrder?id=42 — verb in URL AND side effect on GET; should be DELETE /orders/42.
- POST /api?action=updateProfile — operation in query string; should be PATCH /users/me/profile.
- GET /users/list — redundant verb suffix; should be GET /users.
