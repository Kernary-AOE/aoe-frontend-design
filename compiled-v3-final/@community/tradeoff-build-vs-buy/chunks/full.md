# BuildVsBuy [tradeoff] v1.0.0
Whether to build an internal solution or pay for a managed service for non-core capabilities (auth, payments, search, email, analytics). The wrong choice costs years: building a 'simple' auth service eats engineering quarters; buying a feature you should have built locks the product to a vendor.
domain: product-engineering

## Label
Build vs Buy: Auth, Payments, Search, Email, Analytics

## Axes
- domain-coreness
- integration-depth
- team-expertise
- vendor-risk
- time-to-market

## Decision
```
if capability == "auth (login, password reset, OAuth, SSO, MFA, session)":
→ BUY (Auth0, Clerk, WorkOS, Supabase Auth, AWS Cognito)
reasons: "Auth is a security domain you cannot afford to get wrong. Vendors carry SOC2, FIDO certifications, regulatory compliance. Building auth costs 3-6 months and never reaches feature-parity."
exceptions: "Build only when auth IS the product (B2B identity provider) or compliance forbids vendor (defense, classified)."

elif capability == "payments (cards, ACH, subscriptions, billing, tax)":
→ BUY (Stripe, Adyen, Paddle for B2B SaaS, Braintree)
reasons: "Payment processing is regulated (PCI DSS), region-specific (SCA in EU, RBI in India), and fraud-prone. Vendors carry the compliance and risk."
exceptions: "Build only at scale (Amazon, Apple) where vendor margins exceed in-house cost AND you have a payments engineering org."

elif capability == "search (full-text, faceted, typo-tolerant, vector)":
→ DEPENDS
buy-when: "Algolia / Typesense / Elastic Cloud / Meilisearch managed — when search is supporting (a feature) not core."
build-when: "Search IS the product (Notion, Linear) — full Elastic/OpenSearch with custom analyzers, ranking, embeddings."

elif capability == "transactional email (signup verification, password reset, receipts)":
→ BUY (SendGrid, Postmark, Resend, AWS SES)
reasons: "Deliverability (SPF/DKIM/DMARC, IP reputation) is the moat. Building means renting IP space and managing reputation for years."

elif capability == "analytics (product analytics, session replay, RUM)":
→ BUY (Amplitude, Mixpanel, PostHog, Segment, Sentry)
reasons: "Building yet-another-events-pipeline rarely repays. Buy until scale (1B+ events/day) makes vendor cost competitive with in-house."

elif capability == "core domain logic (your product's actual differentiator)":
→ BUILD ALWAYS
reasons: "If you outsource your moat, you have no moat."

else:
→ DEFAULT BUY (managed service)
reasons: "Engineering time spent on undifferentiated infra is opportunity cost on differentiated product."
```

## Cost Of Buy
- Vendor lock-in: migrating off Stripe / Auth0 is months of work years later
- Pricing risk: vendors raise prices, change tiers, deprecate features (Twilio acquisitions, Heroku deprecation)
- Data residency / regulatory: GDPR, schrems II, Russian data localization may force build-or-relocate
- Customization limits: vendor's API is your ceiling on flexibility
- Vendor outages: your product's uptime ≤ vendor's uptime; multi-vendor doubles complexity

## Cost Of Build
- Engineering time to build, then to maintain, then to keep current with regulations
- Compliance burden: SOC2, ISO 27001, PCI DSS, HIPAA — full-time work, not a one-off
- Operational on-call: paging engineers for auth/payments outages forever
- Feature gap: in-house solutions take years to reach feature parity with mature vendors
- Team morale: maintaining 'undifferentiated heavy lifting' is rarely engineers' favorite work

## Examples
- Linear: bought Auth0 for SSO/SCIM (B2B requirement) — focused engineering on the actual issue tracker.
- Stripe (the company): builds payments infra (it's their product); buys auth (Auth0), email (SendGrid), search (Algolia for docs).
- Vercel: bought Clerk for auth on early product; built sub-second deploy infrastructure (their core differentiator).
- Notion: builds search (Notion's search is part of the product); buys Stripe + Auth0 + SendGrid.
- Cautionary tale: companies that built 'simple in-house' auth — burned 4 quarters, shipped buggy MFA, eventually bought Auth0.
