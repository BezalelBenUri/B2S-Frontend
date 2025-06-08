import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, ExternalLink } from "lucide-react"

export function SavedDatasetsList() {
  // Sample data - in a real app, this would come from an API
  const savedDatasets = [
    {
      id: "1",
      name: "Global Economic Indicators",
      description: "Comprehensive economic data from 190+ countries",
      category: "Financial",
      price: "$149.99",
      savedDate: "2023-03-20",
      rating: 4.8,
      reviews: 124,
      seller: {
        name: "FinData Solutions",
        avatar: "FD",
      },
    },
    {
      id: "2",
      name: "Urban Transportation Patterns",
      description: "Traffic and public transport data from major cities",
      category: "Geospatial",
      price: "$99.99",
      savedDate: "2023-03-15",
      rating: 4.6,
      reviews: 87,
      seller: {
        name: "CityData Inc.",
        avatar: "CI",
      },
    },
    {
      id: "3",
      name: "Healthcare Facilities Mapping",
      description: "Detailed mapping of healthcare facilities worldwide",
      category: "Healthcare",
      price: "$199.99",
      savedDate: "2023-03-10",
      rating: 4.9,
      reviews: 156,
      seller: {
        name: "HealthData Analytics",
        avatar: "HA",
      },
    },
    {
      id: "4",
      name: "Consumer Spending Trends",
      description: "Retail and e-commerce spending patterns by demographics",
      category: "Retail",
      price: "$129.99",
      savedDate: "2023-03-05",
      rating: 4.7,
      reviews: 92,
      seller: {
        name: "MarketInsights",
        avatar: "MI",
      },
    },
    {
      id: "5",
      name: "Climate Change Indicators",
      description: "Long-term climate data with trend analysis",
      category: "Environmental",
      price: "$179.99",
      savedDate: "2023-03-01",
      rating: 4.8,
      reviews: 108,
      seller: {
        name: "ClimateData",
        avatar: "CD",
      },
    },
    {
      id: "6",
      name: "Global Supply Chain Network",
      description: "Mapping of global supply chains and logistics networks",
      category: "Transportation",
      price: "$249.99",
      savedDate: "2023-02-25",
      rating: 4.5,
      reviews: 76,
      seller: {
        name: "LogisticsData",
        avatar: "LD",
      },
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {savedDatasets.map((dataset) => (
        <Card key={dataset.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <Badge>{dataset.category}</Badge>
              <Button variant="ghost" size="icon" className="text-primary">
                <Heart className="h-4 w-4 fill-primary" />
              </Button>
            </div>
            <CardTitle className="mt-2">{dataset.name}</CardTitle>
            <CardDescription className="line-clamp-2">{dataset.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={dataset.seller.name} />
                  <AvatarFallback>{dataset.seller.avatar}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{dataset.seller.name}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                <span className="text-sm">{dataset.rating}</span>
                <span className="text-xs text-muted-foreground ml-1">({dataset.reviews})</span>
              </div>
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">{dataset.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saved:</span>
                <span>{new Date(dataset.savedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-muted/50 p-3">
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Details
            </Button>
            <Button size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Purchase
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
