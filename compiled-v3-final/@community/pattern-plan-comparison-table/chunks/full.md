# PlanComparisonTable [pattern] v1.0.0
A wide feature-by-feature comparison matrix with rows for capabilities and columns per plan, using checkmarks, X marks, or specific values per cell. Used below the tier cards on pricing pages for users who need detail.
domain: frontend-design

## Facts

## Label
Plan Comparison Table

## Problem
Tier cards summarize plans with 5-8 highlights, but evaluators on the buying-team need to verify exact feature presence and limits across every plan in one view.

## Solution
A real `<table>` with the first column listing features (grouped by category like 'Collaboration', 'Security'), and one column per plan. Cells contain a check, an X, or a specific value (e.g., 'Up to 25 GB'). Sticky header keeps plan names visible while scrolling.

## Structure
```
    <section aria-labelledby="cmp-title">
      <h2 id="cmp-title">Compare plans</h2>
      <table class="comparison">
        <thead>
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">Starter</th>
            <th scope="col">Pro</th>
            <th scope="col">Team</th>
          </tr>
        </thead>
        <tbody>
          <tr><th colspan="4" scope="rowgroup">Collaboration</th></tr>
          <tr>
            <th scope="row">Projects</th>
            <td>Up to 5</td>
            <td>Unlimited</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <th scope="row">Real-time editing</th>
            <td><span aria-label="Not included">&times;</span></td>
            <td><span aria-label="Included">&check;</span></td>
            <td><span aria-label="Included">&check;</span></td>
          </tr>

          <tr><th colspan="4" scope="rowgroup">Security</th></tr>
          <tr>
            <th scope="row">SSO (SAML)</th>
            <td><span aria-label="Not included">&times;</span></td>
            <td><span aria-label="Not included">&times;</span></td>
            <td><span aria-label="Included">&check;</span></td>
          </tr>
          <tr>
            <th scope="row">Audit log retention</th>
            <td>7 days</td>
            <td>30 days</td>
            <td>1 year</td>
          </tr>
        </tbody>
      </table>
    </section>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Sticky `<thead>` so plan names stay visible while scrolling features.
- Group features into 3-6 categories using `scope='rowgroup'` headers spanning all columns.
- Use specific values where possible ('Up to 25 GB', '7 days') over generic checkmarks.
- On mobile (<720px), pivot the table: each plan becomes a vertical card listing all features.
- Highlight the recommended plan column with a subtle background tint matching the tier card.
- Provide 'Jump to category' anchor links for very long tables (>30 rows).

## A11y
- Use a real `<table>` with `<th scope='col'>` and `<th scope='row'>` so screen readers announce row+column headers per cell.
- Check / X glyphs MUST have accessible names (`aria-label='Included'` / `'Not included'`) — symbol alone is insufficient.
- Category headers use `scope='rowgroup'` and span all columns — not just visual styling.
- Color-coded plans need text labels too — never use color alone to indicate the recommended tier.
- Mobile pivot must keep `<th scope='row'>` semantics so feature names remain announced as headers.

## Examples
- @community/example-stripe-plan-comparison
- @community/example-vercel-plan-comparison
- @community/example-notion-plan-comparison

## Label
Plan Comparison Table

## Problem
Tier cards summarize plans with 5-8 highlights, but evaluators on the buying-team need to verify exact feature presence and limits across every plan in one view.

## Solution
A real `<table>` with the first column listing features (grouped by category like 'Collaboration', 'Security'), and one column per plan. Cells contain a check, an X, or a specific value (e.g., 'Up to 25 GB'). Sticky header keeps plan names visible while scrolling.

## Structure
```
    <section aria-labelledby="cmp-title">
      <h2 id="cmp-title">Compare plans</h2>
      <table class="comparison">
        <thead>
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">Starter</th>
            <th scope="col">Pro</th>
            <th scope="col">Team</th>
          </tr>
        </thead>
        <tbody>
          <tr><th colspan="4" scope="rowgroup">Collaboration</th></tr>
          <tr>
            <th scope="row">Projects</th>
            <td>Up to 5</td>
            <td>Unlimited</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <th scope="row">Real-time editing</th>
            <td><span aria-label="Not included">&times;</span></td>
            <td><span aria-label="Included">&check;</span></td>
            <td><span aria-label="Included">&check;</span></td>
          </tr>

          <tr><th colspan="4" scope="rowgroup">Security</th></tr>
          <tr>
            <th scope="row">SSO (SAML)</th>
            <td><span aria-label="Not included">&times;</span></td>
            <td><span aria-label="Not included">&times;</span></td>
            <td><span aria-label="Included">&check;</span></td>
          </tr>
          <tr>
            <th scope="row">Audit log retention</th>
            <td>7 days</td>
            <td>30 days</td>
            <td>1 year</td>
          </tr>
        </tbody>
      </table>
    </section>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Sticky `<thead>` so plan names stay visible while scrolling features.
- Group features into 3-6 categories using `scope='rowgroup'` headers spanning all columns.
- Use specific values where possible ('Up to 25 GB', '7 days') over generic checkmarks.
- On mobile (<720px), pivot the table: each plan becomes a vertical card listing all features.
- Highlight the recommended plan column with a subtle background tint matching the tier card.
- Provide 'Jump to category' anchor links for very long tables (>30 rows).

## A11y
- Use a real `<table>` with `<th scope='col'>` and `<th scope='row'>` so screen readers announce row+column headers per cell.
- Check / X glyphs MUST have accessible names (`aria-label='Included'` / `'Not included'`) — symbol alone is insufficient.
- Category headers use `scope='rowgroup'` and span all columns — not just visual styling.
- Color-coded plans need text labels too — never use color alone to indicate the recommended tier.
- Mobile pivot must keep `<th scope='row'>` semantics so feature names remain announced as headers.

## Compatible
- @community/pattern-pricing-tiers-toggle
- @community/pattern-data-table-dense
