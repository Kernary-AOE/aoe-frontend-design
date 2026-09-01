# Kernary Frontend Design

这是一个构建在 Kernary 上的完整 Frontend Design Domain Package。仓库自己
拥有领域模型、筛选后的语料、检索 Profile、Validator、Adapter、工具和可选
Agent Skill。

这些内容都没有写进 Kernary Engine。这个 Package 的价值，是完整展示一个领域
如何在 Core 外定义类型与关系、编译版本化 Snapshot，并暴露领域工具。

```text
model/       类型、关系、投影、检索、Action 与 Migration
corpus/      声明、797 个可发布 Source、Quarantine、Eval 与 Dist
adapters/    意图、排序、解析、标准、验证与 Scout
mcp/         由领域模型投影出的 7 个工具
skills/      可选 Agent 使用流程
benchmarks/  固定领域评估任务
```

## 验证 Package

当前布局要求 Kernary Engine 位于同级目录 `../kernary-engine`：

```bash
bun install
bun run typecheck
bun run test
bun run model:check
bun run corpus:build
bun run corpus:check
bun run corpus:verify
bun run smoke
```

Release build 严格编译 797 个许可证策略允许发布的 Source。另有 102 个 Unit
保留在 `corpus/quarantine/`，Disposition 明确前不得进入 Release。
`corpus/dist/` 是生成物，禁止手工修改。

## 领域工具

Model Package 投影出 7 个兼容前缀 MCP 工具：

- `prime_design_plan`
- `prime_design_resolve`
- `prime_design_validate`
- `prime_design_related`
- `prime_design_mandate`
- `prime_design_checklist`
- `prime_design_scout`

工具前缀在 Kernary v0.2 兼容期内保留。通用 Query、Plan 和 Resource 工具属于
Engine；两套入口挂载同一个不可变 Snapshot，并验证同一个 `model.lock`。

`skills/prime-design` 是可选 Agent UX。它不影响 SDK/MCP/HTTP 的完整性，也不能
在普通设计任务中编辑 Model、Corpus 或生成 Bundle。

新增或修改领域类型、字段、Relation、Projection、Retrieval Profile、Action 或
Migration 时修改 `model/`；新增知识修改 `corpus/sources/`；外部集成放进
`adapters/`。不要为 Frontend Design 语义修改 Kernary Core。

当前文档从[领域总览](docs/overview.zh-CN.md)开始，继续阅读
[Model](docs/model.zh-CN.md)、[Corpus Policy](docs/corpus.zh-CN.md)、
[六轴检索](docs/retrieval.zh-CN.md)、[工具](docs/mcp-tools.zh-CN.md)、
[HTML Validation](docs/validator-html.zh-CN.md)、[Scout](docs/scout.zh-CN.md)、
[Release Operations](docs/operations.zh-CN.md)与[Case Study](docs/case-study.zh-CN.md)。
