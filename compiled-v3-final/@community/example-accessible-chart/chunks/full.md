# AccessibleChart [example] v1.0.0
A production-ready accessible area chart using Recharts and React. Demonstrates: figure/figcaption ARIA wrapping, sr-only description paragraph, aria-hidden chart SVG, prefers-reduced-motion gate on animations, a hidden sr-only data table for exact values, and themed tooltip styling via CSS custom properties.
domain: frontend-design

## Label
Complete Accessible Area Chart — Recharts + ARIA

## Code
```
    import {
      AreaChart,
      Area,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      ResponsiveContainer,
    } from "recharts";
    import { useReducedMotion } from "your-motion-hook"; // or window.matchMedia check

    export function RevenueChart({ data }) {
      const prefersReducedMotion = useReducedMotion();

      return (
        <figure
          aria-labelledby="revenue-chart-title"
          aria-describedby="revenue-chart-desc"
          className="w-full"
        >
          {/* Visible chart title */}
          <figcaption id="revenue-chart-title" className="mb-2 text-sm font-medium">
            Monthly Revenue
          </figcaption>

          {/* Screen-reader description: state the insight explicitly */}
          <p id="revenue-chart-desc" className="sr-only">
            Area chart showing monthly revenue from January to June 2026.
            Revenue grew 34% over the period, peaking at $142k in May.
          </p>

          {/* Chart: aria-hidden because figure provides the accessible name */}
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              aria-hidden="true"
              isAnimationActive={!prefersReducedMotion}
              margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0072B2" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0072B2" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#0072B2"
                strokeWidth={2}
                fill="url(#colorRevenue)"
                isAnimationActive={!prefersReducedMotion}
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Hidden data table for screen readers: exact values */}
          <table className="sr-only">
            <caption>Monthly revenue data</caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td>${row.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    }
  
```

## Context
React + Recharts dashboard chart that is fully accessible to screen readers and motion-sensitive users. The gradient fill uses #0072B2 (blue-blind safe, from the Wong palette). No red/green-only encoding.

## Label
Complete Accessible Area Chart — Recharts + ARIA

## Code
```
    import {
      AreaChart,
      Area,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      ResponsiveContainer,
    } from "recharts";
    import { useReducedMotion } from "your-motion-hook"; // or window.matchMedia check

    export function RevenueChart({ data }) {
      const prefersReducedMotion = useReducedMotion();

      return (
        <figure
          aria-labelledby="revenue-chart-title"
          aria-describedby="revenue-chart-desc"
          className="w-full"
        >
          {/* Visible chart title */}
          <figcaption id="revenue-chart-title" className="mb-2 text-sm font-medium">
            Monthly Revenue
          </figcaption>

          {/* Screen-reader description: state the insight explicitly */}
          <p id="revenue-chart-desc" className="sr-only">
            Area chart showing monthly revenue from January to June 2026.
            Revenue grew 34% over the period, peaking at $142k in May.
          </p>

          {/* Chart: aria-hidden because figure provides the accessible name */}
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              aria-hidden="true"
              isAnimationActive={!prefersReducedMotion}
              margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0072B2" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0072B2" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#0072B2"
                strokeWidth={2}
                fill="url(#colorRevenue)"
                isAnimationActive={!prefersReducedMotion}
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Hidden data table for screen readers: exact values */}
          <table className="sr-only">
            <caption>Monthly revenue data</caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td>${row.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    }
  
```

## Context
React + Recharts dashboard chart that is fully accessible to screen readers and motion-sensitive users. The gradient fill uses #0072B2 (blue-blind safe, from the Wong palette). No red/green-only encoding.
