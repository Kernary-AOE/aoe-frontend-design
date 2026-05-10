# SecretsNeverInSource [rule] v1.0.0
> Secrets (API keys, database passwords, private keys, OAuth client secrets, service account credentials) must NEVER appear in source code, committed to version control, or embedded in build artifacts. All secrets must be injected at runtime via environment variables from a secrets manager (AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager, Doppler) or a CI/CD secrets store. This applies to test credentials, staging secrets, and internal tools — not just production.
domain: security
