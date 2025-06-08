import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BellRing, Mail, MessageSquare, Eye, Copy } from "lucide-react"

const notifications = [
  {
    id: "1",
    title: "Platform Maintenance Notice",
    recipients: "All Users",
    type: "in-app",
    status: "sent",
    sentDate: "2023-07-20 14:30",
    openRate: "78%",
  },
  {
    id: "2",
    title: "New Feature Announcement",
    recipients: "All Users",
    type: "email",
    status: "sent",
    sentDate: "2023-07-15 10:15",
    openRate: "65%",
  },
  {
    id: "3",
    title: "Important Security Update",
    recipients: "All Users",
    type: "in-app",
    status: "sent",
    sentDate: "2023-07-10 09:45",
    openRate: "92%",
  },
  {
    id: "4",
    title: "Marketplace Promotion",
    recipients: "Buyers",
    type: "email",
    status: "sent",
    sentDate: "2023-07-05 16:20",
    openRate: "58%",
  },
  {
    id: "5",
    title: "Seller Guidelines Update",
    recipients: "Sellers",
    type: "in-app",
    status: "scheduled",
    sentDate: "2023-07-25 08:00",
    openRate: "N/A",
  },
  {
    id: "6",
    title: "Payment Processing Update",
    recipients: "Sellers",
    type: "sms",
    status: "sent",
    sentDate: "2023-07-01 11:30",
    openRate: "95%",
  },
  {
    id: "7",
    title: "Admin Panel Updates",
    recipients: "Admins",
    type: "email",
    status: "draft",
    sentDate: "N/A",
    openRate: "N/A",
  },
]

export function NotificationHistory() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Recipients</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sent Date</TableHead>
            <TableHead>Open Rate</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell className="font-medium">{notification.title}</TableCell>
              <TableCell>{notification.recipients}</TableCell>
              <TableCell>
                <Badge variant="outline" className="flex w-fit items-center gap-1">
                  {notification.type === "in-app" && <BellRing className="h-3 w-3" />}
                  {notification.type === "email" && <Mail className="h-3 w-3" />}
                  {notification.type === "sms" && <MessageSquare className="h-3 w-3" />}
                  <span>
                    {notification.type === "in-app" ? "In-App" : notification.type === "email" ? "Email" : "SMS"}
                  </span>
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    notification.status === "sent"
                      ? "outline"
                      : notification.status === "scheduled"
                        ? "secondary"
                        : "default"
                  }
                >
                  {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{notification.sentDate}</TableCell>
              <TableCell>{notification.openRate}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
