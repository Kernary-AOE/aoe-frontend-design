# Case Study：在 Kernary Core 外构建领域

Frontend Design 覆盖主要外部边界，但没有把设计语义加入 Engine。

1. `model/` 声明领域 Type、Relation behavior、Projection、Retrieval、Severity、
   7 个 Action 与 Migration。
2. `corpus/` 发布 797 个已许可 Source，并把 102 个未解决 Unit 保存在有记录的
   Quarantine。
3. `adapters/` 实现 Candidate Generator、Resolution、Standards、HTML Validation、
   Graph traversal、Intent classification 与 Scout Reference。
4. `mcp/` 从 Model declaration 投影 7 个领域工具，并组合通用 Snapshot/Query。
5. `skills/prime-design` 提供可选 Agent workflow，但不成为 Schema 或 Authorization。

Engine 仓库不导入 `prime-design`、任何设计 Type、六轴、Severity scale 或 Tool
name。依赖方向是 Domain Package 依赖 Kernary Contract，而不是 Kernary 依赖这个
Package。

另一个领域可以替换上面五层，继续复用相同 Package、IR、Snapshot、Query、
Action、Policy、Event、SDK、MCP 与 HTTP contract。
