"use client"

import { Textarea } from "@/components/ui/textarea"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Key, RefreshCw, Trash2, Plus, ExternalLink } from "lucide-react"

export function ApiSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [showNewKeyForm, setShowNewKeyForm] = useState(false)

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
      <Tabs defaultValue="keys" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="keys" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">API Keys</h3>
              <p className="text-sm text-muted-foreground">Manage API keys for external integrations</p>
            </div>
            <Button onClick={() => setShowNewKeyForm(!showNewKeyForm)}>
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </div>

          {showNewKeyForm && (
            <Card>
              <CardHeader>
                <CardTitle>Create New API Key</CardTitle>
                <CardDescription>Generate a new API key for external integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="key-name">Key Name</Label>
                    <Input id="key-name" placeholder="Enter a name for this API key" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="key-permissions">Permissions</Label>
                    <Select defaultValue="read">
                      <SelectTrigger id="key-permissions">
                        <SelectValue placeholder="Select permissions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="read">Read Only</SelectItem>
                        <SelectItem value="write">Read & Write</SelectItem>
                        <SelectItem value="admin">Full Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="key-expiry">Expiration</Label>
                    <Select defaultValue="never">
                      <SelectTrigger id="key-expiry">
                        <SelectValue placeholder="Select expiration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowNewKeyForm(false)}>
                  Cancel
                </Button>
                <Button>Generate Key</Button>
              </CardFooter>
            </Card>
          )}

          <div className="space-y-4">
            {[
              {
                id: "1",
                name: "Production API Key",
                key: "sk_prod_2023_••••••••••••••••",
                created: "2023-05-15",
                lastUsed: "2023-07-21",
                permissions: "Full Access",
                status: "active",
              },
              {
                id: "2",
                name: "Analytics Integration",
                key: "sk_analytics_••••••••••••••••",
                created: "2023-06-10",
                lastUsed: "2023-07-20",
                permissions: "Read Only",
                status: "active",
              },
              {
                id: "3",
                name: "Development Key",
                key: "sk_dev_2023_••••••••••••••••",
                created: "2023-07-01",
                lastUsed: "2023-07-15",
                permissions: "Read & Write",
                status: "active",
              },
              {
                id: "4",
                name: "Legacy Integration",
                key: "sk_legacy_••••••••••••••••",
                created: "2022-11-20",
                lastUsed: "2023-06-30",
                permissions: "Read Only",
                status: "revoked",
              },
            ].map((apiKey) => (
              <Card key={apiKey.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>{apiKey.name}</CardTitle>
                    <Badge variant={apiKey.status === "active" ? "outline" : "secondary"}>
                      {apiKey.status === "active" ? "Active" : "Revoked"}
                    </Badge>
                  </div>
                  <CardDescription>Created on {apiKey.created}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      <code className="rounded bg-muted px-2 py-1 text-sm">{apiKey.key}</code>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Permissions</p>
                      <p className="font-medium">{apiKey.permissions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Used</p>
                      <p className="font-medium">{apiKey.lastUsed}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  {apiKey.status === "active" ? (
                    <>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Rotate
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Revoke
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="webhooks" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Webhooks</h3>
              <p className="text-sm text-muted-foreground">Configure webhooks for real-time event notifications</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Webhook
            </Button>
          </div>

          <div className="space-y-4">
            {[
              {
                id: "1",
                name: "New User Registration",
                url: "https://example.com/webhooks/users",
                events: ["user.created"],
                status: "active",
                lastTriggered: "2023-07-21",
              },
              {
                id: "2",
                name: "Payment Processing",
                url: "https://example.com/webhooks/payments",
                events: ["payment.succeeded", "payment.failed"],
                status: "active",
                lastTriggered: "2023-07-20",
              },
              {
                id: "3",
                name: "Content Moderation",
                url: "https://example.com/webhooks/moderation",
                events: ["content.flagged", "content.approved", "content.rejected"],
                status: "inactive",
                lastTriggered: "2023-07-15",
              },
            ].map((webhook) => (
              <Card key={webhook.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>{webhook.name}</CardTitle>
                    <Badge variant={webhook.status === "active" ? "outline" : "secondary"}>
                      {webhook.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 text-xs">{webhook.url}</code>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Events</p>
                    <div className="flex flex-wrap gap-2">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="secondary">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Last Triggered</p>
                    <p className="text-sm font-medium">{webhook.lastTriggered}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Test
                  </Button>
                  {webhook.status === "active" ? (
                    <Button variant="outline" size="sm">
                      Disable
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="integrations" className="space-y-4 pt-4">
          <div>
            <h3 className="text-lg font-medium">Third-Party Integrations</h3>
            <p className="text-sm text-muted-foreground">Connect with external services and platforms</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                id: "1",
                name: "Payment Gateway",
                description: "Process payments securely",
                status: "connected",
                icon: "💳",
              },
              {
                id: "2",
                name: "Email Service",
                description: "Send transactional emails",
                status: "connected",
                icon: "📧",
              },
              {
                id: "3",
                name: "Analytics Platform",
                description: "Track user behavior and metrics",
                status: "connected",
                icon: "📊",
              },
              {
                id: "4",
                name: "CRM System",
                description: "Manage customer relationships",
                status: "disconnected",
                icon: "👥",
              },
              {
                id: "5",
                name: "Cloud Storage",
                description: "Store and retrieve data files",
                status: "connected",
                icon: "☁️",
              },
              {
                id: "6",
                name: "AI Content Moderation",
                description: "Automated content screening",
                status: "disconnected",
                icon: "🤖",
              },
            ].map((integration) => (
              <Card key={integration.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                        <span className="text-xl">{integration.icon}</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={integration.status === "connected" ? "outline" : "secondary"}>
                      {integration.status === "connected" ? "Connected" : "Disconnected"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  {integration.status === "connected" ? (
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  ) : (
                    <Button size="sm">Connect</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">API Configuration</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="api-enabled">API Access</Label>
              <p className="text-sm text-muted-foreground">Enable or disable API access to the platform</p>
            </div>
            <Switch id="api-enabled" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate-limit">Rate Limiting (requests per minute)</Label>
            <Input id="rate-limit" type="number" defaultValue="60" min="1" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeout">Request Timeout (seconds)</Label>
            <Input id="timeout" type="number" defaultValue="30" min="1" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="cors-enabled">CORS Support</Label>
              <p className="text-sm text-muted-foreground">Enable Cross-Origin Resource Sharing</p>
            </div>
            <Switch id="cors-enabled" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allowed-origins">Allowed Origins</Label>
            <Textarea
              id="allowed-origins"
              placeholder="Enter allowed origins, one per line"
              className="min-h-[100px]"
              defaultValue="https://example.com
https://app.example.com"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save API Settings"}
          </Button>
        </div>
      </form>
    </div>
  )
}
