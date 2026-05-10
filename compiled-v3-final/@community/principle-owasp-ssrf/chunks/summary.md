# OwaspSsrf [principle] v1.0.0
OWASP Top 10 A10:2021 — Server-Side Request Forgery (SSRF) occurs when a web application fetches a remote resource using a user-supplied URL without validating or sanitizing the target. Modern cloud architectures make SSRF critical: the metadata endpoint (169.254.169.254 or fd00:ec2::254) exposes IAM credentials.
> Any server-side HTTP fetch using user-controlled URL input must validate the resolved destination against an explicit allowlist of domains or IP ranges. Block private IP ranges (RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), loopback (127.0.0.1/8, ::1), link-local (169.254.0.0/16), and cloud metadata endpoints before issuing the request.
domain: security
