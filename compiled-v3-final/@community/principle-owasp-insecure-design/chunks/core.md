# OwaspInsecureDesign [principle] v1.0.0
OWASP Top 10 A04:2021 — new category focused on risks from design and architectural flaws. Unlike implementation bugs, insecure design cannot be fixed by a perfect implementation — the threat model was wrong from the start.
> Security requirements must be established before implementation begins, not retrofitted after. Use threat modeling (STRIDE or PASTA) in design reviews, define security user stories, and identify trust boundaries explicitly — 'we will add auth later' is an insecure design decision, not a debt item.
domain: security

## Attributed To
OWASP Foundation, Top 10 2021

## Applies To
- Authentication flow design (password reset, account recovery, MFA enrollment)
- Multi-tenant data isolation architecture
- Rate limiting and anti-automation strategy
- Business logic that involves money, permissions, or irreversible actions
- API contract design — what data does each endpoint expose by default?
- Microservice trust boundaries — which services can call which?

## Counter Examples
- Instagram 2019: 'Forgot password' flow allowed 6-digit OTP brute force — no rate limit by design; researchers brute-forced any account in ~1000 attempts (CVE-2019-not-assigned, disclosed via HackerOne).
- Multi-tenant SaaS that stores all customer data in shared tables with only a `tenant_id` column — a single ORM query without `WHERE tenant_id = :current` leaks cross-tenant data; the fix requires a design rewrite, not a patch.
- Microservice architecture where Service A trusts any JWT signed by Service B without checking the `aud` claim — confused deputy attack by design; any compromised service can impersonate any user to any other service.
