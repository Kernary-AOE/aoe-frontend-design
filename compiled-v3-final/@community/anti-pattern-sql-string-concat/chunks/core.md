# SqlStringConcat [anti-pattern] v1.0.0
Building SQL queries by concatenating or interpolating user-controlled strings directly into query text — the classic SQL injection (SQLi) vulnerability, #1 on OWASP for over a decade.
domain: security

## Label
SQL String Concatenation with User Input

## Why Bad
User input becomes query syntax. The canonical example: SELECT * FROM users WHERE id=' + userId + '\' — when userId = \' OR 1=1 -- the query becomes SELECT * FROM users WHERE id='' OR 1=1 -- ' which returns all users. From there: UNION SELECT username, password FROM admins; table drops; file reads (LOAD DATA INFILE); and in misconfigured DBs, OS command execution (xp_cmdshell in MSSQL). SQLi requires no authentication, is remotely exploitable, and has been the root cause of major breaches for 25 years.

## Instead Do
Use parameterized queries (prepared statements) exclusively. The query structure is compiled separately from the data — user input is always treated as a value, never as SQL syntax. ORMs provide parameterization by default when using their query builders; only raw() / literal() escape hatches bypass this.

## Structure
```
    # WRONG — string concatenation
    const query = "SELECT * FROM users WHERE email='" + email + "'";
    db.query(query);   // SQLi: email = "' OR 1=1 --"

    # WRONG — template literal (same problem, just prettier)
    const query = `SELECT * FROM products WHERE id=${req.params.id}`;

    # CORRECT — parameterized query (node-postgres)
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND active = $2',
      [email, true]   // values are passed separately, never interpolated
    );

    # CORRECT — parameterized (MySQL2)
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ? AND active = ?',
      [email, true]
    );

    # CORRECT — ORM (Prisma)
    const user = await prisma.user.findFirst({
      where: { email, active: true },   // query builder parameterizes automatically
    });

    # CORRECT — ORM (Prisma raw when needed)
    const result = await prisma.$queryRaw`
      SELECT * FROM users WHERE email = ${email}
    `;   // Prisma tagged template literal = parameterized

    # WRONG — Prisma raw escape hatch (dangerous)
    await prisma.$queryRawUnsafe(`SELECT * FROM users WHERE email = '${email}'`);

    # Python / SQLAlchemy
    result = db.execute(
      text("SELECT * FROM users WHERE email = :email"),
      {"email": email}
    )
  
```
