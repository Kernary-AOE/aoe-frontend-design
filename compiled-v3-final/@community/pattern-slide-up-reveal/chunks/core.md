# SlideUpReveal [pattern] v1.0.0
内容从下方 16-24px 处上滑同时 opacity 渐入，比纯 fade 更强烈的'到达'感。Hero section、card grid、modal 内容进场最常用。Apple / Stripe / Notion 风格。
domain: frontend-design

## Label
Slide Up Reveal

## Problem
纯 fade 太柔，对 hero / card 这种主体内容不够'有分量'。直接 hard-paint 又太突兀。需要一个比 fade 强、比弹跳轻的中间方案。

## Solution
translateY(20px) → translateY(0) 同步 opacity 0 → 1，时长 400-600ms，easing 用强减速曲线 cubic-bezier(0.16, 1, 0.3, 1)。距离比 fade-in-on-load 大 2-3 倍，用强 easing 抵消时长增加的钝感。

## Structure
```
    <section class="hero">
      <h1 class="slide-up">Build something great</h1>
      <p  class="slide-up" style="animation-delay: 100ms">A subtitle that lands second</p>
      <div class="slide-up" style="animation-delay: 200ms">
        <button>Get started</button>
      </div>
    </section>
  
```

## Styles
```
    @keyframes slide-up-reveal {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .slide-up {
      opacity: 0;
      animation: slide-up-reveal 480ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @media (prefers-reduced-motion: reduce) {
      .slide-up {
        opacity: 1;
        transform: none;
        animation: none;
      }
    }
  
```

## Timing
- **Duration**: 400-600ms (sweet spot 480ms)
- **Easing**: cubic-bezier(0.16, 1, 0.3, 1) — ease-out-quint, Linear-style
- **Distance**: translateY(16-24px)

## Interaction
- 首次进入视口或挂载时触发一次
- Modal / drawer 内容用此 pattern：dialog 打开时内容 slide-up，比纯 fade 更有'抵达'感
- Card grid：配合 stagger（见 pattern-stagger-reveal）做错位上滑
- 进行中点击可交互元素不受影响——动画走在 transform 层不阻塞 hit-test

## A11y
- prefers-reduced-motion: reduce 必须强制 transform: none + opacity: 1
- translateY 距离不要超过元素高度的 50%——超过会有'飞入'的感觉，对前庭敏感用户不友好
- 动画不要循环：进场是一次性事件，infinite 会造成持续晕动
- 首屏 LCP 元素禁用此动画（LCP 计算包含动画结束时间）

## Behavior
- translateY 起始 16-24px：再小退化成 fade-in，再大变 throw-in
- 强 easing（quint）让运动'迅速到达然后悬停感'——和 ease-out 比有更强的 anticipation
- duration 必须 ≥ 400ms：距离大需要时间，否则视觉残影
- 顺序入场时 stagger 间隔 80-120ms（比 fade-in 长，因为单元素动画更长）
- 纯 transform + opacity 走 GPU 合成层，性能成本几乎为零
