# CursorPagination [pattern] v1.0.0
Cursor-based pagination uses an opaque cursor (typically encoding a sort key + tiebreaker id) to mark a position in a sorted collection. Unlike offset pagination, cursors remain stable under concurrent inserts and deletes, scale to billion-row tables, and never produce duplicate or skipped rows.
domain: api-design
