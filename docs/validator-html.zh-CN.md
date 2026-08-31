# HTML Validation

`adapters/html-validator/` 实现 Model 声明的 `validate` Action Provider。v0.2
兼容期内，对应 MCP 工具是 `prime_design_validate`。

Action 接受 HTML 的绝对路径和原始 Brief，Capability 是 `filesystem:read`，不会
修改 Artifact。

`ValidationReport` 在 `model/tools/design-actions.yaml` 中声明，分别记录 L1
结构与 Accessibility、L2 Aesthetic alignment（无 Evaluator Provider 时明确
Skipped）、L3 Composition evidence，以及最终 Pass 与 Repair feedback。

求值器不理解的问题不能因此通过。Provider 缺失和不可验证 Principle 都必须在
Report 中可见。Agent 应在实现后验证，修复受支持的问题，并进行有界复验。
