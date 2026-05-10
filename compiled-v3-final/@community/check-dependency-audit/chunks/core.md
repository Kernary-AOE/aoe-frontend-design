# DependencyAudit [check] v1.0.0
All project dependencies must pass a vulnerability audit with zero high/critical severity findings. Checks must run in CI on every PR and on a scheduled daily basis against the production manifest.
domain: security

## Success Criterion
npm audit / pip-audit / cargo audit returns zero vulnerabilities of severity high or critical. No packages in the deny-list (known-malicious). Lock file committed and up to date.

## How To Verify
```
    # JavaScript / Node.js
    npm audit --audit-level=high
    # Exit code 0 = clean. Non-zero = vulnerabilities at or above high severity.

    # With audit output as JSON for CI parsing
    npm audit --json | jq '.metadata.vulnerabilities | {high, critical}'
    # Pass condition: { "high": 0, "critical": 0 }

    # Python
    pip install pip-audit
    pip-audit --requirement requirements.txt --severity high
    # Or with poetry: pip-audit --requirement <(poetry export --without-hashes)

    # Rust
    cargo install cargo-audit
    cargo audit
    # Reads Cargo.lock; exit code 0 = clean

    # Go
    go install golang.org/x/vuln/cmd/govulncheck@latest
    govulncheck ./...

    # GitHub Actions — automated in CI
    - name: Dependency audit
      run: npm audit --audit-level=high
      # Or use: actions/dependency-review-action for PR-level diff

    # Scheduled daily audit (cron)
    # .github/workflows/audit.yml
    on:
      schedule:
        - cron: '0 6 * * *'   # 06:00 UTC daily
    jobs:
      audit:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - run: npm ci
          - run: npm audit --audit-level=high
  
```

## Fix Suggestion
Run `npm audit fix` for auto-fixable vulnerabilities. For breaking-change upgrades, test in a branch. Pin transitive dependencies with `npm install <pkg>@<safe-version>` as a temporary override using `overrides` in package.json. If no fix is available, assess exploitability and consider removing the dependency.

## Severity
high
