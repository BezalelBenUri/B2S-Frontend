"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuthService } from "@/lib/api-services"
import { CountryCodeSelector } from "@/components/ui/country-code-selector"

interface Props {
  className?: string
}

export function RegisterForm({ className }: Props) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    userType: "customer",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [countryCode, setCountryCode] = useState("+1")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const registrationData = {
        email: formData.email,
        phone_number: `${countryCode}${formData.phone}`,
        password: formData.password,
        user_type: formData.userType === "customer" ? "buyer" : "seller",
        username: formData.email.split("@")[0],
      }

      await AuthService.register(registrationData)

      // Store the email for OTP verification
      AuthService.setPendingVerification(formData.email)

      // Redirect to OTP verification page
      router.push("/auth/verify-otp")
    } catch (err) {
      console.error("Registration error:", err)
      setError(err instanceof Error ? err.message : "Failed to register. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("grid gap-4", className)}>
      <div>
        <Label htmlFor="userType">User Type</Label>
        <Select
          id="userType"
          name="userType"
          value={formData.userType}
          onValueChange={(value) => setFormData((prevData) => ({ ...prevData, userType: value }))}
          disabled={isLoading}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select user type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="vendor">Vendor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleInputChange}
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex gap-2">
          <CountryCodeSelector value={countryCode} onValueChange={setCountryCode} disabled={isLoading} />
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="flex-1"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleInputChange}
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          disabled={isLoading}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button disabled={isLoading}>{isLoading ? "Registering..." : "Register"}</Button>
    </form>
  )
}
