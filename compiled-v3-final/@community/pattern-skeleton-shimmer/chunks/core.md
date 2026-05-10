# SkeletonShimmer [pattern] v1.0.0
骨架屏的'光泽掠过'动画——一条比背景稍亮的渐变带从左到右循环平移 1.2-1.6s。让骨架屏从'静态灰块'变成'明确正在加载'的强信号。Facebook / YouTube / Stripe loader 标志样式。
domain: frontend-design

## Label
Skeleton Shimmer

## Problem
纯灰色骨架屏（pattern-skeleton-loader）告诉用户'有结构'但不告诉'在动'。如果加载 > 2 秒，用户会怀疑界面卡死。spinner 又过于吸引注意力且不能预示内容形状。

## Solution
在骨架元素上叠加 linear-gradient 背景（中间一条比 base 亮 4-8%），用 background-position 平移做循环，1.2-1.6s 一周。reduced-motion 时退化为静态灰色（仍提供结构暗示）。

## Structure
```
    <article aria-busy="true" aria-label="Loading article">
      <div class="shimmer skeleton-img"></div>
      <div class="shimmer skeleton-line"></div>
      <div class="shimmer skeleton-line skeleton-short"></div>
    </article>
  
```

## Styles
```
    .shimmer {
      background-color: oklch(94% 0.005 240);
      background-image: linear-gradient(
        90deg,
        transparent 0%,
        oklch(98% 0.005 240) 50%,
        transparent 100%
      );
      background-size: 200% 100%;
      background-repeat: no-repeat;
      animation: shimmer-sweep 1400ms linear infinite;
      border-radius: 6px;
    }
    .skeleton-img  { aspect-ratio: 16 / 9; }
    .skeleton-line { height: 0.85em; margin: 0.4em 0; }
    .skeleton-short { width: 60%; }

    @keyframes shimmer-sweep {
      from { background-position: 200% 0; }
      to   { background-position: -200% 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .shimmer {
        background-image: none;
        background-color: oklch(92% 0.005 240);
        animation: none;
      }
    }
  
```

## Timing
- **Duration**: 1200-1600ms per sweep cycle (sweet spot 1400ms)
- **Easing**: linear (continuous, no rest state)
- **Iteration**: infinite (until content arrives)

## Interaction
- 无用户交互——纯加载状态指示
- 数据返回后立即移除 .shimmer 类（不要等动画 cycle 结束）
- 若数据 < 200ms 内返回，跳过 shimmer 直接渲染——避免 shimmer 一闪即逝
- 若加载 > 8 秒，应升级为明确的 'Still loading...' 或错误状态（fact-duration-perception-thresholds）

## A11y
- 父容器必须 aria-busy='true'，告诉屏幕阅读器'区域正在更新'
- shimmer 元素 aria-hidden='true'（视觉装饰）
- prefers-reduced-motion: reduce 时强制 animation: none 并移除 gradient——纯静态色块对前庭敏感者也提供结构暗示
- linear easing 的循环动画对部分前庭敏感用户仍可能引发轻微不适——reduced-motion 必须严格执行
- shimmer 颜色对比度无要求（装饰），但底色与周围 chrome 应有 ≥ 1.5:1 区分

## Behavior
- linear easing 是必须的——shimmer 是无终点的循环，cubic-bezier 会出现'快慢快慢'的不自然节奏
- background-size: 200% 让 gradient 完整滑过元素而不在两端停顿
- 亮带宽度（gradient 50% 处）和明暗对比要克制：base + 4-8% 亮度足够，过亮显得 disco
- 周期 < 1s 显得焦虑（'怎么这么急'），> 2s 显得没在动（用户怀疑卡死）
- 多个 shimmer 元素共享相同 animation-name 和 duration——会自动同步，看起来像'一束光扫过整个区域'
