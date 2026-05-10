# PageTransition [pattern] v1.0.0
路由切换时旧页面 fade + 微 slide-out，新页面 fade + slide-in，整个过程 200-300ms。让 SPA 路由跳转有'空间连续性'，不会在切换瞬间感觉断帧。Linear / Notion / Arc 风格。
domain: frontend-design

## Label
Page Transition

## Problem
SPA 路由切换默认是硬切——旧 DOM 立刻替换为新 DOM。用户感觉像'闪屏'，无法区分'页面变了'还是'页面 reload 了'，方向感丢失。

## Solution
用 View Transitions API（::view-transition-old / ::view-transition-new）做 fade + 短距离 slide，时长 200-300ms。回退用框架（Next.js / React Router / Vue）的 transition hook 配合 CSS keyframes。

## Structure
```
    <!-- Modern: View Transitions API trigger -->
    <a href="/about" data-transition>About</a>

    <!-- The browser handles old/new snapshots automatically when JS calls
         document.startViewTransition(() => updateDOM()) -->
  
```

## Styles
```
    /* Modern: View Transitions API (Chrome 111+, Safari 18+) */
    @view-transition {
      navigation: auto;
    }

    ::view-transition-old(root) {
      animation: page-fade-out 180ms ease-in forwards;
    }
    ::view-transition-new(root) {
      animation: page-fade-in 240ms cubic-bezier(0.16, 1, 0.3, 1) 60ms backwards;
    }

    @keyframes page-fade-out {
      to {
        opacity: 0;
        transform: translateY(-4px);
      }
    }
    @keyframes page-fade-in {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
      }
    }
  
```

## Timing
- **Out Duration**: 150-200ms (faster — old content leaves)
- **In Duration**: 200-300ms (slower — new content arrives with confidence)
- **Overlap**: 60-100ms (new fades in slightly after old fades out)
- **Easing**: ease-in for out, cubic-bezier(0.16, 1, 0.3, 1) for in
- **Total Cap**: <= 400ms (any longer feels sluggish per fact-duration-perception-thresholds)

## Interaction
- 用户点击链接 / 触发路由 → 浏览器/框架捕获旧 snapshot → 执行 DOM 更新 → 播放过渡
- 返回按钮（popstate）也应用同样过渡——保持双向一致性
- 过渡进行中焦点策略：新页面挂载后将焦点移到 <main> 或新页面 h1（屏幕阅读器需要这个信号）
- 过渡期间禁止接受新的导航点击——避免 race condition
- 若用户连续快速切换路由，跳过过渡直接渲染最新页面（debounce）

## A11y
- prefers-reduced-motion: reduce 必须把 animation 全部禁用——路由跳转的方向位移对前庭敏感者尤其不友好
- 过渡总时长必须 ≤ 400ms：跨过 fact-duration-perception-thresholds 的 flow 阈值会让用户怀疑'卡了'
- 新页面挂载后用 aria-live='polite' 区域宣告页面标题，或主动 focus 到 h1
- URL 必须在过渡开始前就更新——浏览器历史与视觉状态不能脱节
- View Transitions API 自动处理 :focus 状态丢失问题；手动实现路径必须显式 restore focus

## Behavior
- out 比 in 短：旧内容已被用户'看完'可以快速离开，新内容需要更多时间'到达'
- translateY 位移控制在 4-8px：页面级动效距离要比组件级小（页面已是最大视觉单元，不需要大位移）
- 永远不要做 horizontal slide 全屏切换——过渡时长会被迫拉到 400ms+，且不符合 web 的'层叠视图'心智
- 首次访问（SSR / 直接 URL）禁用过渡——只在 SPA 内部导航时触发
- View Transitions API 走合成器线程，性能近乎为零；JS 实现路径必须只动 transform/opacity
- 若有 shared element（详情页头图）可用 view-transition-name 实现 morph，但要小心 layout shift

## Label
Page Transition

## Problem
SPA 路由切换默认是硬切——旧 DOM 立刻替换为新 DOM。用户感觉像'闪屏'，无法区分'页面变了'还是'页面 reload 了'，方向感丢失。

## Solution
用 View Transitions API（::view-transition-old / ::view-transition-new）做 fade + 短距离 slide，时长 200-300ms。回退用框架（Next.js / React Router / Vue）的 transition hook 配合 CSS keyframes。

## Structure
```
    <!-- Modern: View Transitions API trigger -->
    <a href="/about" data-transition>About</a>

    <!-- The browser handles old/new snapshots automatically when JS calls
         document.startViewTransition(() => updateDOM()) -->
  
```

## Styles
```
    /* Modern: View Transitions API (Chrome 111+, Safari 18+) */
    @view-transition {
      navigation: auto;
    }

    ::view-transition-old(root) {
      animation: page-fade-out 180ms ease-in forwards;
    }
    ::view-transition-new(root) {
      animation: page-fade-in 240ms cubic-bezier(0.16, 1, 0.3, 1) 60ms backwards;
    }

    @keyframes page-fade-out {
      to {
        opacity: 0;
        transform: translateY(-4px);
      }
    }
    @keyframes page-fade-in {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
      }
    }
  
```

## Timing
- **Out Duration**: 150-200ms (faster — old content leaves)
- **In Duration**: 200-300ms (slower — new content arrives with confidence)
- **Overlap**: 60-100ms (new fades in slightly after old fades out)
- **Easing**: ease-in for out, cubic-bezier(0.16, 1, 0.3, 1) for in
- **Total Cap**: <= 400ms (any longer feels sluggish per fact-duration-perception-thresholds)

## Interaction
- 用户点击链接 / 触发路由 → 浏览器/框架捕获旧 snapshot → 执行 DOM 更新 → 播放过渡
- 返回按钮（popstate）也应用同样过渡——保持双向一致性
- 过渡进行中焦点策略：新页面挂载后将焦点移到 <main> 或新页面 h1（屏幕阅读器需要这个信号）
- 过渡期间禁止接受新的导航点击——避免 race condition
- 若用户连续快速切换路由，跳过过渡直接渲染最新页面（debounce）

## A11y
- prefers-reduced-motion: reduce 必须把 animation 全部禁用——路由跳转的方向位移对前庭敏感者尤其不友好
- 过渡总时长必须 ≤ 400ms：跨过 fact-duration-perception-thresholds 的 flow 阈值会让用户怀疑'卡了'
- 新页面挂载后用 aria-live='polite' 区域宣告页面标题，或主动 focus 到 h1
- URL 必须在过渡开始前就更新——浏览器历史与视觉状态不能脱节
- View Transitions API 自动处理 :focus 状态丢失问题；手动实现路径必须显式 restore focus

## Behavior
- out 比 in 短：旧内容已被用户'看完'可以快速离开，新内容需要更多时间'到达'
- translateY 位移控制在 4-8px：页面级动效距离要比组件级小（页面已是最大视觉单元，不需要大位移）
- 永远不要做 horizontal slide 全屏切换——过渡时长会被迫拉到 400ms+，且不符合 web 的'层叠视图'心智
- 首次访问（SSR / 直接 URL）禁用过渡——只在 SPA 内部导航时触发
- View Transitions API 走合成器线程，性能近乎为零；JS 实现路径必须只动 transform/opacity
- 若有 shared element（详情页头图）可用 view-transition-name 实现 morph，但要小心 layout shift
