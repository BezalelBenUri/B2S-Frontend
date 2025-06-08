"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", Buyers: 85, Sellers: 35 },
  { month: "Feb", Buyers: 92, Sellers: 38 },
  { month: "Mar", Buyers: 105, Sellers: 42 },
  { month: "Apr", Buyers: 120, Sellers: 45 },
  { month: "May", Buyers: 135, Sellers: 48 },
  { month: "Jun", Buyers: 148, Sellers: 52 },
  { month: "Jul", Buyers: 162, Sellers: 56 },
]

export function UserGrowthChart() {
  return (
    <ChartContainer
      config={{
        Buyers: {
          label: "New Buyers",
          color: "hsl(var(--primary))",
        },
        Sellers: {
          label: "New Sellers",
          color: "hsl(var(--secondary))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="Buyers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Sellers" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
