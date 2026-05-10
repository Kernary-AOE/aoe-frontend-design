# NoCredentialsClient [check] v1.0.0
Scans client-bundled JS and HTML for hardcoded API keys, secrets, JWTs, and credentials (OpenAI, Anthropic, AWS, GitHub, Stripe, Google), and detects sensitive env vars exposed via NEXT_PUBLIC_/VITE_/REACT_APP_ prefixes.
domain: security

signature: (html: string, js: string, context?: object) -> CheckResult
predicate: // Scan client-side bundles + HTML for hardcoded credentials.
// Patterns to detect:
PATTERNS = [
// OpenAI / Anthropic
{ name: 'openai-key', re: /\bsk-[a-zA-Z0-9]{20,}\b/g },
{ name: 'anthropic-key', re: /\bsk-ant-[a-zA-Z0-9-_]{20,}\b/g },
// AWS
{ name: 'aws-access-key', re: /\bAKIA[0-9A-Z]{16}\b/g },
{ name: 'aws-secret', re: /\b[a-zA-Z0-9/+]{40}\b/g, contextRequire: /aws|secret/i },
// Generic JWT
{ name: 'jwt', re: /\beyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\b/g },
// GitHub PAT
{ name: 'github-pat', re: /\bghp_[a-zA-Z0-9]{36}\b/g },
{ name: 'github-app', re: /\bghs_[a-zA-Z0-9]{36}\b/g },
// Stripe
{ name: 'stripe-secret', re: /\bsk_(live|test)_[a-zA-Z0-9]{24,}\b/g },
{ name: 'stripe-restricted', re: /\brk_(live|test)_[a-zA-Z0-9]{24,}\b/g },
// Google API
{ name: 'google-api', re: /\bAIza[0-9A-Za-z_-]{35}\b/g },
// Generic high-entropy assignment
{ name: 'env-assignment', re: /(?:password|secret|token|api[_-]?key)\s*[:=]\s*['"][^'"]{16,}['"]/gi },
]
for source in [html, js]:
if !source: continue
for p in PATTERNS:
matches = source.match(p.re) || []
for m in matches:
if p.contextRequire && !p.contextRequire.test(source.slice(max(0, source.indexOf(m) - 50), source.indexOf(m) + 50))):
continue
yield { fail: 'credential-detected', type: p.name, sample: m.slice(0, 8) + '…', severity: 'critical' }

// 2. NEXT_PUBLIC_/VITE_ env vars containing 'secret' or 'key' (excluding PUBLIC_KEY which is intentional)
envExposed = matchAll(js || '', /(NEXT_PUBLIC|VITE|PUBLIC|REACT_APP)_[A-Z_]*(SECRET|PRIVATE|PASSWORD|API_KEY)[A-Z_]*/g)
for e in envExposed:
if /PUBLIC_KEY|PUBLISHABLE/.test(e): continue  // intentional public stripe key
yield { fail: 'sensitive-env-exposed-to-client', name: e, severity: 'critical' }

## Validates
@community/rule-no-credentials-client

## Severity
critical

## Failure Message Template
Client-side credential detected: type={type}, sample={sample}. Move to server-side env (not NEXT_PUBLIC_*) or rotate immediately if already deployed.

## Evaluation Method
automated

## Tools
- regex
- trufflehog
- gitleaks
- @anthropic/claude-code

## False Positive Rate
medium

## Validates
@community/rule-no-credentials-client

## Severity
critical

## Failure Message Template
Client-side credential detected: type={type}, sample={sample}. Move to server-side env (not NEXT_PUBLIC_*) or rotate immediately if already deployed.

## Evaluation Method
automated

## Tools
- regex
- trufflehog
- gitleaks
- @anthropic/claude-code

## False Positive Rate
medium
