"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { BanknoteIcon as Bank, CreditCard, Plus } from "lucide-react"

export function PayoutSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [payoutMethod, setPayoutMethod] = useState("bank")

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
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Payout Method</Label>
            <RadioGroup
              defaultValue={payoutMethod}
              onValueChange={setPayoutMethod}
              className="grid grid-cols-1 gap-4 md:grid-cols-3"
            >
              <div>
                <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
                <Label
                  htmlFor="bank"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Bank className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Bank Account</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                <Label
                  htmlFor="paypal"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">PayPal</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="other" id="other" className="peer sr-only" />
                <Label
                  htmlFor="other"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Plus className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Other</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {payoutMethod === "bank" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account-name">Account Holder Name</Label>
                  <Input id="account-name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input id="account-number" placeholder="XXXX-XXXX-XXXX-XXXX" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="routing-number">Routing Number</Label>
                  <Input id="routing-number" placeholder="XXXXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input id="bank-name" placeholder="Bank of America" />
                </div>
              </div>
            </div>
          )}

          {payoutMethod === "paypal" && (
            <div className="space-y-2">
              <Label htmlFor="paypal-email">PayPal Email</Label>
              <Input id="paypal-email" type="email" placeholder="your-email@example.com" />
            </div>
          )}

          {payoutMethod === "other" && (
            <div className="space-y-2">
              <Label htmlFor="other-method">Specify Method</Label>
              <Select>
                <SelectTrigger id="other-method">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="wise">Wise (TransferWise)</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Separator />

          <div className="space-y-2">
            <Label>Payout Schedule</Label>
            <Select defaultValue="monthly">
              <SelectTrigger>
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minimum-payout">Minimum Payout Amount</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                $
              </span>
              <Input id="minimum-payout" type="number" defaultValue={100} className="rounded-l-none" />
            </div>
            <p className="text-xs text-muted-foreground">Earnings will be held until they reach this amount</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-payout">Automatic Payouts</Label>
              <p className="text-sm text-muted-foreground">Automatically process payouts on schedule</p>
            </div>
            <Switch id="auto-payout" defaultChecked />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Payout Settings"}
          </Button>
        </div>
      </form>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Payout History</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Last Payout</CardTitle>
            <CardDescription>July 1, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,245.65</div>
            <p className="text-sm text-muted-foreground">Sent to bank account ending in 4567</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Payouts
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
