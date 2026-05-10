# ErrorBudgetPolicy [pattern] v1.0.0
A pre-agreed, written policy that describes what happens automatically when a service consumes its error budget faster than the SLO target allows — typically a feature-freeze, a focus on reliability work, or shifting on-call burden — until burn rate returns to baseline.
domain: ops-observability

## Facts

## Label
Error-Budget Policy

## Problem
An SLO without an enforcement mechanism is an aspiration. The team that owns velocity will always find one more feature to ship; the team that owns reliability will always want to invest in toil reduction; without a policy, every conversation reduces to negotiation under stress during an incident. Error budget burn is the canonical signal but it is useless unless tied to a deterministic action.

## Solution
Codify the response to budget consumption in a written policy, signed by both engineering and product leadership before the SLO goes into effect. The policy specifies (1) thresholds (e.g. 'burn rate > 2× for >6 hours'), (2) automatic gates ('feature freeze on this service'), (3) escalation ('exec review if budget < 0 for two consecutive 28-day windows'), and (4) reset rules. Burn-rate alerts wired to the policy fire a deterministic action — not a Slack message that the team negotiates over. Google SRE Workbook Chapter 4 is the canonical reference.

## Structure
```
    # Burn rate definitions (Google SRE Workbook Ch. 4 & 5)
    burn_rate = (1 - SLI) / (1 - SLO)
    # If SLO=99.9% and current SLI=99.4%, burn rate = 0.6/0.1 = 6×
    # i.e. budget will be exhausted in (28d / 6) = ~4.6 days at this rate

    # Multi-window multi-burn-rate alerts (recommended)
    Fast burn:    >14.4× over 1h    AND  >14.4× over 5min   → page on-call (2% budget in 1h)
    Slow burn:    > 6×   over 6h    AND  > 6×   over 30min  → page on-call (5% budget in 6h)
    Slow drip:    > 1×   over 3d    AND  > 1×   over 6h     → ticket (cumulative)

    # Policy ladder (example; teams customise)
    ┌───────────────────────────────────────────────────────────────────────┐
    │ Stage 1 — Budget remaining > 50%                                      │
    │   Normal operation. Ship features. Ship infra changes.                │
    ├───────────────────────────────────────────────────────────────────────┤
    │ Stage 2 — Budget remaining 20–50%                                     │
    │   Risky changes (DB migrations, region failovers) require sign-off.   │
    │   Reliability work prioritised in next sprint planning.               │
    ├───────────────────────────────────────────────────────────────────────┤
    │ Stage 3 — Budget remaining < 20% OR burn rate > 6× sustained 6h       │
    │   FREEZE: no new feature deploys. Bugfixes + reliability only.        │
    │   Daily burn-rate review by team lead.                                │
    │   Auto-rollback hooks armed for any new release.                      │
    ├───────────────────────────────────────────────────────────────────────┤
    │ Stage 4 — Budget < 0 (SLO violated)                                   │
    │   FREEZE persists. Postmortem triggers a remediation roadmap.         │
    │   Quarterly review with VP-Eng. Budget resets at window end.          │
    └───────────────────────────────────────────────────────────────────────┘

    # YAML policy artifact (Sloth-style)
    apiVersion: openslo/v1
    kind: SLO
    metadata:
      name: checkout-availability
    spec:
      service: checkout
      indicator:
        ratio: { good: "http_requests_total{status!~'5..'}", total: "http_requests_total" }
      objectives:
        - target: 0.999
          op:     ">="
      timeWindow: 28d
      alerting:
        - name: fast-burn
          burnRate: 14.4
          longWindow:  1h
          shortWindow: 5m
          severity:    page
        - name: slow-burn
          burnRate: 6
          longWindow:  6h
          shortWindow: 30m
          severity:    page
      policy:
        budgetRemaining<20pct: { gate: feature-freeze, until: budget>=20pct }
        budgetRemaining<0:     { gate: feature-freeze, exec-review: true }
  
```

## Examples
- Google SRE — error-budget policies have been the canonical SRE primitive since 2003; documented in the SRE Book (Ch.3) and Workbook (Ch.4).
- Spotify Backstage SLO plugin: surfaces SLO + error budget per service in the developer portal; integrates with feature-freeze tooling.
- Nobl9 / Sloth / Pyrra: tooling that generates burn-rate alerts and policy gates from declarative SLO specs.
- Etsy / GitHub / Shopify all describe public versions of error-budget policies in engineering blogs.

## Label
Error-Budget Policy

## Problem
An SLO without an enforcement mechanism is an aspiration. The team that owns velocity will always find one more feature to ship; the team that owns reliability will always want to invest in toil reduction; without a policy, every conversation reduces to negotiation under stress during an incident. Error budget burn is the canonical signal but it is useless unless tied to a deterministic action.

## Solution
Codify the response to budget consumption in a written policy, signed by both engineering and product leadership before the SLO goes into effect. The policy specifies (1) thresholds (e.g. 'burn rate > 2× for >6 hours'), (2) automatic gates ('feature freeze on this service'), (3) escalation ('exec review if budget < 0 for two consecutive 28-day windows'), and (4) reset rules. Burn-rate alerts wired to the policy fire a deterministic action — not a Slack message that the team negotiates over. Google SRE Workbook Chapter 4 is the canonical reference.

## Structure
```
    # Burn rate definitions (Google SRE Workbook Ch. 4 & 5)
    burn_rate = (1 - SLI) / (1 - SLO)
    # If SLO=99.9% and current SLI=99.4%, burn rate = 0.6/0.1 = 6×
    # i.e. budget will be exhausted in (28d / 6) = ~4.6 days at this rate

    # Multi-window multi-burn-rate alerts (recommended)
    Fast burn:    >14.4× over 1h    AND  >14.4× over 5min   → page on-call (2% budget in 1h)
    Slow burn:    > 6×   over 6h    AND  > 6×   over 30min  → page on-call (5% budget in 6h)
    Slow drip:    > 1×   over 3d    AND  > 1×   over 6h     → ticket (cumulative)

    # Policy ladder (example; teams customise)
    ┌───────────────────────────────────────────────────────────────────────┐
    │ Stage 1 — Budget remaining > 50%                                      │
    │   Normal operation. Ship features. Ship infra changes.                │
    ├───────────────────────────────────────────────────────────────────────┤
    │ Stage 2 — Budget remaining 20–50%                                     │
    │   Risky changes (DB migrations, region failovers) require sign-off.   │
    │   Reliability work prioritised in next sprint planning.               │
    ├───────────────────────────────────────────────────────────────────────┤
    │ Stage 3 — Budget remaining < 20% OR burn rate > 6× sustained 6h       │
    │   FREEZE: no new feature deploys. Bugfixes + reliability only.        │
    │   Daily burn-rate review by team lead.                                │
    │   Auto-rollback hooks armed for any new release.                      │
    ├───────────────────────────────────────────────────────────────────────┤
    │ Stage 4 — Budget < 0 (SLO violated)                                   │
    │   FREEZE persists. Postmortem triggers a remediation roadmap.         │
    │   Quarterly review with VP-Eng. Budget resets at window end.          │
    └───────────────────────────────────────────────────────────────────────┘

    # YAML policy artifact (Sloth-style)
    apiVersion: openslo/v1
    kind: SLO
    metadata:
      name: checkout-availability
    spec:
      service: checkout
      indicator:
        ratio: { good: "http_requests_total{status!~'5..'}", total: "http_requests_total" }
      objectives:
        - target: 0.999
          op:     ">="
      timeWindow: 28d
      alerting:
        - name: fast-burn
          burnRate: 14.4
          longWindow:  1h
          shortWindow: 5m
          severity:    page
        - name: slow-burn
          burnRate: 6
          longWindow:  6h
          shortWindow: 30m
          severity:    page
      policy:
        budgetRemaining<20pct: { gate: feature-freeze, until: budget>=20pct }
        budgetRemaining<0:     { gate: feature-freeze, exec-review: true }
  
```

## Derived From
@community/rule-slo-required-for-prod

## Compatible
- @community/principle-three-pillars-observability
