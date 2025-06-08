import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MarketplaceListings } from "@/components/admin/marketplace-listings"
import { MarketplaceStats } from "@/components/admin/marketplace-stats"
import { Filter, Download, Plus } from "lucide-react"

export default function MarketplaceAdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace Administration</h1>
          <p className="text-muted-foreground">Manage and moderate all marketplace listings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Listing
          </Button>
        </div>
      </div>

      <MarketplaceStats />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <Input placeholder="Search listings by title, seller, or ID..." className="w-full" />
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="geospatial">Geospatial</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="environmental">Environmental</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Listings</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
            <TabsTrigger value="reported">Reported</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Listings</CardTitle>
                <CardDescription>Manage all marketplace listings</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketplaceListings filter="all" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approval</CardTitle>
                <CardDescription>Listings awaiting moderation</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketplaceListings filter="pending" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="flagged">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Listings</CardTitle>
                <CardDescription>Listings flagged for review</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketplaceListings filter="flagged" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reported">
            <Card>
              <CardHeader>
                <CardTitle>Reported Listings</CardTitle>
                <CardDescription>Listings reported by users</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketplaceListings filter="reported" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
