"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    date: "Jan",
    "Data Volume": 2500,
    "Average Price": 35,
  },
  {
    date: "Feb",
    "Data Volume": 3000,
    "Average Price": 38,
  },
  {
    date: "Mar",
    "Data Volume": 2800,
    "Average Price": 40,
  },
  {
    date: "Apr",
    "Data Volume": 3200,
    "Average Price": 43,
  },
  {
    date: "May",
    "Data Volume": 4000,
    "Average Price": 45,
  },
  {
    date: "Jun",
    "Data Volume": 4500,
    "Average Price": 48,
  },
  {
    date: "Jul",
    "Data Volume": 4700,
    "Average Price": 50,
  },
]

export function MarketTrends() {
  return (
    <ChartContainer
      config={{
        "Data Volume": {
          label: "Data Volume",
          color: "hsl(var(--chart-1))",
        },
        "Average Price": {
          label: "Average Price",
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
            dataKey="Data Volume"
            strokeWidth={2}
            activeDot={{
              r: 6,
              className: "fill-primary stroke-background stroke-2",
            }}
            className="stroke-[--color-Data\\ Volume]"
          />
          <Line
            type="monotone"
            dataKey="Average Price"
            strokeWidth={2}
            activeDot={{
              r: 6,
              className: "fill-primary stroke-background stroke-2",
            }}
            className="stroke-[--color-Average\\ Price]"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
