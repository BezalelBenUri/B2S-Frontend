"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Eye, CheckCircle, XCircle, Flag, Ban, ShieldAlert, MessageSquare } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface MarketplaceListingsProps {
  filter: "all" | "pending" | "flagged" | "reported"
}

export function MarketplaceListings({ filter }: MarketplaceListingsProps) {
  const [selectedListings, setSelectedListings] = useState<string[]>([])
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  // Sample data - in a real app, this would come from an API
  const listings = [
    {
      id: "1",
      title: "Urban Population Dataset",
      category: "Geospatial",
      price: "$120.00",
      status: "active",
      seller: {
        name: "DataCorp Inc.",
        avatar: "DC",
      },
      dateAdded: "2023-07-15",
      sales: 24,
      flagged: false,
      reported: false,
    },
    {
      id: "2",
      title: "Weather Patterns 2022",
      category: "Environmental",
      price: "$85.50",
      status: "active",
      seller: {
        name: "ClimateData",
        avatar: "CD",
      },
      dateAdded: "2023-07-10",
      sales: 18,
      flagged: false,
      reported: false,
    },
    {
      id: "3",
      title: "Retail Consumer Behavior",
      category: "Retail",
      price: "$199.99",
      status: "pending",
      seller: {
        name: "MarketInsights",
        avatar: "MI",
      },
      dateAdded: "2023-07-20",
      sales: 0,
      flagged: false,
      reported: false,
    },
    {
      id: "4",
      title: "Healthcare Facilities Mapping",
      category: "Healthcare",
      price: "$175.00",
      status: "active",
      seller: {
        name: "HealthData Analytics",
        avatar: "HA",
      },
      dateAdded: "2023-07-05",
      sales: 21,
      flagged: true,
      reported: true,
    },
    {
      id: "5",
      title: "Financial Markets Data",
      category: "Financial",
      price: "$249.99",
      status: "pending",
      seller: {
        name: "FinData Solutions",
        avatar: "FD",
      },
      dateAdded: "2023-07-18",
      sales: 0,
      flagged: false,
      reported: false,
    },
    {
      id: "6",
      title: "Transportation Networks",
      category: "Transportation",
      price: "$149.99",
      status: "rejected",
      seller: {
        name: "CityData Inc.",
        avatar: "CI",
      },
      dateAdded: "2023-07-12",
      sales: 0,
      flagged: false,
      reported: false,
    },
    {
      id: "7",
      title: "Consumer Financial Data 2023",
      category: "Financial",
      price: "$179.99",
      status: "active",
      seller: {
        name: "DataMetrics",
        avatar: "DM",
      },
      dateAdded: "2023-07-08",
      sales: 15,
      flagged: true,
      reported: true,
    },
    {
      id: "8",
      title: "Global Supply Chain Network",
      category: "Transportation",
      price: "$299.99",
      status: "pending",
      seller: {
        name: "LogisticsData",
        avatar: "LD",
      },
      dateAdded: "2023-07-19",
      sales: 0,
      flagged: false,
      reported: false,
    },
  ]

  // Filter listings based on the selected filter
  const filteredListings = listings.filter((listing) => {
    if (filter === "all") return true
    if (filter === "pending") return listing.status === "pending"
    if (filter === "flagged") return listing.flagged
    if (filter === "reported") return listing.reported
    return true
  })

  const toggleSelectAll = () => {
    if (selectedListings.length === filteredListings.length) {
      setSelectedListings([])
    } else {
      setSelectedListings(filteredListings.map((listing) => listing.id))
    }
  }

  const toggleSelectListing = (listingId: string) => {
    if (selectedListings.includes(listingId)) {
      setSelectedListings(selectedListings.filter((id) => id !== listingId))
    } else {
      setSelectedListings([...selectedListings, listingId])
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={selectedListings.length === filteredListings.length && filteredListings.length > 0}
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
          <Button variant="outline" size="sm" disabled={selectedListings.length === 0} onClick={() => {}}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve Selected
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            disabled={selectedListings.length === 0}
            onClick={() => setShowRejectDialog(true)}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject Selected
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Listing</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>
                  <Checkbox
                    id={`select-${listing.id}`}
                    checked={selectedListings.includes(listing.id)}
                    onCheckedChange={() => toggleSelectListing(listing.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="font-medium">{listing.title}</p>
                      {listing.flagged && (
                        <Badge variant="destructive" className="ml-2">
                          Flagged
                        </Badge>
                      )}
                      {listing.reported && (
                        <Badge variant="outline" className="ml-2 bg-orange-100 text-orange-800 hover:bg-orange-100">
                          Reported
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{listing.category}</Badge>
                </TableCell>
                <TableCell>{listing.price}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      listing.status === "active"
                        ? "outline"
                        : listing.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={listing.seller.name} />
                      <AvatarFallback>{listing.seller.avatar}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{listing.seller.name}</span>
                  </div>
                </TableCell>
                <TableCell>{listing.dateAdded}</TableCell>
                <TableCell>{listing.sales}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Listing
                      </DropdownMenuItem>
                      {listing.status === "pending" && (
                        <>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setShowRejectDialog(true)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Seller
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {listing.flagged ? (
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Clear Flag
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <Flag className="mr-2 h-4 w-4" />
                          Flag Listing
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive">
                        <Ban className="mr-2 h-4 w-4" />
                        Remove Listing
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Selected Listings</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting {selectedListings.length} selected listings. This information will
              be sent to the sellers.
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
                setSelectedListings([])
                setRejectionReason("")
              }}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject Listings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
