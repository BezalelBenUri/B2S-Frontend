"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Smartphone } from "lucide-react"

export function SecuritySettings() {
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-medium">Change Password</h3>

        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </div>
              <Switch id="2fa" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Smartphone className="h-10 w-10 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Authenticator App</p>
                <p className="text-sm text-muted-foreground">
                  Use an authenticator app like Google Authenticator or Authy to generate verification codes.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Set Up Authenticator
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Session Management</h3>

        <div className="rounded-md border">
          <div className="grid grid-cols-3 gap-4 p-4 font-medium">
            <div>Device</div>
            <div>Location</div>
            <div className="text-right">Last Active</div>
          </div>
          <Separator />
          {[
            { device: "Chrome on Windows", location: "New York, USA", lastActive: "Now (Current Session)" },
            { device: "Safari on iPhone", location: "New York, USA", lastActive: "Yesterday" },
            { device: "Firefox on MacOS", location: "Boston, USA", lastActive: "3 days ago" },
          ].map((session, i) => (
            <div key={i} className="grid grid-cols-3 gap-4 p-4 text-sm">
              <div>{session.device}</div>
              <div>{session.location}</div>
              <div className="text-right">
                {session.lastActive}
                {i === 0 && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Current
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button variant="outline">Sign Out All Other Sessions</Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Account Security</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="login-alerts">Login Alerts</Label>
            <p className="text-sm text-muted-foreground">Receive email notifications for new logins to your account</p>
          </div>
          <Switch id="login-alerts" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="suspicious-activity">Suspicious Activity Alerts</Label>
            <p className="text-sm text-muted-foreground">Receive alerts for suspicious activity on your account</p>
          </div>
          <Switch id="suspicious-activity" defaultChecked />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>

        <Card className="border-destructive">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-base text-destructive">Delete Account</CardTitle>
            </div>
            <CardDescription>Permanently delete your account and all of your data</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="destructive">Delete Account</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
