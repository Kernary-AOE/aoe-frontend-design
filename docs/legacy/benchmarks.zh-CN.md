# 基准测试 — A/B 历史（诚实修订）

> **请先看本节**：本文不是吹牛文档。Wave 6 的"12/12 = 100%"是过度
> 声明，已撤回（每条件 N=1 不是鲁棒胜率）。诚实结论按"该基准能/不能
> 证明什么"组织在下面。

---

## TL;DR — 真正成立的事

1. **5 层 pipeline 在 20/20 个 bench-v2 任务上端到端跑通**。每个任务
   `prime` 与 `raw` 条件都产出非空 `index.html`。这是管道里程碑，不
   是质量结论。

2. **Wave 8 之前每条件 N=1** —— 单次判定不鲁棒。`run-noise.sh` N=3
   sweep harness 在 Wave 8/10 落地；跑全语料库是 ROADMAP § 1。

3. **一个已验证的回归（已修）**：12-log-viewer 跑了 15 轮，因为没
   LLM API key 时 `prime_validate` L2 一直 fail，触发重试循环。根因
   + 修复见 [`validator-html.md` § L2 跳过路径](validator-html.md)。

4. **最有意思的发现是 2026-05-08 Skill 美学塌缩基准**（12 任务 ×
   2 模型 × 2 条件）：Skill 不论 brief 5/6 任务都选 Space Grotesk。
   Prime 选了 6 个不同 persona。这是"varying brief 下的美学分布"，
   不是"质量" —— 但是数据讲得最清楚的一个故事。详情见下文
   "2026-05-08 — Skill Space-Grotesk 塌缩"。

5. **跨 LLM 可移植性是未验证主张**。每个基准都用
   `claude-opus-4-7[1m]`。`cross-llm-test.mjs` 脚本在但只跑过 2 个
   人工挑选任务 + DeepSeek。够不上"多 LLM 可移植"的声称。
   ROADMAP § 2。

6. **架构对齐是 v1 spec 的 ~70%**，Wave 12 诚实复盘后值 —— 之前
   "85%" 过度声明。v1 spec 承诺：
   - typed atoms（✅ 已发，28 类）
   - 关系图（✅ 已发，约 3,500 边）
   - L1+L2+L3 编译期 checker（✅ 已发，L2 LLM 是 opt-in）
   - L1+L2+L3 输出 validator（✅ 已发，L2 opt-in）
   - 6 轴检索（✅ 已发）
   - 5 个 MCP 工具（✅ 已发）
   - registry publish/install（◻ Wave 12/13 加了 remote；产品级
     UX 待开发）
   - 跨 LLM（◻ 未验证）
   - 原子生命周期 / deprecation（约 50%）

---

## 基准历史

### Phase 2 · 2026-04-15（`5442974b`）

**目标**：跨 skill 4 任务 × 4 条件。Prime vs "raw"（无 Skill 无
Prime）vs "skill-koomook"（impeccable SKILL.md 全量加载）vs
"skill-frontend-design"（fork 变体）。

**任务**：4 个（waitlist、blog-article、dashboard、llm-playground）。

**结论**：Prime 更便宜 / 更快 / output token 更少。

```
                   Skill        Prime        Δ
平均成本           $1.00        $0.74        Prime -26%
平均耗时           328 s        186 s        Prime 1.76× 快
output tokens      28k          15k          Prime -47%
```

**没证明的**：美学质量。Wave 0 在成本上赢了之后，blog-article 输出
是 0 OKLCH、默认 Georgia、15 个 hex 色 —— 视觉上比 Skill 更糟，尽
管更便宜。这促成 chunker bug 调查（Wave 1）。

**chunker bug（根因）**:
`packages/compiler/chunker.ts::buildFull` 只 emit `description`、
`sources`、`examples`、`relations`、`notes`。persona / template /
voice 原子的结构化字段（`implies`、`palette`、`prohibitions`、
`body`）被默默砍掉。`persona-editorial.prime` 源 1841 B / 47 行，
`chunks/full.md` 是 286 B / 3 行 —— 一个桩。

修后（286 B → 1233 B），不改 prompt，下次基准的视觉立刻反转。教训：
**架构是对的；内容投递坏了**。

### Wave 3 · 2026-04-28（`0de3263a`）

**目标**：8 任务 A/B + 自动评分；709 原子，约 3k 边。

**结论**：手判 5/8 偏 Prime。自动评分非正式。Phase 4 wave 2 加了
95 原子。

### Wave 4 · 2026-04-29-30（`0a0a1ab7`、`bc2a6309`）

**目标**：toast must-include 契约；data-table 修复；4 个新任务
（signup-flow、settings-panel、empty-state、log-viewer）；预算 +
DeepSeek intent；10/12 = 83%（手判）。

**变化**：composition contract 开始有用 —— toast 任务无视
register 强制 `template-spring-config` + `pattern-stagger-reveal`，
修了"stagger 感觉机械"的故障模式。

### Wave 5/5b/5c · 2026-05-01 至 2026-05-02
（`e69494f9`、`88d8b750`、`b965b6e7`）

**目标**：阻止 content-heavy 任务（blog-article）过度花费。

**变化**:

- 各任务类型的 `mandatory_reads` cap（content=3、marketing=5、
  product-ui=7、dev-tool=7、interaction=12）。
- 各任务类型的 `turn_budget_hint`（"硬预算 ≤6 轮。停止研究，开始
  动笔。"）。
- Wave 5b: blog 终极费用 cap（content cap 4→3、required_atoms 6→3）。
- Wave 5c: 高密度 row-height + log-viewer 硬约束（dense-pragmatist
  契约加 row-height 1.30–1.35）。

### Wave 6 · 2026-05-03（`b38d734e`）

**目标**：12 任务全部重跑。

**过度声明**："12/12 = 100% 全胜"。Wave 8 撤回。

**真正发现**：blog-article 反转。Wave 6 之前 Prime $1.29 vs Skill
$0.71（Prime **贵 39%**，原 overload bug）。Wave 6 之后 Prime
$0.75 vs Skill $0.99。**Prime 便宜 24%、快 32%、质量等同或更好。**

**N=1 警告**：每个"赢"都是开发者单次主观判定。LLM-as-judge 没跑。
鲁棒胜率 = N≥3 + 聚合评分。

### Wave 7 · 2026-05-05（`9e10e6a`）

**目标**：协议层闭环 —— `prime_resolve`（typed JSON）、
`prime_validate`（L1+L2+L3）、跨域 security 原子（32 个，证明
domain-blind 28-kind 分类）。

**只 commit 代码，没基准。**

### Wave 8 / 10 / 11 · 2026-05-07（深度审计）

**目标**：诚实重新评估。找到 4 个 P0 bug（已修）：

| Bug | 影响 | 修 |
|---|---|---|
| 弃用原子漏进检索 | 可能浮出陈旧原子 | 自闭合解析 + `deprecated` 桶 |
| `rankV3Atoms` 忽略 taxonomy 预算 | top-10 里可能 8 个 persona | per-kind 软上限（persona ≤2、template/pattern ≤4）|
| **没 LLM key 时 L2 总 fail** | 12-log-viewer turn=15 根因 | `{pass:true, skipped:true}` 兜底 |
| **L3 must_include / must_avoid 是 no-op** | composition contract 违反默默通过 | 14 pattern 签名库 + honored/violated/unverifiable 判定 |

**架构对齐修正**：之前称 85%；实际 ~62%（Wave 10）→ ~70%
（Wave 12 闭口后）。

### Wave 12/13 · 2026-05-07（补口子）

- 14 个声明 edge verb 全部活跃（之前 5/14）。
- DomainRegistry 接到 MCP server（3 域：frontend-design、security、
  accessibility）。
- `prime publish/install --remote` 端到端，靠最小 Bun registry
  server。
- 语料库 793 → 899 原子，新增 5 域 + sparse-kind fill（每种 kind
  ≥4 原子）。
- 9 个未接的 runtime 模块写明"这是替代架构，不是 cargo cult"。

---

## 2026-05-08 — Skill Space-Grotesk 塌缩

**目标**：同日 brief 多样性压力测。6 个复杂动效 UI brief（粒子
hero、视差时间轴、终端模拟、音乐波形、3D 卡画廊、计票大屏）×
2 模型（sonnet、haiku）× 2 条件（prime、skill）。

**输出路径**（可复现）:

```
/tmp/ab-2026-05-08/
  T1-particle-hero-prime/index.html        22.5 KB  sonnet
  T1-particle-hero-skill/index.html        22.6 KB  sonnet
  T2-parallax-timeline-prime/index.html    18.7 KB  haiku
  T2-parallax-timeline-skill/index.html    16.6 KB  haiku
  T3-terminal-sim-prime/index.html         25.2 KB  sonnet
  T3-terminal-sim-skill/index.html         20.8 KB  sonnet
  T4-music-waveform-prime/index.html       12.6 KB  haiku
  T4-music-waveform-skill/index.html       16.3 KB  haiku
  T5-3d-card-prime/index.html              46.9 KB  sonnet
  T5-3d-card-skill/index.html              64.5 KB  sonnet
  T6-vote-live-prime/index.html            21.5 KB  haiku
  T6-vote-live-skill/index.html            25.0 KB  haiku
```

### 头条发现

| 任务 | Prime persona | Skill 美学 |
|---|---|---|
| T1 粒子 hero | Vercel-clean（oklch 青、Helvetica Neue）| **赛博朋克**（Space Grotesk 900 + DM Sans 200，热粉/青/金）|
| T2 时间轴 | Magazine-editorial（Garamond 衬线、暖纸、深红）| **赛博朋克**（Space Grotesk 900 + Inter 200，粉/青/金）|
| T3 终端 | Warp（Geist Mono、暖土近黑、parchment 文本）| CRT 磷光绿 + 扫描线（JetBrains Mono）|
| T4 音乐波形 | Spotify（#121212 + #1ed760，系统字体）| **赛博朋克**（Space Grotesk + JetBrains Mono，青/品红）|
| T5 3D 卡画廊 | Airbnb（#ff385c、DM Sans、3 层阴影）| **赛博朋克 Blade Runner**（Space Grotesk + JetBrains Mono）|
| T6 计票仪表板 | Linear-precise（tabular nums、系统字体）| 大选夜青 + 金（Space Grotesk + JetBrains Mono）|

**Skill 6 个任务里 5 个选 Space Grotesk**。4/6 赛博朋克 palette。
同一 display+mono 配对。**brief 几乎不影响输出** —— Skill 把它的
"distinctive frontend recipe" 一刀切套上了。

**Prime 给 6 个不同 brief 选了 6 个不同 persona**（Vercel-clean、
magazine-editorial、Warp、Spotify、Airbnb、Linear-precise）。语料
库把每个任务路由到了正确的 register。

### 机械指标（12 输出聚合）

|  | Prime | Skill |
|---|---|---|
| 总字节 | **138.4 KB** | 157.1 KB |
| 单文件最大 | T5 47 KB | T5 64 KB |
| 最小 | T4 12 KB | T2 16 KB |

| 指标 | Prime | Skill |
|---|---|---|
| 总 `@keyframes` | 10 | **20**（Skill 装饰动效 2×）|
| `cubic-bezier()` | **22** | 11（Prime 调缓动多）|
| `box-shadow:` 规则 | 13 | **29**（Skill 堆光晕多）|
| CSS 变量 | 85 | **133** |

Skill 前置堆视觉装饰。Prime 把预算花在动效词汇上。

### 可访问性 / 鲁棒性

|  | Prime（6 任务） | Skill（6 任务） |
|---|---|---|
| `prefers-reduced-motion` CSS guard | **6/6** | **6/6** |
| `prefers-reduced-motion` JS guard | 5/6 | 5/6 |
| `<meta viewport>` | 6/6 | 6/6 |
| `<html lang>` | 6/6 | 6/6 |
| `:focus-visible` styling | **1/6** | 0/6 |
| 总 ARIA 属性 | **64** | 17（Prime 3.8×）|
| `oklch()` 色空间 | **2/6** | 0/6 |
| 依赖 Google Fonts CDN | **1/6** | 6/6（Skill 总是远程拉字体）|

两边对 reduced-motion 持平。**Prime 多发 3.8× 的 ARIA**，更多
`:focus-visible`，Skill 完全没用 oklch。

### 各任务速记

**T1 粒子 hero · sonnet**：两边都 120 粒子 canvas + 鼠标吸引 +
reduced-motion 兜底。物理质量等同。**Prime 写了真实产品页**
（Axiom 可观测性，"Observe everything. Miss nothing."、CLI
install）。Skill 写了 "Luminos" 通用 AI SaaS。两边都是真实产品；
Prime 的具体性来自 persona 约束，不是 LLM 创造力。

**T2 视差时间轴 · haiku**：Prime: 7 个真实科技史事件 1991–2022（WWW、
Win95、Facebook、iPhone、云、AI、ChatGPT）。Skill: 7 个泛泛
2010–2026 里程碑。两边都用 IntersectionObserver + 滚动视差。Prime
更小（18.7 vs 16.6 KB），因为 magazine-editorial 不需要赛博朋克渐
变堆。

**T3 终端模拟 · sonnet**（*最贴近收敛*）：两边都是可信终端，带
tab chrome、抖动打字、step-end 闪烁光标。Prime 在 Warp 真实美学
（暖黑上 parchment 暖文本）跑了 5 条命令。Skill 在 CRT 磷光绿 +
扫描线 + 渐晕里跑了 5 条。两边都合法不同的美学 —— 都不通用。

**T4 音乐波形 · haiku**：Prime 用真实 Spotify 色（#121212 + #1ed760）。
Skill 又是赛博朋克粉+青。Prime 更小（12.6 vs 16.3 KB），因为
Spotify persona 规定最小 accent；Skill 堆氛围层。

**T5 3D 卡画廊 · sonnet**（*体积差最大*）：Skill 64 KB vs Prime
47 KB。Skill 堆 4 层 hover 阴影 + 径向网格渐变 + 60px 网格 +
逐卡扫描线。Prime 的 Airbnb persona 限定到品牌真有的 3 层阴影
技术。两边都 8 个真产品；都用 `cubic-bezier(0.16, 1, 0.3, 1)` 翻
卡；都 ±10° 倾。Reduced-motion: Prime 用 crossfade 替代翻转；Skill
把所有动效降到 0.001ms。

**T6 计票仪表板 · haiku**：Prime 坚持 Linear-precise（用
`font-variant-numeric` 而非等宽字体实现 tabular nums —— 同样对齐 +
比例化可读性）。Skill 走 MSNBC/CNN 转播（青+金+红、JetBrains Mono
全文）。两边 3 候选、滚动数字、canvas 折线图。Skill 24 KB vs
Prime 21 KB。

### 这证明了什么、没证明什么

**证明**：Skill 的"distinctive frontend recipe"是被打扮成方法论
的单一美学 —— 6 个不同 brief 打过来，约 5 个回来都穿着 Space
Grotesk + 赛博朋克渐变。Prime 从 31 个 persona 按 task type 选，
确实出了多样性。

**没证明**：哪边"更好看" —— 那需要人判。两边都合格。这次测的
是 **brief 多样性下的美学分布**，Prime 方差远大于 Skill。

**也没证明**：能推广到复杂动效 UI 之外。普通表单 / 设置页 / 博客
两边可能收敛。

---

## 我们仍然没有的

ROADMAP.md 存在就是要补这些：

1. **20 任务 N=3**：`run-noise.sh` 在；跑 60 次新跑（20 任务 × 3
   重复 × prime/skill）是下一步可交付物。没它之前所有"胜率"都该
   读作"单次主观印象"。

2. **浏览器渲染验证**：HTML 写 `font-family: GT Sectra` 但 Sectra
   没加载就渲染 Times New Roman。我们今天抓不到。ROADMAP § 10。

3. **跨 LLM 矩阵**：GPT-4o + Gemini-Flash + Claude-Sonnet × ≥5 任
   务。cross-llm-test.mjs 草图在；全量 sweep 待 API key。

4. **质量 LLM-as-judge**：Wave 6 手判"全胜"是开发者作 judge。盲
   A/B + Claude/Gemini 并排判，闭环没跑。

5. **CI 里的成本/轮次回归测**：今天基准是临时跑。CI 集成能自动
   抓 chunker-bug 类回归。

---

## 怎么复现

bench-v2 harness:

```bash
# 在语料库仓库里
cd benchmarks/

# 单任务在 prime 条件下端到端跑
bun run scripts/run-task.ts \
  --task 09-blog-article \
  --condition prime \
  --output-dir results/2026-05-XX/

# N=3 用 run-noise.sh
bash scripts/run-noise.sh 09-blog-article prime 3
```

任务 fixture 在 `benchmarks/tasks/<NN-name>/`。5 个条件 scaffold
（raw / prime / skill-koomook / skill / skill-frontend-design）在
`benchmarks/conditions/`。

2026-05-08 Skill 塌缩基准的脚本和报告在 `/tmp/ab-2026-05-08/`。
那里的 `compare.mjs` 直接算出本文表格里的机械指标。

---

## 收尾

语料库做的就是它说的：把 brief 路由到多样 persona、遵守
composition contract、产出有可度量 a11y + 动效手艺标记的输出。它
**不**在 N=3 下可靠赢质量 A/B —— 因为我们没跑过。

2026-05-08 是数据最干净的对比结论。读作**"Prime 在 brief 上分布
设计选择，正如一个 31-persona catalog 应该做的；Skill 没做"**。这
是语料库的结构性属性，不是质量声称。

下一个我们会知道的大数字是 N=3 鲁棒胜率。在那之前，信架构甚于信
排行榜。
