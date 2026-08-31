# Frontend Design Domain Package

这个仓库是外部 Kernary Domain。Frontend Design Unit 的形状、检索和 Action
由本仓库的 Model 与 Release Policy 决定，不由 Engine 决定。

## 所属边界

- `model/` 声明领域 Type、Relation semantics、Projection、Retrieval Profile、
  Function、Action 和 Migration。
- `corpus/sources/` 包含当前 Release 可发布的 797 个 Source。
- `corpus/quarantine/` 保存 102 个发布策略未解决的 Unit。
- `corpus/dist/` 是生成并签名的 Snapshot。
- `adapters/` 实现领域排序、意图、标准、验证、解析和外部 Scout 目录。
- `mcp/` 暴露 7 个由模型投影的领域工具。
- `skills/` 保存可选 Agent workflow。

## 什么属于领域

模型使用 Persona、Principle、Rule、Pattern、Template、Typography、Color、
Motion 和 Accessibility 等设计概念；检索 Adapter 使用六个设计轴；HTML
Validator 与 Scout Catalogue 也属于本领域。

这些都不是 Kernary Core Type。Security 或 Ticket Package 可以声明完全不同的
Type、Relation、Projection、Constraint 与工具，同时复用相同的 Compiler、
Snapshot、Query、Action 和 Transport contract。

## Release inventory

当前 Release 有 797 个可发布 Source。只有 Model conformance、Relation
integrity、Provenance 与 License Policy 全部通过，Source 才能进入 Release。
Quarantine Unit 会被保留等待 Disposition，但不算作迁移成功，也不会复制进
`corpus/dist/`。

运行 `bun run corpus:build && bun run corpus:verify` 可以复现并验证 Release。
历史 Inventory 与路径保存在 `docs/legacy/`。

继续阅读 [Source authoring](authoring.zh-CN.md)，了解 Agent 与人工如何修改
Corpus Source，而不是直接修改生成 Bundle。
