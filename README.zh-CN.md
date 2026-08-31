# Prime Frontend Design

Prime 的参考外部领域包。所有前端设计语义与数据都由本包拥有，通用引擎
不内置其中任何一种类型、关系、检索轴或工具。

```text
model/       prime-design 类型、关系、投影、检索与 Action
corpus/      声明、797 个可发布源、隔离区、eval 与生成 dist
adapters/    意图、六轴排序、解析、规范、验证与 Scout
mcp/         由模型投影出的 7 个领域工具
skills/      Agent 消费与语料编写工作流
benchmarks/  固定领域评估任务
```

## 验证

将 `prime-system` 克隆为同级目录，然后执行：

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

构建严格编译 797 个许可证已声明的 `.prime` 源。另有 102 个单元保留在
`corpus/quarantine/`，许可证策略解决前不得进入发布集。`corpus/dist/` 是
生成物，禁止手工修改。

领域 MCP 工具为 `prime_design_plan/resolve/validate/related/mandate/checklist/scout`。
通用的 `prime_query/prime_plan/prime_resource` 仍由 Prime System 提供。两套
入口挂载同一个不可变 Bundle，并严格验证同一个 `model.lock`。

新增领域类型、字段、关系、Profile 或 Action 时修改 `model/`；新增知识时
修改 `corpus/sources/`；新增外部集成时修改 `adapters/`。不要为领域语义
修改 Prime System。
