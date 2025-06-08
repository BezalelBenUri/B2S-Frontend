import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star, UserPlus } from "lucide-react"

const sellers = [
  {
    id: "1",
    name: "DataCorp Inc.",
    specialty: "Financial & Economic Data",
    rating: 4.9,
    datasets: 48,
    avatar: "DC",
  },
  {
    id: "2",
    name: "GeoSpatial Solutions",
    specialty: "Mapping & Location Data",
    rating: 4.8,
    datasets: 36,
    avatar: "GS",
  },
  {
    id: "3",
    name: "HealthData Analytics",
    specialty: "Healthcare & Medical Data",
    rating: 4.7,
    datasets: 29,
    avatar: "HA",
  },
]

export function TopSellers() {
  return (
    <div className="space-y-4">
      {sellers.map((seller) => (
        <div key={seller.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={seller.name} />
              <AvatarFallback>{seller.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <p className="font-medium">{seller.name}</p>
                <div className="ml-2 flex items-center">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="ml-1 text-xs">{seller.rating}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{seller.specialty}</p>
              <p className="text-xs text-muted-foreground">{seller.datasets} datasets available</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Follow
          </Button>
        </div>
      ))}
    </div>
  )
}
