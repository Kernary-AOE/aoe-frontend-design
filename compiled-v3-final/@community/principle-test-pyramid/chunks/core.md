# TestPyramid [principle] v1.0.0
A healthy test suite has many fast unit tests, fewer integration tests, and few slow end-to-end tests. The pyramid shape (wide base of unit tests, narrow tip of E2E) inverts the common dysfunction (the 'ice cream cone' or 'cupcake') and produces a suite that is fast, deterministic, and trustworthy.
> Structure tests as a pyramid: 70% unit tests (pure functions, single class/component, no I/O — milliseconds each), 20% integration tests (multi-component or single-service against real DB/queue with test fixtures — seconds each), 10% end-to-end tests (full system, browser-driven UI flows — tens of seconds each). Run unit tests on every save (< 5s); integration tests on every PR (< 5min); E2E tests on every merge to main + nightly (< 30min). E2E tests focus on critical user flows (signup, checkout, login) — NOT exhaustive coverage. Add E2E only when the integration layer cannot exercise the surface (real browser-only behaviors: focus management, keyboard, layout, network). Never substitute E2E for missing unit tests — the cost differential is 100–10,000x in execution time.
domain: testing

## Attributed To
Mike Cohn, 'Succeeding with Agile' (2009); Martin Fowler, 'TestPyramid' (2012); Google Testing Blog ('Just Say No to More End-to-End Tests', 2015).

## Applies To
- Backend services (Java, Go, Rust, Python, Node.js)
- Frontend applications — though Kent C. Dodds 'Testing Trophy' may better fit (static + integration heavy)
- Mobile apps (iOS/Android) — same principles, with UI tests as the slow tier
- Microservice architectures — contract tests replace some integration tests
- Data pipelines — unit tests for transforms, integration tests for DB roundtrips

## Counter Examples
- Ice cream cone: 30 unit, 100 integration, 800 E2E. CI run takes 2 hours. Flake rate 5%+. Engineers stop running tests locally; merges happen with red builds.
- Cupcake: thousands of mock-heavy unit tests asserting implementation details (mock.expects(...).called.with(...)) — see @community/anti-pattern-test-the-mock. High line coverage, low confidence, brittle to refactor.
- All-E2E: the team has no unit tests; every behavior is asserted through the UI. Single CSS change breaks 50 tests; team becomes afraid to refactor.
