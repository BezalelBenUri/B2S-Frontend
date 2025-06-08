import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContentModerationQueue } from "@/components/admin/content-moderation-queue"
import { ModerationStats } from "@/components/admin/moderation-stats"
import { Filter, Download, Settings } from "lucide-react"

export default function ContentModerationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Moderation</h1>
          <p className="text-muted-foreground">Review and moderate platform content</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Moderation Settings
          </Button>
        </div>
      </div>

      <ModerationStats />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <Input placeholder="Search content by title, ID, or keywords..." className="w-full" />
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Content</SelectItem>
                <SelectItem value="listings">Listings</SelectItem>
                <SelectItem value="reviews">Reviews</SelectItem>
                <SelectItem value="messages">Messages</SelectItem>
                <SelectItem value="profiles">User Profiles</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="high">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="queue" className="space-y-4">
          <TabsList>
            <TabsTrigger value="queue">Moderation Queue</TabsTrigger>
            <TabsTrigger value="reported">Reported Content</TabsTrigger>
            <TabsTrigger value="flagged">Auto-Flagged</TabsTrigger>
            <TabsTrigger value="history">Moderation History</TabsTrigger>
          </TabsList>
          <TabsContent value="queue">
            <Card>
              <CardHeader>
                <CardTitle>Moderation Queue</CardTitle>
                <CardDescription>Content awaiting review</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentModerationQueue filter="queue" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reported">
            <Card>
              <CardHeader>
                <CardTitle>Reported Content</CardTitle>
                <CardDescription>Content reported by users</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentModerationQueue filter="reported" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="flagged">
            <Card>
              <CardHeader>
                <CardTitle>Auto-Flagged Content</CardTitle>
                <CardDescription>Content flagged by automated systems</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentModerationQueue filter="flagged" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Moderation History</CardTitle>
                <CardDescription>Previously moderated content</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentModerationQueue filter="history" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
