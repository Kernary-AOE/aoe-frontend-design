# ChartResponsiveContainer [pattern] v1.0.0
Charts MUST fill their parent's width via a ResponsiveContainer wrapper, never use a fixed pixel width. The only fixed dimension is height, chosen from a standard scale. The parent wrapper must have width:100% and min-width:0 to prevent flex-overflow.
domain: frontend-design
