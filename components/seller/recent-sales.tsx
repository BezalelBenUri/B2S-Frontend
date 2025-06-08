import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const sales = [
  {
    id: "1",
    buyer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "JS",
    },
    dataset: "Urban Population Dataset",
    amount: "$120.00",
    status: "completed",
    date: "2 hours ago",
  },
  {
    id: "2",
    buyer: {
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      avatar: "EJ",
    },
    dataset: "Weather Patterns 2022",
    amount: "$85.50",
    status: "completed",
    date: "5 hours ago",
  },
  {
    id: "3",
    buyer: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "MB",
    },
    dataset: "Retail Consumer Behavior",
    amount: "$199.99",
    status: "processing",
    date: "1 day ago",
  },
  {
    id: "4",
    buyer: {
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      avatar: "SW",
    },
    dataset: "Healthcare Facilities Mapping",
    amount: "$175.00",
    status: "completed",
    date: "2 days ago",
  },
]

export function RecentSales() {
  return (
    <div className="space-y-4">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={sale.buyer.name} />
              <AvatarFallback>{sale.buyer.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{sale.buyer.name}</p>
              <p className="text-xs text-muted-foreground">{sale.dataset}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-medium">{sale.amount}</span>
            <Badge variant={sale.status === "completed" ? "outline" : "secondary"} className="mt-1">
              {sale.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
