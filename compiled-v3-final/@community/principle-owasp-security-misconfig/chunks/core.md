# OwaspSecurityMisconfig [principle] v1.0.0
OWASP Top 10 A05:2021 — security misconfiguration is the most commonly observed issue; 90% of applications were tested for misconfiguration with an average incidence rate of 4.5%.
> Every layer of the stack (cloud, network, platform, web server, application framework, database, VM, container) must be hardened with least-privilege defaults, unnecessary features disabled, and configuration drift detected automatically — default credentials and stack traces in production responses are never acceptable.
domain: security

## Attributed To
OWASP Foundation, Top 10 2021

## Applies To
- Cloud IAM roles and S3 bucket policies
- Web server (nginx/Apache) default pages and directory listing
- Framework debug modes (Django DEBUG=True, Rails config.consider_all_requests_local)
- Database exposure (MongoDB without auth in 2017 — 27,000+ exposed instances)
- Container images running as root with unnecessary capabilities
- HTTP security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy)
- Default credentials on network devices, admin panels, CMSs

## Counter Examples
- Django deployed with DEBUG=True in production: exposes full stack trace, local variables, installed apps, and settings to any user who triggers a 500 error.
- MongoDB default config (pre-3.0): binds to 0.0.0.0 with no authentication — 2017 ransomware campaigns deleted data from ~33,000 exposed instances.
- AWS S3 bucket with public ACL applied at bucket level — data.company.com/exports/customers-2024-01.csv accessible to anyone with the URL; detected via Shodan/GrayhatWarfare.
