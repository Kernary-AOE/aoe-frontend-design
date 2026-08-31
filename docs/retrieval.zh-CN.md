# 六轴检索

六轴检索是 Frontend Design Profile，不是 Kernary Core Pipeline。声明位于
`model/retrieval/six-axis.yaml`，Candidate Generator 与 Feature extraction 位于
`adapters/design-ranker/`。

| Axis | Candidate 意图 |
|---|---|
| register | Persona 或设计流派匹配 |
| pattern | 结构 Pattern 与 Template |
| motion | Motion、Easing、Animation 与 Transition |
| typography | Font、Hierarchy、Readability 与 Line treatment |
| color | Palette、Contrast、Theme 与 Color system |
| rules | 高价值 Rule、Constraint 与 Check |

模型还声明 5 个 Scored feature、`forbidden-atoms` 硬约束、每轴 Candidate
predicate、Fallback 与默认 Axis budget。Adapter 把这些 Generator name 注册到
Kernary Query Engine。

排序先于每轴 Budget 截断。通用 Engine 在 Candidate Provider 之前执行
Visibility，避免 Private Unit 泄漏。输出是普通 Selection Plan，包含 Score
contribution、Constraint decision、Projection load 与 Diagnostic。
