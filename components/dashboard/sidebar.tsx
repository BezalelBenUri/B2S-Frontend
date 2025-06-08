"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Database,
  Home,
  MessageSquare,
  Settings,
  ShoppingCart,
  Store,
  Clock,
  Heart,
  DollarSign,
  Star,
  Shield,
  AlertTriangle,
  FileText,
  BellRing,
  LayoutDashboard,
  UserCog,
  Plus,
  LogOut,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import AuthService from "@/lib/api-services/auth-service"
import { useRouter } from "next/navigation"

// Types for user roles
type UserRole = "buyer" | "seller" | "both" | "admin" | null

export function DashboardSidebar() {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("User")
  const [userInitials, setUserInitials] = useState("U")
  const router = useRouter()

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true)

        // Get user from AuthService instead of simulated API call
        const user = AuthService.getUser()

        if (!user) {
          // Redirect to login if no user found
          router.push("/auth/login")
          return
        }

        // Get the actual role
        let actualRole = user.user_type

        // For users with "both" role, check if they've selected a preference
        if (user.user_type === "both") {
          const selectedRole = typeof window !== "undefined" ? localStorage.getItem("selectedRole") : null
          if (selectedRole === "buyer" || selectedRole === "seller") {
            actualRole = selectedRole as "buyer" | "seller"
          }
        }

        setUserRole(actualRole)
        setUserName(user.username || user.email.split("@")[0])

        // Generate initials from name or email
        const name = user.username || user.email.split("@")[0]
        const initials = name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)

        setUserInitials(initials)
      } catch (err) {
        console.error("Failed to fetch user info:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserInfo()
  }, [router])

  const handleLogout = () => {
    AuthService.logout()
    router.push("/auth/login")
  }

  const buyerLinks = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/marketplace", label: "Marketplace", icon: Store },
    { href: "/dashboard/purchases", label: "My Purchases", icon: ShoppingCart },
    { href: "/dashboard/subscriptions", label: "Subscriptions", icon: Clock },
    { href: "/dashboard/saved", label: "Saved Datasets", icon: Heart },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  const sellerLinks = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/listings", label: "My Listings", icon: Database },
    { href: "/dashboard/earnings", label: "Earnings", icon: DollarSign },
    { href: "/dashboard/reviews", label: "Reviews", icon: Star },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  const adminLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/users", label: "User Management", icon: UserCog },
    { href: "/dashboard/marketplace-admin", label: "Marketplace", icon: Store },
    { href: "/dashboard/content-moderation", label: "Content Moderation", icon: Shield },
    { href: "/dashboard/reports", label: "Reports & Analytics", icon: BarChart3 },
    { href: "/dashboard/notifications", label: "Notifications", icon: BellRing },
    { href: "/dashboard/audit-logs", label: "Audit Logs", icon: FileText },
    { href: "/dashboard/admin-settings", label: "Platform Settings", icon: Settings },
  ]

  // Determine which links to show based on user role
  const links =
    userRole === "buyer" ? buyerLinks : userRole === "seller" ? sellerLinks : userRole === "admin" ? adminLinks : []

  // Get role label and badge color
  const getRoleInfo = () => {
    switch (userRole) {
      case "buyer":
        return { label: "Buyer", badgeVariant: "secondary" as const }
      case "seller":
        return { label: "Seller", badgeVariant: "outline" as const }
      case "admin":
        return { label: "Admin", badgeVariant: "default" as const }
      case "both":
        return { label: "Dual Role", badgeVariant: "secondary" as const }
      default:
        return { label: "", badgeVariant: "outline" as const }
    }
  }

  const { label: roleLabel, badgeVariant } = getRoleInfo()

  // Function to handle role switching for users with "both" role
  const switchRole = () => {
    if (userRole !== "both" && AuthService.getUser()?.user_type === "both") {
      // If current role is buyer, switch to seller and vice versa
      const newRole = userRole === "buyer" ? "seller" : "buyer"
      localStorage.setItem("selectedRole", newRole)
      window.location.reload() // Reload to apply changes
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b pb-2">
        {isLoading ? (
          <div className="flex items-center gap-2 px-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-sm font-medium">{userName}</span>
                <Badge variant={badgeVariant} className="ml-2 text-[10px] py-0 h-4">
                  {roleLabel}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">
                {userRole === "admin"
                  ? "Platform Administrator"
                  : userRole === "seller"
                    ? "Data Provider"
                    : userRole === "both"
                      ? "Data Provider & Consumer"
                      : "Data Consumer"}
              </span>
            </div>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? (
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({ length: 6 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <div className="flex items-center gap-2 p-2">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel>{userRole === "admin" ? "Administration" : "Navigation"}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((link) => (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton asChild isActive={pathname === link.href}>
                      <Link href={link.href}>
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {userRole === "admin" && !isLoading && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/flagged-content"}>
                      <Link href="/dashboard/flagged-content">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Flagged Content</span>
                        <Badge className="ml-auto">5</Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/pending-approvals"}>
                      <Link href="/dashboard/pending-approvals">
                        <Clock className="h-5 w-5" />
                        <span>Pending Approvals</span>
                        <Badge className="ml-auto">12</Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {userRole === "seller" && !isLoading && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/listings/new">
                        <Plus className="h-5 w-5" />
                        <span>Add New Dataset</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* Role switching option for users with "both" role */}
        {AuthService.getUser()?.user_type === "both" && !isLoading && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Role Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={switchRole}>
                      <div className="flex items-center">
                        <Store className="h-5 w-5 mr-2" />
                        <span>Switch to {userRole === "buyer" ? "Seller" : "Buyer"} Mode</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        {userRole === "admin" && !isLoading ? (
          <div className="flex flex-col gap-2">
            <Button variant="destructive" className="w-full justify-start">
              <Shield className="mr-2 h-4 w-4" />
              <span>Emergency Controls</span>
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Support</span>
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
