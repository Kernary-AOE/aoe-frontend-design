# ApiVersioningPain [feedback] v1.0.0
Accumulated feedback from teams who shipped a public REST API and lived through 2+ major versions. Captures the pain points that did not appear in v1 design but emerged once the contract was real and consumers existed.
domain: api-design

## Target
@community/collection-rest-api-discipline

## Observations
- **Sample Size**: 6
- **Period**: 2023 to 2026
- **Success Rate**: 0.83
- **Common Failures**:
  -
    - **Step**: @community/principle-pagination-first
    - **Failure**: v1 shipped without pagination on a list endpoint that 'will only ever have a few items'; 2 years later customers have 50K items
    - **Frequency**: 0.5
    - **Impact**: endpoint becomes O(n) database scan; clients OOM; emergency v1.1 with paginated response that breaks existing clients
    - **Mitigation**: pagination from day 1, ALWAYS, regardless of expected volume
  -
    - **Step**: schema field deprecation
    - **Failure**: v1 field renamed in v2 but v1 still supported; the code path maintaining BOTH fields develops bugs at the seams
    - **Frequency**: 0.83
    - **Impact**: engineering effort across both versions; subtle behavioral differences emerge; consumers pin v1 forever
    - **Mitigation**: deprecation policy: announce in v2 release notes, support v1 for 12 months, log deprecation warning header (Deprecation + Sunset per RFC 8594), then remove
  -
    - **Step**: error envelope drift
    - **Failure**: early endpoints return ad-hoc error shapes ('error': string); later endpoints adopt RFC 9457; two formats live in the same API surface
    - **Frequency**: 0.67
    - **Impact**: client error-handling code branches by endpoint; SDKs become messy
    - **Mitigation**: lock error envelope (@community/type-error-shape) in v1.0 spec; add RFC 9457 conformance check to CI
  -
    - **Step**: @community/principle-idempotent-writes
    - **Failure**: POST endpoints did not require Idempotency-Key in v1; client retries cause duplicate charges; production incident at month 14
    - **Frequency**: 0.33
    - **Impact**: 1-3 customer-facing duplicate-write incidents per quarter; manual reconciliation cost real
    - **Mitigation**: every POST that mutates state requires Idempotency-Key from v1; 24h dedup window; document for clients prominently
  -
    - **Step**: rate limit headers
    - **Failure**: early API had no rate limit headers; clients implement exponential backoff blindly; vendor changes limits and clients break
    - **Frequency**: 0.67
    - **Impact**: client retry logic destabilizes when vendor adjusts rate limits
    - **Mitigation**: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset on every response from day 1; Retry-After on 429/503
- **Confidence Adjustments**:
  - **@Community/Principle Pagination First**: 0.94
  - **@Community/Type Error Shape**: 0.88
  - **@Community/Principle Idempotent Writes**: 0.91
  - **@Community/Fact Http Method Semantics**: 0.93
  - **@Community/Rule Resource Not Action**: 0.85

## Ai Confidence
0.84

## Lessons
- Day-1 discipline is the difference between maintainable and painful API at month 18. The 'we'll add it later' tax is severe.
- Pagination, idempotency, and error envelope are non-negotiable from v1.0 — the cost of retrofitting these is a major version.
- Deprecation policy with concrete sunset date prevents indefinite support of old surfaces. RFC 8594 (Deprecation + Sunset headers) is the standard.
- API documentation is part of the contract. Stripe / GitHub / Twilio docs are gold-standard; budget 30% of API engineering effort to docs.
- Public APIs lock in shape decisions for years. Spend extra design time before v1.0 rather than less — you cannot easily change later.
