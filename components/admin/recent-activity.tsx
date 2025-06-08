import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const activities = [
  {
    id: "1",
    user: {
      name: "John Smith",
      avatar: "JS",
    },
    action: "purchased",
    target: "Urban Population Dataset",
    time: "2 hours ago",
    type: "purchase",
  },
  {
    id: "2",
    user: {
      name: "DataCorp Inc.",
      avatar: "DC",
    },
    action: "uploaded",
    target: "Global Economic Indicators",
    time: "5 hours ago",
    type: "upload",
  },
  {
    id: "3",
    user: {
      name: "Emily Johnson",
      avatar: "EJ",
    },
    action: "registered",
    target: "as a new buyer",
    time: "1 day ago",
    type: "registration",
  },
  {
    id: "4",
    user: {
      name: "Michael Brown",
      avatar: "MB",
    },
    action: "reported",
    target: "Healthcare Facilities Mapping",
    time: "2 days ago",
    type: "report",
  },
  {
    id: "5",
    user: {
      name: "System",
      avatar: "SY",
    },
    action: "flagged",
    target: "Suspicious login attempt",
    time: "3 days ago",
    type: "system",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={activity.user.name} />
              <AvatarFallback>{activity.user.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
          <div>
            <Badge
              variant={
                activity.type === "report" || activity.type === "system"
                  ? "destructive"
                  : activity.type === "purchase"
                    ? "default"
                    : "outline"
              }
            >
              {activity.type}
            </Badge>
          </div>
        </div>
      ))}
      <div className="pt-2">
        <Button variant="outline" className="w-full">
          View All Activity
        </Button>
      </div>
    </div>
  )
}
