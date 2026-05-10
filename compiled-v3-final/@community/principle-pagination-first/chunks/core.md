# PaginationFirst [principle] v1.0.0
Every list endpoint must paginate from day one. Adding pagination to an unbounded endpoint after launch is a breaking change that requires every client to update; defaulting to a hard cap (e.g. 50 items) future-proofs the API at zero cost on day one.
> List endpoints (GET /collection) MUST return paginated responses with: (1) a default page size (commonly 20–50, never unbounded); (2) a maximum page size enforced server-side (e.g. 100); (3) explicit pagination metadata in the response body (cursor or next/prev links); (4) links following RFC 5988 Web Linking conventions OR the JSON:API pagination object. Clients that pass `?page_size=10000` get 100 (capped) and a `next` cursor. The contract is established before any list endpoint ships; retrofitting pagination requires a new version (v2) and a migration window.
domain: api-design

## Attributed To
Mark Nottingham, 'Web API Versioning' (RFC 9170-related); GitHub API, Stripe API, Twitter API design conventions; JSON:API specification.

## Applies To
- All collection endpoints (GET /users, GET /orders, GET /comments)
- Search endpoints (GET /search?q=...)
- Filtered subresources (GET /users/{id}/sessions)
- Webhook event lists, audit logs, transaction histories — high-cardinality time-series
- Internal admin tools that read production tables

## Counter Examples
- GET /users returns a single JSON array of all 50,000 users. Client OOMs on page load; database query takes 12 seconds; cache TTL collapses.
- Pagination added later as `?page=2` — old clients still pass no page parameter and get a different (now first 100) result; existing UI silently shows truncated data without indication.
- `?limit` is honored but no `next` cursor returned — clients implement manual offset (`?limit=100&offset=200`); offset pagination breaks under concurrent inserts (skips/duplicates rows).
