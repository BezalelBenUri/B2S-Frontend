import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatasetCard } from "@/components/marketplace/dataset-card"

// Sample data
const datasets = Array.from({ length: 12 }).map((_, i) => ({
  id: `dataset-${i + 1}`,
  title: `Dataset ${i + 1}`,
  description: "High-quality dataset with comprehensive coverage and regular updates.",
  category: ["Geospatial", "Financial", "Healthcare", "Environmental", "Retail", "Transportation"][i % 6],
  price: Math.floor(Math.random() * 500) + 50,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 100) + 10,
  seller: {
    name: `Seller ${i + 1}`,
    rating: (Math.random() * 1 + 4).toFixed(1),
  },
}))

export default function MarketplacePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Saved</Button>
          <Button>Browse Auctions</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <Input placeholder="Search datasets..." className="w-full" />
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="geospatial">Geospatial</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {datasets.map((dataset) => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))}
          </div>

          <TabsContent value="all">
            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
