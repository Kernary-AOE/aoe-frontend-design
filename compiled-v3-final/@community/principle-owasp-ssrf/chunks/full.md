# OwaspSsrf [principle] v1.0.0
OWASP Top 10 A10:2021 — Server-Side Request Forgery (SSRF) occurs when a web application fetches a remote resource using a user-supplied URL without validating or sanitizing the target. Modern cloud architectures make SSRF critical: the metadata endpoint (169.254.169.254 or fd00:ec2::254) exposes IAM credentials.
> Any server-side HTTP fetch using user-controlled URL input must validate the resolved destination against an explicit allowlist of domains or IP ranges. Block private IP ranges (RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), loopback (127.0.0.1/8, ::1), link-local (169.254.0.0/16), and cloud metadata endpoints before issuing the request.
domain: security

## Attributed To
OWASP Foundation, Top 10 2021

## Applies To
- Webhook URL registration and delivery
- URL preview / link unfurling features
- PDF/screenshot generation services (headless browser with user-supplied URL)
- Import-from-URL features (images, files, feeds)
- Proxy and redirect endpoints
- Server-side OAuth callback URL validation

## Counter Examples
- Capital One 2019: WAF misconfiguration allowed SSRF; attacker fetched http://169.254.169.254/latest/meta-data/iam/security-credentials/[role-name] — received live AWS credentials with S3 full access.
- Webhook service that only checks the initial URL hostname but follows HTTP 301 redirects — attacker registers attacker.com → redirects to 192.168.1.1:8080/admin; hostname check passes, redirect hits internal service.
- PDF export feature using wkhtmltopdf with user-controlled HTML containing `<img src='http://169.254.169.254/'>` — server fetches the metadata endpoint while rendering; response visible in PDF.

## Sources

## Examples
- Slack link preview: fetches user-pasted URLs server-side — internally uses a strict allowlist resolver that blocks RFC 1918 and link-local ranges before making the request; resolves DNS and re-validates the resulting IP, not just the hostname.
- Cloudflare Images upload-from-URL: DNS resolution occurs server-side and the resulting IP is validated against a blocklist before fetching — documented in their API reference.
- GitHub webhooks: only delivers to publicly routable IPs; rejects 192.168.x.x, 10.x.x.x, 127.x.x.x, and 169.254.x.x at the network layer before attempting delivery.

## Source
- https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/
- Capital One 2019 (CVE-2019-not-assigned): SSRF via misconfigured WAF → EC2 metadata endpoint → IAM role credentials → S3 bucket enumeration and exfiltration of 100M+ records.
- Microsoft Azure SSRF research (2021): SSRF in multiple Azure services allowed access to internal management APIs via metadata endpoints.
