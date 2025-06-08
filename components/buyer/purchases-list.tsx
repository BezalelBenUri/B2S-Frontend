import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Star } from "lucide-react"

interface PurchasesListProps {
  type?: "one-time" | "subscription" | "all"
}

export function PurchasesList({ type = "all" }: PurchasesListProps) {
  // Sample data - in a real app, this would come from an API
  const purchases = [
    {
      id: "1",
      name: "Urban Population Dataset",
      description: "Comprehensive population data for major urban centers worldwide",
      category: "Geospatial",
      price: "$120.00",
      purchaseDate: "2023-03-15",
      type: "one-time",
      seller: {
        name: "DataCorp Inc.",
        avatar: "DC",
      },
      rating: 4.8,
    },
    {
      id: "2",
      name: "Weather Patterns 2022",
      description: "Historical weather data with predictive models",
      category: "Environmental",
      price: "$85.50",
      purchaseDate: "2023-02-28",
      type: "subscription",
      nextRenewal: "2023-04-28",
      seller: {
        name: "ClimateData",
        avatar: "CD",
      },
      rating: 4.6,
    },
    {
      id: "3",
      name: "Retail Consumer Behavior",
      description: "Shopping patterns and consumer preferences analysis",
      category: "Retail",
      price: "$199.99",
      purchaseDate: "2023-02-14",
      type: "one-time",
      seller: {
        name: "MarketInsights",
        avatar: "MI",
      },
      rating: 4.9,
    },
    {
      id: "4",
      name: "Global Financial Markets",
      description: "Real-time and historical financial data from global markets",
      category: "Financial",
      price: "$249.99/month",
      purchaseDate: "2023-01-10",
      type: "subscription",
      nextRenewal: "2023-04-10",
      seller: {
        name: "FinData Solutions",
        avatar: "FD",
      },
      rating: 4.7,
    },
    {
      id: "5",
      name: "Healthcare Facilities Mapping",
      description: "Comprehensive database of healthcare facilities with analytics",
      category: "Healthcare",
      price: "$175.00",
      purchaseDate: "2023-01-05",
      type: "one-time",
      seller: {
        name: "HealthData Analytics",
        avatar: "HA",
      },
      rating: 4.5,
    },
  ]

  const filteredPurchases = type === "all" ? purchases : purchases.filter((purchase) => purchase.type === type)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredPurchases.map((purchase) => (
        <Card key={purchase.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <Badge>{purchase.category}</Badge>
              <Badge variant={purchase.type === "subscription" ? "default" : "outline"}>
                {purchase.type === "subscription" ? "Subscription" : "One-time"}
              </Badge>
            </div>
            <CardTitle className="mt-2">{purchase.name}</CardTitle>
            <CardDescription className="line-clamp-2">{purchase.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={purchase.seller.name} />
                  <AvatarFallback>{purchase.seller.avatar}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{purchase.seller.name}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                <span className="text-sm">{purchase.rating}</span>
              </div>
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">{purchase.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchased:</span>
                <span>{new Date(purchase.purchaseDate).toLocaleDateString()}</span>
              </div>
              {purchase.type === "subscription" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Renewal:</span>
                  <span>{new Date(purchase.nextRenewal!).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-muted/50 p-3">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Details
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
