# NoCredentialsClient [rule] v1.0.0
API keys, secrets, OAuth client secrets, database connection strings, private signing keys, and any other credentials MUST NEVER appear in client-shipped code (HTML, JS bundles, source maps, config JSON, environment variables prefixed `NEXT_PUBLIC_` / `VITE_` / `REACT_APP_`). All such values MUST live exclusively on the server.
domain: security
