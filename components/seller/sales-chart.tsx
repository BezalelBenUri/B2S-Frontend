"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    date: "Jan",
    Revenue: 1200,
    Sales: 12,
  },
  {
    date: "Feb",
    Revenue: 1800,
    Sales: 18,
  },
  {
    date: "Mar",
    Revenue: 2400,
    Sales: 24,
  },
  {
    date: "Apr",
    Revenue: 2100,
    Sales: 21,
  },
  {
    date: "May",
    Revenue: 2800,
    Sales: 28,
  },
  {
    date: "Jun",
    Revenue: 3200,
    Sales: 32,
  },
  {
    date: "Jul",
    Revenue: 3800,
    Sales: 38,
  },
]

export function SalesChart() {
  return (
    <ChartContainer
      config={{
        Revenue: {
          label: "Revenue ($)",
          color: "hsl(var(--chart-1))",
        },
        Sales: {
          label: "Sales (count)",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} className="text-sm" />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} className="text-sm" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="Revenue"
            strokeWidth={2}
            activeDot={{
              r: 6,
              className: "fill-primary stroke-background stroke-2",
            }}
            className="stroke-[--color-Revenue]"
          />
          <Line
            type="monotone"
            dataKey="Sales"
            strokeWidth={2}
            activeDot={{
              r: 6,
              className: "fill-primary stroke-background stroke-2",
            }}
            className="stroke-[--color-Sales]"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
