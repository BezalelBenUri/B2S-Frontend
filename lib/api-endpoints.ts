/**
 * API Endpoints for B2eXchange
 *
 * This file contains all the backend API endpoints used in the application.
 * Centralizing these endpoints makes it easier to update them if the API changes.
 */

// Base API URL - can be configured based on environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Helper function to construct URLs with path segments
const createUrl = (path: string): string => `${API_BASE_URL}${path}`

// Helper function to construct URLs with query parameters
const createUrlWithParams = (path: string, params: Record<string, string | number | boolean>): string => {
  const url = new URL(`${API_BASE_URL}${path}`)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })
  return url.toString()
}

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: createUrl("/auth/login/"),
  REGISTER: "https://b2s-marketplace-backend.onrender.com/api/auth/signup/",
  VERIFY_OTP: "https://b2s-marketplace-backend.onrender.com/api/auth/verify-otp/",
  LOGOUT: createUrl("/auth/logout/"),
  PASSWORD_RESET: createUrl("/auth/password-reset/"),
  PASSWORD_RESET_CONFIRM: createUrl("/auth/password-reset/confirm/"),
  VERIFY_EMAIL: createUrl("/auth/verify-email/"),
  REFRESH_TOKEN: createUrl("/auth/token/refresh/"),
  CURRENT_USER: createUrl("/auth/user/"),
}

// User endpoints
export const USER_ENDPOINTS = {
  PROFILE: createUrl("/users/profile/"),
  UPDATE_PROFILE: createUrl("/users/profile/update/"),
  GET_USER: (userId: string | number) => createUrl(`/users/${userId}/`),
  LIST_USERS: createUrl("/users/"),
  CHANGE_PASSWORD: createUrl("/users/change-password/"),
}

// Dataset endpoints
export const DATASET_ENDPOINTS = {
  LIST: createUrl("/datasets/"),
  DETAIL: (datasetId: string | number) => createUrl(`/datasets/${datasetId}/`),
  CREATE: createUrl("/datasets/"),
  UPDATE: (datasetId: string | number) => createUrl(`/datasets/${datasetId}/`),
  DELETE: (datasetId: string | number) => createUrl(`/datasets/${datasetId}/`),
  SEARCH: (query: string) => createUrlWithParams("/datasets/search/", { query }),
  FILTER: (params: Record<string, string | number | boolean>) => createUrlWithParams("/datasets/filter/", params),
  FEATURED: createUrl("/datasets/featured/"),
  CATEGORIES: createUrl("/datasets/categories/"),
  TAGS: createUrl("/datasets/tags/"),
  PREVIEW: (datasetId: string | number) => createUrl(`/datasets/${datasetId}/preview/`),
  DOWNLOAD: (datasetId: string | number) => createUrl(`/datasets/${datasetId}/download/`),
  SAMPLE: (datasetId: string | number) => createUrl(`/datasets/${datasetId}/sample/`),
}

// Marketplace endpoints
export const MARKETPLACE_ENDPOINTS = {
  LISTINGS: createUrl("/marketplace/listings/"),
  LISTING_DETAIL: (listingId: string | number) => createUrl(`/marketplace/listings/${listingId}/`),
  CREATE_LISTING: createUrl("/marketplace/listings/"),
  UPDATE_LISTING: (listingId: string | number) => createUrl(`/marketplace/listings/${listingId}/`),
  DELETE_LISTING: (listingId: string | number) => createUrl(`/marketplace/listings/${listingId}/`),
  FEATURED_LISTINGS: createUrl("/marketplace/featured/"),
  CATEGORIES: createUrl("/marketplace/categories/"),
  SEARCH: (query: string) => createUrlWithParams("/marketplace/search/", { query }),
  FILTER: (params: Record<string, string | number | boolean>) => createUrlWithParams("/marketplace/filter/", params),
}

// Transaction endpoints
export const TRANSACTION_ENDPOINTS = {
  PURCHASE: createUrl("/transactions/purchase/"),
  PURCHASE_DETAIL: (transactionId: string | number) => createUrl(`/transactions/${transactionId}/`),
  USER_PURCHASES: createUrl("/transactions/user-purchases/"),
  USER_SALES: createUrl("/transactions/user-sales/"),
  INITIATE_PAYMENT: createUrl("/transactions/initiate-payment/"),
  VERIFY_PAYMENT: createUrl("/transactions/verify-payment/"),
  SUBSCRIPTION: createUrl("/transactions/subscription/"),
  CANCEL_SUBSCRIPTION: (subscriptionId: string | number) =>
    createUrl(`/transactions/subscription/${subscriptionId}/cancel/`),
  INVOICES: createUrl("/transactions/invoices/"),
  INVOICE_DETAIL: (invoiceId: string | number) => createUrl(`/transactions/invoices/${invoiceId}/`),
}

// Review endpoints
export const REVIEW_ENDPOINTS = {
  LIST: createUrl("/reviews/"),
  CREATE: createUrl("/reviews/"),
  DETAIL: (reviewId: string | number) => createUrl(`/reviews/${reviewId}/`),
  UPDATE: (reviewId: string | number) => createUrl(`/reviews/${reviewId}/`),
  DELETE: (reviewId: string | number) => createUrl(`/reviews/${reviewId}/`),
  DATASET_REVIEWS: (datasetId: string | number) => createUrl(`/datasets/${datasetId}/reviews/`),
  SELLER_REVIEWS: (sellerId: string | number) => createUrl(`/users/${sellerId}/reviews/`),
}

// Notification endpoints
export const NOTIFICATION_ENDPOINTS = {
  LIST: createUrl("/notifications/"),
  MARK_READ: (notificationId: string | number) => createUrl(`/notifications/${notificationId}/read/`),
  MARK_ALL_READ: createUrl("/notifications/mark-all-read/"),
  PREFERENCES: createUrl("/notifications/preferences/"),
}

// Admin endpoints
export const ADMIN_ENDPOINTS = {
  DASHBOARD_STATS: createUrl("/admin/dashboard-stats/"),
  USER_MANAGEMENT: createUrl("/admin/users/"),
  USER_DETAIL: (userId: string | number) => createUrl(`/admin/users/${userId}/`),
  CONTENT_MODERATION: createUrl("/admin/moderation/"),
  MODERATION_ITEM: (itemId: string | number) => createUrl(`/admin/moderation/${itemId}/`),
  APPROVE_CONTENT: (itemId: string | number) => createUrl(`/admin/moderation/${itemId}/approve/`),
  REJECT_CONTENT: (itemId: string | number) => createUrl(`/admin/moderation/${itemId}/reject/`),
  PLATFORM_SETTINGS: createUrl("/admin/settings/"),
  AUDIT_LOGS: createUrl("/admin/audit-logs/"),
}

// Auction endpoints
export const AUCTION_ENDPOINTS = {
  LIST: createUrl("/auctions/"),
  DETAIL: (auctionId: string | number) => createUrl(`/auctions/${auctionId}/`),
  CREATE: createUrl("/auctions/"),
  UPDATE: (auctionId: string | number) => createUrl(`/auctions/${auctionId}/`),
  DELETE: (auctionId: string | number) => createUrl(`/auctions/${auctionId}/`),
  PLACE_BID: (auctionId: string | number) => createUrl(`/auctions/${auctionId}/bid/`),
  ACTIVE_AUCTIONS: createUrl("/auctions/active/"),
  USER_AUCTIONS: createUrl("/auctions/user/"),
  USER_BIDS: createUrl("/auctions/user-bids/"),
}

// Analytics endpoints
export const ANALYTICS_ENDPOINTS = {
  SELLER_DASHBOARD: createUrl("/analytics/seller-dashboard/"),
  BUYER_INSIGHTS: createUrl("/analytics/buyer-insights/"),
  DATASET_PERFORMANCE: (datasetId: string | number) => createUrl(`/analytics/dataset/${datasetId}/performance/`),
  MARKET_TRENDS: createUrl("/analytics/market-trends/"),
  REVENUE_REPORTS: createUrl("/analytics/revenue-reports/"),
  USER_ACTIVITY: createUrl("/analytics/user-activity/"),
}

// Messaging endpoints
export const MESSAGING_ENDPOINTS = {
  CONVERSATIONS: createUrl("/messages/conversations/"),
  CONVERSATION_DETAIL: (conversationId: string | number) => createUrl(`/messages/conversations/${conversationId}/`),
  SEND_MESSAGE: createUrl("/messages/send/"),
  MARK_READ: (messageId: string | number) => createUrl(`/messages/${messageId}/read/`),
  UNREAD_COUNT: createUrl("/messages/unread-count/"),
}

// Export all endpoints as a single object
export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  USER: USER_ENDPOINTS,
  DATASET: DATASET_ENDPOINTS,
  MARKETPLACE: MARKETPLACE_ENDPOINTS,
  TRANSACTION: TRANSACTION_ENDPOINTS,
  REVIEW: REVIEW_ENDPOINTS,
  NOTIFICATION: NOTIFICATION_ENDPOINTS,
  ADMIN: ADMIN_ENDPOINTS,
  AUCTION: AUCTION_ENDPOINTS,
  ANALYTICS: ANALYTICS_ENDPOINTS,
  MESSAGING: MESSAGING_ENDPOINTS,
}

export default API_ENDPOINTS
