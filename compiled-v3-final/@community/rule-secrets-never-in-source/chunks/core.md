# SecretsNeverInSource [rule] v1.0.0
> Secrets (API keys, database passwords, private keys, OAuth client secrets, service account credentials) must NEVER appear in source code, committed to version control, or embedded in build artifacts. All secrets must be injected at runtime via environment variables from a secrets manager (AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager, Doppler) or a CI/CD secrets store. This applies to test credentials, staging secrets, and internal tools — not just production.
domain: security

## Applies To
- Database connection strings and passwords
- Cloud provider API keys (AWS_ACCESS_KEY_ID, GCP service account JSON)
- Third-party service keys (Stripe sk_live_, Twilio AuthToken, SendGrid API key)
- Private TLS/SSH/PGP keys and certificates
- .env files committed to repository (should be in .gitignore)
- Hardcoded tokens in test fixtures, seed scripts, or CI config comments
- Docker build ARGs that get baked into image layers

## Counter Examples
- Uber 2016: AWS credentials hardcoded in a GitHub repository; attackers used them to access an S3 bucket containing a backup of 57M user records — total breach cost estimated at $148M settlement.
- Docker image with `ENV DATABASE_PASSWORD=prod_secret_123` in Dockerfile — secret baked into every layer; visible via `docker history`, `docker inspect`, and image registry API.
- Twilio 2022: Okta phishing led to attacker accessing Twilio's internal tooling; separately, exposed GitHub repos of contractors contained API keys in test scripts — hardcoded test credentials provided lateral movement path.
