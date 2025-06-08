import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart } from "lucide-react"

const datasets = [
  {
    id: "1",
    name: "Global Economic Indicators",
    description: "Comprehensive economic data from 190+ countries",
    category: "Financial",
    price: "$149.99",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Urban Transportation Patterns",
    description: "Traffic and public transport data from major cities",
    category: "Geospatial",
    price: "$99.99",
    rating: 4.6,
    reviews: 87,
  },
  {
    id: "3",
    name: "Healthcare Facilities Mapping",
    description: "Detailed mapping of healthcare facilities worldwide",
    category: "Healthcare",
    price: "$199.99",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "4",
    name: "Consumer Spending Trends",
    description: "Retail and e-commerce spending patterns by demographics",
    category: "Retail",
    price: "$129.99",
    rating: 4.7,
    reviews: 92,
  },
]

interface RecommendedDatasetsProps {
  limit?: number
}

export function RecommendedDatasets({ limit }: RecommendedDatasetsProps) {
  const displayDatasets = limit ? datasets.slice(0, limit) : datasets

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {displayDatasets.map((dataset) => (
        <Card key={dataset.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Badge className="mb-2">{dataset.category}</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="font-semibold">{dataset.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{dataset.description}</p>
              <div className="flex items-center mt-2 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span>{dataset.rating}</span>
                </div>
                <span className="text-muted-foreground mx-2">•</span>
                <span className="text-muted-foreground">{dataset.reviews} reviews</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-muted/50 p-4 mt-2">
              <span className="font-bold">{dataset.price}</span>
              <Button size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
