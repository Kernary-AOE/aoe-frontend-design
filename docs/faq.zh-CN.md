# FAQ — 语料库专属问题

15 个团队决定是否用此语料库前问过的问题。协议级 FAQ（lexer、语义
等）见系统仓库文档。

---

### 1 · persona 到底是什么？

persona 是一个**类型化原子**，把一致的视觉美学 —— 色板、字体选择、
密度、布局偏好、动效语言 —— 用一份声明捕获。agent 在生成输出时
**整体**采用一个 persona（不分散）。

具体地，persona 含:

- `school:` —— 短 ID（如 `magazine-editorial`）
- `implies:` —— 视觉决策，作为结构化 JSON 返回
- `composition:` —— must-include / must-avoid 契约
- `compatible:` / `conflicts:` —— 与其它 persona 的关系边
- `example-brands:` —— 公开品牌引用

本语料库 31 个。见 [`personas.md`](personas.md)。

### 2 · 31 个 persona 都得用吗？

不必。检索算法按任务分类的 `default_register_pool` 给每个 brief 选
**一个**。多数 brief 终其一生只触及 1–3 个 persona。

想要更小的子集？fork 语料库删你不要的 persona。检索算法优雅退化:
5 个 persona 时输出多样性少；0 个 persona 时 register 轴回退到默
认（notion-warm）。

### 3 · 我能只用 security 原子吗？

可以 —— `@community/<rule|principle|pattern|anti-pattern|fact>-*-
{security|csp|xss|csrf|...}.prime` 下的 32 个 security 原子是自
洽的。它们标 `domain: security`，DomainRegistry 在 security brief
上加权。

不过如果你的用例**只**有 security，fork 出 `prime-corpus-security`
比拖着整个 899 原子的前端语料库更合适。

### 4 · 它跟 Tailwind preset 有什么区别？

Tailwind preset 是**单一固定品味** —— 一套色 token、一套间距、一种
字体。本语料库是 agent 按 brief 来挑的**选择图**:

| | Tailwind preset | 本语料库 |
|---|---|---|
| persona / 美学 | 1 | 31 |
| 任务分类 | 无 | 30 任务 / 5 家族 |
| 检索算法 | 无（设计师手动选 token） | 6 轴结构化检索 |
| composition contract | 无 | must-include / must-avoid / typography_required |
| validator | 无 | L1 + L2 + L3 |
| 关系图 | 无 | 约 3,500 条边 / 14 个 verb |

可以两个都用：构建期的 token 系统留 Tailwind，agent 期的美学决策走
本语料库。

### 5 · 它跟 shadcn template 有什么区别？

shadcn template 是**单一组件实现** —— `Button` 一个变体、`Toast`
一个变体。本语料库是为多个组件库提供**设计知识**:

- shadcn-Toast 是 `pattern-toast-stack` 的一种**实现**。
- Radix-Toast 是同一 pattern 的另一种实现。
- `template-spring-config` supplies-to 两边。

语料库与 shadcn 共存。可以写引用 shadcn 的原子（我们就有一个：
`template-shadcn-pricing-toggle`）。

### 6 · 怎么加我们品牌？

两个选项:

**a)** **`@community/persona-<your-brand>.prime` 下的品牌 persona** ——
如果你品牌足够公开，可观察设计特征能从公网页面引用。按
[`extending.md` § 加一个 persona](extending.md)。

**b)** **私团队 scope `@<yourteam>/`** —— 如果品牌不公开或想内部
专用。在你 scope 下写原子并保留在 fork 里。检索系统支持任意
namespace。

### 7 · 必须用 MCP 工具吗？我能直接读原子吗？

两种都行。MCP 工具是给需要与语料库对话的 agent 用的（Claude
Code 等）。直接读原子适合：

- 显示原子预览的 IDE 插件
- 把 persona 编译成设计 token 文件的构建期工具
- 自定义检索器（你自己的打分算法）

原子就是文件。`compiled-v3-final/` 有投影产物。按需读。

### 8 · 为什么 chunker bug 故事还在文档里？

因为它是这个项目最有教益的失败。基准数据说"Prime 在赢"，用户说
"输出看起来比 Skill 差"。我们差点采信数据而忽视用户反馈。挖下去
发现 `persona-editorial.prime` 源 1841 B，但投影出的 `chunks/full.md`
只有 286 B —— 一个桩。投影层默默把 persona 的结构化字段
（`implies`、`palette`、`prohibitions`、`body`）砍掉了。

修 chunker（不改 prompt、不改原子）一次基准跑就把视觉质量倒挂反
转回来。文档里固化的教训:

> **视觉差异 = 内容差异 = 投影差异。架构对必要不充分。**

### 9 · 为什么只 5 个 MCP 工具不是 17 个？

Skill 生态的"多个小工具"做了拒绝设计。理由：

- 5 个工具干净对应 pipeline 5 层。
- 每个工具有丰富参数化输入（如 `prime_query` 有 7 个 scope）；
  语义丰富度在参数，不在工具数。
- 工具数 > ~8 后 agent 难以发现。5 让决策树可处理。

加新工具是系统仓库决策，不是语料库决策。

### 10 · 为什么没有 `npm install prime-corpus-frontend-design`？

ROADMAP § 8（系统仓库）覆盖 registry / publish 工作。今天语料库消
费方式：

- `git clone` + 本地启动 MCP server
- 直接用 `compiled-v3-final/` 产物（你的工具指上去）
- `prime install --remote <url>`（v1.13 已有 registry 往返）

registry GA 后会出真正的 npm 包。

### 11 · 我怎么自己跑基准？

bench-v2 harness 在 `benchmarks/`:

```bash
cd benchmarks/

# 单任务在 prime 条件下端到端跑
bun run scripts/run-task.ts \
  --task 09-blog-article \
  --condition prime \
  --output-dir results/2026-05-XX/

# N=3 噪声估计
bash scripts/run-noise.sh 09-blog-article prime 3
```

需要 agent 跑的 LLM 的 API key（`ANTHROPIC_API_KEY` 或别的）以及
可选 L2 validator 的 key（`DEEPSEEK_API_KEY` 等 —— 没 key L2 干
净跳过）。

### 12 · validator 在我多数 must-include 原子上说 "unverifiable"，糟吗？

`unverifiable` 是刻意判定。意思是"我们没有签名映射，名词关键字
检查也模糊；判断不了原子是否被遵守"。计为 **pass**（不假阳）。

如果你在输出里看到太多 `unverifiable`，是因为你包含的原子在 L3 库
里还没有签名。修法通常是：扩
`packages/validator/src/l3-composition.ts` 的 `ATOM_SIGNATURES`，
给那个 atom-id pattern 加签名。ROADMAP § 6 计划扩到 ~60 pattern。

### 13 · 为什么 L2 validator 是 opt-in？

成本。L2 每次校验调一次 LLM。DeepSeek 价大约 $0.0008，但 N=3 跑
20 任务每条件就是 $0.05。我们选 opt-in 保持默认零成本模式可用。

ROADMAP § 8 计划在 runtime 里建好 per-layer 便宜模型注册表后让
L2 默认开。

### 14 · intent 分类器给我 brief 选错 persona 了，怎么调？

三个方案，按工作量排序：

**a)** **直接调 `prime_intent`** 检视 IntentObject。如果
`register_candidates` 错了，问题在那个任务类型的 YAML 的
`default_register_pool`。

**b)** 在 legacy `skip_intent=true` 模式下**显式传 `persona_school`**
覆盖分类器。

**c)** **给相应 taxonomy YAML 加一条 trigger keyword** 再测。分类
器从 `trigger_keywords:` 学习但不微调；你得手写 keyword。

如果分类器在该按另一种路由的 brief 上一致出错，开 issue 标
`intent-misroute`，给 brief、期望路由、实际路由。

### 15 · 我能用这套语料库配 Claude 之外的 LLM 吗？

理论上可以 —— MCP server 说标准 MCP 协议，原子是 markdown / JSON。
任何支持 MCP 的 agent runtime（Claude Code、Cursor、Continue.dev
等）都能消费这些工具。

实际中，每一次基准跑都是 `claude-opus-4-7[1m]`。ROADMAP § 2 计
划跨 LLM 矩阵；结果待出。在那之前请慎用"模型无关"这种说法。

LLM 侧具体:

- **Claude（Opus / Sonnet / Haiku）**: 已测。5 个 MCP 工具在
  Claude Code 里原生工作。
- **GPT-4o**: 未测但应能通过 Continue.dev 或 Cursor 的 MCP 支持工
  作。
- **Gemini Flash**: 未测。intent 分类器有 DeepSeek 与 Anthropic
  路径；Gemini 需要小适配。
- **开源模型**: 未测。子 7B 模型上 schema-validation 成本可能
  抵消推理节省。

---

更广的项目 FAQ（历史、哲学、与 Skill 生态对比）见系统仓库
`PHILOSOPHY.md` 与 `PRIME-VS-SKILLS.md`。
