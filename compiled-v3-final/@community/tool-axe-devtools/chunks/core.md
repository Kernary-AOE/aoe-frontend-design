# AxeDevTools [tool] v1.0.0
Deque's axe DevTools is the browser-based companion to axe-core, providing an interactive UI for running accessibility scans during manual QA and design review. Available as Chrome, Firefox, and Edge extensions, plus paid extensions for guided checks (axe DevTools Pro). Industry standard for the manual half of an a11y workflow.
domain: accessibility

signature: (page: BrowserPage, options?: AxeDevToolsOptions) -> AxeReport

## External
true

## Package
Browser extension: axe DevTools (Deque Systems)

## Capabilities
- Run axe-core rules against the currently rendered DOM with a single click
- Highlight violations directly in the page (DOM and screenshot annotation)
- Provide impact severity (critical / serious / moderate / minor) and remediation guidance
- 'Best Practices' rules in addition to WCAG 2.x and WCAG 2.2 AA/AAA
- Pro tier: Intelligent Guided Tests (IGT) for keyboard, focus order, color contrast picker, link purpose
- Export findings as JSON, CSV, or HTML report
- Integrate with Jira, GitHub Issues for ticket creation

## Output Type
- **Violations**: AxeViolation[] // each with rule id, impact, html, target, help
- **Incomplete**: AxeViolation[] // needs manual rev
- **Passes**: AxeRule[]
- **BestPractices**: AxeViolation[]

## Usage
```
    1. Install from Chrome Web Store / Firefox Add-ons / Edge Add-ons.
    2. Open browser DevTools (F12 or Cmd+Opt+I) → 'axe DevTools' tab.
    3. Click 'Scan ALL of my page'.
    4. Review violations grouped by severity. Each violation shows:
       - WCAG criterion (e.g. 1.4.3 Contrast)
       - Affected DOM element (highlighted)
       - Failure summary
       - Code fix suggestion + Help link
    5. For dynamic content: interact with the page first, then re-scan. axe scans only what is currently in the DOM.
    6. For SPA flows: scan after each route change / state transition.
  
```

## Comparison With Axe Core
- **Axe Core**: Library for CI / programmatic scans. Use in Playwright, Jest, Cypress.
- **Axe Devtools**: Manual scanning during QA / design review. Use in browser.
- **Axe Devtools Pro**: Adds Intelligent Guided Tests for issues that automated scans miss (focus order, screen-reader narration).
