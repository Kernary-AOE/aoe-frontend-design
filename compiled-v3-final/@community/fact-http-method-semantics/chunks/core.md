# HttpMethodSemantics [fact] v1.0.0
RFC 9110 (HTTP Semantics, June 2022) defines normative properties for each HTTP method: SAFE (no side effects), IDEMPOTENT (multiple identical requests have the same effect as one), CACHEABLE (response may be cached). GET and HEAD are safe + idempotent + cacheable; PUT and DELETE are idempotent (not safe); POST is none of the above by default; PATCH is none.
> RFC 9110 §9 defines HTTP method properties: GET (read; safe + idempotent + cacheable). HEAD (read metadata only; safe + idempotent + cacheable). POST (process payload; not safe, not idempotent unless made so via Idempotency-Key, cacheable only if response includes Cache-Control). PUT (replace target; idempotent, not safe, not cacheable by default). DELETE (remove target; idempotent, not safe, not cacheable). PATCH (RFC 5789 — partial update; not idempotent unless designed to be, not safe, not cacheable). OPTIONS (CORS preflight + capability discovery; safe + idempotent). Status codes: 1xx informational, 2xx success, 3xx redirect, 4xx client error, 5xx server error. 200 (OK), 201 (Created — for POST that produces a resource; Location header points to it), 204 (No Content — for DELETE/PUT success without body), 301/308 (permanent redirect), 302/307 (temporary redirect), 400 (validation), 401 (auth missing), 403 (auth forbidden), 404 (not found), 409 (conflict), 412 (precondition failed — for ETag-based concurrency), 422 (semantic validation), 429 (rate limited; include Retry-After), 500 (internal), 502/503/504 (gateway / unavailable / timeout).
domain: api-design

## Confidence
strong

## Applies To
- All HTTP-based APIs (REST, RPC-over-HTTP, gRPC-Web, GraphQL-over-HTTP)
- Browser navigation behavior (form GET vs POST, back-button warning on POST)
- CDN caching layers — only safe + cacheable methods produce cached responses
- API gateway routing rules — methods are first-class routing keys
- Client retry libraries (axios-retry, fetch-retry) — only retry idempotent methods automatically

## Quantitative
- **Safe Methods**: GET, HEAD, OPTIONS, TRACE — must produce no observable side effects on the server
- **Idempotent Methods**: GET, HEAD, OPTIONS, TRACE, PUT, DELETE — multiple identical requests = single request effect
- **Non Idempotent Methods**: POST, PATCH (by default — can be made idempotent via Idempotency-Key)
- **Cacheable Default**: GET, HEAD always; POST only if explicit freshness info; PUT/DELETE/PATCH never
- **Common Status Codes**: 200/201/204 (success), 301/302/307/308 (redirect), 400/401/403/404/409/412/422/429 (client error), 500/502/503/504 (server error)
- **Retry After Header**: MUST be returned with 429 (rate limit) and 503 (service unavailable); value is seconds or HTTP-date

## Counter Conditions
- POST is NOT inherently non-idempotent — it becomes idempotent when paired with `Idempotency-Key` header (Stripe, AWS) or natural-key dedup (see @community/principle-idempotent-writes).
- Browsers do not retry POST automatically and warn users when navigating back to a POST form. Use POST/Redirect/GET pattern (303 See Other) to avoid double-submission.
- 200 OK with `{ success: false }` violates RFC 9110 — HTTP-aware tooling (monitoring, retries, gateways) keys on the status code, not the body.
- PATCH semantics depend on the patch format: RFC 6902 JSON Patch is non-idempotent; RFC 7396 JSON Merge Patch is idempotent for non-array fields. Document which you use.
- 201 Created MUST include a `Location` header pointing to the new resource — this is normative, not optional.
- DELETE on a non-existent resource: 404 (not found) is acceptable, but 204 No Content (idempotent: 'it's gone, you wanted it gone, success') is also valid per RFC 9110.
