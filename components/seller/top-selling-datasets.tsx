import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const datasets = [
  {
    id: "1",
    name: "Urban Population Dataset",
    category: "Geospatial",
    sales: 42,
    revenue: "$5,040.00",
    growth: 15,
  },
  {
    id: "2",
    name: "Weather Patterns 2022",
    category: "Environmental",
    sales: 38,
    revenue: "$3,249.00",
    growth: 8,
  },
  {
    id: "3",
    name: "Retail Consumer Behavior",
    category: "Retail",
    sales: 27,
    revenue: "$5,399.73",
    growth: 12,
  },
  {
    id: "4",
    name: "Healthcare Facilities Mapping",
    category: "Healthcare",
    sales: 21,
    revenue: "$3,675.00",
    growth: -3,
  },
]

export function TopSellingDatasets() {
  return (
    <div className="space-y-4">
      {datasets.map((dataset) => (
        <div key={dataset.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{dataset.name}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{dataset.category}</Badge>
                <span className="text-xs text-muted-foreground">{dataset.sales} sales</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{dataset.revenue}</p>
              <p className={`text-xs ${dataset.growth >= 0 ? "text-green-500" : "text-red-500"}`}>
                {dataset.growth >= 0 ? "+" : ""}
                {dataset.growth}% growth
              </p>
            </div>
          </div>
          <Progress value={dataset.sales / 0.5} className="h-2" />
        </div>
      ))}
    </div>
  )
}
