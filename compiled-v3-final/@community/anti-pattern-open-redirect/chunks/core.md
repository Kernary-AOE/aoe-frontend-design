# OpenRedirect [anti-pattern] v1.0.0
Accepting a redirect destination URL from user-controlled query parameters (?next=, ?redirect=, ?return_to=, ?url=) without validating it against an allowlist of permitted destinations.
domain: security

## Label
Open Redirect via ?next=<arbitrary URL>

## Why Bad
Attackers craft phishing URLs that appear to originate from a trusted domain: https://legitimate-bank.com/login?next=https://attacker.com/phish — the victim sees the trusted domain, completes login, then lands on the attacker's site. The redirect may also bypass SSRF protections in internal tooling that allowlist the app's own domain. OAuth CSRF attacks exploit open redirects to steal authorization codes. OWASP Top 10 historically listed this as A10: Unvalidated Redirects and Forwards.

## Instead Do
Allowlist permitted redirect destinations explicitly. For same-site redirects: validate the URL is a relative path starting with / and does not start with // (which is a protocol-relative URL pointing to an external host). For cross-site redirects: maintain an explicit list of allowed domains and check parsed hostname against it. Never redirect to an arbitrary URL parameter value.

## Trap
Naive fix — checking if the URL 'starts with /' — is bypassed by //attacker.com. Use URL constructor to parse then verify .origin or .hostname.

## Structure
```
    # WRONG — naive prefix check, bypassable
    if (next.startsWith('/')) redirect(next);   // '//evil.com' passes this check

    # CORRECT — parse URL and check origin
    function safeRedirect(next: string, req: Request): string {
      const FALLBACK = '/dashboard';
      if (!next) return FALLBACK;

      // Reject absolute URLs (contain host)
      try {
        const url = new URL(next, `https://${req.hostname}`);
        if (url.origin !== `https://${req.hostname}`) return FALLBACK;
        return url.pathname + url.search;   # return only path, drop host entirely
      } catch {
        return FALLBACK;
      }
    }

    # For cross-origin allowlist (OAuth callbacks, partner domains)
    const ALLOWED_REDIRECT_HOSTS = new Set([
      'app.example.com',
      'dashboard.example.com',
    ]);
    function safeExternalRedirect(next: string): string {
      try {
        const url = new URL(next);
        if (!ALLOWED_REDIRECT_HOSTS.has(url.hostname)) return '/';
        if (url.protocol !== 'https:') return '/';
        return url.toString();
      } catch { return '/'; }
    }
  
```
