"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, BellRing, Mail, MessageSquare, Users, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function NotificationComposer() {
  const [notificationType, setNotificationType] = useState("all")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [date, setDate] = useState<Date>()
  const [showPreview, setShowPreview] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleSend = () => {
    setShowConfirmDialog(true)
  }

  const confirmSend = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowConfirmDialog(false)
      // Reset form
      setTitle("")
      setMessage("")
      setDate(undefined)
      setIsScheduled(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient-type">Recipient Type</Label>
          <Select value={notificationType} onValueChange={setNotificationType}>
            <SelectTrigger id="recipient-type">
              <SelectValue placeholder="Select recipients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="buyers">All Buyers</SelectItem>
              <SelectItem value="sellers">All Sellers</SelectItem>
              <SelectItem value="admins">All Administrators</SelectItem>
              <SelectItem value="inactive">Inactive Users</SelectItem>
              <SelectItem value="custom">Custom Segment</SelectItem>
            </SelectContent>
          </Select>
          {notificationType === "custom" && (
            <div className="mt-2 rounded-md border p-4 bg-muted/50">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Custom segments can be created in the User Management section.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notification-title">Notification Title</Label>
          <Input
            id="notification-title"
            placeholder="Enter notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notification-message">Message</Label>
          <Textarea
            id="notification-message"
            placeholder="Enter notification message"
            className="min-h-[120px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <Tabs defaultValue="in-app" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="in-app">
              <BellRing className="mr-2 h-4 w-4" />
              In-App
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="sms">
              <MessageSquare className="mr-2 h-4 w-4" />
              SMS
            </TabsTrigger>
          </TabsList>
          <TabsContent value="in-app" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="persistent">Persistent Notification</Label>
                <p className="text-sm text-muted-foreground">Notification will remain until dismissed by user</p>
              </div>
              <Switch id="persistent" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="action-required">Action Required</Label>
                <p className="text-sm text-muted-foreground">User must take action to dismiss</p>
              </div>
              <Switch id="action-required" />
            </div>
          </TabsContent>
          <TabsContent value="email" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email-subject">Email Subject</Label>
              <Input id="email-subject" placeholder="Enter email subject" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="include-unsubscribe">Include Unsubscribe Link</Label>
                <p className="text-sm text-muted-foreground">Required for marketing emails</p>
              </div>
              <Switch id="include-unsubscribe" defaultChecked />
            </div>
          </TabsContent>
          <TabsContent value="sms" className="space-y-4 pt-4">
            <div className="rounded-md border p-4 bg-muted/50">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">SMS notifications are limited to 160 characters.</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="include-opt-out">Include Opt-Out Info</Label>
                <p className="text-sm text-muted-foreground">Required by regulations</p>
              </div>
              <Switch id="include-opt-out" defaultChecked />
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="scheduled">Schedule Notification</Label>
            <p className="text-sm text-muted-foreground">Send notification at a specific date and time</p>
          </div>
          <Switch id="scheduled" checked={isScheduled} onCheckedChange={setIsScheduled} />
        </div>

        {isScheduled && (
          <div className="space-y-2">
            <Label>Scheduled Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setShowPreview(true)} disabled={!title || !message}>
          Preview
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Template</Button>
          <Button onClick={handleSend} disabled={!title || !message}>
            {isScheduled ? "Schedule" : "Send Now"}
          </Button>
        </div>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notification Preview</DialogTitle>
            <DialogDescription>This is how your notification will appear to users.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <BellRing className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{title || "Notification Title"}</h4>
                  <p className="mt-1 text-sm">{message || "Notification message will appear here."}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Recipients:{" "}
                {notificationType === "all"
                  ? "All Users"
                  : notificationType === "buyers"
                    ? "All Buyers"
                    : notificationType === "sellers"
                      ? "All Sellers"
                      : notificationType === "admins"
                        ? "All Administrators"
                        : notificationType === "inactive"
                          ? "Inactive Users"
                          : "Custom Segment"}
              </p>
            </div>
            {isScheduled && date && (
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Scheduled for: {format(date, "PPP")}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Notification</DialogTitle>
            <DialogDescription>
              {isScheduled
                ? "Are you sure you want to schedule this notification?"
                : "Are you sure you want to send this notification immediately?"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold">{title}</h4>
              <p className="mt-1 text-sm">{message}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Recipients:{" "}
                {notificationType === "all"
                  ? "All Users"
                  : notificationType === "buyers"
                    ? "All Buyers"
                    : notificationType === "sellers"
                      ? "All Sellers"
                      : notificationType === "admins"
                        ? "All Administrators"
                        : notificationType === "inactive"
                          ? "Inactive Users"
                          : "Custom Segment"}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSend} disabled={isLoading}>
              {isLoading ? "Processing..." : isScheduled ? "Schedule" : "Send Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
