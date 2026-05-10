# MonolithVsMicroservices [tradeoff] v1.0.0
Choosing between a single deployable monolith and a fleet of independently-deployed microservices. Microservices are oversold for early-stage products; monoliths are undersold for mature ones. The right answer depends on team size, deployment cadence, and bounded-context maturity — not on what's fashionable.
domain: backend-engineering

## Label
Monolith vs Microservices Architecture

## Axes
- team-size
- deployment-cadence
- domain-maturity
- operational-budget
- scale-axis

## Decision
```
if team-size <= 15 AND domain-maturity == "still discovering bounded contexts":
→ MONOLITH (modular monolith preferred)
reasons: "Single deploy, single transaction across modules, fast iteration, no distributed-systems tax"

elif team-size 15..50 AND modules have stable contracts AND deploy-cadence-conflicts-emerge:
→ MODULAR MONOLITH transitioning to selective extraction
reasons: "Extract only the modules that need independent deploy / scaling — not all of them"

elif team-size > 50 AND multiple-teams-deploy-daily AND distinct-scaling-axes:
→ MICROSERVICES (with strong platform team)
reasons: "Team-per-service model unblocks parallel work; distinct scaling for distinct workloads"

elif scale-axis == "single hot path needs independent scaling":
→ MONOLITH + EXTRACT THE HOT PATH
reasons: "One service for the bottleneck (image processing, ML inference) is not 'going microservices'"

else:
→ MONOLITH (default)
reasons: "Operational simplicity; the cost of microservices comes due in year 2-3 when the team realizes they need a platform team"
```

## Cost Of Monolith
- Single deploy can mean coordinated release windows for large teams
- Hot path scales the entire app, not just the bottleneck (mitigated by horizontal scaling)
- Codebase grows; module boundaries blur if not enforced (use module boundaries / static analysis)
- Single point of deployment failure — bad rollout affects all modules
- Database contention in shared schema — scaling reads requires read replicas, partitioning

## Cost Of Microservices
- Distributed systems tax: network failures, retries, partial failures, eventual consistency, distributed tracing
- Operational overhead: service mesh, API gateway, observability stack, on-call rotations per service
- Schema drift between services — every cross-service contract is a versioning surface
- Local development complexity: spinning up 12 services to test one feature; mock vs real choices
- Team needs platform skills (infra, observability, deployment automation) — not free
- End-to-end debugging requires distributed tracing (OpenTelemetry); single-process debuggers don't apply
- Cost: compute and platform overhead easily 2-5x a comparable monolith for small workloads

## Examples
- Stack Overflow — famously a monolith into the 1B+ pageviews/month range. Two .NET app servers + SQL Server handled it for years.
- Shopify — monolith ('Shopify Core') of significant scale. Selective extraction (jobs, search, checkout) without going full microservices.
- Netflix — microservices canonical example. ~700 services, justified by team-of-teams scale and independent product surfaces.
- Uber — went from monolith to microservices, then admitted the swing was too far ('Domain Oriented Microservice Architecture' essay) and consolidated.
- GitHub — monolith ('the rails app') with extracted services where genuine boundaries exist (search, code-scanning, packages).
