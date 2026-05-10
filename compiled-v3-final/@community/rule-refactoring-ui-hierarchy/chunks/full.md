# RefactoringUiHierarchy [rule] v1.0.0
> Not everything deserves emphasis. Build hierarchy with at least 2–3 combined dimensions (size + weight + color + spacing). Labels must weigh less than values. Replace borders with spacing and background color differences wherever possible.
domain: frontend-design

## Applies To
- frontend-design
- visual-design
- component-styling
- data-display patterns

## Examples
- Heading that is larger AND bolder AND has more whitespace above it — three hierarchy dimensions
- Key-value pair: label in text-muted 12px, value in font-semibold 16px — weight differential communicates primacy
- Card grid using background color differences and spacing for grouping, no border-bottom dividers

## Rationale
Single-dimension emphasis (size only, or weight only) produces weak hierarchy — everything at 16px medium weight reads uniformly regardless of semantic importance. Combining multiple dimensions creates unambiguous hierarchy. Labels being visually lighter than values follows the data-ink ratio principle: the value is the content, the label is metadata. Borders create visual noise that competes with content; spacing and background color achieve the same grouping signal more quietly.

## Applies To
- frontend-design
- visual-design
- component-styling
- data-display patterns
