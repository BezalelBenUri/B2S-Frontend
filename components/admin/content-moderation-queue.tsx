"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Flag,
  MessageSquare,
  Eye,
  ShieldAlert,
  User,
  Database,
  Star,
  Plus,
} from "lucide-react"

interface ContentModerationQueueProps {
  filter: "queue" | "reported" | "flagged" | "history"
}

export function ContentModerationQueue({ filter }: ContentModerationQueueProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [viewItem, setViewItem] = useState<any | null>(null)

  // Sample data - in a real app, this would come from an API
  const items = [
    {
      id: "1",
      type: "listing",
      title: "Consumer Financial Data 2023",
      content:
        "Comprehensive financial data including personal identifiable information and credit scores for over 10,000 consumers.",
      reportReason: "Privacy concerns, may contain PII",
      submittedBy: {
        name: "DataMetrics",
        avatar: "DM",
      },
      dateSubmitted: "2023-07-20",
      status: "flagged",
      priority: "high",
      reports: 5,
    },
    {
      id: "2",
      type: "review",
      title: "Review for Urban Population Dataset",
      content:
        "This dataset is completely useless and contains fabricated information. The seller is clearly a scammer and should be banned from the platform.",
      reportReason: "Abusive language",
      submittedBy: {
        name: "John Smith",
        avatar: "JS",
      },
      dateSubmitted: "2023-07-19",
      status: "reported",
      priority: "medium",
      reports: 2,
    },
    {
      id: "3",
      type: "message",
      title: "Message to HealthData Analytics",
      content:
        "I'm interested in purchasing your healthcare dataset, but I need to know if it contains patient identifiers that could be used for targeted marketing.",
      reportReason: "Potential illegal intent",
      submittedBy: {
        name: "Michael Brown",
        avatar: "MB",
      },
      dateSubmitted: "2023-07-18",
      status: "queue",
      priority: "low",
      reports: 1,
    },
    {
      id: "4",
      type: "listing",
      title: "Hacked Database Collection",
      content:
        "Collection of databases obtained from various sources. Contains usernames, passwords, and other sensitive information.",
      reportReason: "Illegal content",
      submittedBy: {
        name: "AnonymousUser",
        avatar: "AU",
      },
      dateSubmitted: "2023-07-17",
      status: "flagged",
      priority: "high",
      reports: 8,
    },
    {
      id: "5",
      type: "profile",
      title: "User Profile: DataHacker123",
      content: "Profile description contains references to selling illegally obtained data and hacking services.",
      reportReason: "Illegal services",
      submittedBy: {
        name: "System",
        avatar: "SY",
      },
      dateSubmitted: "2023-07-16",
      status: "flagged",
      priority: "high",
      reports: 3,
    },
    {
      id: "6",
      type: "listing",
      title: "Global Economic Indicators",
      content: "Comprehensive economic data from 190+ countries with historical trends and forecasts.",
      reportReason: "N/A",
      submittedBy: {
        name: "FinData Solutions",
        avatar: "FD",
      },
      dateSubmitted: "2023-07-15",
      status: "queue",
      priority: "medium",
      reports: 0,
    },
  ]

  // Filter items based on the selected filter
  const filteredItems = items.filter((item) => {
    if (filter === "queue") return item.status === "queue"
    if (filter === "reported") return item.status === "reported"
    if (filter === "flagged") return item.status === "flagged"
    if (filter === "history") return true // In a real app, this would show moderated items
    return true
  })

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item.id))
    }
  }

  const toggleSelectItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId))
    } else {
      setSelectedItems([...selectedItems, itemId])
    }
  }

  const handleViewItem = (item: any) => {
    setViewItem(item)
  }

  const getItemIcon = (type: string) => {
    switch (type) {
      case "listing":
        return <Database className="h-5 w-5" />
      case "review":
        return <Star className="h-5 w-5" />
      case "message":
        return <MessageSquare className="h-5 w-5" />
      case "profile":
        return <User className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
            onCheckedChange={toggleSelectAll}
          />
          <label
            htmlFor="select-all"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select All
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={selectedItems.length === 0} onClick={() => {}}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve Selected
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            disabled={selectedItems.length === 0}
            onClick={() => setShowRejectDialog(true)}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject Selected
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className={`border-l-4 ${
              item.priority === "high"
                ? "border-l-destructive"
                : item.priority === "medium"
                  ? "border-l-orange-500"
                  : "border-l-yellow-500"
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`select-${item.id}`}
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleSelectItem(item.id)}
                  />
                  <Badge variant="outline" className="capitalize">
                    {item.type}
                  </Badge>
                  {item.reports > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Flag className="h-3 w-3" />
                      {item.reports} {item.reports === 1 ? "report" : "reports"}
                    </Badge>
                  )}
                  <Badge
                    variant={
                      item.priority === "high" ? "destructive" : item.priority === "medium" ? "outline" : "secondary"
                    }
                  >
                    {item.priority} priority
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleViewItem(item)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
              </div>
              <CardTitle className="text-base mt-2">{item.title}</CardTitle>
              <CardDescription>
                Submitted by {item.submittedBy.name} on {item.dateSubmitted}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm line-clamp-2">{item.content}</p>
              {item.reportReason !== "N/A" && (
                <div className="mt-2 rounded-md border border-destructive/20 bg-destructive/10 p-2 text-sm">
                  <span className="font-semibold">Report reason:</span> {item.reportReason}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:bg-destructive/10"
                onClick={() => {
                  setRejectionReason("")
                  setShowRejectDialog(true)
                }}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShieldAlert className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No Items Found</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              There are no items in the moderation queue matching your current filter criteria.
            </p>
          </div>
        )}
      </div>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Content</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this content. This information will be sent to the content
              submitter.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex items-center gap-4 rounded-lg border p-4 mt-4">
              <ShieldAlert className="h-10 w-10 text-destructive" />
              <div>
                <h4 className="font-medium">This is an administrative action</h4>
                <p className="text-sm text-muted-foreground">
                  This action will be logged and visible to other administrators.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Handle rejection logic here
                setShowRejectDialog(false)
                setSelectedItems([])
                setRejectionReason("")
              }}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {viewItem && (
        <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                {getItemIcon(viewItem.type)}
                <DialogTitle>{viewItem.title}</DialogTitle>
              </div>
              <DialogDescription>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={viewItem.submittedBy.name} />
                    <AvatarFallback>{viewItem.submittedBy.avatar}</AvatarFallback>
                  </Avatar>
                  <span>
                    Submitted by {viewItem.submittedBy.name} on {viewItem.dateSubmitted}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="reports">Reports ({viewItem.reports})</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4 pt-4">
                  <div className="rounded-md border p-4">
                    <p>{viewItem.content}</p>
                  </div>
                  {viewItem.reportReason !== "N/A" && (
                    <div className="rounded-md border border-destructive/20 bg-destructive/10 p-4">
                      <h4 className="font-semibold">Report Reason</h4>
                      <p className="mt-1">{viewItem.reportReason}</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="reports" className="space-y-4 pt-4">
                  {viewItem.reports > 0 ? (
                    <div className="space-y-4">
                      {Array.from({ length: viewItem.reports }).map((_, i) => (
                        <div key={i} className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt="Reporter" />
                                <AvatarFallback>U{i + 1}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">User{i + 1}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(new Date().setDate(new Date().getDate() - i)).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="mt-2 text-sm">
                            {i === 0
                              ? viewItem.reportReason
                              : "Similar concerns about content violating platform policies."}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Flag className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No reports for this content</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="history" className="space-y-4 pt-4">
                  <div className="rounded-md border p-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                          <Plus className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Content submitted</p>
                          <p className="text-xs text-muted-foreground">{viewItem.dateSubmitted}</p>
                        </div>
                      </div>
                      {viewItem.reports > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                            <Flag className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">First report received</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(
                                new Date(viewItem.dateSubmitted).setDate(
                                  new Date(viewItem.dateSubmitted).getDate() + 1,
                                ),
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                      {viewItem.status === "flagged" && (
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-700">
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Flagged by system</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(
                                new Date(viewItem.dateSubmitted).setDate(
                                  new Date(viewItem.dateSubmitted).getDate() + 2,
                                ),
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setViewItem(null)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button variant="destructive">
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
