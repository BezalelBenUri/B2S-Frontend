export type UserRole = "buyer" | "seller" | "both" | "admin"

export interface RouteConfig {
  path: string
  label: string
  description?: string
}

export const ROLE_ROUTES: Record<UserRole, RouteConfig> = {
  admin: {
    path: "/dashboard",
    label: "Admin Dashboard",
    description: "Manage platform operations and users",
  },
  buyer: {
    path: "/dashboard",
    label: "Buyer Dashboard",
    description: "Browse and purchase datasets",
  },
  seller: {
    path: "/dashboard",
    label: "Seller Dashboard",
    description: "Manage your data listings and sales",
  },
  both: {
    path: "/dashboard/role-selection",
    label: "Role Selection",
    description: "Choose your current role",
  },
}

export class AuthRouter {
  static getRedirectPath(userRole: UserRole): string {
    return ROLE_ROUTES[userRole]?.path || "/dashboard"
  }

  static redirectAfterLogin(userRole: UserRole): void {
    const path = this.getRedirectPath(userRole)
    window.location.href = path
  }

  static redirectAfterLogout(): void {
    window.location.href = "/auth/login"
  }

  // Check if user has access to a specific route
  static hasRouteAccess(userRole: UserRole, requestedPath: string): boolean {
    // Define route access rules
    const adminOnlyRoutes = ["/dashboard/users", "/dashboard/marketplace-admin", "/dashboard/content-moderation"]
    const sellerOnlyRoutes = ["/dashboard/listings", "/dashboard/earnings", "/dashboard/reviews"]
    const buyerOnlyRoutes = ["/dashboard/purchases", "/dashboard/subscriptions", "/dashboard/saved"]

    if (userRole === "admin") {
      return true // Admin has access to everything
    }

    if (userRole === "both") {
      return !adminOnlyRoutes.some((route) => requestedPath.startsWith(route))
    }

    if (userRole === "seller") {
      return (
        !adminOnlyRoutes.some((route) => requestedPath.startsWith(route)) &&
        !buyerOnlyRoutes.some((route) => requestedPath.startsWith(route))
      )
    }

    if (userRole === "buyer") {
      return (
        !adminOnlyRoutes.some((route) => requestedPath.startsWith(route)) &&
        !sellerOnlyRoutes.some((route) => requestedPath.startsWith(route))
      )
    }

    return false
  }
}
