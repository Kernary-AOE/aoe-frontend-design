# StaggerFeelOrganic [fact] v1.0.0
多元素错位入场时，相邻元素之间的延迟 50-100ms 被人类感知为'有节奏的连续'。<30ms 间隔被合并为同步事件（stagger 失效），>150ms 间隔被拆解为'多个独立动画'（节奏断裂）。
> Stagger（错位入场）的相邻 delay 应在 50-100ms 之间，最佳点在 70-80ms。这个区间利用了人类视觉系统的时间合成阈值——大脑把 < 80ms 的相继事件融合为'连续运动'，而 100-150ms 之间被感知为'有先后但相关'。低于 30ms 的延迟在视觉上等同于同时发生（stagger 退化为齐响），高于 150ms 则每个元素被解读为独立动画事件，整体节奏感丢失。

## Confidence
strong

## Applies To
- list / grid items 入场动画 (pattern-stagger-reveal)
- hero 多行文字逐行 fade-in (pattern-fade-in-on-load)
- navigation menu 子项展开
- form fields 入场（modal 内表单逐行渐入）
- data table rows 渲染时的视觉节奏

## Quantitative
- **Too Fast Threshold**: < 30ms (perceived as simultaneous)
- **Sweet Spot Low**: 50ms (small / dense items, e.g., menu items)
- **Sweet Spot Mid**: 70-80ms (default, most card grids)
- **Sweet Spot High**: 100ms (large / heavy items, e.g., hero blocks)
- **Too Slow Threshold**: > 150ms (perceived as disconnected events)
- **Total Stagger Cap**: (n-1) * delay + duration <= 800ms
- **Item Count Cap**: ≤ 10 items (beyond this last item delay > 700ms feels late)

## Counter Conditions
- 如果元素几何上空间分离很远（不同视觉区块），间隔可以 > 150ms 不显得断裂——空间距离补偿了时间距离
- 'spring physics' 库（Framer Motion / React Spring）的默认 stagger 用 mass / damping 表达，转换到固定 delay 时大约对应 60-90ms
- 强调'快感'（如 Linear 命令面板结果列表）会用 30-40ms 极短间隔——边界 case，刻意做出'机关枪式'呈现
- 对前庭敏感用户（prefers-reduced-motion）整个 stagger 应被禁用，本规律不适用
