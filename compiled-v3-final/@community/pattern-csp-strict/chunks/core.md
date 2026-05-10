# CspStrict [pattern] v1.0.0
A Content-Security-Policy header that allowlists ONLY the origins your app actually loads — blocks XSS by refusing inline scripts and unauthorized origins.
domain: security

## Label
Strict Content Security Policy

## Problem
Browsers will execute any script the page contains by default. XSS injections (stored or reflected) become RCE in the user's session. Without CSP, every input vector becomes an attack surface — a single reflected parameter becomes a session-hijacking vector.

## Solution
Set CSP header restricting script-src, style-src, img-src, connect-src, frame-ancestors. Use nonce-based scripting (no 'unsafe-inline'). Use 'self' + explicit CDN domains, never wildcards. Start in report-only mode to catch violations before enforcement.

## Structure
```
    # nginx / reverse-proxy header
    Content-Security-Policy:
      default-src 'self';
      script-src  'self' 'nonce-{random}' https://cdn.example.com;
      style-src   'self' 'nonce-{random}';
      img-src     'self' data: https:;
      font-src    'self' https://fonts.gstatic.com;
      connect-src 'self' https://api.example.com wss://api.example.com;
      media-src   'none';
      object-src  'none';
      frame-src   'none';
      frame-ancestors 'none';
      base-uri    'self';
      form-action 'self';
      upgrade-insecure-requests;
      report-uri  /csp-report;

    # Per-request nonce generation (Node.js)
    const nonce = crypto.randomBytes(16).toString('base64');
    res.setHeader('Content-Security-Policy',
      `script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; ...`
    );

    # Usage in HTML
    <script nonce="${nonce}" src="/app.js"></script>
    <style  nonce="${nonce}">/* critical CSS */</style>

    # Report-only mode for initial rollout (collect violations without blocking)
    Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report;
  
```
