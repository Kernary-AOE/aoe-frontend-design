# OwaspVulnerableComponents [principle] v1.0.0
OWASP Top 10 A06:2021 (formerly Using Components with Known Vulnerabilities) — components such as libraries, frameworks, and runtimes run with the same privileges as the application. If a vulnerable component is exploited, it can facilitate data loss or server takeover.
> Every third-party dependency must be inventoried (SBOM), continuously scanned for known CVEs, and updated within 30 days for critical/high vulnerabilities. Applications must never deploy with components that have reached end-of-life without a documented compensating control.
domain: security

## Attributed To
OWASP Foundation, Top 10 2021

## Applies To
- npm/yarn/pnpm package.json dependencies and transitive deps
- pip/poetry/conda Python package dependencies
- Maven/Gradle Java dependencies
- Docker base images and OS packages inside containers
- Infrastructure software (nginx, OpenSSL, OpenSSH versions)
- Runtime platforms (Node.js LTS, JVM, .NET, Python end-of-life versions)

## Counter Examples
- Equifax 2017: Apache Struts 2 CVE-2017-5638 was patched March 7; Equifax's scan on March 15 missed the vulnerable component; breach detected July 29 — 2 months of unpatched exposure.
- node_modules with 1,847 direct+transitive deps, no lockfile audit, no Dependabot — `npm audit` reveals 12 high-severity CVEs present for 18+ months.
- Production Docker image based on `ubuntu:18.04` (EOL April 2023) with unpatched OpenSSL 1.1.1 — multiple known CVEs, no patching mechanism in place.
