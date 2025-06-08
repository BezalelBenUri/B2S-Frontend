import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Clock, Heart, Star, MessageSquare, Download } from "lucide-react"

const activities = [
  {
    id: "1",
    type: "purchase",
    title: "Urban Population Dataset",
    description: "You purchased a new dataset",
    time: "2 hours ago",
    icon: ShoppingCart,
  },
  {
    id: "2",
    type: "subscription",
    title: "Financial Markets Data",
    description: "Your subscription was renewed",
    time: "Yesterday",
    icon: Clock,
  },
  {
    id: "3",
    type: "saved",
    title: "Global Climate Patterns",
    description: "You saved a dataset to your favorites",
    time: "2 days ago",
    icon: Heart,
  },
  {
    id: "4",
    type: "review",
    title: "Healthcare Facilities Mapping",
    description: "You left a 5-star review",
    time: "3 days ago",
    icon: Star,
  },
  {
    id: "5",
    type: "message",
    title: "Message from DataCorp Inc.",
    description: "Regarding your inquiry about the dataset",
    time: "4 days ago",
    icon: MessageSquare,
  },
  {
    id: "6",
    type: "download",
    title: "Retail Consumer Behavior",
    description: "You downloaded the dataset",
    time: "1 week ago",
    icon: Download,
  },
]

export function BuyerActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <activity.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-2 h-full w-px bg-border" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="font-medium">{activity.title}</p>
              <Badge variant="outline" className="ml-2">
                {activity.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
