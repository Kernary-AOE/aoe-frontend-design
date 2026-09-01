# ROADMAP — Kernary Frontend Design Domain Package

语料库与配套 pipeline 目前**架构层完成度约 70%**（依据系统仓库 Wave 12
的诚实复盘）。剩下 30% 集中在三个方向：**统计鲁棒性**、**关系图密度**、
**可移植性**。本文按照方向 + 优先级组织。

本路线图只覆盖**语料库仓库**。系统仓库（parser / compiler / runtime /
registry）有自己的路线图，关注语言层面（typed AST、semver、依赖
求解）。涉及双方时会标注。

---

## 近期（接下来 1–2 个语料库版本）

### 1. 鲁棒胜率（20 任务 N=3）

最重要的一项。`run-noise.sh` 落地，bench-v2 套件以 N=3 跑全。把信号
和噪声分开。

- 验收：每个任务每个条件 ≥3 次新跑，LLM judge 每任务出 win/loss/tie
  判定，每条件聚合 median 成本 / median 轮次 / median 时长。
- 输出：`benchmarks/results/2026-05-XX/`，含原始 run + 评分板 +
  judge 文本。

### 2. 跨 LLM 可移植性矩阵

今天所有 benchmark 都用 `claude-opus-4-7[1m]`。协议宣称"模型无关"，
缺证。

- ≥5 任务 × {GPT-4o、Gemini-Flash、claude-sonnet、claude-haiku}
  扫一遍 prime + skill-koomook 同一组条件。
- 在 `docs/benchmarks.md § Cross-LLM` 记录。任何模型表现欠佳要诚实
  写。
- 这也是系统仓库的事（MCP transport 必须对每个 runtime 测过）。

### 3. 补齐 49 个 broken-ref 原子

`prime check --registry` 报告 49 个需要新原子（不是修边）的引用：

- `pattern-hero-cta`（被 6 个原子引用）
- `rule-server-side-validation`（被 5 个引用）
- ……（完整列表在 `scripts/fix-broken-refs.ts` 输出）

大多是 30 行的小原子；用 `prime-decompose` Skill 一个下午能干完。

### 4. 14 个稀疏 kind 怎么处理

28 种声明的 atom kind 中，14 种代表度 <1%：

| Kind | 原子数（Wave 13）|
|---|---|
| `tradeoff` | 4（Wave 13 前是 1）|
| `scope` | 4（Wave 13 前是 1）|
| `feedback` | 4（Wave 13 前是 1）|
| `collection` | 4（Wave 13 前是 1）|
| `provocation` / `term` / `value` / `type` / `transform` / `tool` / `taxonomy` / `step` / `metric` / `category` | 各 4–7 |

Wave 13 之后每种至少 4 个 —— 之前"这个 kind 是不是真的"的悬崖闭合。
需做决策：要么 2026-Q3 把每种扩到 ≥10（视为一等公民），要么从
PRIME-SPEC v1 移除（保留 ~14 个常用 kind，剩下标 experimental）。属
系统仓库决策；语料库给输入。

---

## 中期（2–4 个语料库版本）

### 5. Persona 扩张 31 → 60

31 个 persona 已覆盖主流设计流派，但仍有空白：

- **Editorial / cultural** —— `magazine-editorial` 之外，
  Pitchfork-vs-NYT Magazine vs It's Nice That 的细分。
- **Asian SaaS 区域**：Toss 在了但没有日系（cookpad-clean、
  mercari-bold），没有中系（字节-dense、小红书-warm）。
- **Gaming / consumer**：Steam-grid、Itch.io-handcraft。
- **Brutalist / experimental** —— 比经典 brutalist 更极端的版本。

每个新 persona 约 6 个原子（persona 本身 + composition `must-include`
里要的可能也得新写）。目标：两波加 30 个 persona，**40 personas + 10
voice atoms**。

### 6. Composition-contract validator 覆盖率

L3 validator 的签名库目前覆盖 14 个 atom-id pattern（`toast` →
`role="alert"`、`modal` → `role="dialog"`、……）。语料库里还有约 40
个原子有清晰签名映射（如 `pattern-data-table-*` → `<table>`、
`pattern-hero-cta` → `class*="hero"` + `<button>`）。把库扩到约 60
个 pattern。

扩展后，库外的原子仍然走名词关键词回退（当前行为）。预期没有语义
回归，只是覆盖更广。

### 7. 域隔离（security / a11y / frontend 分离）

32 个 security 原子和 70+ 个可访问性原子目前与 700+ 个前端原子共用单
一检索索引。Wave 12 的 DomainRegistry 让同域匹配加权，但 namespace
隔离没建。一个"安全认证流"的 brief 不该把 frontend-design persona 拉进
register 轴。

部分是系统仓库的事（Domain Plugin Protocol），部分是语料库的事（声明
每个原子归哪个域）。需要协调。

---

## 长期（3–6 个月）

### 8. Validator 升级：L2 LLM 美学检查默认开启

L2 目前在没 LLM key 时跳过。路线是把 L2 用便宜小模型（Haiku $0.25/M、
DeepSeek）做成**默认非可选**。每次校验一份 HTML 输出 ≈ $0.0008。这
个价格应当始终跑。

需要：每层一个便宜模型注册表；key 管理 UX；"离线时跳过"仍作为逃生通
道。

### 9. Per-persona 示例画廊

今天 persona 声明 `example-brands: [...]` 作为字符串列表。路线是挂
**`example` 原子**，带截图 / 代表性 HTML / 字体规格。让
`aoe_query scope='gallery' id='persona-stripe'` 返回具体引用素材，
不再只是品牌名字符串。

### 10. 浏览器渲染基准

今天质量评分基于 HTML 内容（启发式 + LLM 判定）。路线是加**浏览器渲
染评分**条件：`puppeteer` 在 1920×1080 渲染 HTML，PaintLab / 自定义
启发式判断视觉对 persona prescription 的忠实度。能抓住 "HTML 写
`font-family: Fraunces` 但页面实际渲染 Times New Roman 因为 Fraunces
没加载" 这一类 bug。

属基准库（语料库仓库）的事；系统仓库只需在 spec 里加
`prefers-render-test`。

### 11. 国际化原子（i18n）

Wave 13 加了 5 个 i18n 原子；这是更全套的占位：RTL 布局、CJK 排版
（垂直书写模式、注音）、阿拉伯字形整形规则、locale-aware
数字/日期/货币格式。和 persona 扩张联动（每个区域自带设计流派
context）。

---

## 暂缓决策（不在路线图，但已记录）

- `@anthropic-impeccable/` 是否要保持与 `@community/` 分离 —— 26 个
  派生原子已被改得跟原 MIT 上游差很远；每个 wave 都让它们更远。
- 要不要出一份"最小语料库"切片（如 100 原子覆盖 8 个 persona）给
  context 预算紧张的 agent 用；今天 899 是唯一形态。
- 等系统仓库的 registry 上线后，要不要把语料库以真正的 npm 包形式
  发布（`prime-` scope）。

---

## 如何影响这条路线图

- 用 `corpus-roadmap` 标签开 issue，写明你想覆盖的 brief / 用例。
- 新 persona：附 5+ 个公网可见的品牌引用，说清楚它们共享一个**现有
  31 个 persona 没覆盖**的 register。
- 新任务类型：投一份 YAML 到
  `primes-v3/taxonomy/<family>/<sub_type>.yaml`，给出你建议的
  `default_register_pool`。

语料库走 curate，不走众包 —— 但提案随时欢迎，每两周批量审一次。

---

系统级路线图（DSL 演化、registry、多 LLM 协调）见系统仓库 `ROADMAP.md`。
