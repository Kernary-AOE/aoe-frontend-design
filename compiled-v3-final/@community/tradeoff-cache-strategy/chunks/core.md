# CacheStrategy [tradeoff] v1.0.0
The four canonical cache strategies trade off freshness, write latency, consistency, and operational complexity. Picking the right one depends on read/write ratio, staleness tolerance, and the cost of cache misses.
domain: backend-engineering

## Label
Cache Strategy: Cache-Aside vs Read-Through vs Write-Through vs Write-Behind

## Axes
- read-write-ratio
- staleness-tolerance
- consistency-requirement
- cache-invalidation-complexity

## Decision
```
if read-write-ratio >> 1 AND staleness-tolerance == "seconds-to-minutes acceptable":
→ CACHE-ASIDE (lazy loading)
shape: "App reads cache; on miss, queries DB and populates cache. Writes go to DB only; cache is invalidated or expires via TTL."
reasons: "Simple, widely-deployed pattern; cache failures don't break writes; cache only stores what's actually read."

elif read-write-ratio >> 1 AND read-path-latency-critical:
→ READ-THROUGH
shape: "App reads cache; cache fetches from DB on miss transparently and populates. Writes go to DB; cache invalidates on write."
reasons: "Cleaner abstraction (cache library handles miss); Redis with RedisGears or DAX for DynamoDB."

elif consistency-required AND write-latency-budget == "loose":
→ WRITE-THROUGH
shape: "Writes go to cache AND DB synchronously, in the same transaction. Reads always serve from cache."
reasons: "Cache and DB never disagree (within transaction boundary); reads are fast; writes pay double-write cost."

elif write-throughput-critical AND staleness-tolerance == "few seconds OK":
→ WRITE-BEHIND (write-back)
shape: "Writes go to cache only; cache asynchronously flushes to DB. Reads serve from cache."
reasons: "Highest write throughput; risk of data loss if cache fails before flush; complex recovery."

else:
→ CACHE-ASIDE (default)
reasons: "Most common, fewest surprises, pairs naturally with TTL-based invalidation."
```

## Cost Of Cache Aside
- Cache misses are expensive — first read after invalidation pays full DB latency + populate cost
- Stampede risk: if N requests miss simultaneously, all hit DB. Mitigate with single-flight (golang.org/x/sync/singleflight) or probabilistic early expiration.
- Stale reads possible until TTL expires — staleness tolerance must be acceptable
- Cache invalidation complexity: write paths must remember to invalidate or the cache lies forever

## Cost Of Read Through
- Tighter coupling between cache and DB schema (cache library knows how to load)
- Same stampede + invalidation problems as cache-aside; abstraction hides them but doesn't solve them
- Library lock-in: AWS DAX is DynamoDB-specific; Redis read-through requires custom code

## Cost Of Write Through
- Every write pays cache + DB latency; ~2x write latency vs DB-only
- Atomicity: cache write and DB write must be transactional, OR risk inconsistency
- Cache size grows to match DB working set — may not fit
- Cold reads (first time data is written, then read elsewhere) still hit cache; this is correct

## Cost Of Write Behind
- Data loss risk: writes acknowledged before DB persistence — cache crash = lost data
- Eventual consistency: read-after-write within same client may not see the write
- Complex recovery: replaying queued writes after cache failure requires durable queue
- Operational complexity: monitoring lag, handling backpressure, recovering from queue overflow
