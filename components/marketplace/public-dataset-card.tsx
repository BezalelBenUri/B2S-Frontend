"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, BookmarkPlus, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Dataset {
  id: string
  title: string
  description: string
  category: string
  price: number
  rating: string
  reviews: number
  seller: {
    name: string
    rating: string
  }
  tags: string[]
  sampleAvailable: boolean
}

interface PublicDatasetCardProps {
  dataset: Dataset
}

export function PublicDatasetCard({ dataset }: PublicDatasetCardProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const handleInteraction = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowLoginDialog(true)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge className="bg-data-blue text-white">{dataset.category}</Badge>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-warning text-warning mr-1" />
              <span className="text-sm">{dataset.rating}</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">{dataset.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dataset.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {dataset.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-muted-foreground">Seller: </span>
              <span className="font-medium">{dataset.seller.name}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{dataset.reviews} reviews</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-muted/50 p-4 mt-2">
          <span className="text-xl font-bold">${dataset.price}</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleInteraction}>
              <BookmarkPlus className="h-4 w-4" />
            </Button>
            <Button onClick={handleInteraction}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Purchase
            </Button>
          </div>
        </div>

        {dataset.sampleAvailable && (
          <div className="px-4 py-2 bg-info/10 text-info-foreground text-sm flex items-center justify-center">
            <ExternalLink className="h-3 w-3 mr-2" />
            Sample data available for preview
          </div>
        )}
      </CardContent>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in required</DialogTitle>
            <DialogDescription>
              You need to be signed in to perform this action. Create an account or sign in to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <Button variant="outline" asChild className="mt-2 sm:mt-0">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Create Account</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
