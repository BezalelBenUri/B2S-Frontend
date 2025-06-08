import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, MessageSquare, DollarSign, Upload, UserPlus } from "lucide-react"

const activities = [
  {
    id: "1",
    type: "sale",
    title: "Urban Population Dataset",
    description: "New sale completed",
    time: "2 hours ago",
    icon: ShoppingCart,
  },
  {
    id: "2",
    type: "review",
    title: "Weather Patterns 2022",
    description: "Received a 5-star review",
    time: "5 hours ago",
    icon: Star,
  },
  {
    id: "3",
    type: "message",
    title: "Message from John Smith",
    description: "Regarding the Urban Population Dataset",
    time: "1 day ago",
    icon: MessageSquare,
  },
  {
    id: "4",
    type: "payout",
    title: "Monthly Payout",
    description: "$1,245.50 has been sent to your account",
    time: "2 days ago",
    icon: DollarSign,
  },
  {
    id: "5",
    type: "upload",
    title: "Healthcare Facilities Mapping",
    description: "You uploaded a new dataset",
    time: "3 days ago",
    icon: Upload,
  },
  {
    id: "6",
    type: "subscriber",
    title: "New Subscriber",
    description: "Sarah Wilson subscribed to your datasets",
    time: "1 week ago",
    icon: UserPlus,
  },
]

export function SellerActivity() {
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
