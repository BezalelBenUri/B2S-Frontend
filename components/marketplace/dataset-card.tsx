import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, BookmarkPlus } from "lucide-react"

interface Dataset {
  id: string
  title: string
  description: string
  category: string
  price: number
  rating: string
  reviews: number
  seller: {
    name: string
    rating: string
  }
}

interface DatasetCardProps {
  dataset: Dataset
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge>{dataset.category}</Badge>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary mr-1" />
              <span className="text-sm">{dataset.rating}</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">{dataset.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{dataset.description}</p>
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-muted-foreground">Seller: </span>
              <span className="font-medium">{dataset.seller.name}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{dataset.reviews} reviews</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-muted/50 p-4 mt-2">
          <span className="text-xl font-bold">${dataset.price}</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <BookmarkPlus className="h-4 w-4" />
            </Button>
            <Button>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Purchase
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
