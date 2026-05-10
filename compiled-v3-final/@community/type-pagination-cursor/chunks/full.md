# PaginationCursor [type] v1.0.0
Schema for a paginated response envelope. Carries the data array, has-more boolean, opaque cursor for fetching the next page, and optional total count. Independent of underlying storage; supports offset, cursor, or hybrid paginators.
domain: api-design

## Fields
- **Data**:
  - **Type**: T[]
  - **Description**: Array of page results. Empty array when no results.
  - **Required**: true
- **Has More**:
  - **Type**: boolean
  - **Description**: True if there are more results after this page; false if this page is the last.
  - **Required**: true
- **Next Cursor**:
  - **Type**: string | null
  - **Description**: Opaque cursor token to pass as `?cursor=...` for the next page. Null when has_more is false.
  - **Required**: true
- **Prev Cursor**:
  - **Type**: string | null
  - **Description**: Opaque cursor for the previous page. Null on the first page.
  - **Required**: false
- **Page Size**:
  - **Type**: integer
  - **Description**: Number of items requested for this page. Server-capped to a maximum (typically 100).
  - **Required**: true
- **Total Estimate**:
  - **Type**: integer | null
  - **Description**: Optional approximate total. Null when computing total is too expensive (large keyset paginated table).
  - **Required**: false
- **Links**:
  - **Type**: object
  - **Description**: Optional RFC 5988-compatible link map: { self, first, prev, next, last } — full URLs
  - **Shape**: Record<string, string>
  - **Required**: false

## Invariants
- data.length <= page_size
- if has_more is false, next_cursor MUST be null
- if has_more is true, next_cursor MUST be non-null
- next_cursor and prev_cursor are opaque to clients — must NOT be parsed or constructed
- page_size returned reflects server-applied cap, not client-requested value (which may have been clamped)
- total_estimate, if returned, is best-effort and MAY drift between requests — clients should not rely on exact equality

## Example
- **Data**:
  -
    - **Id**: u_001
    - **Email**: alice@example.com
    - **Created At**: 2026-05-07T10:00:00Z
  -
    - **Id**: u_002
    - **Email**: bob@example.com
    - **Created At**: 2026-05-07T09:55:00Z
- **Has More**: true
- **Next Cursor**: eyJjcmVhdGVkX2F0IjoiMjAyNi0wNS0wN1QwOTo1NTowMFoiLCJpZCI6InVfMDAyIn0.signed
- **Prev Cursor**: null
- **Page Size**: 2
- **Total Estimate**: null
- **Links**:
  - **Self**: https://api.example.com/v1/users?limit=2
  - **Next**: https://api.example.com/v1/users?limit=2&cursor=eyJjcmVhdGVkX2F0IjoiMjAyNi0wNS0wN1QwOTo1NTowMFoiLCJpZCI6InVfMDAyIn0.signed

## Fields
- **Data**:
  - **Type**: T[]
  - **Description**: Array of page results. Empty array when no results.
  - **Required**: true
- **Has More**:
  - **Type**: boolean
  - **Description**: True if there are more results after this page; false if this page is the last.
  - **Required**: true
- **Next Cursor**:
  - **Type**: string | null
  - **Description**: Opaque cursor token to pass as `?cursor=...` for the next page. Null when has_more is false.
  - **Required**: true
- **Prev Cursor**:
  - **Type**: string | null
  - **Description**: Opaque cursor for the previous page. Null on the first page.
  - **Required**: false
- **Page Size**:
  - **Type**: integer
  - **Description**: Number of items requested for this page. Server-capped to a maximum (typically 100).
  - **Required**: true
- **Total Estimate**:
  - **Type**: integer | null
  - **Description**: Optional approximate total. Null when computing total is too expensive (large keyset paginated table).
  - **Required**: false
- **Links**:
  - **Type**: object
  - **Description**: Optional RFC 5988-compatible link map: { self, first, prev, next, last } — full URLs
  - **Shape**: Record<string, string>
  - **Required**: false

## Invariants
- data.length <= page_size
- if has_more is false, next_cursor MUST be null
- if has_more is true, next_cursor MUST be non-null
- next_cursor and prev_cursor are opaque to clients — must NOT be parsed or constructed
- page_size returned reflects server-applied cap, not client-requested value (which may have been clamped)
- total_estimate, if returned, is best-effort and MAY drift between requests — clients should not rely on exact equality

## Example
- **Data**:
  -
    - **Id**: u_001
    - **Email**: alice@example.com
    - **Created At**: 2026-05-07T10:00:00Z
  -
    - **Id**: u_002
    - **Email**: bob@example.com
    - **Created At**: 2026-05-07T09:55:00Z
- **Has More**: true
- **Next Cursor**: eyJjcmVhdGVkX2F0IjoiMjAyNi0wNS0wN1QwOTo1NTowMFoiLCJpZCI6InVfMDAyIn0.signed
- **Prev Cursor**: null
- **Page Size**: 2
- **Total Estimate**: null
- **Links**:
  - **Self**: https://api.example.com/v1/users?limit=2
  - **Next**: https://api.example.com/v1/users?limit=2&cursor=eyJjcmVhdGVkX2F0IjoiMjAyNi0wNS0wN1QwOTo1NTowMFoiLCJpZCI6InVfMDAyIn0.signed
