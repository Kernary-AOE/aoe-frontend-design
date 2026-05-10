# TestTheMock [anti-pattern] v1.0.0
Tests that mock every collaborator and then assert on the mock interactions (`expect(mock.send).toHaveBeenCalledWith(...)`) verify implementation details rather than behavior. They produce high coverage numbers but break on every refactor without catching real bugs.
domain: testing
