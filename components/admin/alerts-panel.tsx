import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Flag, ShieldAlert, Ban, Eye } from "lucide-react"

const alerts = [
  {
    id: "1",
    title: "Suspicious Login Activity",
    description: "Multiple failed login attempts detected for user account ID #8452",
    severity: "high",
    time: "2 hours ago",
    icon: ShieldAlert,
  },
  {
    id: "2",
    title: "Content Reported",
    description: "Dataset 'Consumer Financial Data 2023' has been reported 5 times for potential privacy violations",
    severity: "high",
    time: "5 hours ago",
    icon: Flag,
  },
  {
    id: "3",
    title: "Payment Processing Issue",
    description: "Payment gateway experiencing intermittent failures, affecting 3% of transactions",
    severity: "medium",
    time: "1 day ago",
    icon: AlertTriangle,
  },
  {
    id: "4",
    title: "User Account Flagged",
    description: "Seller account 'DataMetrics' has been flagged for unusual activity patterns",
    severity: "medium",
    time: "2 days ago",
    icon: Ban,
  },
  {
    id: "5",
    title: "System Performance Alert",
    description: "Database query performance degradation detected in marketplace search functionality",
    severity: "low",
    time: "3 days ago",
    icon: AlertTriangle,
  },
]

export function AlertsPanel() {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card
          key={alert.id}
          className={`border-l-4 ${
            alert.severity === "high"
              ? "border-l-destructive"
              : alert.severity === "medium"
                ? "border-l-orange-500"
                : "border-l-yellow-500"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-full p-2 ${
                    alert.severity === "high"
                      ? "bg-destructive/10 text-destructive"
                      : alert.severity === "medium"
                        ? "bg-orange-500/10 text-orange-500"
                        : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  <alert.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-semibold">{alert.title}</h4>
                    <Badge
                      variant={
                        alert.severity === "high"
                          ? "destructive"
                          : alert.severity === "medium"
                            ? "outline"
                            : "secondary"
                      }
                      className="ml-2"
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm">{alert.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="pt-2">
        <Button variant="outline" className="w-full">
          View All Alerts
        </Button>
      </div>
    </div>
  )
}
