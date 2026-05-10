# SqlPreparedStatements [rule] v1.0.0
> User-supplied values must NEVER be interpolated or concatenated into SQL query strings. All SQL queries with external input must use parameterized queries (prepared statements) with typed parameter binding. ORM `raw()` / `execute()` escape hatches with string formatting are prohibited. This rule applies to every SQL dialect and every database driver.
domain: security
