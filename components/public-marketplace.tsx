"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublicDatasetCard } from "@/components/marketplace/public-dataset-card"
import { PublicMarketplaceFilters } from "@/components/marketplace/public-marketplace-filters"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Sample data
const datasets = [
  {
    id: "1",
    title: "Global Economic Indicators 2023",
    description:
      "Comprehensive economic data from 190+ countries with historical trends and forecasts. Includes GDP, inflation rates, employment statistics, and trade balances.",
    category: "Financial",
    price: 149.99,
    rating: "4.8",
    reviews: 124,
    seller: {
      name: "EconData Analytics",
      rating: "4.9",
    },
    tags: ["Economics", "Global", "Forecasting", "Quarterly Updates"],
    sampleAvailable: true,
  },
  {
    id: "2",
    title: "Urban Transportation Patterns",
    description:
      "Traffic and public transport data from 50 major cities worldwide. Includes peak hours, congestion patterns, and public transit efficiency metrics.",
    category: "Geospatial",
    price: 99.99,
    rating: "4.6",
    reviews: 87,
    seller: {
      name: "CityMetrics",
      rating: "4.7",
    },
    tags: ["Urban", "Transportation", "Traffic", "Monthly Updates"],
    sampleAvailable: true,
  },
  {
    id: "3",
    title: "Healthcare Facilities Mapping",
    description:
      "Detailed mapping of healthcare facilities worldwide with capacity, specialization, and accessibility data. Essential for healthcare planning and analysis.",
    category: "Healthcare",
    price: 199.99,
    rating: "4.9",
    reviews: 156,
    seller: {
      name: "HealthData Analytics",
      rating: "4.8",
    },
    tags: ["Healthcare", "Facilities", "Global", "Quarterly Updates"],
    sampleAvailable: false,
  },
  {
    id: "4",
    title: "Consumer Spending Trends 2023",
    description:
      "Retail and e-commerce spending patterns by demographics, regions, and product categories. Includes seasonal trends and year-over-year comparisons.",
    category: "Retail",
    price: 129.99,
    rating: "4.7",
    reviews: 92,
    seller: {
      name: "MarketInsights",
      rating: "4.6",
    },
    tags: ["Retail", "Consumer Behavior", "E-commerce", "Monthly Updates"],
    sampleAvailable: true,
  },
  {
    id: "5",
    title: "Climate Change Indicators",
    description:
      "Long-term climate data with trend analysis including temperature changes, precipitation patterns, and extreme weather events across global regions.",
    category: "Environmental",
    price: 179.99,
    rating: "4.8",
    reviews: 108,
    seller: {
      name: "ClimateData",
      rating: "4.9",
    },
    tags: ["Climate", "Environmental", "Global", "Monthly Updates"],
    sampleAvailable: true,
  },
  {
    id: "6",
    title: "Global Supply Chain Network",
    description:
      "Mapping of global supply chains and logistics networks for major industries. Includes shipping routes, distribution centers, and manufacturing hubs.",
    category: "Transportation",
    price: 249.99,
    rating: "4.5",
    reviews: 76,
    seller: {
      name: "LogisticsData",
      rating: "4.4",
    },
    tags: ["Supply Chain", "Logistics", "Global", "Quarterly Updates"],
    sampleAvailable: false,
  },
]

export function PublicMarketplace() {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explore Our Data Marketplace
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse thousands of high-quality datasets from verified sellers across multiple categories
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search datasets..." className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Narrow down your search with these filters</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <PublicMarketplaceFilters />
                  </div>
                </SheetContent>
              </Sheet>

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
            <TabsList className="w-full md:w-auto overflow-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="geospatial">Geospatial</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
              <TabsTrigger value="environmental">Environmental</TabsTrigger>
              <TabsTrigger value="retail">Retail</TabsTrigger>
              <TabsTrigger value="transportation">Transportation</TabsTrigger>
            </TabsList>

            <div className="mt-6 flex">
              <div className="hidden md:block w-[280px] flex-shrink-0 pr-8">
                <PublicMarketplaceFilters />
              </div>

              <div className="flex-1">
                <TabsContent value="all" className="m-0">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {datasets.map((dataset) => (
                      <PublicDatasetCard key={dataset.id} dataset={dataset} />
                    ))}
                  </div>
                </TabsContent>

                {/* Other tabs would filter by category */}
                {["geospatial", "financial", "healthcare", "environmental", "retail", "transportation"].map(
                  (category) => (
                    <TabsContent key={category} value={category} className="m-0">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {datasets
                          .filter((d) => d.category.toLowerCase() === category)
                          .map((dataset) => (
                            <PublicDatasetCard key={dataset.id} dataset={dataset} />
                          ))}
                      </div>
                    </TabsContent>
                  ),
                )}

                <div className="flex justify-center mt-10">
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/auth/register">Sign Up to View More Datasets</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
