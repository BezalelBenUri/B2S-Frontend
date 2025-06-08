import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubscriptionsList } from "@/components/buyer/subscriptions-list"
import { SubscriptionStats } from "@/components/buyer/subscription-stats"
import { Plus } from "lucide-react"

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Subscriptions</h1>
          <p className="text-muted-foreground">Manage your data subscriptions and renewals.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Browse Subscriptions
        </Button>
      </div>

      <SubscriptionStats />

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Renewals</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>Your current active data subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionsList status="active" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Renewals</CardTitle>
              <CardDescription>Subscriptions that will renew in the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionsList status="upcoming" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expired">
          <Card>
            <CardHeader>
              <CardTitle>Expired Subscriptions</CardTitle>
              <CardDescription>Previously active subscriptions that have expired</CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionsList status="expired" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
