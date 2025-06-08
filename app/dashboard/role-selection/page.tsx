"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Store, ShoppingCart } from "lucide-react"
import AuthService from "@/lib/api-services/auth-service"

export default function RoleSelectionPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated and has "both" role
    const user = AuthService.getUser()

    if (!user) {
      router.push("/auth/login")
      return
    }

    if (user.user_type !== "both") {
      router.push("/dashboard")
      return
    }

    setLoading(false)
  }, [router])

  const selectRole = (role: "buyer" | "seller") => {
    localStorage.setItem("selectedRole", role)
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Select Your Role</h1>
        <p className="text-muted-foreground">
          You have access to both buyer and seller features. Choose which dashboard you'd like to use.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Buyer Dashboard
            </CardTitle>
            <CardDescription>Access marketplace and manage your purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Browse and purchase datasets</li>
              <li>Manage your subscriptions</li>
              <li>Save datasets for later</li>
              <li>Track your purchase history</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => selectRole("buyer")}>
              Continue as Buyer
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="mr-2 h-5 w-5" />
              Seller Dashboard
            </CardTitle>
            <CardDescription>Manage your listings and track sales</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Create and manage dataset listings</li>
              <li>Track your earnings and sales</li>
              <li>View customer reviews</li>
              <li>Analyze performance metrics</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => selectRole("seller")}>
              Continue as Seller
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>You can switch between roles at any time from your dashboard.</p>
      </div>
    </div>
  )
}
