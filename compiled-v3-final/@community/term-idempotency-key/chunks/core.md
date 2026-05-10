# IdempotencyKey [term] v1.0.0
> A client-supplied unique identifier (typically a UUID v4 or business-event id) attached to a non-idempotent request (POST, PATCH) that allows the server to safely deduplicate retries. The server stores the (key → response) mapping for a retention window (commonly 24 hours); subsequent requests with the same key return the original response without re-executing the operation.
domain: api-design

## Meaning
A client-supplied unique identifier (typically a UUID v4 or business-event id) attached to a non-idempotent request (POST, PATCH) that allows the server to safely deduplicate retries. The server stores the (key → response) mapping for a retention window (commonly 24 hours); subsequent requests with the same key return the original response without re-executing the operation.

## Aliases
- Idempotency-Key
- request-id (in some APIs)
- client-token (AWS)
