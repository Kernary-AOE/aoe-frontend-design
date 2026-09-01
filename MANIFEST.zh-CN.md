# MANIFEST — 内容来源说明

本文档记录仓库中的内容及各产物在源仓库（`/Users/houxianchao/Desktop/prime`）中的来源路径。为 fork 提供清晰的追溯；如果你只是使用语料库，无需阅读此文件。

---

## 仓库布局 vs 源仓库路径

| 本仓库路径 | 源仓库路径 | 说明 |
|---|---|---|
| `primes-v3/sources/` | `primes-v3/sources/` | 899 个 `.prime` 原子文件。形式相同；命名空间相同：`@community` / `@impeccable` / `@anthropic-impeccable` / `@nielsen` / `@w3c`。 |
| `primes-v3/taxonomy/` | `primes-v3/taxonomy/` | 30 个任务类型 YAML 文件，覆盖 5 个任务族（`marketing-landing`、`product-ui`、`content`、`interaction`、`dev-tool`）。 |
| `compiled-v3-final/` | `compiled-v3-final/` | 冻结的编译产物——带 `summary.md` / `core.md` / `full.md` 投影及各原子 `atom.yaml` 的原子目录。由 CI 重新生成。 |
| `mcp-server/` | `mcp-server/` | 5 工具 MCP 服务器（`prime_compile`、`prime_query`、`aoe_intent`、`aoe_validate`、`aoe_resolve`）。 |
| `packages/intent/` | `packages/intent/` | Layer 1——brief → IntentObject 分类器（DeepSeek + 启发式回退）。 |
| `packages/retrieval/` | `packages/retrieval/` | Layer 2——6 轴检索 + 排序器。 |
| `packages/composition/` | `packages/composition/` | Layer 3——组合约束提取器 + 合并器。 |
| `packages/validator/` | `packages/validator/` | Layer 5——HTML 输出验证器（L1 结构、L2 LLM 美学、L3 约束签名库）。 |
| `benchmarks/` | `test-framework/bench-v2/` | 20 个任务的 fixtures + 5 种条件脚手架 + 近期结果，重命名以提高可读性。 |
| `prime-decompose/` | `release/skills/prime-decompose/` | 原子编写 Claude Code 技能。 |
| `docs/` | 本仓库新增 | 专为本语料库编写的各领域文档。 |

系统仓库继续承载**领域无关**的基础设施：parser、compiler（分块器 / 输出器 / L1+L2+L3 校验器 / 解析器）、runtime（原子加载器 / 投影解析器）、CLI、registry、types 包、web。这些包都与前端设计无关，将它们放入语料库仓库会产生错误分类。

---

## 本仓库新增内容（vs 源仓库）

以下内容为新编写，在源仓库中没有前身：

| 文件 | 用途 |
|---|---|
| `README.md` / `README.zh-CN.md` | 语料库仓库的入口页面。 |
| `CONTRIBUTING.md` / `CONTRIBUTING.zh-CN.md` | *针对前端设计领域*的原子编写指南。（系统仓库的 CONTRIBUTING 涵盖 DSL 语法 / 包贡献。） |
| `CHANGELOG.md` | 按 Wave 汇总，胶囊格式。 |
| `ROADMAP.md` / `ROADMAP.zh-CN.md` | 语料库的未来计划，独立于系统路线图。 |
| `docs/overview.md` | 899 个原子按三种方式组织（按领域、按类型、按 persona 流派）。 |
| `docs/personas.md` | 31 个 persona 的目录，含简介、品牌参考及各自关联的原子。 |
| `docs/taxonomy.md` | 30 个任务类型 YAML 文件的说明。 |
| `docs/retrieval.md` | 6 轴算法及实际评分函数。 |
| `docs/composition-contract.md` | `must-include` / `must-avoid` / `typography_required` / `color_required` / `motion_prescriptions` 的语义说明。 |
| `docs/validator-html.md` | L1 / L2 / L3 及通过/失败示例。 |
| `docs/mcp-tools.md` | 5 个工具的 I/O 签名 + 决策树。 |
| `docs/benchmarks.md` | 诚实的 A/B 测试故事（Phase 2、Wave 6、Wave 12，2026-05-08）。 |
| `docs/atom-authoring.md` | 前端设计专用的原子类型选择指南。 |
| `docs/extending.md` | 如何添加新的 persona / 任务类型 / 领域。 |
| `docs/faq.md` | 15 个语料库专用常见问题。 |

---

## 品牌名称 persona 的使用范围

`primes-v3/sources/@community/persona-*.prime` 包含 21 个品牌名称 persona（Apple、Linear、Stripe、Vercel、Notion、Spotify、Figma、Framer、Airbnb、Coinbase、Toss、Warp、Posthog、Mintlify、Raycast、Sanity、Sentry、Replicate、Superhuman、Supabase、Intercom）。每个都是**描述性原子**，捕捉可观察的公开设计特征（字体选择、色彩搭配、密度、动效语言）——它们是**参考原子**，不是任何专有资产、代码或商标的再发行。相关商标声明见 `NOTICE`。

如果你的 fork 出于法律合规考虑需要移除这些内容，删除 `@community/persona-<brand>.*` 中的文件并重新运行 `prime check --registry`——语料库将以减少的 persona 种类恢复（`@impeccable/` 中仍有 11 个 persona）。

---

## Apache §4(d) 传承要求

本仓库的 fork **必须**保留 `NOTICE`。你可以添加新条目（例如对你从外部材料衍生的原子的归属说明），但不得删除现有条目。格式和说明见 `NOTICE`。
