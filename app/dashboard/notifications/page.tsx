import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { NotificationComposer } from "@/components/admin/notification-composer"
import { NotificationHistory } from "@/components/admin/notification-history"
import { NotificationTemplates } from "@/components/admin/notification-templates"
import { BellRing, Settings } from "lucide-react"

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Management</h1>
          <p className="text-muted-foreground">Send and manage platform-wide notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Notification Settings
          </Button>
          <Button size="sm">
            <BellRing className="mr-2 h-4 w-4" />
            Send Notification
          </Button>
        </div>
      </div>

      <Tabs defaultValue="compose" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="compose">
          <Card>
            <CardHeader>
              <CardTitle>Compose Notification</CardTitle>
              <CardDescription>Create and send notifications to users</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationComposer />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>View previously sent notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationHistory />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>Manage reusable notification templates</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationTemplates />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
