# Lighthouse [tool] v1.0.0
Google Lighthouse is an automated auditing tool for web pages that measures performance, accessibility, best practices, SEO, and PWA metrics. The accessibility category runs axe-core plus additional checks and returns a 0–100 score with per-audit details.

signature: (url: URL, options?: LighthouseOptions) -> LighthouseReport

## External
true

## Package
lighthouse@^12

## Output Type
- **Categories**:
  - **Performance**:
    - **Score**: 0..1
    - **Audits**: AuditResult[]
  - **Accessibility**:
    - **Score**: 0..1
    - **Audits**: AuditResult[]
  - **Best Practices**:
    - **Score**: 0..1
    - **Audits**: AuditResult[]
  - **Seo**:
    - **Score**: 0..1
    - **Audits**: AuditResult[]
- **Lhr**: LighthouseResultJson

## Usage
```
    import { launch } from 'chrome-launcher';
    import lighthouse from 'lighthouse';

    const chrome = await launch({ chromeFlags: ['--headless'] });
    const result = await lighthouse(url, {
      port: chrome.port,
      onlyCategories: ['accessibility', 'best-practices'],
      output: 'json',
    });

    const a11yScore = result.lhr.categories.accessibility.score * 100;
    const failedAudits = result.lhr.categories.accessibility.auditRefs
      .filter(r => result.lhr.audits[r.id].score === 0)
      .map(r => result.lhr.audits[r.id].title);

    await chrome.kill();
  
```
