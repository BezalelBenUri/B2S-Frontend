"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", Revenue: 25000, Fees: 5000 },
  { month: "Feb", Revenue: 27500, Fees: 5500 },
  { month: "Mar", Revenue: 30000, Fees: 6000 },
  { month: "Apr", Revenue: 32500, Fees: 6500 },
  { month: "May", Revenue: 35000, Fees: 7000 },
  { month: "Jun", Revenue: 37500, Fees: 7500 },
  { month: "Jul", Revenue: 40000, Fees: 8000 },
]

export function RevenueChart() {
  return (
    <ChartContainer
      config={{
        Revenue: {
          label: "Total Revenue ($)",
          color: "hsl(var(--primary))",
        },
        Fees: {
          label: "Platform Fees ($)",
          color: "hsl(var(--secondary))",
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
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} className="text-sm" />
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
            dataKey="Fees"
            strokeWidth={2}
            activeDot={{
              r: 6,
              className: "fill-primary stroke-background stroke-2",
            }}
            className="stroke-[--color-Fees]"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
