import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataListings } from "@/components/seller/data-listings"
import { ListingStats } from "@/components/seller/listing-stats"
import { Plus } from "lucide-react"

export default function ListingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Listings</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Dataset
        </Button>
      </div>

      <ListingStats />

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="auctions">Auctions</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Listings</CardTitle>
              <CardDescription>Manage your currently available datasets</CardDescription>
            </CardHeader>
            <CardContent>
              <DataListings status="active" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="drafts">
          <Card>
            <CardHeader>
              <CardTitle>Draft Listings</CardTitle>
              <CardDescription>Continue working on your unpublished datasets</CardDescription>
            </CardHeader>
            <CardContent>
              <DataListings status="draft" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="auctions">
          <Card>
            <CardHeader>
              <CardTitle>Auction Listings</CardTitle>
              <CardDescription>Manage your datasets available for auction</CardDescription>
            </CardHeader>
            <CardContent>
              <DataListings status="auction" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="archived">
          <Card>
            <CardHeader>
              <CardTitle>Archived Listings</CardTitle>
              <CardDescription>View and restore your previously archived datasets</CardDescription>
            </CardHeader>
            <CardContent>
              <DataListings status="archived" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
