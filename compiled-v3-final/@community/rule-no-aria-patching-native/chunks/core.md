# NoAriaPatchingNative [rule] v1.0.0
Never add ARIA roles to non-semantic elements when a native HTML element already provides the same semantics — use the native element instead.
domain: frontend-design

## Severity
high

## Anti Patterns
- <div role='button' tabindex='0'> — use <button> instead
- <div role='checkbox'> — use <input type='checkbox'>
- <div role='navigation'> — use <nav>
- <div role='main'> — use <main>
- <span role='link' tabindex='0'> — use <a href>
- <div role='list'> on a <div> — use <ul> or <ol>

## Exception
When the native element's default visual appearance cannot be overridden to match the design and restyling is not feasible — very rare. Document with a comment explaining why.
