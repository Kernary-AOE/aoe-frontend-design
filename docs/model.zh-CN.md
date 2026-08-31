# Frontend Design Model

`model/prime-model.yaml` 是外部 Model Package 的入口，使用兼容协议标识
`prime/model/v2`，包含 6 个声明文件：

- `types.yaml`
- `relations.yaml`
- `projections.yaml`
- `retrieval/six-axis.yaml`
- `retrieval/severity.yaml`
- `tools/design-actions.yaml`

所有 Frontend Design Type、Field、Relation behavior、Projection、Retrieval
Feature、Severity 规则、Tool Input 与 Action Provider binding 都由这个模型拥有。
Kernary Engine 只验证并执行声明，不导入本仓库。

领域 Contract 变化时修改 Model；声明的 Generator、Validator 或 Provider 的外部
实现变化时才修改 Adapter。不要向 Engine Parser 添加领域 Type。

运行 `bun run model:check` 验证真实模型。`model.lock` 在 Corpus build 时生成，
禁止手工修改。
