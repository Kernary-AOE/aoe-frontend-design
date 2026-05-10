# HoverFeedbackLatency [fact] v1.0.0
指针 hover / focus / tap 后视觉反馈必须在 100ms 内开始。超过 200ms 用户的认知开始怀疑'我点中了吗 / 服务器卡了吗'。100-200ms 是'勉强可接受'的灰色地带——产品级品质要求 < 100ms。
> Hover / focus / tap 等指针交互的视觉状态变化（颜色、阴影、scale、outline）必须在 100ms 之内开始播放，且总时长应在 100-200ms 内完成主要变化。这源于 Card-Robertson-Mackinlay 1991 的'感知瞬时'阈值——人脑对 100ms 内的反馈感知为'即时响应'。超过此值用户会启动'判断流程'：'我点中了吗？'或'按钮坏了？'，导致重复点击 / 焦虑 / 弃用。> 200ms 的反馈视觉设计上几乎不可救药，无论后续动画多漂亮，第一秒的'冷场'已经让交互失败。

## Confidence
proven

## Applies To
- button :hover background-color transition
- card :hover transform / box-shadow
- input :focus border / outline change
- tap :active feedback on touch devices
- menu / dropdown 打开第一帧时间
- form validation 错误提示出现时间（用户从字段移开后 → 错误显示）

## Quantitative
- **Instantaneous Window**: 0-100ms (perceived as immediate)
- **Acceptable Window**: 100-200ms (acceptable but noticeable lag)
- **Suspicion Threshold**: > 200ms (user starts questioning input)
- **Failure Threshold**: > 400ms (user double-clicks or considers UI broken)
- **Target Hover Transition**: 100-150ms duration
- **Target Active Feedback**: 60-100ms duration (faster than hover for press feel)
- **Target Focus Ring Appear**: 0-50ms (should feel instant on Tab key)
- **Touch Tap Feedback Cap**: 50ms on iOS (per HIG)

## Counter Conditions
- 复杂的'状态过渡'（modal 打开、page transition）合理时长 200-400ms；但其'第一帧'变化（modal 出现、被点元素状态切换）仍必须 < 100ms
- 容器的 size / layout 类过渡（accordion 展开、sidebar 收起）允许 200-300ms——内容尺寸变化本身需要时间被看清
- 网络请求驱动的状态变化（点击 → API → 状态）属于另一类，由 fact-duration-perception-thresholds 的 1s flow 阈值管辖；但本地 UI 状态（hover, active, focus）必须遵守 100ms
- prefers-reduced-motion: reduce 时用瞬时颜色变化（duration: 0 或 ≤ 50ms）替代 transform，本规律仍然成立——颜色反馈不引发眩晕
