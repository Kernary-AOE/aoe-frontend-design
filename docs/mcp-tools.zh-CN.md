# Frontend Design 工具

Domain Package 暴露 7 个 MCP 工具。`prime_design_*` 前缀是 v0.2 兼容标识；
Schema 由外部 Model 投影，不是手写进 Kernary Core。

| 工具 | 用途 |
|---|---|
| `prime_design_plan` | 把 Brief 变成显式设计意图与领域 Selection Plan |
| `prime_design_resolve` | 把选中的知识解析成具体、类型化的设计规格 |
| `prime_design_mandate` | 加载当前任务的阻断性设计要求 |
| `prime_design_checklist` | 对交付前检查项排序 |
| `prime_design_related` | 从已知 Unit 有界遍历领域 Relation |
| `prime_design_scout` | 搜索带 Provenance 与 License 的外部参考目录 |
| `prime_design_validate` | 验证受支持的 HTML Artifact，并返回可执行问题 |

## 典型流程

1. 用原始 Brief 调用 `prime_design_plan`。
2. 实现需要具体 Typography、Color、Layout、Motion 或 Persona 决策时调用
   `prime_design_resolve`。
3. 实现或评审前加载 `prime_design_mandate` 与 `prime_design_checklist`。
4. 有界探索使用 `prime_design_related`；只有外部视觉参考确实有帮助时才调用
   `prime_design_scout`。
5. 在用户项目中编写 Artifact，不修改本仓库的 Model、Corpus 或 Bundle。
6. HTML 输出使用 `prime_design_validate`，修复受支持的问题，再做有界复验。

Domain Tool 在 Corpus、Projection Reader、Provider 或 Scout Payload 未绑定时
Fail closed。保留 `CORPUS_NOT_BOUND`、`PROJECTION_READER_NOT_BOUND`、
`SCOUT_NOT_BOUND` 等 Refusal code，不要把它们转成空成功。
