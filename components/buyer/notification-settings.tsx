"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)

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
        <h3 className="text-lg font-medium">Email Notifications</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-marketing">Marketing</Label>
            <p className="text-sm text-muted-foreground">Receive emails about new features and promotions</p>
          </div>
          <Switch id="email-marketing" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-updates">Dataset Updates</Label>
            <p className="text-sm text-muted-foreground">Receive emails when datasets you've purchased are updated</p>
          </div>
          <Switch id="email-updates" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-subscriptions">Subscription Renewals</Label>
            <p className="text-sm text-muted-foreground">Receive emails before your subscriptions renew</p>
          </div>
          <Switch id="email-subscriptions" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-recommendations">Recommendations</Label>
            <p className="text-sm text-muted-foreground">Receive emails with personalized dataset recommendations</p>
          </div>
          <Switch id="email-recommendations" defaultChecked />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">In-App Notifications</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="app-messages">Messages</Label>
            <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
          </div>
          <Switch id="app-messages" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="app-updates">Dataset Updates</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications when datasets you've purchased are updated
            </p>
          </div>
          <Switch id="app-updates" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="app-price-alerts">Price Alerts</Label>
            <p className="text-sm text-muted-foreground">Receive notifications for price changes on saved datasets</p>
          </div>
          <Switch id="app-price-alerts" defaultChecked />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Frequency</h3>

        <div className="space-y-2">
          <Label htmlFor="frequency">Email Digest Frequency</Label>
          <Select defaultValue="weekly">
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </form>
  )
}
