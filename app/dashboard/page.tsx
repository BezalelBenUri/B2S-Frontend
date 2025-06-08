"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Users, ShoppingCart, Bell, Database, Heart, Plus } from "lucide-react"
import { PlatformStats } from "@/components/admin/platform-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { PlatformOverview } from "@/components/admin/platform-overview"
import { UserGrowthChart } from "@/components/admin/user-growth-chart"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { AlertsPanel } from "@/components/admin/alerts-panel"
import { MarketTrends } from "@/components/dashboard/market-trends"
import { RecommendedDatasets } from "@/components/dashboard/recommended-datasets"
import { RecentPurchases } from "@/components/dashboard/recent-purchases"
import { TopSellers } from "@/components/buyer/top-sellers"
import { BuyerActivity } from "@/components/buyer/buyer-activity"
import { SellerStats } from "@/components/seller/seller-stats"
import { RecentSales } from "@/components/seller/recent-sales"
import { SalesChart } from "@/components/seller/sales-chart"
import { TopSellingDatasets } from "@/components/seller/top-selling-datasets"
import { SellerActivity } from "@/components/seller/seller-activity"
import { Skeleton } from "@/components/ui/skeleton"
import AuthService from "@/lib/api-services/auth-service"

// Types for user roles
type UserRole = "buyer" | "seller" | "admin" | "both" | null

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setIsLoading(true)

        // Get user from AuthService
        const user = AuthService.getUser()

        if (!user) {
          // Redirect to login if no user found
          router.push("/auth/login")
          return
        }

        let roleToUse = user.user_type

        // Handle "both" role - check if user has selected a preference
        if (user.user_type === "both") {
          const selectedRole = typeof window !== "undefined" ? localStorage.getItem("selectedRole") : null
          if (selectedRole === "buyer" || selectedRole === "seller") {
            roleToUse = selectedRole as "buyer" | "seller"
          } else {
            // If no preference selected, redirect to role selection
            router.push("/dashboard/role-selection")
            return
          }
        }

        setUserRole(roleToUse)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch user role:", err)
        setError("Failed to load user information. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserRole()
  }, [router])

  // Function to render the appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (userRole) {
      case "buyer":
        return <BuyerDashboard />
      case "seller":
        return <SellerDashboard />
      case "admin":
        return <AdminDashboard />
      default:
        return <LoadingDashboard />
    }
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="text-destructive text-xl mb-4">Error</div>
        <p className="text-muted-foreground">{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  return <div className="flex flex-col gap-6">{isLoading ? <LoadingDashboard /> : renderDashboard()}</div>
}

// Loading state component
function LoadingDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-1" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full rounded-md" />
        </CardContent>
      </Card>
    </div>
  )
}

// Admin Dashboard Component
function AdminDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and key metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Send Notification
          </Button>
        </div>
      </div>

      <PlatformStats />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Platform Overview</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>Key metrics and performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <PlatformOverview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activities</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <UserGrowthChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Revenue</CardTitle>
                <CardDescription>Total revenue and transaction fees</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Active users and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex h-full items-center justify-center border-2 border-dashed rounded-md">
                <div className="text-center">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-semibold">User Activity Dashboard</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed analytics about user engagement and activity will be displayed here.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Activity</CardTitle>
              <CardDescription>Sales, listings, and transaction metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex h-full items-center justify-center border-2 border-dashed rounded-md">
                <div className="text-center">
                  <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-semibold">Marketplace Dashboard</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed analytics about marketplace activity will be displayed here.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertsPanel />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

// Buyer Dashboard Component
function BuyerDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Discover and manage your data purchases</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export History
          </Button>
          <Button size="sm">Browse Marketplace</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,248.50</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 renewing soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Datasets Purchased</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Datasets</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">6 new recommendations</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
            <CardDescription>Data volume and pricing trends</CardDescription>
          </CardHeader>
          <CardContent>
            <MarketTrends />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Purchases</CardTitle>
            <CardDescription>Your latest data acquisitions</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentPurchases />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recommended For You</CardTitle>
            <CardDescription>Based on your purchase history</CardDescription>
          </CardHeader>
          <CardContent>
            <RecommendedDatasets limit={2} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Sellers</CardTitle>
            <CardDescription>Most trusted data providers</CardDescription>
          </CardHeader>
          <CardContent>
            <TopSellers />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest interactions on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <BuyerActivity />
        </CardContent>
      </Card>
    </>
  )
}

// Seller Dashboard Component
function SellerDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your listings and track sales</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Listing
          </Button>
        </div>
      </div>

      <SellerStats />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Revenue and sales trends</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Datasets</CardTitle>
            <CardDescription>Your best performing data products</CardDescription>
          </CardHeader>
          <CardContent>
            <TopSellingDatasets />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events on your account</CardDescription>
          </CardHeader>
          <CardContent>
            <SellerActivity />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
