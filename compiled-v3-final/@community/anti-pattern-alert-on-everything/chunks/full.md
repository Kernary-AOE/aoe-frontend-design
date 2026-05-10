# AlertOnEverything [anti-pattern] v1.0.0
Configuring alerts for every metric threshold, every error log, every CPU spike — producing a constant stream of pages that on-call learns to ignore. The signal of real problems is buried in the noise of thresholds that don't correlate with user-impacting harm.
domain: ops-observability

## Label
Alert on Everything (Alert Fatigue)

## Why Bad
Alerts have a cost paid in human attention. Every page that does NOT correspond to user-impacting harm trains the on-call to dismiss faster, raise threshold tolerances, and ultimately silence the alert entirely. By the time a real incident fires, the alert is in the pile of always-firing-noise. Healthcare research on alarm fatigue (Joint Commission Sentinel Event Alert #50, 2013) found that 85-99% of clinical alarms are false positives and that nurses missed 1 in 7 critical alarms — the same failure mode applies to on-call engineers. Concretely: an on-call rotation receiving >5 pages per shift will exhibit measurable response-time degradation within two weeks; >20 pages/shift produces silent-acknowledge behavior within days. The team's reliability degrades because the warning system has been broken; outages get longer because the first alert was ignored. Common root cause: alerts are written on the metrics the team has, not on the user-impacting outcomes the team owes.

## Instead Do
Alert on symptoms, not causes (Google SRE Book Ch.6). Every page must answer 'is a user being harmed right now?' with yes. The canonical rule: alerts come from SLO burn rate (rule-slo-required-for-prod + pattern-error-budget-policy), not from infrastructure metrics. CPU at 95% does not page; SLO burn rate >6× over 6h does page, regardless of whether the cause is CPU, GC, network, or DB. Pages requiring no action become tickets or get deleted. The four-golden-signals framework (latency, traffic, errors, saturation, Google SRE) is the maximum useful set per service. Audit alerts quarterly: if it has not fired in 6 months OR has fired but produced no action in the last 5 instances, delete it.

## Structure
```
    # WRONG — cause-based threshold soup
    alert: HighCpu                  # CPU is not what users care about
      expr: cpu_usage > 0.85 for 5m
      severity: page                # pages on every traffic spike

    alert: HighMemory               # Memory ditto
      expr: mem_used / mem_total > 0.9 for 5m

    alert: ErrorLogged              # ANY error log
      expr: increase(log_errors[5m]) > 0
      severity: page                # pages 50+ times/shift

    alert: SlowQuery
      expr: postgres_slow_queries > 10
      severity: page                # paged at 3am for a one-off

    alert: DiskFull
      expr: disk_used > 0.85
      severity: page                # paged in business hours; not user-impacting

    # CORRECT — symptom-based, SLO-driven
    alert: SLO_FastBurn
      expr: error_budget_burn_rate{service='checkout', window='1h'} > 14.4
        AND error_budget_burn_rate{service='checkout', window='5m'} > 14.4
      severity: page
      runbook: https://wiki/slo-fast-burn

    alert: SLO_SlowBurn
      expr: error_budget_burn_rate{service='checkout', window='6h'} > 6
        AND error_budget_burn_rate{service='checkout', window='30m'} > 6
      severity: page
      runbook: https://wiki/slo-slow-burn

    # Cause metrics → tickets, dashboards — NOT pages
    record: high_cpu_advisory       # show on dashboard
    record: disk_growth_advisory    # ticket if sustained for 24h
  
```

## Label
Alert on Everything (Alert Fatigue)

## Why Bad
Alerts have a cost paid in human attention. Every page that does NOT correspond to user-impacting harm trains the on-call to dismiss faster, raise threshold tolerances, and ultimately silence the alert entirely. By the time a real incident fires, the alert is in the pile of always-firing-noise. Healthcare research on alarm fatigue (Joint Commission Sentinel Event Alert #50, 2013) found that 85-99% of clinical alarms are false positives and that nurses missed 1 in 7 critical alarms — the same failure mode applies to on-call engineers. Concretely: an on-call rotation receiving >5 pages per shift will exhibit measurable response-time degradation within two weeks; >20 pages/shift produces silent-acknowledge behavior within days. The team's reliability degrades because the warning system has been broken; outages get longer because the first alert was ignored. Common root cause: alerts are written on the metrics the team has, not on the user-impacting outcomes the team owes.

## Instead Do
Alert on symptoms, not causes (Google SRE Book Ch.6). Every page must answer 'is a user being harmed right now?' with yes. The canonical rule: alerts come from SLO burn rate (rule-slo-required-for-prod + pattern-error-budget-policy), not from infrastructure metrics. CPU at 95% does not page; SLO burn rate >6× over 6h does page, regardless of whether the cause is CPU, GC, network, or DB. Pages requiring no action become tickets or get deleted. The four-golden-signals framework (latency, traffic, errors, saturation, Google SRE) is the maximum useful set per service. Audit alerts quarterly: if it has not fired in 6 months OR has fired but produced no action in the last 5 instances, delete it.

## Structure
```
    # WRONG — cause-based threshold soup
    alert: HighCpu                  # CPU is not what users care about
      expr: cpu_usage > 0.85 for 5m
      severity: page                # pages on every traffic spike

    alert: HighMemory               # Memory ditto
      expr: mem_used / mem_total > 0.9 for 5m

    alert: ErrorLogged              # ANY error log
      expr: increase(log_errors[5m]) > 0
      severity: page                # pages 50+ times/shift

    alert: SlowQuery
      expr: postgres_slow_queries > 10
      severity: page                # paged at 3am for a one-off

    alert: DiskFull
      expr: disk_used > 0.85
      severity: page                # paged in business hours; not user-impacting

    # CORRECT — symptom-based, SLO-driven
    alert: SLO_FastBurn
      expr: error_budget_burn_rate{service='checkout', window='1h'} > 14.4
        AND error_budget_burn_rate{service='checkout', window='5m'} > 14.4
      severity: page
      runbook: https://wiki/slo-fast-burn

    alert: SLO_SlowBurn
      expr: error_budget_burn_rate{service='checkout', window='6h'} > 6
        AND error_budget_burn_rate{service='checkout', window='30m'} > 6
      severity: page
      runbook: https://wiki/slo-slow-burn

    # Cause metrics → tickets, dashboards — NOT pages
    record: high_cpu_advisory       # show on dashboard
    record: disk_growth_advisory    # ticket if sustained for 24h
  
```

## Derived From
@community/pattern-error-budget-policy
