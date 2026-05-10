# FadeInOnLoad [pattern] v1.0.0
页面或区块加载完成时让元素从 opacity 0 渐入到 1，可选叠加微小的 translateY 位移。最基础的进场动效，几乎所有 marketing 页 / dashboard 卡片都用。让内容'显现'而不是'闪现'。
domain: frontend-design

## Label
Fade In On Load

## Problem
首屏内容 paint 时一次性硬切到可见状态，对用户来说像'弹出'，缺少时间感知层次。如果 hero 标题、副标题、CTA 同时硬切，用户的眼睛不知道先看哪个。

## Solution
用 CSS @keyframes 让元素初始 opacity: 0 然后到 1，时长 200-400ms，easing 用 ease-out 让结尾减速。多元素时配合 animation-delay 形成 stagger（错位入场）。

## Structure
```
    <section class="fade-stack">
      <h1 class="fade-in" style="--i: 0">Hero title</h1>
      <p  class="fade-in" style="--i: 1">Subtitle text</p>
      <a  class="fade-in" style="--i: 2">CTA button</a>
    </section>
  
```

## Styles
```
    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .fade-in {
      opacity: 0;
      animation: fade-in-up 320ms ease-out forwards;
      animation-delay: calc(var(--i, 0) * 80ms);
    }

    @media (prefers-reduced-motion: reduce) {
      .fade-in {
        opacity: 1;
        animation: none;
      }
    }
  
```

## Timing
- **Duration**: 200-400ms (sweet spot 280-320ms)
- **Easing**: ease-out / cubic-bezier(0.16, 1, 0.3, 1)
- **Stagger Delay**: 50-100ms between siblings

## Interaction
- 无用户交互——纯首次出现的'呈现'动效
- 动画 finish 后 forwards 保持终态（opacity: 1）防止回闪
- 若元素在初始视口外，配合 IntersectionObserver 触发（见 pattern-scroll-reveal）
- 键盘 / 屏幕阅读器：动画进行中焦点和 DOM 顺序不变，不影响 Tab 顺序

## A11y
- prefers-reduced-motion: reduce 时直接 opacity: 1 + animation: none，跳过过程
- 不要用 visibility: hidden 起始——会让屏幕阅读器跳过内容
- stagger delay 总长保持 < 500ms，避免最后一个元素出现得过晚（用户已经在看页面了）
- 首屏 LCP 元素（最大 hero 图 / 标题）禁用 fade——会延迟 LCP 测量值

## Behavior
- translateY 起始位移控制在 4-12px，再大就成 slide-up（见 pattern-slide-up-reveal）
- 用 forwards 而不是 alternate / infinite，进场是一次性的
- stagger 通过 CSS 自定义属性 --i 表达索引，比 nth-child 灵活
- 整组动画总时长（last delay + duration）应 < 700ms
- 不要给同一区块内 >5 个元素 stagger，会显得拖沓——用 motion hierarchy 选 1-2 个主元素
