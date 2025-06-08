import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Eye, Archive, Trash } from "lucide-react"

interface DataListingsProps {
  status: "active" | "draft" | "auction" | "archived"
}

export function DataListings({ status }: DataListingsProps) {
  // Sample data - in a real app, this would come from an API
  const listings = [
    {
      id: "1",
      name: "Urban Population Dataset",
      category: "Geospatial",
      price: "$120.00",
      sales: 24,
      lastUpdated: "2023-03-15",
      rating: "4.8",
    },
    {
      id: "2",
      name: "Weather Patterns 2022",
      category: "Environmental",
      price: "$85.50",
      sales: 18,
      lastUpdated: "2023-02-28",
      rating: "4.6",
    },
    {
      id: "3",
      name: "Retail Consumer Behavior",
      category: "Retail",
      price: "$199.99",
      sales: 32,
      lastUpdated: "2023-02-14",
      rating: "4.9",
    },
    {
      id: "4",
      name: "Transportation Networks",
      category: "Transportation",
      price: "$149.99",
      sales: 15,
      lastUpdated: "2023-01-30",
      rating: "4.7",
    },
    {
      id: "5",
      name: "Healthcare Facilities",
      category: "Healthcare",
      price: "$175.00",
      sales: 21,
      lastUpdated: "2023-01-15",
      rating: "4.5",
    },
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Checkbox id="select-all" />
          <label
            htmlFor="select-all"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select All
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </Button>
          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>
                  <Checkbox id={`select-${listing.id}`} />
                </TableCell>
                <TableCell className="font-medium">{listing.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{listing.category}</Badge>
                </TableCell>
                <TableCell>{listing.price}</TableCell>
                <TableCell>{listing.sales}</TableCell>
                <TableCell>{listing.rating}</TableCell>
                <TableCell>{listing.lastUpdated}</TableCell>
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
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
