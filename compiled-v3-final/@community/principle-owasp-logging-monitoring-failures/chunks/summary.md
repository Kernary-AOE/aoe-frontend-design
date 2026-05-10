# OwaspLoggingMonitoringFailures [principle] v1.0.0
OWASP Top 10 A09:2021 — insufficient logging and monitoring means breaches go undetected. The average time to detect a breach was 207 days in 2023 (IBM Cost of a Data Breach Report). Without actionable logs, incident response is impossible.
> Applications must log authentication events (success and failure), authorization failures, input validation failures, and all high-value transactions with sufficient context (timestamp, user ID, IP, action, outcome). Logs must be shipped to a tamper-resistant SIEM, monitored with automated alerting on anomaly thresholds, and retained for ≥ 1 year (90 days hot).
domain: security
