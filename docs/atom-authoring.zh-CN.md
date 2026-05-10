# 原子写作 — 前端设计专属

本文是**设计侧写作手册**。补 `CONTRIBUTING.md` —— 那里讲机械约定，
本页讲**哪类设计知识用哪种 kind**，以及前端作者最容易踩的 kind 区
分。

DSL 语法（lexer/parser 层）见系统仓库 `docs/dsl-quickref.md`。本文
只关心前端设计领域里"什么算什么"。

---

## 28 种 kind，前端设计透镜

5 层 28 种，每行给本语料库里典型用法。

### 数据层（8 种）

| Kind | 何时用 | 真实例 |
|---|---|---|
| `fact` | 带引用的实证主张 | `fact-wcag-contrast-aa`（普通文本对比 ≥4.5:1）|
| `term` | 命名定义被多原子复用 | `term-leading`、`term-tracking`、`term-x-height` |
| `value` | 具体数值/常量 | `value-touch-target-min: 44px` |
| `category` | 相关事物分组 | `category-motion-easing`、`category-color-temperature` |
| `example` | 实现引用 | `example-vercel-toast`、`example-linear-toast` |
| `counter-example` | 显式反例 | `counter-example-inter-purple-dark` |
| `source` | 可引规范或论文 | `source-wcag-22`、`source-nielsen-1994` |
| `metric` | 可度量阈值 | `metric-contrast-ratio`、`metric-target-size` |

### 行为层（5 种）

| Kind | 何时用 | 真实例 |
|---|---|---|
| `step` | 流程中的一步 | `step-apply-heuristics` |
| `check` | 对工件的 pass/fail 断言 | `check-contrast-aa`、`check-focus-visible` |
| `transform` | 映射函数（CSS 变量 → token、hex → oklch）| `transform-hex-to-oklch` |
| `tool` | agent 可能调用的外部工具 | `tool-stark-contrast-checker` |
| `method` | 多步流程，有输入/输出 | `method-heuristic-review` |

### 组合层（5 种）

| Kind | 何时用 | 真实例 |
|---|---|---|
| `rule` | 直接可执行的二元 pass/fail | `rule-color-contrast`、`rule-line-length-optimal` |
| `taxonomy` | 正式分类体系 | `taxonomy-10-heuristics` |
| `pattern` | 可复用结构性配方 | `pattern-toast-stack`、`pattern-hero-with-demo` |
| `anti-pattern` | "别这么做" + 理由 | `anti-pattern-generic-saas-blue`、`anti-pattern-decorative-spinning` |
| `type` | 类型定义（CSS 变量、色阶档）| `type-spacing-scale`、`type-color-tier` |

### 风格 / 参数层（5 种）

| Kind | 何时用 | 真实例 |
|---|---|---|
| `persona` | 一致的设计 school | `persona-magazine-editorial`、`persona-stripe` |
| `voice` | 写作口吻 | `voice-casual-warm`、`voice-brand-corporate` |
| `constraint` | 硬限制 | `constraint-font-blacklist`、`constraint-no-pure-white-bg` |
| `template` | 具体代码骨架 | `template-spring-config`、`template-oklch-palette` |
| `provocation` | 挑战性设计主张 | `provocation-why-not-serif` |

### 元层（5 种）

| Kind | 何时用 | 真实例 |
|---|---|---|
| `collection` | 精选原子 bundle | `collection-motion-craft-toolkit` |
| `scope` | 适用上下文声明 | `scope-mobile-only`、`scope-dark-mode-only` |
| `tradeoff` | 两个有效立场的明确张力 | `tradeoff-density-vs-readability` |
| `principle` | 高层启发式（导出 rule）| `principle-vertical-rhythm`、`principle-typography-hierarchy` |
| `feedback` | 给反馈/批评的 pattern | `feedback-polite-disagreement` |

---

## 前端设计常见写作陷阱

### 陷阱 1：混淆 `rule` 与 `principle`

唯一最常见错误。判定规则：

- 知识说**怎么过/不过一个二元判定** → `rule`。
- 说**为什么** rule 是这样 → `principle`。

真实例:

```
rule LineLengthOptimal {
  id: "@community/rule-line-length-optimal"
  description: "正文行长必须为 60-75 字符。"
  claim: "每段在正文字号下生效宽度产出 60-75 字符。"
  severity: medium
  validates-with: [@community/principle-readability]
  ...
}

principle Readability {
  id: "@community/principle-readability"
  statement: "行太短或太长都会损害阅读流畅。"
  rationale: "读者眼跳有舒适扫描宽；……"
  ...
}
```

`rule` 是可测的（正则或布局检查能 pass/fail）；`principle` 是多个
rule 的推理依据。多数可执行知识是 `rule`。`principle` 用得克制。

### 陷阱 2：混淆 `pattern` 与 `template`

- `pattern` 描述**概念配方**，任何 UI 库都能落地。
- `template` 是**具体代码骨架**，可粘贴。

`template` 必须有 `structure: """ ... """` 字段含字面 HTML/CSS。
`pattern` 可以有，但通常关注 description / behavior / a11y /
examples。

如果一个 pattern 有典范实现，**两个原子都写**，用 `enhances` 连：

```
template SpringConfig {
  id: "@impeccable/template-spring-config"
  ...
  structure: """ ... CSS keyframes ... """
}

pattern ToastStack {
  id: "@community/pattern-toast-stack"
  ...
}

# 在另一条边或 template 的 relations 里:
template-spring-config enhances pattern-toast-stack
```

### 陷阱 3：混淆 `persona` 与 `voice`

- `persona` = 视觉美学（color、typography、density、layout、motion）
- `voice` = 语言口吻（用词、句式、态度）

它们**正交**。一页可以是 Stripe-视觉 + Notion-口吻。如果你发现自己
同时在写视觉和语言指令，拆成两个原子。

### 陷阱 4：品牌 persona 写作

写真实品牌 persona 时：

- **只描写可观察的公开设计特征**。不要改写品牌 voice copy。不要
  复制专有素材。
- **`notes:` 引公网证据**。URL、日期、观察了哪一页。
- **`example-brands:` 只列那一个品牌**。子分类品牌引用走 `notes:`
  或 compatible/conflicts 边。
- **`implies:` 字段要具体**。"GT Sectra | Tiempos Headline" 比
  "一种衬线字体" 好。具体性才让 persona 出有辨识度的输出（见
  `benchmarks.md` Skill-Space-Grotesk-塌缩故事）。

### 陷阱 5：选 `domain:`

`domain:` 字段决定 DomainRegistry 的同域加权。前端原子的选择：

- `frontend-design` —— 视觉 + 结构（多数原子）
- `accessibility` —— a11y 专属 rule 与 check
- `visual-design` —— 抽象设计原则（节奏、层级、对比）
- `ux-design` —— 交互原则（Nielsen 启发式、错误预防）
- `i18n`、`performance`、`api-design`、`testing`、`security` ——
  跨域扩张区

如果你的原子两边都成立，选更具体的。不要多打标签 —— `domain:` 单
值。

---

## persona 专属写作

persona 是表达力最强（也最易写错）的 kind。

### 必填 `implies:` 块

```
implies: {
  font: { display: "...", body: "...", monospace: "...", accent: "..." }
  color: { temperature: "...", palette: "...", background: "..." }
  density: "compact | comfortable | dramatic | loose"
  layout: "..."
  imagery: "..."
  motion: "..."
}
```

这是 `prime_resolve` 作为 typed JSON 返回给 agent 的内容。**implies
空 = persona 没用**。把每串字符串写具体，花时间值。

反例（别这么写）:

```
implies: {
  font: { display: "一个干净的无衬线" }   # 太模糊
  color: { palette: "现代" }              # 不可执行
  density: "均衡"                         # 没意义
}
```

正例（真实，来自 `persona-magazine-editorial`）:

```
implies: {
  font: {
    display: "高对比 display 衬线，巨大且戏剧 — 如 GT Sectra、Tiempos Headline、Domaine Display、Canela、Ogg、Reckless、Tobias Frere-Jones Mallory"
    body: "transitional 或 old-style 衬线，18-20px — 如 Tiempos Text、Lyon Text、Mercury Text、GT Sectra Text、Source Serif 4、Charter"
    accent: "small-caps grotesk 用于 section label 与署名 — 如 Söhne Schmal、GT America Mono、Tiempos Headline small-caps"
  }
  color: {
    temperature: "neutral-warm"
    palette: "近白纸 + 墨黑 + 一种编辑性 accent（常按期刊变化）— #f8f6f1 / #1a1a1a / accent 按文章变（深红 #8b2222、土黄 #c08a3e、或杂志蓝 #1e3a8a）"
    background: "#f8f6f1 或 #fbf9f4（warm magazine paper）—— 纯白只在全幅图背景可接受"
  }
  ...
}
```

### 必填 `composition:` 块

3-6 个 `must_include` 原子。2-3 个 `must_avoid`。`typography_required`
与 `color_required` 是散文值。完整形态与 validator 语义见
[`composition-contract.md`](composition-contract.md)。

### `notes:` 字段

用于：

- **跟相关 persona 的区分**（"区别于 `persona-editorial`：那个是
  克制的文学；这个是戏剧化的。"）
- **定义排版动作**（"drop cap + small-caps 署名 + 图片信用斜体
  无衬线 三件套不可省。少一个就退化成普通博客。"）
- **品牌 persona 的归属说明**（URL、日期）。
- **何时用 / 何时避 的检索提示**。

检索算法读 `description:` 更多于 `notes:`，但 notes 会进 agent 拿
到的 `full.md` 影响 LLM 综合。

---

## 边动词选择 — 前端设计默认

举棋不定时的速查：

| 你在连接 | Verb | 例子 |
|---|---|---|
| persona → 来源品牌 | `derived-from` | `persona-stripe derived-from <stripe.com observation>` |
| persona → 它细化的克制 persona | `extends` | `persona-magazine-editorial extends persona-editorial` |
| pattern → 给它 CSS 骨架的 template | `enhances` | `template-spring-config enhances pattern-toast-stack` |
| pattern → 更具体的变体 | `specializes` | `pattern-data-table-sortable specializes pattern-data-table` |
| rule → 验证它的 check | `validates-with` | `rule-color-contrast validates-with check-contrast-aa` |
| rule → 论证它的 fact | `derived-from` | `rule-touch-target-min derived-from fact-fitts-law` |
| value → 强制它的 rule | `supplies-to` | `value-touch-target-min supplies-to rule-touch-target-min` |
| persona → 竞争 persona | `conflicts` | `persona-brutalist conflicts persona-editorial` |
| persona → 协调 persona | `compatible` | `persona-warm-institutional compatible persona-magazine-editorial` |
| 任何对，没特定形状 | `related` | （兜底） |

每个原子需要 ≥3 条 `related:` 与 ≥1 条 {extends, derived-from,
requires, enhances, specializes}。第二条约束的存在因为没它的话图会
塌缩成单一 verb 糊（Wave 12 之前发生过）。

---

## 收尾建议

1. **前 5–10 个原子手写**，把格式装进脑子。之后可以让
   `prime-decompose` Skill 跑任意 markdown 文档。
2. **写自己的之前先读 2–3 个同 kind 原子**。特别是 persona —— 它格
   式最丰富。
3. **每次编辑后跑 `prime check
   primes-v3/sources/@<scope>/<your-atom>.prime`**。早修 parser 错
   容易；交叉引用错攒着会复合。
4. **`description:` ≤ 200 字**。检索算法重视 description —— 每个词
   都得有用。
5. **品牌 persona 先写 `notes:`**（你在观察公网设计），`implies:`
   与 `composition:` 从那里推出来。

---

完整 DSL 语法见系统仓库 `docs/dsl-quickref.md`。
本语料库的机械约定见 `CONTRIBUTING.md`。
persona 专属契约语义见 `composition-contract.md`。
