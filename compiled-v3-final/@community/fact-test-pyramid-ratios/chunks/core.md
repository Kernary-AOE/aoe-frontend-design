# TestPyramidRatios [fact] v1.0.0
Empirically observed test-suite ratios that produce fast, reliable CI: 70/20/10 (unit/integration/E2E) is the canonical pyramid; the Testing Trophy variant (5/30/55/10 = static/unit/integration/E2E) better fits frontend code; Google's published data shows their backends average ~80% unit, ~15% integration, ~5% E2E.
> Common observed test-suite distributions across mature codebases: (1) Mike Cohn's classical pyramid: 70% unit / 20% integration / 10% E2E, by test count. (2) Kent C. Dodds' Testing Trophy (frontend): 5% static analysis / 30% unit / 55% integration / 10% E2E — emphasizes integration-style tests with React Testing Library + msw because most frontend bugs are at component boundaries. (3) Google's published distribution (2017 internal blog): ~80% unit / ~15% integration / ~5% E2E for backend services. (4) Microsoft Research data on flake rates: gating CI suites with E2E > 20% have 5-10x higher flake rates than pyramid-shaped suites. Execution time ratios are even more skewed: unit tests typically 10ms each, integration 1-3s, E2E 10-30s — a pyramid by test-count usually produces a strict pyramid by execution-time too. Coverage targets that are achievable AND meaningful: 80-90% line coverage on unit-test-friendly code (pure logic), 60-80% on glue code, intentionally not 100% (the last 20% targets defensive code paths, error handlers, and dead branches).
domain: testing

## Confidence
medium

## Applies To
- Setting initial test-strategy targets for new projects
- Auditing existing test suites for shape pathology (ice cream cone, cupcake)
- Capacity planning CI infrastructure (parallelism, timeout budgets)
- Code-coverage targets per repo / package

## Quantitative
- **Classical Pyramid**: 70% unit / 20% integration / 10% E2E by test count
- **Testing Trophy Frontend**: 5% static / 30% unit / 55% integration / 10% E2E
- **Google Backend Typical**: ~80% unit / ~15% integration / ~5% E2E
- **Execution Time Targets**: unit < 50ms each; integration < 5s each; E2E < 60s each
- **Flake Rate Target**: gating CI < 0.5% (1 flake per 200 runs); above 1% blocks merges until fixed
- **Coverage Targets**: 80-90% line coverage on pure-logic packages; 60-80% on integration code; 100% target is usually a smell
- **Ice Cream Cone Symptoms**: E2E > 30% of test count → CI > 30min, flake > 5%, engineers stop running locally
- **Cupcake Symptoms**: high coverage, mostly mocks, tests break on refactor — see @community/anti-pattern-test-the-mock

## Counter Conditions
- Frontend codebases benefit from MORE integration testing than backend — see Testing Trophy. UI bugs concentrate at component boundaries (state, props, accessibility), not in pure logic.
- Pure-functional cores (compilers, interpreters, parsers, financial-math libraries) often run 95%+ unit tests because the surface area is unit-friendly. Pyramid still applies, just heavily compressed at the base.
- Microservice architectures use contract tests (Pact, Spring Cloud Contract) as a 4th tier between unit and integration — these are not E2E.
- Coverage is a leading indicator only — high coverage with mock-heavy tests = low real confidence (see @community/anti-pattern-test-the-mock and @community/anti-pattern-vanity-metrics).
- Cypress / Playwright modern E2E is faster (5-15s/test) than Selenium-era tests (60s/test) — the 10% E2E budget can stretch in modern toolchains.
- Teams should measure their distribution explicitly via tagging or directory structure; gut-feel ratios are usually wrong by 2x.
