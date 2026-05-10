# IdempotentWrites [principle] v1.0.0
Every write to a downstream system (database, queue, API, blob store) must be safely retryable: re-applying the same operation N times must produce exactly the same observable state as applying it once. In distributed systems, retries are inevitable — at-least-once delivery is the default.
> Producers must attach a stable idempotency key (UUID, business-event-id, deterministic hash) to every write. Consumers must deduplicate by key before applying side effects, and the deduplication window must exceed the maximum retry horizon of any upstream client. Naked INSERTs, fire-and-forget HTTP POSTs, and counter-increment operations without compensating logic are forbidden in any pipeline that can retry.
domain: data-engineering
