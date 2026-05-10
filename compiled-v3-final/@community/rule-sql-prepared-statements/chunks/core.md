# SqlPreparedStatements [rule] v1.0.0
> User-supplied values must NEVER be interpolated or concatenated into SQL query strings. All SQL queries with external input must use parameterized queries (prepared statements) with typed parameter binding. ORM `raw()` / `execute()` escape hatches with string formatting are prohibited. This rule applies to every SQL dialect and every database driver.
domain: security

## Applies To
- SELECT / INSERT / UPDATE / DELETE with WHERE clauses containing user input
- ORDER BY column selection (use allowlist, not parameterization — ORDER BY cannot be parameterized in most drivers)
- LIKE pattern clauses (parameterize the pattern including % wildcards)
- IN clauses with variable-length user-supplied lists
- ORM raw() / annotate() / extra() methods that accept format strings
- Stored procedures called with user-supplied arguments

## Counter Examples
- PHP classic: `$q = "SELECT * FROM users WHERE id='" . $_GET['id'] . "'"; mysqli_query($conn, $q)` — `?id=1' OR '1'='1` dumps all users.
- Python f-string: `cursor.execute(f"SELECT * FROM accounts WHERE email='{email}'")` — `email = "' OR 1=1 --"` bypasses all WHERE filtering.
- SQLAlchemy raw escape: `db.session.execute(text(f'DELETE FROM sessions WHERE token = "{token}"'))` — token containing `"; DROP TABLE sessions; --` causes data loss.
