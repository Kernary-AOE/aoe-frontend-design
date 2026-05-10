# DensityVsComfort [tradeoff] v1.0.0
The fundamental tension in UI layout: dense layouts maximize information per viewport but increase cognitive load and require expert familiarity; comfortable layouts reduce stress and speed comprehension but reduce scannable data volume.
domain: visual-design

## Label
Information Density vs. Reading Comfort

## Axes
- information-density
- user-expertise
- session-duration
- task-type

## Decision
```
if user-expertise == expert AND task-type == "data-scanning" AND session-duration > 30min:
→ dense (@impeccable/persona-dense-pragmatist)
row-height: 32–36px
font-size: 12–13px
line-height: 1.3
padding: 4–8px

elif user-expertise == mixed AND task-type in ["reading", "form-completion"]:
→ comfortable
row-height: 48–56px
font-size: 15–16px
line-height: 1.6–1.7
padding: 12–16px

else:
→ adaptive: default comfortable, opt-in to dense via user preference
provide: "Compact mode" toggle stored in localStorage
```

## Cost Of Dense
- Touch interaction requires larger targets (@community/metric-target-size minimum 44px) — dense rows violate this for mobile
- New users experience higher learning curve
- Increased text error rate if font-size < 12px on high-DPI displays

## Cost Of Comfortable
- Power users scroll more to see the same data volume
- Dashboard contexts lose contextual data density
- Enterprise tools may feel 'consumer-grade' to expert audiences
