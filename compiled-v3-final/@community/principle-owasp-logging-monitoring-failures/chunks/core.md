# OwaspLoggingMonitoringFailures [principle] v1.0.0
OWASP Top 10 A09:2021 — insufficient logging and monitoring means breaches go undetected. The average time to detect a breach was 207 days in 2023 (IBM Cost of a Data Breach Report). Without actionable logs, incident response is impossible.
> Applications must log authentication events (success and failure), authorization failures, input validation failures, and all high-value transactions with sufficient context (timestamp, user ID, IP, action, outcome). Logs must be shipped to a tamper-resistant SIEM, monitored with automated alerting on anomaly thresholds, and retained for ≥ 1 year (90 days hot).
domain: security

## Attributed To
OWASP Foundation, Top 10 2021

## Applies To
- Authentication events: login, logout, MFA success/failure, password change
- Authorization failures: 403 responses, privilege escalation attempts
- Input validation failures at the API layer
- High-value business transactions: payment, account deletion, permission grant
- Admin actions: user creation, role assignment, config changes
- Dependency and infrastructure changes (deploys, config updates)

## Counter Examples
- Target 2013: attackers moved laterally for 2 weeks before detection — security tools generated alerts that were deprioritized due to alert fatigue; no automated escalation triggered.
- Application logging only errors (status 500), not 401/403 — credential stuffing and IDOR scanning leave no trace in application logs; only discovered via DB anomaly audit months later.
- Logs written to the same server being attacked — attacker deletes /var/log/auth.log after gaining access; no tamper-evident off-host log shipping.
