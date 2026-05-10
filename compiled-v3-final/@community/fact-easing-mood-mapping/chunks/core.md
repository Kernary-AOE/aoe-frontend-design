# EasingMoodMapping [fact] v1.0.0
不同 easing 曲线传达不同的情绪/品牌气质：linear=机械程序感、ease-out=自信收尾、cubic-bezier(0.16,1,0.3,1)=柔顺优雅、cubic-bezier(0.34,1.56,0.64,1)=调皮回弹、spring=弹性活泼、ease-in-out=对称从容。选择 easing 等于在选择'品牌的运动性格'。
> UI motion 的 easing 选择不只是性能或物理学问题——每条曲线传达一种情绪：linear 用于无终点循环（spinner / shimmer），其他场景用 linear 等于宣告'这是程序的，不是产品的'；ease-out 系列（包括 cubic-bezier(0.16,1,0.3,1) ease-out-quint）传达'自信抵达'，是 productivity tool 的默认语言（Linear / Notion）；cubic-bezier(0.34,1.56,0.64,1) 这类带 overshoot 的曲线传达'调皮 / 玩具感'，适合 consumer / 社交产品（Discord / Duolingo）；spring physics 表达'有重量、有弹性'的物质感（iOS / Apple Music）；ease-in-out 对称曲线适合非关键的循环或被动过渡（背景渐变、状态指示），但用于焦点元素会显得'拖泥带水'。

## Confidence
strong

## Applies To
- transition-timing-function on every interaction
- 选择品牌 motion token 时（design system 'easing.standard' 等）
- choosing between CSS easing vs Framer Motion spring
- 对比相同动效在不同曲线下的'调性'测试
- audit：是否所有 transition 都套了 ease-in-out（默认值），失去品牌差异

## Quantitative
- **Linear**: cubic-bezier(0, 0, 1, 1) — mechanical, only for infinite loops
- **Ease Out Default**: cubic-bezier(0, 0, 0.2, 1) — Material decelerated, confident arrival
- **Ease Out Quint**: cubic-bezier(0.16, 1, 0.3, 1) — Linear-style, smooth elegance
- **Overshoot Playful**: cubic-bezier(0.34, 1.56, 0.64, 1) — bouncy, consumer / toy feel
- **Overshoot Strong**: cubic-bezier(0.68, -0.55, 0.265, 1.55) — 'back' easing, dramatic
- **Spring Ios**: tension 170, damping 26 (React Spring) ≈ iOS default
- **Ease In Out**: cubic-bezier(0.42, 0, 0.58, 1) — symmetric, low-key transitions only
- **Ease In**: cubic-bezier(0.42, 0, 1, 1) — exit only (item leaving screen, modal closing)

## Counter Conditions
- 无终点的循环动画（spinner, shimmer, marquee）必须用 linear——任何减速曲线在循环中会出现'卡顿'感
- spring physics 下 mood 由 damping/stiffness 决定，不再由曲线表达：低 damping 弹得多 → 调皮，高 damping → 利落
- 对前庭敏感用户（prefers-reduced-motion）所有这些曲线都被禁用为 0ms，mood mapping 不适用
- 极短动画（< 100ms）人眼分辨不出曲线差异，统一用 ease-out 即可
- 设计系统应该统一品牌 easing token——而不是每个组件独立选——否则 mood 失控
