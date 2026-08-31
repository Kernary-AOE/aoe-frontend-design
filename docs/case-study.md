# Case study: building a domain outside Kernary Core

Frontend Design exercises every major external boundary without adding design
semantics to the engine.

1. `model/` declares domain types, relation behavior, projections, retrieval,
   severity, seven actions, and migrations.
2. `corpus/` releases 797 licensed sources and keeps 102 unresolved Units in a
   documented quarantine.
3. `adapters/` implements candidate generators, resolution, standards, HTML
   validation, graph traversal, intent classification, and Scout references.
4. `mcp/` projects seven domain tools from model declarations and composes the
   generic snapshot/query surface.
5. `skills/prime-design` adds optional Agent workflow guidance without becoming
   schema or authorization.

The engine repository does not import `prime-design`, any design type, the six
axes, the severity scale, or the tool names. The package depends inward on
Kernary contracts; Kernary does not depend outward on this package.

That dependency direction is the reusable result. A different domain can replace
all five layers above while keeping the same package, IR, snapshot, query,
action, policy, event, SDK, MCP, and HTTP contracts.
