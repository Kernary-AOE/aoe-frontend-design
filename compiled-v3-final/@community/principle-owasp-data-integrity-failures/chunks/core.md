# OwaspDataIntegrityFailures [principle] v1.0.0
OWASP Top 10 A08:2021 (merged Insecure Deserialization + Software and Data Integrity Failures) — code and infrastructure that does not protect against integrity violations in software updates, critical data, and CI/CD pipelines.
> Deserialized data from untrusted sources must be validated against a strict schema before use. Software updates, packages, and CI/CD pipeline steps must verify cryptographic signatures. Unsigned or unverified data must never be used to make authorization or code-execution decisions.
domain: security

## Attributed To
OWASP Foundation, Top 10 2021

## Applies To
- Deserialization of Java, Python Pickle, PHP unserialize, .NET BinaryFormatter
- npm package integrity (package-lock.json integrity hashes, `npm ci`)
- CI/CD pipeline artifact signing and verification
- Software update mechanisms (auto-update without signature verification)
- JWT and cookie tamper detection
- CDN-hosted third-party JavaScript (subresource integrity checks)

## Counter Examples
- SolarWinds 2020: Orion build server compromised, malicious DLL inserted into signed MSI before code signing step — no independent binary artifact attestation to detect the tampering.
- Python Pickle deserialization: `pickle.loads(user_supplied_bytes)` — arbitrary Python execution; used to gain RCE in multiple ML platforms (MLflow, Weights & Biases model registry).
- Auto-update client that fetches update over HTTP without signature check — man-in-the-middle delivers malicious installer; confirmed vector in older versions of Squirrel.Windows.
