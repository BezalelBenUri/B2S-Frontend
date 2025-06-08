import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertCircle, Calendar, CreditCard, Download, MoreHorizontal, RefreshCw, XCircle } from "lucide-react"

interface SubscriptionsListProps {
  status: "active" | "upcoming" | "expired"
}

export function SubscriptionsList({ status }: SubscriptionsListProps) {
  // Sample data - in a real app, this would come from an API
  const subscriptions = [
    {
      id: "1",
      name: "Global Financial Markets",
      description: "Real-time and historical financial data from global markets",
      category: "Financial",
      price: "$249.99/month",
      startDate: "2023-01-10",
      nextRenewal: "2023-04-10",
      status: "active",
      seller: {
        name: "FinData Solutions",
        avatar: "FD",
      },
    },
    {
      id: "2",
      name: "Weather Patterns",
      description: "Historical weather data with predictive models",
      category: "Environmental",
      price: "$85.50/month",
      startDate: "2023-02-28",
      nextRenewal: "2023-04-28",
      status: "active",
      seller: {
        name: "ClimateData",
        avatar: "CD",
      },
    },
    {
      id: "3",
      name: "Urban Transportation Analytics",
      description: "Real-time traffic and public transport data from major cities",
      category: "Transportation",
      price: "$129.99/month",
      startDate: "2023-03-15",
      nextRenewal: "2023-04-15",
      status: "active",
      seller: {
        name: "CityData Inc.",
        avatar: "CI",
      },
    },
    {
      id: "4",
      name: "Consumer Behavior Trends",
      description: "Monthly reports on consumer spending and behavior patterns",
      category: "Retail",
      price: "$199.99/month",
      startDate: "2022-10-05",
      nextRenewal: "2023-01-05",
      status: "expired",
      seller: {
        name: "MarketInsights",
        avatar: "MI",
      },
    },
  ]

  // Filter subscriptions based on status
  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (status === "active") return sub.status === "active"
    if (status === "expired") return sub.status === "expired"
    if (status === "upcoming") {
      // Consider "upcoming" as active subscriptions with renewal in the next 30 days
      const now = new Date()
      const renewalDate = new Date(sub.nextRenewal)
      const daysDiff = Math.ceil((renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return sub.status === "active" && daysDiff <= 30
    }
    return false
  })

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {filteredSubscriptions.map((subscription) => (
        <Card key={subscription.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <Badge>{subscription.category}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download Latest
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    View History
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel Subscription
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardTitle className="mt-2">{subscription.name}</CardTitle>
            <CardDescription className="line-clamp-2">{subscription.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={subscription.seller.name} />
                <AvatarFallback>{subscription.seller.avatar}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{subscription.seller.name}</span>
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">{subscription.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Started:</span>
                <span>{new Date(subscription.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {subscription.status === "expired" ? "Expired:" : "Next Renewal:"}
                </span>
                <span className={subscription.status === "expired" ? "text-destructive" : ""}>
                  {new Date(subscription.nextRenewal).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-muted/50 p-3">
            {subscription.status === "active" ? (
              <>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Renew
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  History
                </Button>
                <Button size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reactivate
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ))}
      {filteredSubscriptions.length === 0 && (
        <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
          {status === "active" ? (
            <>
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Active Subscriptions</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                You don't have any active subscriptions. Browse the marketplace to find data subscriptions.
              </p>
              <Button className="mt-6">Browse Subscriptions</Button>
            </>
          ) : status === "upcoming" ? (
            <>
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Upcoming Renewals</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                You don't have any subscriptions renewing in the next 30 days.
              </p>
            </>
          ) : (
            <>
              <XCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Expired Subscriptions</h3>
              <p className="text-muted-foreground mt-2 max-w-md">You don't have any expired subscriptions.</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
