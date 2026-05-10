# 变更日志 — prime-corpus-frontend-design

> 按 Wave 汇总。本文中的数字数据原样引用自源仓库的 `STATUS-2026-05-07.md` 和 `RESULTS-FINAL.md`；工程级详情请查阅这些文件。

语料库及其周边流水线历经 13 个 Wave 的迭代。本文为每个 Wave 提供一段摘要；各 Wave 的提交哈希见源仓库。

---

## v1.13 — Wave 13 · 2026-05-07

- 语料库：**793 → 899 个原子（+13%）**，通过两条并行策划流程实现：
  - **跨领域扩展（4 个新领域 × 5 个原子）**：i18n（cjk-line-break、no-string-concat、icu-message-format、flag-as-language 反模式、bidi-direction）；性能（cls-budget、perceived-vs-actual、image-lcp-priority、blocking-third-party 反模式、rail-targets）；api-design（resource-not-action、pagination-first、cursor-pagination、rpc-as-rest 反模式、http-method-semantics）；测试（flaky-quarantine、test-pyramid、snapshot-restraint、test-the-mock 反模式、test-pyramid-ratios）。跨领域原子总计：**9 个非前端领域共 45 个**。
  - **稀疏类型补充（31 个原子）**：type ×4、transform ×2、tool ×2、value ×2、step ×1、metric ×1、taxonomy ×3、tradeoff ×4、scope ×3、feedback ×3、collection ×3、term ×3。**现在每种类型至少有 4 个原子。**
- 注册中心：`prime publish --remote <url>` 和 `prime install --remote <url>` 通过最小化 Bun HTTP 注册中心服务器（`scripts/registry-server.ts`）端到端绿灯验证。
- L3 跨原子校验器：通过在名称索引旁建立完整 ID 索引，将 76 个死引用错误降至 **0**。
- 文档：9 个未接入的运行时模块现有已文档化的未接入原因（PrimeLoader / PrimeExecutor / EvaluationEngine / IndexManager / CorpusGraph / CorpusIndex / ai-step-executor / method-loader / skill-bundler 构成一个与当前 MCP + atom-loader 架构不匹配的完整替代运行时模型）。

## v1.12 — Wave 12 · 2026-05-07

- 边图多义性：**5 种活跃动词 → 14 种活跃动词**。`scripts/infer-dead-verb-edges.ts` 为 `specializes` / `derived-from` / `extends` / `enhances` / `requires` / `contradicts` / `see-also` / `relationships` / `supplies-to` 推导启发式边。图从 94% 的单一动词（`related`）主导转变为真正的多动词。
- DomainRegistry 接入 MCP 服务器。`mcp-server/index.ts` 在启动时注册 3 个领域（`frontend-design`、`security`、`accessibility`）；`rankV3Atoms` 现在对领域标签匹配 brief 的原子提升得分。
- 语料库扩展至 5 个新的非前端领域（data-engineering、machine-learning、legal-compliance、infrastructure、ops-observability），加上 `tradeoff` / `scope` / `feedback` / `collection` / `provocation` / `term` / `value` / `type` / `transform` / `tool` / `taxonomy` / `step` / `metric` / `category` 各类型的 30 个缺口原子。语料库 793 → 814+。

## v1.10–11 — Wave 10/11 · 2026-05-07（审计）

Wave 10 是深度审计；Wave 11 完成了分块器重写 + 79/82 个损坏引用的修复。

- **分块器 Bug**：60% 的原子存在 `core.md == summary.md`（样本中 5 个原子有 3 个字节完全相同）。修复方案：添加一个通用兜底逻辑，将特定类型的正文字段（implies / palette / composition / …）写入 core。修复后：6/793 个原子仍有 `core==summary`（从约 480 个降低）。
- L3 跨原子校验器未接入（仅通过独立脚本运行），现已从 `build-atom-dirs.ts` 调用。
- L2 LLM 校验器未接入编译流水线，新增 `--enable-l2-llm` 标志（需手动开启，消耗真实费用，无 API Key 时跳过）。
- 84% 的冲突图悬空：117/139 条冲突边指向裸 slug（如 `brutalist` 而非 `@impeccable/persona-brutalist`）。`edge-resolver.ts` 现在在编译后通过预建索引将 slug 解析为 fullId，比例降至 6%。
- L2 验证器无 Key 路径：原来返回 `{pass:false}`，触发重试循环，是 12-log-viewer turn=15 运行的根本原因。现在返回 `{pass:true, skipped:true}`。
- L3 验证器的 `must_include` / `must_avoid` 原来是空操作，注释中明文写着"跳过……"。现已添加 14 种模式签名库（toast → `role="alert"`；modal → `role="dialog"`等），回退到名词关键词检查；歧义情况返回 `unverifiable`（无误报失败）。
- 通过模糊 LCS 匹配（`scripts/fix-broken-refs.ts --apply`）自动修复 30 个损坏原子引用；52 个仍损坏——3 个有歧义，49 个需要手工编写。

## v1.7 — Wave 7 · 2026-05-05

- 协议层已闭合：`prime_resolve`（字体/颜色/时长的类型化 JSON 规范）+ `prime_validate`（带反馈重试的输出验证循环）+ 跨领域安全原子（32 个原子，证明 28 种类型分类法具有领域无关性）。
- `prime_resolve` 是核心：agent 获得的是类型化 JSON，而非 Markdown 文本——Markdown 是中间格式，类型化 JSON 是最终接口。

## v1.6 — Wave 6 · 2026-05-03

- 12 个任务在 Prime 条件下全部产出 HTML；手动评判的"12/12 全胜"声明在 Wave 8 随后撤回（单次 N=1，不具鲁棒性）。
- **博客翻转**：Prime 0.75 美元 vs koomook 0.99 美元。Prime 便宜 24%、快 32%，质量相当或更优。Wave 3 最后一个未完成任务已关闭。

## v1.5 — Wave 5/5b/5c · 2026-05-01–02

- 按任务类型添加 `mandatory_reads` 上限；按任务类型添加 `turn_budget_hint`。内容密集型任务上限=3，并附"停止调研，开始写作"的提示。
- Wave 5b：博客终极成本上限（content 4→3，required_atoms 6→3）。
- Wave 5c：密集行高 + log-viewer 硬约束（row-height 1.30–1.35）。

## v1.4 — Wave 4 · 2026-04-29–30

- Toast `must-include` 约束添加：每个 toast 任务加载 `template-spring-config` 和 `pattern-stagger-reveal`。
- 新增 24 个动效原子。
- 数据表 brief 消歧：`pattern-data-table-sortable` vs `-filter-bar` vs `-inline-edit` 分别对应独立原子。
- 新增 4 个任务（signup-flow、settings-panel、empty-state、log-viewer）；手动评判 10/12 = 83%。

## v1.3 — Wave 3 · 2026-04-28

- 8 任务 A/B + 自动评分；709 个原子；约 3k 条边。
- Phase 4 Wave 2 新增 95 个原子。

## v1.2 — Wave 1/2 · 2026-04-26–27

- Wave 1：Intent + Edges + Composition 包（9 个 agent 并行）。
- Wave 2：完整 5 层流水线接入（8 个 agent 并行）。
- 构建 1,559 条 P0 边；图遍历上线。

## v1.0 — Phase 2 基线 · 2026-04-15

- 4 任务 × 4 条件交叉技能基准。
- 发现博客过载 Bug：Prime 在文字密集任务上比 Skill 更贵，因为排序器过度加载 a11y 原子。
- 发现**分块器 Bug**（提交 `5442974b`）：persona / template / voice 原子的结构化字段被静默截断；`persona-editorial.prime` 源文件 = 1841 B，但 `chunks/full.md` = 286 B。随后 Wave 修复；视觉效果立即反转。

---

## 展望

- 在 20 任务套件上运行 `run-noise.sh` 进行 N≥3 测试（基准工具已在 Wave 8/10 落地）。
- 跨 LLM 可移植性矩阵：GPT-4o + Gemini Flash 至少 5 个任务。
- 编写 49 个损坏引用背后缺失的原子。
- 决定是从 spec 中移除 14 种稀疏类型声明，还是将每种扩充至 ≥10 个原子。
- 完整前瞻计划见 [`ROADMAP.md`](ROADMAP.md)。

工程级别的逐提交历史，参见源仓库的 `git log --grep "feat(arch)"` 以及 [`STATUS-2026-05-07.md`](https://github.com/skill-wiki/prime/blob/main/STATUS-2026-05-07.md)。
