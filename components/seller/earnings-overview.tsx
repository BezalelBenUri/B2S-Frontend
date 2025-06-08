"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const monthlyData = [
  { name: "Jan", earnings: 1200 },
  { name: "Feb", earnings: 1800 },
  { name: "Mar", earnings: 2400 },
  { name: "Apr", earnings: 2100 },
  { name: "May", earnings: 2800 },
  { name: "Jun", earnings: 3200 },
  { name: "Jul", earnings: 3800 },
]

const yearlyData = [
  { name: "2020", earnings: 12000 },
  { name: "2021", earnings: 18000 },
  { name: "2022", earnings: 24000 },
  { name: "2023", earnings: 32000 },
]

export function EarningsOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,245.65</div>
            <p className="text-xs text-muted-foreground">Available for payout</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,890.00</div>
            <p className="text-xs text-muted-foreground">Will be available in 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lifetime Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,890.75</div>
            <p className="text-xs text-muted-foreground">Since you joined</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">
            Last payout: <span className="font-medium">$1,245.50</span> on July 1, 2023
          </div>
        </div>
        <TabsContent value="monthly" className="mt-4">
          <ChartContainer
            config={{
              earnings: {
                label: "Earnings ($)",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="earnings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>
        <TabsContent value="yearly" className="mt-4">
          <ChartContainer
            config={{
              earnings: {
                label: "Earnings ($)",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="earnings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Earning Datasets</CardTitle>
            <CardDescription>Your best performing datasets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Urban Population Dataset", earnings: "$5,040.00" },
                { name: "Retail Consumer Behavior", earnings: "$5,399.73" },
                { name: "Weather Patterns 2022", earnings: "$3,249.00" },
              ].map((dataset, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="font-medium">{dataset.name}</span>
                  <span>{dataset.earnings}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Earnings by Category</CardTitle>
            <CardDescription>Revenue breakdown by data category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Geospatial", earnings: "$8,240.00", percentage: "35%" },
                { category: "Retail", earnings: "$6,120.50", percentage: "26%" },
                { category: "Environmental", earnings: "$4,890.25", percentage: "21%" },
                { category: "Healthcare", earnings: "$4,200.00", percentage: "18%" },
              ].map((category, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="font-medium">{category.category}</span>
                  <div className="text-right">
                    <div>{category.earnings}</div>
                    <div className="text-xs text-muted-foreground">{category.percentage}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
