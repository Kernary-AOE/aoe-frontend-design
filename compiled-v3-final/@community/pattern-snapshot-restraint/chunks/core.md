# SnapshotRestraint [pattern] v1.0.0
Snapshot tests are valuable for serialization formats, JSON schemas, and rare 'large output equivalence' cases — and dangerous when used as a default for component or unit testing. Apply snapshot tests narrowly: small, intentional, reviewed.
domain: testing

## Body
```
    # When to Use a Snapshot Test (and When Not To)

    Snapshot tests assert that a serialized form of some output equals a previously-recorded baseline file. Frameworks: Jest `toMatchSnapshot()`, Vitest `toMatchInlineSnapshot()`, Cypress visual snapshots, Playwright `expect(page).toHaveScreenshot()`.

    ## Use Snapshot Testing When

    1. **Serialization format stability** — a function that emits a CSV, ICS calendar, OpenAPI spec, RSS feed. The output IS the contract; tests should fail when the format changes.
    2. **Visual regression on a curated set of screens** — Chromatic, Percy, Playwright on critical UI surfaces (≤ 30 snapshots). Reviewed on every PR.
    3. **Generated code** — codegen output (proto → TS, GraphQL → schema). The snapshot is the artifact.
    4. **Small, focused JSON output** — a sanitization function's output, a redactor's output, an error formatter.

    ## Avoid Snapshot Testing When

    1. **Component output** — `render(<Card props />)` snapshot includes every class name, attribute, and child. A trivial CSS rename breaks 200 tests; no engineer reads the diff. They run `--update-snapshot` and the test becomes a rubber stamp.
    2. **Anything with non-deterministic data** — timestamps, UUIDs, random IDs, generated nonces, date-now() — snapshots flake.
    3. **Anything with environmental dependence** — locale-formatted dates, timezone-shifted times, OS-dependent line endings.
    4. **Large outputs** (> 100 lines) — review fatigue; engineers stop reading the diff.
    5. **As a substitute for behavioral assertions** — `expect(result.user.email).toBe('a@b.com')` is clearer than `expect(result).toMatchSnapshot()`.

    ## Discipline

    ```typescript
    // GOOD — focused, small, named, reviewed
    test('formatErrorForUser strips internal stack traces', () => {
      const err = new Error('database connection failed: stack...');
      expect(formatErrorForUser(err)).toMatchInlineSnapshot(`
        {
          "code": "internal_error",
          "message": "Something went wrong on our end."
        }
      `);
    });

    // BAD — opaque, large, sweeping
    test('UserCard renders correctly', () => {
      const { container } = render(<UserCard user={mockUser} />);
      expect(container).toMatchSnapshot();   // 400 lines of HTML
    });

    // BETTER — explicit behavioral assertions
    test('UserCard shows user name and avatar', () => {
      render(<UserCard user={mockUser} />);
      expect(screen.getByRole('heading')).toHaveTextContent(mockUser.name);
      expect(screen.getByRole('img')).toHaveAccessibleName(mockUser.name);
    });
    ```

    ## Inline Snapshots

    Prefer `toMatchInlineSnapshot()` over external `.snap` files for short outputs. Inline snapshots:
    - Live next to the test, no separate file to chase
    - Are reviewed in the SAME diff as the code change
    - Make 'why did this change?' visible in PR review

    External `.snap` files are appropriate ONLY when the snapshot is large (> 30 lines) and stable.

    ## Update Discipline

    - Treat `--update-snapshot` as a reviewer-action, not a developer-action.
    - Code review must explicitly check snapshot diffs; never auto-update in CI.
    - If a snapshot file diff is > 50 lines, the test scope is wrong — split it.
  
```

## Use When
- Asserting serialization format stability (JSON, CSV, OpenAPI, RSS)
- Generated code (codegen output as artifact)
- Small, focused output of a single function
- Curated visual regression set (< 30 screens) with human review

## Avoid When
- General component-render testing (use behavioral assertions: getByRole, getByText)
- Output contains non-deterministic data (dates, UUIDs)
- Output is large (> 100 lines)
- Replacing missing unit-test coverage — see @community/principle-test-pyramid

## Counter Examples
- 1200-line `.snap` file for a single Page component — every PR shows a 50-line diff that nobody reviews. Becomes a rubber stamp.
- Snapshot includes `Math.random()` UUID — flakes on every run; team uses `--update-snapshot` reflexively.
- Snapshot of full DOM tree as a substitute for accessibility assertions — passes when role is wrong, fails when text changes; useless signal.
