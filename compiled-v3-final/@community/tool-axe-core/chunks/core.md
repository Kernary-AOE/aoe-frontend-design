# AxeCore [tool] v1.0.0
Deque's axe-core accessibility testing engine. Runs a comprehensive set of automated accessibility rules against an HTML document or DOM and returns violations, passes, incomplete (needs manual check), and inapplicable rules. Industry standard for automated a11y testing.
domain: accessibility

signature: (html: string | DOMDocument, options?: AxeOptions) -> AxeResults

## External
true

## Package
axe-core@^4.9

## Output Type
- **Violations**: RuleResult[] // definite violati
- **Passes**: RuleResult[] // confirmed passing ru
- **Incomplete**: RuleResult[] // requires manual rev
- **Inapplicable**: RuleResult[] // rules not applicable to this p

## Usage
```
    // Node.js with jsdom
    import axe from 'axe-core';
    import { JSDOM } from 'jsdom';

    const dom = new JSDOM(htmlString);
    const results = await axe.run(dom.window.document, {
      runOnly: { type: 'tag', values: ['wcag2aa', 'wcag22aa', 'best-practice'] }
    });

    const violations = results.violations.map(v => ({
      id: v.id,
      impact: v.impact,   // 'critical' | 'serious' | 'moderate' | 'minor'
      description: v.description,
      nodes: v.nodes.map(n => n.target),
    }));
  
```
