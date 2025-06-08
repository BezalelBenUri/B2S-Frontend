import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare } from "lucide-react"

interface ReviewsListProps {
  filter: "all" | "positive" | "neutral" | "negative" | "unanswered"
}

export function ReviewsList({ filter }: ReviewsListProps) {
  // Sample data - in a real app, this would come from an API
  const allReviews = [
    {
      id: "1",
      customer: {
        name: "John Smith",
        avatar: "JS",
      },
      dataset: "Urban Population Dataset",
      rating: 5,
      comment:
        "Excellent dataset with comprehensive coverage. The data was well-structured and easy to work with. I particularly appreciated the detailed documentation.",
      date: "2 days ago",
      response: "Thank you for your kind words, John! We're glad the dataset met your needs.",
      responseDate: "1 day ago",
    },
    {
      id: "2",
      customer: {
        name: "Emily Johnson",
        avatar: "EJ",
      },
      dataset: "Weather Patterns 2022",
      rating: 4,
      comment:
        "Very good dataset with detailed weather information. I would have liked more historical context, but overall it was very useful for my research.",
      date: "1 week ago",
      response: "Thanks for your feedback, Emily! We're working on adding more historical data in our next update.",
      responseDate: "5 days ago",
    },
    {
      id: "3",
      customer: {
        name: "Michael Brown",
        avatar: "MB",
      },
      dataset: "Retail Consumer Behavior",
      rating: 3,
      comment:
        "The dataset was adequate for basic analysis, but lacked some key demographic breakdowns that would have been useful. Documentation could be improved.",
      date: "2 weeks ago",
      response: null,
      responseDate: null,
    },
    {
      id: "4",
      customer: {
        name: "Sarah Wilson",
        avatar: "SW",
      },
      dataset: "Healthcare Facilities Mapping",
      rating: 2,
      comment:
        "Data had several inconsistencies and the format was difficult to work with. I had to spend significant time cleaning the data before I could use it.",
      date: "3 weeks ago",
      response: null,
      responseDate: null,
    },
    {
      id: "5",
      customer: {
        name: "David Miller",
        avatar: "DM",
      },
      dataset: "Transportation Networks",
      rating: 5,
      comment:
        "Fantastic dataset! The geospatial data was perfectly formatted and included all the metadata I needed. Will definitely purchase more from this seller.",
      date: "1 month ago",
      response: "Thank you, David! We're happy to hear the dataset was useful for your project.",
      responseDate: "29 days ago",
    },
  ]

  // Filter reviews based on the selected filter
  const filteredReviews = allReviews.filter((review) => {
    if (filter === "all") return true
    if (filter === "positive") return review.rating >= 4
    if (filter === "neutral") return review.rating === 3
    if (filter === "negative") return review.rating <= 2
    if (filter === "unanswered") return review.response === null
    return true
  })

  return (
    <div className="space-y-6">
      {filteredReviews.map((review) => (
        <Card key={review.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={review.customer.name} />
                  <AvatarFallback>{review.customer.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <p className="font-medium">{review.customer.name}</p>
                    <Badge variant="outline" className="ml-2">
                      {review.dataset}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="mt-2 text-sm">{review.comment}</p>
                </div>
              </div>
            </div>

            {review.response && (
              <div className="mt-4 ml-14 pl-4 border-l">
                <div className="flex items-center">
                  <p className="text-sm font-medium">Your Response</p>
                  <span className="ml-2 text-xs text-muted-foreground">{review.responseDate}</span>
                </div>
                <p className="mt-1 text-sm">{review.response}</p>
              </div>
            )}

            {!review.response && (
              <div className="mt-4 ml-14">
                <Textarea placeholder="Write a response to this review..." className="min-h-[100px]" />
                <div className="flex justify-end mt-2">
                  <Button size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Respond
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {filteredReviews.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Star className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No Reviews Found</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            There are no reviews matching your current filter criteria.
          </p>
        </div>
      )}
    </div>
  )
}
