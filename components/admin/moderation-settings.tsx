"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function ModerationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [autoModeration, setAutoModeration] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Content Moderation</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-moderation">Automated Moderation</Label>
            <p className="text-sm text-muted-foreground">Use AI to automatically moderate content</p>
          </div>
          <Switch id="auto-moderation" checked={autoModeration} onCheckedChange={setAutoModeration} defaultChecked />
        </div>

        {autoModeration && (
          <>
            <div className="space-y-2">
              <Label htmlFor="moderation-sensitivity">Moderation Sensitivity</Label>
              <div className="space-y-4">
                <Slider defaultValue={[75]} max={100} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Less Strict</span>
                  <span>More Strict</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-reject">Auto-Reject Flagged Content</Label>
                <p className="text-sm text-muted-foreground">Automatically reject content flagged as inappropriate</p>
              </div>
              <Switch id="auto-reject" />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="prohibited-keywords">Prohibited Keywords</Label>
          <Textarea
            id="prohibited-keywords"
            placeholder="Enter keywords separated by commas"
            className="min-h-[100px]"
            defaultValue="scam, illegal, fraud, hack, crack, stolen"
          />
          <p className="text-xs text-muted-foreground">
            Content containing these keywords will be automatically flagged for review
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">User Moderation</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-verification">Require Email Verification</Label>
            <p className="text-sm text-muted-foreground">Users must verify their email before accessing the platform</p>
          </div>
          <Switch id="email-verification" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="seller-verification">Require Seller Verification</Label>
            <p className="text-sm text-muted-foreground">Sellers must be verified before listing data</p>
          </div>
          <Switch id="seller-verification" defaultChecked />
        </div>

        <div className="space-y-2">
          <Label htmlFor="account-suspension-threshold">Account Suspension Threshold</Label>
          <Select defaultValue="3">
            <SelectTrigger id="account-suspension-threshold">
              <SelectValue placeholder="Select threshold" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 violation</SelectItem>
              <SelectItem value="2">2 violations</SelectItem>
              <SelectItem value="3">3 violations</SelectItem>
              <SelectItem value="5">5 violations</SelectItem>
              <SelectItem value="10">10 violations</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Number of violations before an account is automatically suspended
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Review Settings</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="review-moderation">Moderate Reviews</Label>
            <p className="text-sm text-muted-foreground">Reviews must be approved before being published</p>
          </div>
          <Switch id="review-moderation" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="allow-review-responses">Allow Review Responses</Label>
            <p className="text-sm text-muted-foreground">Allow sellers to respond to reviews</p>
          </div>
          <Switch id="allow-review-responses" defaultChecked />
        </div>

        <div className="space-y-2">
          <Label htmlFor="min-review-length">Minimum Review Length</Label>
          <Input id="min-review-length" type="number" defaultValue="10" min="0" />
          <p className="text-xs text-muted-foreground">Minimum number of characters required for a review</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  )
}
