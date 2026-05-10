# LinkPurposeClear [rule] v1.0.0
Link text MUST be intelligible out of context — a screen-reader user listing all links on a page MUST be able to determine each link's destination from the text alone. Generic text ('click here', 'read more', 'here', 'this') is forbidden.
domain: accessibility

## Checks
- [ ] @community/check-link-purpose-clear

## Applies To
@community/type-html-artifact

## Severity
high

## Severity Combination
```
link text is generic ('click here', 'read more', 'here') → BLOCK  (SC 2.4.4)
link text is unique but ambiguous out of context         → WARN
link text describes destination unambiguously            → PASS
```

## Failure Mode
Screen-reader users using the 'list links' feature hear ['click here', 'click here', 'read more', 'click here'] — every link is identical. Sighted users with cognitive impairment skim past unhelpful generic text. WCAG SC 2.4.4 fails.

## Remediation
- Rewrite `<a>click here</a> to read the report` as `Read <a>the Q4 report</a>`.
- If layout requires a generic CTA, supplement with `aria-label`: `<a aria-label='Read the Q4 financial report'>Read more</a>`.
- For 'See all' / 'View more' buttons that follow a heading, use `aria-labelledby='section-heading'` to inherit context.
- Avoid trailing icons-as-link without text — use @community/rule-aria-label-required.

## Exceptions
-
  - **Case**: Visually-paired card
  - **Allowed When**: An entire card is a single `<a>` with a heading and image inside; the accessible name is the heading. Verify with screen reader.
-
  - **Case**: Pagination
  - **Allowed When**: `Previous` / `Next` are unambiguous in pagination context but should still receive `aria-label='Previous page'` for verbosity.
