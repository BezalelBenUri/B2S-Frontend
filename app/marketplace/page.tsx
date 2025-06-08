import { PublicMarketplace } from "@/components/marketplace/public-marketplace"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marketplace - B2eXchange",
  description: "Browse and discover high-quality datasets from verified sellers across multiple categories",
}

export default function MarketplacePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicMarketplace />
    </div>
  )
}
