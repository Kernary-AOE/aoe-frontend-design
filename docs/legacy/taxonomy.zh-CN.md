# Taxonomy — 30 份任务类型 YAML

任务分类是从 brief 到检索方案的**路由表**。当 `prime_intent` 把
brief 分类成 `task_type` 后，
`primes-v3/taxonomy/<family>/<task_type>.yaml` 中匹配的 YAML 提供：

- **register pool** —— register 轴上要考虑的 persona 候选 + 权重。
- **`required_atoms`** —— agent **必须** 读 full.md 的原子。检索结果
  里优先级最高。
- **`recommended_motion`** —— motion 轴上浮出来的动效原子。
- **`forbidden_atoms`** —— 不论分数多少都**绝不能**出现的原子。
- **`max_atoms_per_axis`** —— 每轴预算 cap。
- **`quality_checks`** —— validator 与 LLM judge 评分用的可观察标准。

本页按家族过完全部 30 份。这是每种任务类型自带的"契约"。源 YAML
在 `primes-v3/taxonomy/`，本文是导览。

---

## YAML schema（30 份共用）

```yaml
task_type: <id>                    # 与 IntentObject.task_type 对应
parent: <family>                   # marketing-landing | product-ui |
                                   #   content | interaction | dev-tool
description: "..."                 # 一句话说明
trigger_keywords:                  # 哪些 brief 词映射到此 task_type
  - "..."
  - "..."                          # 双语（EN + 中文）
default_register_pool:             # register 轴候选 persona
  - school: <school-id>
    weight: <0..1>                 # 权重一般加和 ≈ 1.0
required_atoms:                    # 必须 — agent 各读一份 full.md
  - "@<scope>/<id>"
recommended_motion:                # motion 轴浮出
  - "@<scope>/<id>"
forbidden_atoms:                   # 检索绝不返回
  - "@<scope>/<id>"
max_atoms_per_axis:                # 每轴预算上限
  register: 1                      # 始终 1（一页一 persona）
  pattern: 2..4
  motion: 1..5
  typography: 1..3
  color: 1..2
  rules: 2..3
quality_checks:                    # judge 评分依据
  - "..."
```

`primes-v3/taxonomy/_index.yaml` 把每个 bench-v2 任务映射到对应
YAML —— 见该文件。

---

## 家族 1 · `marketing-landing`（8 类）

转化导向页面。首屏单一首要 CTA；trust signals；按受众选暖或冷
register。

### `waitlist`

产品发布前的邮箱注册等待名单。

- **默认 pool**: warm-institutional 0.4 / magazine-editorial 0.3 /
  notion-warm 0.3
- **required_atoms**（4）: `pattern-hero-with-demo`、
  `pattern-trust-signal-components`、
  `rule-single-primary-action-per-screen`、
  `pattern-inline-validation`
- **forbidden**: brutalist、vercel-clean、dense-pragmatist（对
  waitlist 太冷）、skeleton-loader template
- **quality_checks**: 移动端首屏要有邮箱 + CTA、body ≥16px、不许
  纯白背景（暖奶油 / 米白优先）、单一首要动作、信任信号 2 屏内可见。
- **源**: `primes-v3/taxonomy/marketing-landing/waitlist.yaml`

### `landing-saas`

通用 SaaS 产品营销落地页。

- **默认 pool**: vercel-clean 0.4 / stripe-fintech 0.3 / linear 0.3
- quality_checks 强调首屏带产品截图、特性网格、社会证明 logo、
  pricing teaser、CTA 重复。

### `landing-creative`

创意 agency / portfolio / 文化类落地。

- **默认 pool**: magazine-editorial 0.4 / brutalist 0.3 /
  swiss-modernist 0.3
- quality_checks 强调非对称版式、大字号、刻意非 SaaS 模式。

### `pricing-b2b`

企业级 pricing，含分级对比 + 销售洽谈 CTA。

- **默认 pool**: stripe-fintech 0.55 / vercel-clean 0.25 / linear 0.2
- 必须: `pattern-pricing-toggle`、`template-shadcn-pricing-toggle`、
  `pattern-metric-card`、`rule-tabular-numerics`。
- quality_checks: 月/年切换、对比行 ≥6、最高级走联系销售。

### `pricing-consumer`

消费向 pricing（"free / pro / family" 三档）。

- **默认 pool**: notion-warm 0.4 / airbnb 0.3 / vercel-clean 0.3
- quality_checks: 最多 3 档可见、推荐档高亮、勾选而非文字描述。

### `comparison`

vs-竞品 对比表。

- **默认 pool**: linear 0.5 / stripe-fintech 0.5
- quality_checks: 并列表格、公平不抹黑、明确赢家指示（勾选）、引
  用源链接。

### `404`

404 页本身（小事但定义身份）。

- **默认 pool**: notion-warm 0.4 / vercel-clean 0.3 / brutalist 0.3
- quality_checks: 有用的回去导航、搜索框、轻松基调可以但别牺牲
  有用性。

### `coming-soon`

产品发布前 teaser 页。

- **默认 pool**: warm-institutional 0.5 / magazine-editorial 0.3 /
  framer 0.2

---

## 家族 2 · `content`（5 类）

prose 重的页面。body 排版至关重要；上下文要克制以防过度研究。

### `blog-article`

单篇博客或杂志文章。

- **默认 pool**: magazine-editorial 0.55 / notion-warm 0.25 /
  warm-institutional 0.2
- **required_atoms**（3）: `pattern-blog-article-layout`、
  `principle-typography-hierarchy`、`rule-line-length-optimal`
- **forbidden**: dense-pragmatist、vercel-clean（对 prose 太冷）、
  pattern-dashboard-layout、pattern-data-table-dense
- **`max_atoms_per_axis`**: register 1、pattern 2、motion 1、
  typography 3、color 1、rules 2
- **quality_checks**: body 16-18px、line-height 1.6-1.8、行长 60-75
  字符（target 65ch）、heading hierarchy h1>h2>h3、>1500 字带 TOC、
  长文推荐阅读进度条、图配 alt + caption。
- **mandatory_reads cap = 3**（`content` 家族预算 —— content 任务该停
  止研究、开始动笔）。
- **`turn_budget_hint`**: "硬预算 ≤6 轮。读完 mandatory atom 后立即
  开始写 HTML。content 任务 95% 是 prose 综合。"

### `doc-page`

技术文档单页。

- **默认 pool**: notion-warm 0.5 / mintlify 0.3 / vercel-clean 0.2
- quality_checks: 代码块语法高亮、桌面端 sticky TOC、上一页/下一页
  导航、"在 GitHub 上编辑" 链接。

### `about-page`

团队/公司介绍。

- **默认 pool**: warm-institutional 0.5 / magazine-editorial 0.3 /
  notion-warm 0.2
- quality_checks: 团队照片、首屏使命陈述、联系方式可达。

### `changelog`

发布说明 / changelog。

- **默认 pool**: vercel-clean 0.4 / notion-warm 0.3 / linear 0.3
- quality_checks: 倒序条目、版本标签、发布类型徽章
  （feature/fix/breaking）。

### `podcast-episode`

播客单集页。

- **默认 pool**: spotify 0.4 / warm-institutional 0.3 / notion-warm 0.3
- quality_checks: 首屏音频播放器、转写文本、show-notes 结构化（链
  接 + 时间戳）。

---

## 家族 3 · `product-ui`（8 类）

产品内表面。可以高密度；预期键盘可导航；用户每天看，质量重要。

### `dashboard`

多指标 KPI 仪表板。

- **默认 pool**: linear 0.55 / vercel-clean 0.25 / stripe-fintech 0.2
- 必须: `pattern-metric-card`、`template-chart-color-ramp`、
  `pattern-dashboard-data-table`、`constraint-monospace-tabular-numerics`
- quality_checks: ≥4 指标卡、≥1 图表、时段切换（7d/30d/90d）、
  数字列用 tabular numerics。

### `data-table`

可排序、可筛选数据表。

- **默认 pool**: linear 0.55 / vercel-clean 0.3 / stripe-fintech 0.15
- 必须: `pattern-data-table-dense`、`pattern-dashboard-data-table`、
  `template-data-table-base`、`fact-fintech-number-display`、
  `constraint-monospace-tabular-numerics`、`rule-touch-target-min`
- quality_checks: 列头点击排序 + `aria-sort`、筛选可达、shift-click
  范围选、选中后显示批量操作条、tabular/monospace 数字、>100 行
  虚拟化或分页、≥8 行真实命名数据（不许"User 1"）、至少加载一个
  命名 web 字体、≥1 keyframes + reduced-motion 覆盖、至少 2 项
  {sparkline、avatar+状态、悬浮批量操作条、状态 pill、kbd 快捷键
  bar}。

### `kanban-mobile`

移动端优先的 Kanban 看板。

- **默认 pool**: linear 0.4 / framer 0.3 / notion-warm 0.3
- quality_checks: 375px 视口可见 3 列、列间横向滑动或列内纵向滚动、
  拖拽带 CSS 触觉反馈。

### `log-viewer`

实时日志查看器。

- **默认 pool**: dense-pragmatist 0.55 / vercel-clean 0.3 / sentry 0.15
- quality_checks: monospace 字体、row-height 1.30-1.35（Wave 5c 约
  束）、级别筛选（info/warn/error）、跟随 tail 切换、搜索支持正则。

### `settings`

用户账户 / app 设置。

- **默认 pool**: linear 0.4 / notion-warm 0.3 / vercel-clean 0.3
- quality_checks: 分组导航（侧边栏或 tab）、保存状态可见、危险动作
  视觉分离。

### `signup-wizard`

多步注册流。

- **默认 pool**: warm-institutional 0.4 / vercel-clean 0.3 /
  notion-warm 0.3
- quality_checks: 步骤指示、上下一步、按步校验、密码强度计（如
  适用）。

### `order-confirm`

结账后订单确认。

- **默认 pool**: warm-institutional 0.4 / airbnb 0.3 / stripe 0.3
- quality_checks: 订单摘要可读、确认邮件已发提示、"接下来做什么"
  可执行导航。

### `file-explorer`

产品内文件 / 文件夹浏览器。

- **默认 pool**: linear 0.4 / vercel-clean 0.3 / dense-pragmatist 0.3
- quality_checks: 树状导航或面包屑、多选、右键上下文菜单、键盘
  导航。

---

## 家族 4 · `interaction`（5 类）

动效重 / 瞬态 UI。`mandatory_reads` cap **最高**（12），因为动效手
艺需要读多个 template。

### `toast-demo`

toast 通知组件演示。

- **默认 pool**: linear 0.4 / vercel-clean 0.35 / framer 0.25
- **required_atoms**（10）: `pattern-toast-stack`、
  `pattern-interaction-states`、`rule-animation-duration`、
  `constraint-reduced-motion`、`fact-duration-perception-thresholds`、
  **加 motion mandatory-reads**: `template-spring-config`、
  `template-easing-curves`、`pattern-stagger-reveal`、
  `template-fade-stagger`、`fact-stagger-feel-organic`
- **forbidden**: magazine-editorial（interaction 错位 register）、
  `anti-pattern-decorative-spinning`、
  `anti-pattern-no-bounce-everything`
- **`max_atoms_per_axis`**: register 1、pattern 2、motion **5**、
  typography 1、color 1、rules 2
- **quality_checks**（15 项 —— 所有任务类型里最详尽）:
  - ≥4 个命名 `@keyframes`（toast-in / drain-progress / spinner /
    slide-out）
  - 自定义 `cubic-bezier`（不许只用 `ease`）
  - toast 间错峰 60-100ms
  - `@media (prefers-reduced-motion: reduce)` 兜底
  - ≥5 种 toast 变体（success / error / warning / info / loading）
  - 可见自动消失计时
  - 入场弹簧物理
  - 退场动画镜像入场
  - 4 种状态视觉清晰区分
  - hover 暂停
  - reduced-motion 直接出现
  - 同时 ≤3-4 个 toast
  - 各自可独立 dismiss

### `modal`

带 focus trap 的模态对话框。

- quality_checks: `role="dialog"`、focus trap、Esc 关闭、点外部关闭、
  关闭时焦点回归。

### `command-palette`

Cmd+K 命令面板。

- **默认 pool**: raycast 0.4 / linear 0.3 / vercel-clean 0.3
- quality_checks: 键盘优先导航、模糊搜索、近期历史、结果行有快捷键
  提示。

### `form-wizard`

多步表单（往往比 signup-wizard 更长，含校验）。

- quality_checks: 步骤指示、按步校验、浏览器后退切步、保存草稿。

### `notification-center`

产品内通知面板（不是 toast；常驻收件箱）。

- quality_checks: 已读/未读区分、全部已读动作、按类型筛选、无限滚
  动或分页。

---

## 家族 5 · `dev-tool`（4 类）

工程师受众。欢迎 mono 字体；高数据密度可接受；"看着像工具"是优点。

### `llm-playground`

交互式 LLM prompt playground。

- **默认 pool**: vercel-clean 0.4 / linear 0.3 / replicate 0.3
- quality_checks: 分屏 prompt/response、模型选择、temperature/
  max-tokens 控件、流式指示、复制到剪贴板。

### `prompt-editor`

prompt 模板编辑器。

- quality_checks: 模板变量高亮、预览面板、版本历史。

### `analytics-realtime`

实时分析仪表板。

- **默认 pool**: linear 0.4 / posthog 0.3 / sentry 0.3
- quality_checks: 实时更新数字、sparkline 趋势、异常高亮。

### `api-explorer`

API explorer / Postman 风。

- quality_checks: 请求 method/URL/header/body 编辑、响应 status +
  body 显示、历史列表。

---

## 跨家族字段

### 各家族 `mandatory_reads_cap`（在 `mcp-server/index.ts` 设置）

```
content              3
marketing-landing    5
product-ui           7
dev-tool             7
interaction         12
```

由来：content 任务 95% 是 prose 综合（多原子无益）。interaction 任
务需要动效 template（每个有用）。product-UI 居中。

### 各家族 `turn_budget_hint`

每家族给 agent 的回包里包含一句"几轮够用"的提示：

- `content` —— "硬预算 ≤6 轮。停止研究，开始动笔。"
- `marketing-landing` —— "目标 ≤8 轮。"
- `product-ui` —— "目标 ≤10 轮。"
- `interaction` —— "12 轮以内 OK —— 动效手艺需要多个 template。"
- `dev-tool` —— "目标 ≤10 轮。"

预算提示**作为建议**强制，不是硬 cap，但能阻止 Wave 5b 之前那种
博客 15 轮的失控跑。

---

## 添加新任务类型

1. 选家族。如果都不合适，参 `ROADMAP.md` § 11 "新家族" 流程
   （需协调）。
2. 写 YAML 到 `primes-v3/taxonomy/<family>/<task_type>.yaml`，
   按上文 schema。
3. `default_register_pool` 引用必须是已有 persona。
4. `required_atoms` 引用必须是已有原子；如果还没就在同一 PR 把它
   们写了。
5. 把任务加到 `_index.yaml`。
6. 可选：加一个 `bench-v2` 任务跑这个新 YAML。

`prime_intent` 分类器通过 `trigger_keywords` 自动识别新 YAML。请把
关键词做成双语（EN + 中文）。

---

## 源文件

```
primes-v3/taxonomy/
├── _index.yaml                          # 家族 + bench-v2 映射
├── marketing-landing/
│   ├── 404.yaml
│   ├── coming-soon.yaml
│   ├── comparison.yaml
│   ├── landing-creative.yaml
│   ├── landing-saas.yaml
│   ├── pricing-b2b.yaml
│   ├── pricing-consumer.yaml
│   └── waitlist.yaml
├── content/
│   ├── about-page.yaml
│   ├── blog-article.yaml
│   ├── changelog.yaml
│   ├── doc-page.yaml
│   └── podcast-episode.yaml
├── product-ui/
│   ├── dashboard.yaml
│   ├── data-table.yaml
│   ├── file-explorer.yaml
│   ├── kanban-mobile.yaml
│   ├── log-viewer.yaml
│   ├── order-confirm.yaml
│   ├── settings.yaml
│   └── signup-wizard.yaml
├── interaction/
│   ├── command-palette.yaml
│   ├── form-wizard.yaml
│   ├── modal.yaml
│   ├── notification-center.yaml
│   └── toast-demo.yaml
└── dev-tool/
    ├── analytics-realtime.yaml
    ├── api-explorer.yaml
    ├── llm-playground.yaml
    └── prompt-editor.yaml
```

写自己的 YAML 之前先读 2-3 份 —— schema 30 行内能看完，但
`quality_checks` 那一段是手艺活，要花时间。
