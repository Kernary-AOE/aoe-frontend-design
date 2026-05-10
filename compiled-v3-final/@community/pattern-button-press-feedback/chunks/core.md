# ButtonPressFeedback [pattern] v1.0.0
按钮按下瞬间 scale(0.97-0.98) + 颜色加深 + 80-120ms 极短反馈，模拟物理按键的'按下去'感。iOS / Linear / Arc / Vercel 标志性触感，让点击从'click'变成'按下'。
domain: frontend-design

## Label
Button Press Feedback

## Problem
纯 :hover 和 :focus 状态变化对'按下'这个瞬间没有反馈。用户在按下到松开之间（typical 50-150ms）盯着按钮，如果零变化会怀疑'我点中了吗'，尤其在网络延迟时反复点击。

## Solution
在 :active 时 transform: scale(0.97) + 短时长（80-120ms ease-out），松开自动回弹。配合 background-color 加深 4-8% 强化触感。

## Structure
```
    <button class="press">Save changes</button>
  
```

## Styles
```
    .press {
      transition:
        transform 100ms cubic-bezier(0.16, 1, 0.3, 1),
        background-color 100ms ease-out,
        box-shadow 100ms ease-out;
      background: oklch(60% 0.18 250);
      color: oklch(98% 0.01 250);
      box-shadow: 0 1px 2px oklch(20% 0.04 240 / 0.12);
    }
    .press:hover {
      background: oklch(56% 0.18 250);
    }
    .press:active {
      transform: scale(0.97);
      background: oklch(50% 0.18 250);
      box-shadow: 0 0 0 oklch(20% 0.04 240 / 0.12);
      transition-duration: 60ms;
    }
    .press:focus-visible {
      outline: 2px solid oklch(70% 0.16 250);
      outline-offset: 2px;
    }
    @media (prefers-reduced-motion: reduce) {
      .press { transition: background-color 100ms linear; }
      .press:active {
        transform: none;
        background: oklch(50% 0.18 250);
      }
    }
  
```

## Timing
- **Duration**: 80-120ms press, 60ms on press-down (asymmetric)
- **Easing**: ease-out / cubic-bezier(0.16, 1, 0.3, 1)
- **Scale**: 0.96-0.98 (never below 0.95)

## Interaction
- 鼠标 :active：scale(0.97) + 颜色加深，60ms 内完成
- 鼠标 release：松开瞬间回弹到 1.0，100-120ms 配合强 easing 形成轻微 overshoot 感
- 键盘 Space / Enter：按下时同样进入 :active 状态（浏览器原生行为，但要确保 CSS 没禁掉）
- 触屏 tap：直接进入 :active，因移动端无 hover 中间态
- 长按状态：scale 保持，不要继续往下缩

## A11y
- prefers-reduced-motion: reduce 时禁用 transform，保留 background-color 变化作反馈（颜色变化不引发眩晕）
- scale 缩放范围 ≥ 0.95：低于 0.92 会让按钮文字模糊难读
- 禁用按钮 [disabled] 必须移除 :active 状态（否则按了没反应造成困惑）
- 确保 :focus-visible outline 在 :active 时仍然可见（不要被 transform 裁掉）

## Behavior
- 按下时长 60ms 比松开时长 100ms 短：模拟'快速接触 → 缓慢回弹'的物理过程
- scale 变化必须配合 background 变化——纯 scale 显得'按虚了'
- transition 必须包含 transform，不能只 transition: all（性能抖动）
- box-shadow 同步压缩到 0：模拟按钮被'压扁'到表面
- 永远不要给 :active 加超过 200ms 的过渡——按下到松开通常 < 150ms，过渡未结束用户已松开
