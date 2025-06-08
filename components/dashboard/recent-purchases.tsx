import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const purchases = [
  {
    id: "1",
    name: "Urban Population Dataset",
    seller: "DataCorp Inc.",
    date: "2023-03-15",
    price: "$120.00",
    avatar: "DC",
  },
  {
    id: "2",
    name: "Weather Patterns 2022",
    seller: "ClimateData",
    date: "2023-02-28",
    price: "$85.50",
    avatar: "CD",
  },
  {
    id: "3",
    name: "Retail Consumer Behavior",
    seller: "MarketInsights",
    date: "2023-02-14",
    price: "$199.99",
    avatar: "MI",
  },
]

export function RecentPurchases() {
  return (
    <div className="space-y-4">
      {purchases.map((purchase) => (
        <div key={purchase.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={purchase.seller} />
              <AvatarFallback>{purchase.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{purchase.name}</p>
              <p className="text-xs text-muted-foreground">
                {purchase.seller} • {purchase.date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{purchase.price}</span>
            <Button variant="ghost" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
