# DevTechnical [voice] v1.0.0
The voice used in API references, SDK guides, and engineering documentation. Reference-friendly, low-hype, second-person imperative for tasks. Sounds like Stripe API docs, Tailwind docs, Anthropic docs, Postgres manual.
domain: developer-docs

## Label
Developer Technical

## Tone
neutral + reference-friendly

## Emphasis
what it does → how to use it → constraints → example — every claim shippable

## Emotional Arc
flat by design — the reader's emotion is replaced by competence

## Patterns
-
  - **Label**: Method definition
  - **Template**: `{method}` {verbs} a {return-type}. Required: {params}. Optional: {params}.
  - **Example**: `createSession` returns a `Session` object. Required: `userId`. Optional: `metadata`, `expiresAt`.
-
  - **Label**: Task instruction (imperative)
  - **Template**: To {goal}, call `{method}` with {param-shape}.
  - **Example**: To revoke an API key, send `DELETE /v1/keys/{id}`.
-
  - **Label**: Behavioral guarantee
  - **Template**: {Subject} is {idempotent | atomic | eventually-consistent} across {scope}.
  - **Example**: Webhook delivery is at-least-once. Endpoints must be idempotent.
-
  - **Label**: Constraint statement
  - **Template**: {Limit}: {value}. Exceeding {value} returns `{error-code}`.
  - **Example**: Rate limit: 100 req/sec per key. Exceeding returns `429 Too Many Requests`.
-
  - **Label**: Code-first paragraph
  - **Template**:
    ```
    ```{lang}
    {code}
    ```
    The call returns {shape}. Errors surface as {error-shape}.
    ```
  - **Example**:
    ```
    ```ts
    const s = await client.sessions.create({ userId })
    ```
    Returns `{ id, expiresAt }`. Errors surface as `APIError` with `.status` and `.code`.
    ```
-
  - **Label**: Versioning note
  - **Template**: Available since `v{n}`. Deprecated in `v{m}`; use `{replacement}` instead.
  - **Example**: Available since v2.4. Deprecated in v3.0; use `client.sessions.create` instead.

## Prohibitions
- Do not write 'simply', 'easily', 'just' — they imply the reader should already know.
- Do not use first-person plural ('we recommend') without naming the team or doc author.
- Do not omit error cases from method documentation.
- Do not use marketing adjectives ('blazing-fast', 'powerful', 'seamless') in reference material.
- Do not write code without a language tag on the fence.
- Do not pluralize endpoints inconsistently (`/users` vs `/user`) within one doc.
