# OwaspBrokenAccessControl [principle] v1.0.0
OWASP Top 10 A01:2021 — most widespread web application vulnerability category. Failures restricting authenticated users to only their own resources and actions.
> Every server-side request must verify the requesting user is authorized for the specific resource and action — never trust client-side authorization signals, never assume that hiding a UI element also protects the underlying API endpoint.
domain: security

## Attributed To
OWASP Foundation, Top 10 2021

## Applies To
- REST and GraphQL API endpoint authorization
- URL-parameter resource access (e.g. /users/123/profile)
- Direct object references in database queries (IDOR)
- File upload and download permissions
- Admin-only routes and management endpoints
- Horizontal privilege escalation (user A accessing user B's data)
- Vertical privilege escalation (regular user accessing admin actions)

## Counter Examples
- REST API exposing /users/{id}/profile that only checks authentication but not that session.user_id === id — classic IDOR, e.g. Venmo's 2019 public feed exposure.
- Admin panel hidden by CSS display:none or frontend route guard but the /admin/users endpoint accepts any authenticated JWT with no role check.
- GraphQL server that limits queries in the schema explorer but does not enforce field-level authorization in resolvers — introspection bypass.
