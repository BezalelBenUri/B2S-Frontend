"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    date: "Jan",
    Users: 8500,
    Listings: 2200,
    Sales: 15000,
  },
  {
    date: "Feb",
    Users: 8800,
    Listings: 2300,
    Sales: 15500,
  },
  {
    date: "Mar",
    Users: 9100,
    Listings: 2400,
    Sales: 16200,
  },
  {
    date: "Apr",
    Users: 9400,
    Listings: 2500,
    Sales: 16800,
  },
  {
    date: "May",
    Users: 9800,
    Listings: 2650,
    Sales: 17300,
  },
  {
    date: "Jun",
    Users: 10200,
    Listings: 2750,
    Sales: 17800,
  },
  {
    date: "Jul",
    Users: 10500,
    Listings: 2850,
    Sales: 18400,
  },
]

export function PlatformOverview() {
  return (
    <ChartContainer
      config={{
        Users: {
          label: "Total Users",
          color: "hsl(var(--chart-1))",
        },
        Listings: {
          label: "Active Listings",
          color: "hsl(var(--chart-2))",
        },
        Sales: {
          label: "Total Sales",
          color: "hsl(var(--chart-3))",
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
            dataKey="Users"
            strokeWidth={2}
            activeDot={{
              r: 6,
              className: "fill-primary stroke-background stroke-2",
            }}
            className="stroke-[--color-Users]"
          />
          <Line
            type="monotone"
            dataKey="Listings"
            strokeWidth={2}
            activeDot={{
              r: 6,
              className: "fill-primary stroke-background stroke-2",
            }}
            className="stroke-[--color-Listings]"
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
