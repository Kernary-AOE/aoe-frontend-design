# FrontendReview [scope] v1.0.0
Defines the preconditions and environmental requirements for running frontend design review and accessibility audit methods. Agents must verify these conditions before executing @community/method-a11y-audit or @community/method-heuristic-review.
domain: frontend-engineering

## Label
Frontend Review Execution Environment

## Preconditions
-
  - **Id**: artifact-available
  - **Check**: artifact input is a valid URL (fetchable), local file path (readable), base64 image, or raw HTML string
  - **On Fail**: Request the artifact from the user before proceeding.
-
  - **Id**: axe-core-available
  - **Check**: axe-core@^4.9 is importable in the current Node.js environment OR the artifact is a URL and Playwright can be used for browser-based analysis
  - **On Fail**: Warn that automated axe-core analysis will be skipped; proceed with manual + visual analysis only.
-
  - **Id**: sufficient-context
  - **Check**: remaining context budget > 2000 tokens
  - **On Fail**: Compact context before starting a full audit. Load only summary.md chunks for referenced atoms.

## Environment
- **Runtime**: Node.js >= 20 OR Bun >= 1.0
- **Browser**: Chromium (via Playwright) for live URL analysis
- **Required Packages**:
  - axe-core@^4.9
  - lighthouse@^12
- **Optional Packages**:
  - @playwright/test@^1.40

## Token Budget
- **Method A11y Audit**: ~800 tokens (summary level atoms)
- **Method Heuristic Review**: ~600 tokens (summary level atoms)
- **Full Deep Review**: ~2000 tokens (core level atoms + violation details)
