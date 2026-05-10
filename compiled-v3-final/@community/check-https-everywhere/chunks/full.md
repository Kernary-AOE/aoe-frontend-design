# HttpsEverywhere [check] v1.0.0
Every HTTP response must include an HSTS header with max-age ≥ 31536000 (1 year), includeSubDomains, and preload. No http:// links must appear in HTML output.
domain: security

## Success Criterion
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload present on every response. Zero http:// links in rendered HTML. TLS certificate valid and not expired.

## How To Verify
```
    # 1. Check HSTS header via curl
    curl -sI https://example.com | grep -i strict-transport-security
    # Expected: strict-transport-security: max-age=31536000; includeSubDomains; preload

    # 2. Verify TLS certificate validity
    curl -sI --max-time 5 https://example.com | head -1   # should be HTTP/2 200, not SSL error
    openssl s_client -connect example.com:443 -brief 2>/dev/null | grep -E 'Verification|Protocol'

    # 3. Scan HTML output for http:// links (should return 0)
    curl -s https://example.com | grep -Eo 'http://[^"'"'"' >]+' | wc -l

    # 4. Test HTTP → HTTPS redirect
    curl -sI http://example.com | grep -i location
    # Expected: Location: https://example.com/  (301 or 308 redirect)

    # 5. Check preload eligibility (must be on HSTS preload list)
    curl -s "https://hstspreload.org/api/v2/status?domain=example.com" | jq .status

    # 6. Automated with testssl.sh
    testssl.sh --headers https://example.com | grep -A2 HSTS
  
```

## Fix Suggestion
nginx: add `add_header Strict-Transport-Security 'max-age=31536000; includeSubDomains; preload' always;` in the server block. Express: use helmet({ hsts: { maxAge: 31536000, includeSubDomains: true, preload: true } }). Ensure http server block returns 301 to https.

## Severity
critical

## Success Criterion
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload present on every response. Zero http:// links in rendered HTML. TLS certificate valid and not expired.

## How To Verify
```
    # 1. Check HSTS header via curl
    curl -sI https://example.com | grep -i strict-transport-security
    # Expected: strict-transport-security: max-age=31536000; includeSubDomains; preload

    # 2. Verify TLS certificate validity
    curl -sI --max-time 5 https://example.com | head -1   # should be HTTP/2 200, not SSL error
    openssl s_client -connect example.com:443 -brief 2>/dev/null | grep -E 'Verification|Protocol'

    # 3. Scan HTML output for http:// links (should return 0)
    curl -s https://example.com | grep -Eo 'http://[^"'"'"' >]+' | wc -l

    # 4. Test HTTP → HTTPS redirect
    curl -sI http://example.com | grep -i location
    # Expected: Location: https://example.com/  (301 or 308 redirect)

    # 5. Check preload eligibility (must be on HSTS preload list)
    curl -s "https://hstspreload.org/api/v2/status?domain=example.com" | jq .status

    # 6. Automated with testssl.sh
    testssl.sh --headers https://example.com | grep -A2 HSTS
  
```

## Fix Suggestion
nginx: add `add_header Strict-Transport-Security 'max-age=31536000; includeSubDomains; preload' always;` in the server block. Express: use helmet({ hsts: { maxAge: 31536000, includeSubDomains: true, preload: true } }). Ensure http server block returns 301 to https.

## Severity
critical
