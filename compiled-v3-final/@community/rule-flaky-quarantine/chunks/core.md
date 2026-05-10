# FlakyQuarantine [rule] v1.0.0
A test that fails non-deterministically (passes on retry without code change) MUST be quarantined within 24 hours: removed from the gating CI suite, tagged @flaky, and assigned an owner with a deadline. Flakes left in the gating suite destroy trust in CI; ignoring them trains engineers to retry mindlessly.
> Any test failure that does not reproduce when re-run with no code change is flaky. Within 24 hours of detection: (1) tag the test `@flaky` or move it to a non-gating suite (allowed-to-fail bucket); (2) file a ticket assigned to the test's owner team with a 7-day fix-or-delete deadline; (3) annotate the test source with the ticket id and a comment explaining the suspected cause; (4) record flake metadata in a tracking system (test name, first-seen, suspected cause, last-seen). Tests left flaky beyond 14 days are deleted, not 'fixed eventually'. The gating CI suite must have flake rate < 0.5% (≤ 1 in 200 runs failing spuriously); above 1% the team must stop merging until investigated.
domain: testing

## Applies To
- All gating CI suites (PR merge, deploy)
- Pre-commit hooks (rare flakes still corrode trust)
- End-to-end test suites (Cypress, Playwright, Selenium) — primary source of flakes due to async + UI
- Integration tests with real databases / network
- Mobile test farms (Firebase Test Lab, Sauce Labs) — device-level flakes

## Implementation Checklist
- CI runner records every test result with run-id; flake-detection job reruns failed tests once and labels passes-on-retry as flake
- Test framework supports `@flaky` / `@retry(3)` / `test.skip.if(IS_FLAKY)` annotations
- Quarantine bucket exists in CI config and runs in a non-gating workflow
- Flake dashboard tracks flake rate per suite and per test over rolling 14 days
- Team SLO: fix-or-delete within 7 days; auto-delete bot removes tests in quarantine > 14 days
- PR template includes checkbox: 'Did you write a deterministic test? (No sleeps, no order-dependent state, no real network without mocks)'

## Severity
warn

## Counter Examples
- PR fails CI; engineer clicks 'Re-run failed jobs'; second run passes; PR merges. No tracking, no investigation. Six months later 40% of CI runs require retries; nobody trusts CI.
- Test marked @flaky for 18 months — owner unknown, original ticket archived, comments removed. Test still runs (not gating) but consumes 30s of CI time per build. Should be deleted.
- Gating suite has 10% flake rate; team retries up to 5 times per CI job. A real bug slips through because intermittent failures are assumed flaky.
