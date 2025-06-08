import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ReviewsList } from "@/components/seller/reviews-list"
import { ReviewStats } from "@/components/seller/review-stats"
import { Filter } from "lucide-react"

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
          <p className="text-muted-foreground">Manage and respond to reviews from your customers.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <ReviewStats />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="neutral">Neutral</TabsTrigger>
          <TabsTrigger value="negative">Negative</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Reviews</CardTitle>
              <CardDescription>Reviews across all your datasets</CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewsList filter="all" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="positive">
          <Card>
            <CardHeader>
              <CardTitle>Positive Reviews</CardTitle>
              <CardDescription>Reviews with 4-5 stars</CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewsList filter="positive" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="neutral">
          <Card>
            <CardHeader>
              <CardTitle>Neutral Reviews</CardTitle>
              <CardDescription>Reviews with 3 stars</CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewsList filter="neutral" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="negative">
          <Card>
            <CardHeader>
              <CardTitle>Negative Reviews</CardTitle>
              <CardDescription>Reviews with 1-2 stars</CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewsList filter="negative" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unanswered">
          <Card>
            <CardHeader>
              <CardTitle>Unanswered Reviews</CardTitle>
              <CardDescription>Reviews that need your response</CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewsList filter="unanswered" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
