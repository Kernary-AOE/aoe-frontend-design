# 贡献 — 前端设计语料库的原子写作指南

> 本指南讲**给前端设计语料库加原子**。`.prime` DSL 语法（lexer/parser
> 层面的事）请看系统仓库的 `CONTRIBUTING.md`。本文是设计专属手册：
> 哪一类设计知识用哪种 kind、什么时候建 persona 而不是 voice、
> 什么时候 `rule` 而不是 `principle`，以及本语料库的约定。

---

## 0 · 两种写作方式

### 0a. 用 `prime-decompose` Skill（推荐）

如果你有一份 markdown 设计文档（品牌指南、`impeccable` SKILL.md、
Figma 导出的 prose），把
[`prime-decompose`](prime-decompose/SKILL.md) Claude Code Skill 指上
去：

```
你: /prime-decompose ./our-design-system-brief.md
       --target @ourteam --out ./out-prime/
```

Skill 会输出 `.prime` 文件；你 review、改、合并。

### 0b. 手写

如果你只写零散原子，或想直接编码一次设计判断，按本文剩余部分来。
熟悉 kind 分类后，每个原子约 5–15 分钟。

---

## 1 · 5 层 kind 决策

永远先选**层**，再选 kind。

| 层 | 本语料库的 kind | "这条知识在做什么？" |
|---|---|---|
| **数据** | `fact`, `term`, `value`, `category`, `example`, `counter-example`, `source`, `metric` | 陈述事实/定义/度量。无祈使。 |
| **行为** | `step`, `check`, `transform`, `tool`, `method` | agent 或人执行的离散操作。 |
| **组合** | `rule`, `taxonomy`, `pattern`, `anti-pattern`, `type` | 可复用的结构积木。 |
| **风格 / 参数** | `persona`, `voice`, `constraint`, `template`, `provocation` | 输出的样子/口吻。通过 `composition:` 捆绑别的原子。 |
| **元** | `collection`, `scope`, `tradeoff`, `principle`, `feedback` | 启发式、环境性指引、curated bundle。 |

层内再选最具体的 kind。下文给一些常见对比。

---

## 2 · `rule` vs `principle` —— 最常见的犯错

| | `rule` | `principle` |
|---|---|---|
| 可执行性 | 直接可执行，二元 pass/fail | 高层启发式，不直接可执行 |
| 校验 | 配套有 `check` | 不能被 check 验证 —— 它只是为 rule 提供理由 |
| 例子 | "所有 spacing 值必须是 4px 的倍数" | "单一基本单位与其倍数构成节奏" |
| 输出 | validator 可以从 HTML 验证 | validator 验不了；它派生出的 rule 可以 |

如果这条知识**说明怎么过/不过一个二元判定** → `rule`。
如果它**解释为什么** rule 是这样 → `principle`。

本语料库里大致：

```
rule       206
principle   47
```

可执行知识基本都在 `rule`。`principle` 用得克制 —— 应该是可被引用、
偏哲学、不直接强制的。

---

## 3 · `pattern` vs `template` —— 何时用哪种

| | `pattern` | `template` |
|---|---|---|
| 结构 | 概念性配方（是什么 + 为什么 + 何时用）| 具体代码，可粘贴 |
| 含 `structure` 字段（HTML/CSS）| 可选 | **必须** |
| 例子 | `pattern-toast-stack`、`pattern-hero-with-demo` | `template-spring-config`、`template-oklch-palette` |
| 跨 persona 复用 | 是 —— pattern 是 persona-中立的 | 大多 persona-专属（`template-spring-config` 供给多个 persona，但参数值会被 persona 调） |
| 主体长度 | description + behavior + a11y 列表 | 一个字面量 `structure: """ ... """` 块 |

如果你能写 `<div class="...">` 骨架，就是 template。如果你描述的是
任意 UI 库都能落地的抽象方案，就是 pattern。

当一个 pattern 有典范实现，**两个都写** —— pattern 讲 "是什么"，
template 给 "可粘贴代码"。用 `enhances` 连（template enhances pattern）。

---

## 4 · `persona` vs `voice` —— 视觉 vs 语言

| | `persona` | `voice` |
|---|---|---|
| 关心 | 视觉美学 —— 颜色、字体、密度、布局、动效 | 语言口吻 —— 用词、句式、态度 |
| 例子 | `persona-magazine-editorial`（display 衬线、drop cap、非对称流）| `voice-casual-warm`（聊天式，缩略形式可、em-dash 强调）|
| 必填字段 | `implies: { font, color, density, layout, ...}` | `tone:`, `vocabulary:`, `grammar_preferences:` |
| 兼容性 | 一页一个 persona（偶尔混搭）| 经常配 persona —— persona+voice = 完整设计语言 |

如果你发现自己同时在写视觉和语言指令，拆成两个原子。它们正交可独立
复用。Stripe 视觉 + Notion 语调是个有团队真在用的组合；如果是一个
原子你就混不了。

---

## 5 · 必填字段（前端设计语料库约定）

本语料库每个原子都有：

```
<kind> <PascalName> {
  id: "@<scope>/<kind>-<kebab-name>"   // 必须等于文件名去掉 .prime
  version: "1.0.0"

  description: "..."                   // ≤200 字；用通俗话讲它是什么

  domain: frontend-design              // 也可以是: accessibility | security | ux-design | …

  // — kind 专属字段，见系统仓库 PRIME-SPEC-v1.md §1.2 —

  related: [..., ..., ...]             // ≥3 条

  // ≥1 条: extends / derived-from / requires / enhances / specializes
  derived-from: @<scope>/...
}
```

### 前端设计专属约定

- **必须设 `domain:`**。DomainRegistry 用它在检索时同域加权。
- **`description:` 是被 ranker 消费的**。每个词都得有用，别复述
  kind。
- **`persona` 原子的 `implies:` 是必须的**。检索算法的 `register`
  轴会把所选 persona 的 `implies` 字段直接传给 agent —— 空 `implies`
  让 agent 自己猜。
- **`template` 原子的 `structure:`（多行 `"""..."""`）必须**。L3
  validator 的签名库会针对字面 HTML 模式匹配。
- **品牌 persona**：只写**可观察的公开设计特征**。不要改写品牌
  voice 文案。在 `notes:` 里引公网链接。

---

## 6 · Composition contract（persona 最重要的一节）

写 `persona` 时，`composition:` 块就是 agent 要被约束遵守的契约。
这部分要花格外心思。

```
composition: {
  must-include: [
    @<scope>/principle-foo,
    @<scope>/pattern-bar,
    ...
  ]
  must-avoid: [
    @<scope>/persona-bad-pairing,
    ...
  ]
  typography-required: {
    display: "high-contrast display serif (GT Sectra | Tiempos Headline)"
    body: "transitional or old-style serif, 18-20px"
    display-size: "96-160px"
  }
  color-required: {
    background: "#f8f6f1 or #fbf9f4 (warm magazine paper)"
    palette: "per-article accent (issue-specific, not global)"
  }
  motion-prescriptions: [
    @<scope>/principle-vertical-rhythm,
  ]
  quality-thresholds: {
    min-keyframes: 4
    requires-cubic-bezier: true
    requires-reduced-motion-fallback: true
  }
}
```

规则：

- `must-include` 引用必须指向**真实存在**的原子。validator 会硬失
  败若任意 must-include 不在输出里。
- `must-include` 控制在 **3–6 个**。超过 6 开始过度约束输出，agent
  context 也会被撑大。
- `typography-required` 是**字符串散文，不是 atom ID**。agent 直接
  读。
- `motion-prescriptions` 应引 **template** 或 **pattern** 原子（具
  体动效规格），不要引 principle。
- `quality-thresholds` 是数值/布尔检查，由 L3 validator 消费。

---

## 7 · 边动词速查（前端设计）

14 个边动词在 Wave 12 之前用得很少。本语料库里何时用每个：

| Verb | 何时用 |
|---|---|
| `related` | 通用对等引用。每个原子至少 3 条。 |
| `extends` | 一个 persona 是另一个的 refinement（`persona-magazine-editorial extends persona-editorial`）|
| `specializes` | 一个 pattern 是父 pattern 的更具体情况（`pattern-data-table-sortable specializes pattern-data-table`）|
| `derived-from` | `rule` 派生自 `fact` 或 `principle`；persona 派生自外部品牌引用 |
| `requires` | 没有另一个 pattern **就不能 work**（`pattern-toast-stack requires pattern-stagger-reveal`）|
| `enhances` | template 强化 pattern（`template-spring-config enhances pattern-toast-stack`）|
| `validates-with` | 一个 `rule` 的 pass/fail 由 `fact` 或外部 spec 验证（`rule-color-contrast validates-with @w3c/fact-wcag-contrast-aa`）|
| `supplies-to` | `value` 或 `fact` 被另一原子消费（`value-touch-target-min supplies-to rule-touch-target-min`）|
| `conflicts` | 两个原子不能同时加载（`persona-brutalist conflicts persona-editorial`）|
| `compatible` | 两个原子配合得很好（`persona-warm-institutional compatible persona-magazine-editorial`）|
| `contradicts` | 强逻辑相悖，作为 warning 浮出（与 `must-avoid` 镜像）|
| `see-also` | 松散相关；rule↔check 配对 |
| `relationships` | 在 `taxonomy` 或 `category` 中的成员关系 |
| `includes` | 组合 / collection 捆绑 |

### 至少有一条非 `related` 的边

每个原子必须至少有以下之一：
{`extends`, `derived-from`, `requires`, `enhances`, `specializes`}。

这条由 `prime check` 强制。理由：`related` 是惰性默认值；没有任何
强类型边的图会塌缩成单一动词糊（这正是 Wave 12 之前发生的）。

---

## 8 · 命名 + scope

- 文件: `primes-v3/sources/@<scope>/<kind>-<kebab-name>.prime`
- 原子 `id`: `@<scope>/<kind>-<kebab-name>`（必须等于文件名去掉
  `.prime`）
- `<scope>` 是 namespace。前端设计语料库可投：
  - `@community` —— 公共领域作者写的原子（大多数贡献）
  - `@impeccable` —— 独特 persona school + 配套原子（受控；先和维护
    者沟通）
  - `@anthropic-impeccable` —— 派生自 anthropics/skills（不要新增；
    此 namespace 冻结于 26 原子）
  - `@nielsen` / `@w3c` —— 仅用于引用；除非覆盖新的公共 spec 否则
    别加
  - `@<yourteam>` —— fork 时用自己的 scope（如 `@stripe-internal`）

---

## 9 · 提交清单

提 PR 前：

- [ ] 每个新原子能干净解析：`bun run prime check primes-v3/sources/@<scope>/<your-atom>.prime`
- [ ] `prime check --registry` 没有新增 broken ref
- [ ] 每个原子至少 3 条 `related:`
- [ ] 每个原子至少 1 条 {`extends`, `derived-from`, `requires`, `enhances`, `specializes`}
- [ ] `description:` ≤200 字，每个词有用
- [ ] `domain:` 设为本语料库 9 个域之一
- [ ] persona 原子：`implies:` 写满；`composition:` 含 3–6 条
      `must-include`
- [ ] template 原子：`structure:` 字面 HTML/CSS 块
- [ ] 引外部（WCAG / Nielsen / 品牌）：用 `derived-from` 或在
      `notes:` 写 URL
- [ ] 加新任务类型 YAML：`default_register_pool` 引用现有 persona
      （或同 PR 把新 persona 也写了）
- [ ] 加品牌 persona：`notes:` 引公网链接，无专有素材复制

---

## 10 · 前端设计分类（什么写到哪）

新原子归到对应 scope 的速查：

- 新设计流派 / 美学 → `persona-*.prime`
- 新写作口吻 → `voice-*.prime`
- 新 UI 积木（toast、modal、hero）→ `pattern-*.prime`（+ 有代码骨架就 `template-*.prime`）
- 新 CSS 技术 → `template-*.prime`
- 新"始终做 X" → `rule-*.prime` + `check-*.prime`
- 新"绝不做 X" → `anti-pattern-*.prime` + 否定形式 `rule-*.prime`
- 新带引用的实证主张 → `fact-*.prime` + `source-*.prime`
- 新抽象启发式 → `principle-*.prime`
- 新比例/阈值/数值 → `value-*.prime`
- 新被其它原子复用的命名术语 → `term-*.prime`

如果都不合适，先开 issue 再写。新发明 kind 不支持（28 种 spec
冻结）；但在已有 kind 内开子 namespace 没问题（如
`pattern-data-table-sortable` 是 `pattern-data-table` 的子
pattern）。

---

## 11 · 大型贡献

- **新任务族**（例如"agentic-cli-ui"）：先开 issue 协调。可能需
  要 ~30 原子 + 4–6 yaml + persona-pool 决策。别冷开 PR。
- **目前没有代表的 persona school**：先写 scoping 文档（哪些品牌引
  用、跟什么冲突、`must-include` 声明什么、估计多少配套原子，约 6
  个）。
- **新 domain**（你在为 `@<yourteam>` 播种 game-design 原子）：考虑
  整体 fork；语料库仓库就是设计成超过约 50 原子后被 fork 的。

---

工程级贡献指南（parser 测试、代码风格、CI）见系统仓库的
`CONTRIBUTING.md`。本文是**设计侧**写作手册 —— 不同关心、常常不同
reviewer。
