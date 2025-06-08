"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublicDatasetCard } from "@/components/marketplace/public-dataset-card"
import { PublicMarketplaceFilters } from "@/components/marketplace/public-marketplace-filters"
import { Search, SlidersHorizontal, Database } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  {
    id: "7",
    title: "Demographic Analysis 2023",
    description:
      "Comprehensive demographic data including population distribution, age groups, income levels, and education statistics across regions and countries.",
    category: "Financial",
    price: 159.99,
    rating: "4.7",
    reviews: 103,
    seller: {
      name: "PopulationMetrics",
      rating: "4.8",
    },
    tags: ["Demographics", "Population", "Global", "Annual Updates"],
    sampleAvailable: true,
  },
  {
    id: "8",
    title: "Renewable Energy Infrastructure",
    description:
      "Mapping of renewable energy installations including solar farms, wind turbines, and hydroelectric plants with capacity and output metrics.",
    category: "Environmental",
    price: 189.99,
    rating: "4.6",
    reviews: 79,
    seller: {
      name: "GreenEnergy Data",
      rating: "4.5",
    },
    tags: ["Energy", "Renewable", "Infrastructure", "Quarterly Updates"],
    sampleAvailable: true,
  },
  {
    id: "9",
    title: "Global Real Estate Market Trends",
    description:
      "Commercial and residential real estate data including property values, rental rates, and market trends across major global cities.",
    category: "Financial",
    price: 219.99,
    rating: "4.8",
    reviews: 118,
    seller: {
      name: "PropertyInsights",
      rating: "4.7",
    },
    tags: ["Real Estate", "Property", "Global", "Monthly Updates"],
    sampleAvailable: false,
  },
]

export function PublicMarketplace() {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">B2eXchange</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="/marketplace" className="text-sm font-medium text-primary hover:underline underline-offset-4">
              Marketplace
            </Link>
            <Link href="/#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/auth/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Data Marketplace</h1>
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
                        <Link href="/auth/register">Sign Up to Access Full Marketplace</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background py-6 mt-auto">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">B2eXchange</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 B2eXchange. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
