import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BellRing, Mail, MessageSquare, Edit, Copy, Trash2, Plus } from "lucide-react"

const templates = [
  {
    id: "1",
    title: "Welcome Message",
    description: "Sent to new users upon registration",
    type: "in-app",
    lastUsed: "2023-07-20",
  },
  {
    id: "2",
    title: "Purchase Confirmation",
    description: "Sent after a successful purchase",
    type: "email",
    lastUsed: "2023-07-18",
  },
  {
    id: "3",
    title: "Listing Approved",
    description: "Notifies sellers when their listing is approved",
    type: "in-app",
    lastUsed: "2023-07-15",
  },
  {
    id: "4",
    title: "Subscription Renewal",
    description: "Reminder about upcoming subscription renewal",
    type: "email",
    lastUsed: "2023-07-10",
  },
  {
    id: "5",
    title: "Payment Received",
    description: "Notification to sellers about received payment",
    type: "sms",
    lastUsed: "2023-07-05",
  },
  {
    id: "6",
    title: "Maintenance Alert",
    description: "Platform maintenance notification",
    type: "in-app",
    lastUsed: "2023-06-30",
  },
]

export function NotificationTemplates() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="flex w-fit items-center gap-1">
                  {template.type === "in-app" && <BellRing className="h-3 w-3" />}
                  {template.type === "email" && <Mail className="h-3 w-3" />}
                  {template.type === "sms" && <MessageSquare className="h-3 w-3" />}
                  <span>{template.type === "in-app" ? "In-App" : template.type === "email" ? "Email" : "SMS"}</span>
                </Badge>
              </div>
              <CardTitle className="mt-2">{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-sm text-muted-foreground">Last used: {template.lastUsed}</div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
        <Card className="flex flex-col items-center justify-center p-6">
          <Button variant="outline" className="w-full h-full flex flex-col gap-4 py-8">
            <Plus className="h-8 w-8" />
            <span>Create New Template</span>
          </Button>
        </Card>
      </div>
    </div>
  )
}
