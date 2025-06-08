"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

export function BillingSettings() {
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
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Payment Methods</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Credit Card</CardTitle>
              <CardDescription>Ending in 4242</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm">
                <p>John Doe</p>
                <p>Expires 04/2025</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm" className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
              <Button variant="outline" size="sm">
                Set as Default
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col items-center justify-center p-6">
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </Card>
        </div>
      </div>

      <Separator />

      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-medium">Billing Information</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="billing-name">Name</Label>
            <Input id="billing-name" defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-email">Email</Label>
            <Input id="billing-email" type="email" defaultValue="john.doe@example.com" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="billing-address">Address</Label>
          <Input id="billing-address" defaultValue="123 Main St" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="billing-city">City</Label>
            <Input id="billing-city" defaultValue="New York" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-state">State</Label>
            <Input id="billing-state" defaultValue="NY" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-zip">ZIP Code</Label>
            <Input id="billing-zip" defaultValue="10001" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="billing-country">Country</Label>
          <Select defaultValue="us">
            <SelectTrigger id="billing-country">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Billing Information"}
          </Button>
        </div>
      </form>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Billing History</h3>

        <div className="rounded-md border">
          <div className="grid grid-cols-4 gap-4 p-4 font-medium">
            <div>Date</div>
            <div>Description</div>
            <div>Amount</div>
            <div className="text-right">Invoice</div>
          </div>
          <Separator />
          {[
            { date: "Apr 1, 2023", description: "Global Financial Markets", amount: "$249.99", id: "INV-001" },
            { date: "Mar 28, 2023", description: "Weather Patterns", amount: "$85.50", id: "INV-002" },
            { date: "Mar 15, 2023", description: "Urban Population Dataset", amount: "$120.00", id: "INV-003" },
          ].map((invoice, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 p-4 text-sm">
              <div>{invoice.date}</div>
              <div>{invoice.description}</div>
              <div>{invoice.amount}</div>
              <div className="text-right">
                <Button variant="link" size="sm" className="h-auto p-0">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
