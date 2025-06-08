"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

export function ProfileSettings() {
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
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
            <AvatarFallback className="text-2xl">JD</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Change Avatar
          </Button>
        </div>
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" defaultValue="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company (Optional)</Label>
            <Input id="company" defaultValue="Acme Inc." />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself"
          defaultValue="Data enthusiast with a focus on financial and geospatial analytics."
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" defaultValue="New York, USA" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select defaultValue="america-new_york">
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="america-new_york">Eastern Time (ET)</SelectItem>
              <SelectItem value="america-chicago">Central Time (CT)</SelectItem>
              <SelectItem value="america-denver">Mountain Time (MT)</SelectItem>
              <SelectItem value="america-los_angeles">Pacific Time (PT)</SelectItem>
              <SelectItem value="etc-utc">UTC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="interests">Data Interests</Label>
          <Select defaultValue="financial">
            <SelectTrigger id="interests">
              <SelectValue placeholder="Select primary interest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial">Financial Data</SelectItem>
              <SelectItem value="geospatial">Geospatial Data</SelectItem>
              <SelectItem value="healthcare">Healthcare Data</SelectItem>
              <SelectItem value="environmental">Environmental Data</SelectItem>
              <SelectItem value="retail">Retail Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input id="website" type="url" placeholder="https://example.com" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
