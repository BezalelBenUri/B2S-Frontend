"use client"

import { Textarea } from "@/components/ui/textarea"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertTriangle } from "lucide-react"

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Authentication Settings</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="two-factor-auth">Require Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
          </div>
          <Switch id="two-factor-auth" defaultChecked />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password-policy">Password Policy</Label>
          <Select defaultValue="strong">
            <SelectTrigger id="password-policy">
              <SelectValue placeholder="Select password policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic (8+ characters)</SelectItem>
              <SelectItem value="medium">Medium (8+ chars, mixed case, numbers)</SelectItem>
              <SelectItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
              <SelectItem value="very-strong">Very Strong (12+ chars, mixed case, numbers, symbols)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password-expiry">Password Expiry</Label>
          <Select defaultValue="90">
            <SelectTrigger id="password-expiry">
              <SelectValue placeholder="Select password expiry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="60">60 days</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
              <SelectItem value="180">180 days</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="session-timeout">Session Timeout</Label>
          <Select defaultValue="60">
            <SelectTrigger id="session-timeout">
              <SelectValue placeholder="Select session timeout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
              <SelectItem value="240">4 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Access Control</h3>

        <div className="space-y-2">
          <Label htmlFor="admin-access-level">Default Admin Access Level</Label>
          <RadioGroup defaultValue="standard" id="admin-access-level">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="limited" id="limited" />
              <Label htmlFor="limited">Limited (View only)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard">Standard (View and edit)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full" id="full" />
              <Label htmlFor="full">Full (All permissions)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="ip-restriction">IP Restriction</Label>
            <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses</p>
          </div>
          <Switch id="ip-restriction" />
        </div>

        {/* This would be conditionally shown if IP restriction is enabled */}
        <div className="space-y-2">
          <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
          <Textarea id="allowed-ips" placeholder="Enter IP addresses, one per line" className="min-h-[100px]" />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Security Monitoring</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="login-monitoring">Login Attempt Monitoring</Label>
            <p className="text-sm text-muted-foreground">Monitor and alert on suspicious login attempts</p>
          </div>
          <Switch id="login-monitoring" defaultChecked />
        </div>

        <div className="space-y-2">
          <Label htmlFor="login-attempts">Failed Login Attempts Before Lockout</Label>
          <Select defaultValue="5">
            <SelectTrigger id="login-attempts">
              <SelectValue placeholder="Select number of attempts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 attempts</SelectItem>
              <SelectItem value="5">5 attempts</SelectItem>
              <SelectItem value="10">10 attempts</SelectItem>
              <SelectItem value="unlimited">Unlimited</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="account-lockout">Account Lockout Duration</Label>
          <Select defaultValue="30">
            <SelectTrigger id="account-lockout">
              <SelectValue placeholder="Select lockout duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="1440">24 hours</SelectItem>
              <SelectItem value="manual">Until manually unlocked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="activity-logging">Comprehensive Activity Logging</Label>
            <p className="text-sm text-muted-foreground">Log all admin actions for audit purposes</p>
          </div>
          <Switch id="activity-logging" defaultChecked />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Data Protection</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="data-encryption">Data Encryption</Label>
            <p className="text-sm text-muted-foreground">Enable encryption for sensitive data</p>
          </div>
          <Switch id="data-encryption" defaultChecked />
        </div>

        <div className="space-y-2">
          <Label htmlFor="data-retention">Data Retention Period</Label>
          <Select defaultValue="365">
            <SelectTrigger id="data-retention">
              <SelectValue placeholder="Select retention period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90">90 days</SelectItem>
              <SelectItem value="180">180 days</SelectItem>
              <SelectItem value="365">1 year</SelectItem>
              <SelectItem value="730">2 years</SelectItem>
              <SelectItem value="unlimited">Unlimited</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="backup-enabled">Automated Backups</Label>
            <p className="text-sm text-muted-foreground">Enable automated database backups</p>
          </div>
          <Switch id="backup-enabled" defaultChecked />
        </div>

        <div className="space-y-2">
          <Label htmlFor="backup-frequency">Backup Frequency</Label>
          <Select defaultValue="daily">
            <SelectTrigger id="backup-frequency">
              <SelectValue placeholder="Select backup frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border border-destructive p-4 bg-destructive/10">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
          <div>
            <h4 className="font-semibold text-destructive">Security Warning</h4>
            <p className="text-sm mt-1">
              Changing security settings may impact all users and system functionality. Make sure you understand the
              implications before saving changes.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Security Settings"}
        </Button>
      </div>
    </form>
  )
}
