# ErrorShape [type] v1.0.0
Schema for an error response body in a JSON API. Based on RFC 9457 (Problem Details for HTTP APIs, July 2024) — the IETF-standard error format that supersedes RFC 7807. Provides machine-readable error code, human-readable message, identifying URI, and optional contextual fields.
domain: api-design

## Fields
- **Type**:
  - **Type**: string
  - **Format**: URI reference identifying the error type, e.g. 'https://example.com/errors/insufficient-funds'
  - **Required**: true
  - **Description**: Stable URI; clients dispatch on this. Default 'about:blank' indicates no specific type.
- **Title**:
  - **Type**: string
  - **Description**: Short human-readable summary of the problem type. SHOULD be invariant across instances.
  - **Required**: true
- **Status**:
  - **Type**: integer
  - **Description**: HTTP status code (200-599). MUST match the response status.
  - **Required**: true
- **Detail**:
  - **Type**: string
  - **Description**: Instance-specific human-readable explanation. Distinct from title — describes THIS occurrence.
  - **Required**: false
- **Instance**:
  - **Type**: string
  - **Format**: URI reference identifying this specific occurrence, e.g. '/orders/o_abc/errors/e_xyz'
  - **Required**: false
- **Code**:
  - **Type**: string
  - **Format**: snake_case stable identifier, e.g. 'insufficient_funds', 'rate_limited'
  - **Description**: Application-specific error code. Stable across versions.
  - **Required**: false
- **Errors**:
  - **Type**: FieldError[]
  - **Description**: For 400/422 validation errors: per-field error list
  - **Required**: false
- **Request Id**:
  - **Type**: string
  - **Description**: Server-generated request trace id; clients should include in support requests
  - **Required**: false
- **Retry After Seconds**:
  - **Type**: integer | null
  - **Description**: For 429/503: seconds to wait before retrying. Mirrors Retry-After header.
  - **Required**: false

## Invariants
- Content-Type response header MUST be 'application/problem+json' (RFC 9457 §3) when this shape is returned
- status field MUST equal the HTTP response status code
- type field MUST be a URI reference; 'about:blank' is the default if no specific type
- Sensitive context (PII, secrets, internal stack traces) MUST NOT appear in detail, errors, or extension fields
- Errors with 4xx status SHOULD include a stable code field for client dispatch logic
- Each unique type SHOULD have public documentation accessible at the type URI

## Example
- **Type**: https://api.example.com/errors/insufficient-funds
- **Title**: Insufficient funds
- **Status**: 402
- **Detail**: Account balance ($45.00) is below the requested charge amount ($120.00).
- **Instance**: /v1/charges/ch_abc123/errors
- **Code**: insufficient_funds
- **Request Id**: req_2cKbNc8vs
- **Retry After Seconds**: null

## Fields
- **Type**:
  - **Type**: string
  - **Format**: URI reference identifying the error type, e.g. 'https://example.com/errors/insufficient-funds'
  - **Required**: true
  - **Description**: Stable URI; clients dispatch on this. Default 'about:blank' indicates no specific type.
- **Title**:
  - **Type**: string
  - **Description**: Short human-readable summary of the problem type. SHOULD be invariant across instances.
  - **Required**: true
- **Status**:
  - **Type**: integer
  - **Description**: HTTP status code (200-599). MUST match the response status.
  - **Required**: true
- **Detail**:
  - **Type**: string
  - **Description**: Instance-specific human-readable explanation. Distinct from title — describes THIS occurrence.
  - **Required**: false
- **Instance**:
  - **Type**: string
  - **Format**: URI reference identifying this specific occurrence, e.g. '/orders/o_abc/errors/e_xyz'
  - **Required**: false
- **Code**:
  - **Type**: string
  - **Format**: snake_case stable identifier, e.g. 'insufficient_funds', 'rate_limited'
  - **Description**: Application-specific error code. Stable across versions.
  - **Required**: false
- **Errors**:
  - **Type**: FieldError[]
  - **Description**: For 400/422 validation errors: per-field error list
  - **Required**: false
- **Request Id**:
  - **Type**: string
  - **Description**: Server-generated request trace id; clients should include in support requests
  - **Required**: false
- **Retry After Seconds**:
  - **Type**: integer | null
  - **Description**: For 429/503: seconds to wait before retrying. Mirrors Retry-After header.
  - **Required**: false

## Invariants
- Content-Type response header MUST be 'application/problem+json' (RFC 9457 §3) when this shape is returned
- status field MUST equal the HTTP response status code
- type field MUST be a URI reference; 'about:blank' is the default if no specific type
- Sensitive context (PII, secrets, internal stack traces) MUST NOT appear in detail, errors, or extension fields
- Errors with 4xx status SHOULD include a stable code field for client dispatch logic
- Each unique type SHOULD have public documentation accessible at the type URI

## Example
- **Type**: https://api.example.com/errors/insufficient-funds
- **Title**: Insufficient funds
- **Status**: 402
- **Detail**: Account balance ($45.00) is below the requested charge amount ($120.00).
- **Instance**: /v1/charges/ch_abc123/errors
- **Code**: insufficient_funds
- **Request Id**: req_2cKbNc8vs
- **Retry After Seconds**: null
