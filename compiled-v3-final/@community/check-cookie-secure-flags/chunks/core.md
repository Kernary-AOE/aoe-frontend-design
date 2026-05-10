# CookieSecureFlags [check] v1.0.0
Session and auth cookies must carry Secure, HttpOnly, and SameSite=Strict (or Lax for OAuth flows). Missing any flag opens specific attack vectors: Secure omission allows plain-HTTP cookie theft, HttpOnly omission allows XSS cookie exfiltration, SameSite omission allows CSRF.
domain: security

## Success Criterion
Set-Cookie header for session/auth cookies includes all three: Secure; HttpOnly; SameSite=Strict. Cookies not required server-side lack HttpOnly. __Host- prefix enforced on auth cookies for additional binding.

## How To Verify
```
    # 1. Inspect Set-Cookie headers
    curl -sI https://example.com/login -d 'user=test&pass=test' \
      | grep -i set-cookie
    # Expected: Set-Cookie: session=...; Path=/; HttpOnly; Secure; SameSite=Strict

    # 2. Browser DevTools check
    Application → Cookies → inspect each cookie column:
      HttpOnly ✓, Secure ✓, SameSite: Strict

    # 3. Automated check with curl + grep
    COOKIE_HEADER=$(curl -sI -X POST https://example.com/auth/login \
      -H 'Content-Type: application/json' \
      -d '{"username":"test","password":"test"}' \
      | grep -i 'set-cookie')
    echo "$COOKIE_HEADER" | grep -qi 'httponly'   || echo "FAIL: Missing HttpOnly"
    echo "$COOKIE_HEADER" | grep -qi 'secure'     || echo "FAIL: Missing Secure"
    echo "$COOKIE_HEADER" | grep -qi 'samesite'   || echo "FAIL: Missing SameSite"

    # 4. Check for __Host- prefix (strongest binding)
    # __Host- cookies: must be Secure, Path=/, no Domain attribute — locked to exact host
    grep -i '__Host-' <<< "$COOKIE_HEADER" || echo "Consider __Host- prefix for auth cookies"

    # 5. OWASP ZAP passive scan
    zap-cli quick-scan --self-contained https://example.com
    # Look for "Cookie No HttpOnly Flag" and "Cookie Without Secure Flag" alerts
  
```

## Fix Suggestion
Express: res.cookie('session', token, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' }). Ensure the app always runs behind HTTPS so Secure flag is always sent. For OAuth: SameSite=Lax is acceptable to allow top-level GET navigations during OAuth redirects.

## Severity
critical
