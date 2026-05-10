# TestTheMock [anti-pattern] v1.0.0
Tests that mock every collaborator and then assert on the mock interactions (`expect(mock.send).toHaveBeenCalledWith(...)`) verify implementation details rather than behavior. They produce high coverage numbers but break on every refactor without catching real bugs.
domain: testing

## Label
Testing the Mock, Not the Behavior

## Why Bad
When a unit test mocks every dependency and asserts on the mocks, it becomes a check that the code calls specific methods in a specific order with specific arguments. This is the implementation, not the behavior. Three pathologies follow: (1) any refactor that changes WHICH method is called (without changing what the system does) breaks the test — engineers learn to fear refactoring; (2) the test passes when the implementation is wrong, as long as the calls match the mock's expectations — bugs ship; (3) coverage metrics inflate (every line is 'covered') while real-world confidence stays low. The result is a brittle suite with high coverage and low value. Studies (Spadini et al., 'Mock Objects for Testing Java Systems', EMSE 2017) show heavy-mock test suites have 2-3x higher refactor cost than fewer-mock equivalents. Vladimir Khorikov ('Unit Testing Principles', 2020) calls this 'classicist vs london school' — and argues the classicist (test-state-not-interactions) school produces better tests for most code.

## Instead Do
Test behavior at the boundary: given inputs (function arguments, HTTP requests, message-bus events), assert on outputs (return values, persisted state, emitted events). Mock ONLY the unstable boundaries: I/O (real database is fine for integration; mock for unit), external HTTP calls (msw, Pact, contract tests), time (vi.useFakeTimers, sinon fakeTimers), randomness (seeded RNG). Use real implementations for everything you own. When mocking, prefer state-based fakes (in-memory implementations: `class FakeUserRepo { users = new Map(); save(u) {...}; findById(id) {...} }`) over interaction mocks (jest.fn). Reserve interaction mocks for genuine asynchronous boundaries (event publishing, telemetry). One assertion per test: 'when X, the system Y' — not 'when X, the system calls A.do(), then B.fetch(), then ...'.

## Structure
```
    /* WRONG — testing implementation via mock interactions */
    test('createUser', () => {
      const db = { insert: jest.fn(), select: jest.fn() };
      const emailer = { send: jest.fn() };
      const logger = { info: jest.fn() };

      createUser(db, emailer, logger, { email: 'a@b.com', name: 'A' });

      expect(db.insert).toHaveBeenCalledWith('users', { email: 'a@b.com', name: 'A' });
      expect(emailer.send).toHaveBeenCalledWith({ to: 'a@b.com', template: 'welcome' });
      expect(logger.info).toHaveBeenCalledWith('user created', expect.any(Object));
    });
    // Refactor: rename `insert` to `save` in db, switch logger to structured field. Test breaks. Behavior unchanged.
    // Bug: implementation passes wrong template; test passes because mock doesn't care.

    /* CORRECT — test the observable behavior via state-based fake */
    test('createUser saves the user and queues a welcome email', async () => {
      const db = new InMemoryUserRepo();
      const queue = new InMemoryQueue();
      const sut = new UserService(db, queue, fakeClock('2026-05-07T10:00:00Z'));

      const result = await sut.createUser({ email: 'a@b.com', name: 'A' });

      // Observable outputs
      expect(result.id).toBeDefined();
      expect(await db.findByEmail('a@b.com')).toMatchObject({ name: 'A', createdAt: '2026-05-07T10:00:00Z' });
      expect(queue.published).toEqual([
        { type: 'send_email', payload: { to: 'a@b.com', template: 'welcome' } }
      ]);
    });
    // Refactor: rename internal db method, switch to typed events. Test still passes — behavior preserved.
    // Bug: wrong template would now fail the assertion on `queue.published`.
  
```
