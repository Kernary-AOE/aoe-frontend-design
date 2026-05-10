# ContentSecurityPolicy [check] v1.0.0
CSP header must be present on HTML responses, must not contain 'unsafe-inline' or 'unsafe-eval' in script-src, and must not use wildcard (*) as the sole source in script-src or default-src.
domain: security

## Success Criterion
Content-Security-Policy header present. script-src contains neither 'unsafe-inline' nor 'unsafe-eval'. No bare wildcard in script-src or default-src. frame-ancestors present to prevent clickjacking.

## How To Verify
```
    # 1. Check CSP header presence
    curl -sI https://example.com | grep -i content-security-policy

    # 2. Check for dangerous directives (should return no output)
    curl -sI https://example.com \
      | grep -i content-security-policy \
      | grep -E "unsafe-inline|unsafe-eval|script-src \*|default-src \*"
    # Any output = FAIL

    # 3. Google CSP Evaluator (automated API)
    curl -s "https://csp-evaluator.withgoogle.com/getCSPScore?csp=$(
      curl -sI https://example.com \
        | grep -i content-security-policy \
        | cut -d: -f2- \
        | tr -d '\r' \
        | python3 -c 'import sys,urllib.parse; print(urllib.parse.quote(sys.stdin.read().strip()))'
    )"

    # 4. Check report-uri or report-to is present (for violation telemetry)
    curl -sI https://example.com \
      | grep -i content-security-policy \
      | grep -E "report-uri|report-to" || echo "WARN: No CSP reporting endpoint"

    # 5. Lighthouse in CI
    npx lighthouse https://example.com --only-categories=best-practices \
      --output=json | jq '.audits["csp-xss"].score'
    # 1 = pass, 0 = fail
  
```

## Fix Suggestion
Implement nonce-based CSP (see pattern-csp-strict). Start with Content-Security-Policy-Report-Only to collect violations without breaking the site, then switch to enforcement after resolving all violations.

## Severity
high
