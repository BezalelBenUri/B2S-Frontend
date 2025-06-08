"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/api-services"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function OTPVerificationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))
  const email = AuthService.getPendingVerification()

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(0, 1) // Only take the first character

    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle key down
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")

    // Check if pasted data is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)

      // Focus the last input
      inputRefs.current[5]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Check if OTP is complete
    if (otp.some((digit) => !digit)) {
      setError("Please enter all 6 digits of the OTP")
      return
    }

    if (!email) {
      setError("No email found for verification. Please try registering again.")
      return
    }

    setIsLoading(true)

    try {
      const otpString = otp.join("")

      const response = await AuthService.verifyOTP({
        email,
        otp: otpString,
      })

      // Store the token
      if (response.data.token) {
        AuthService.setAuthTokens(response.data.token)
        AuthService.clearPendingVerification()

        // Redirect based on user type
        const userType = response.data.user.user_type
        if (userType === "seller") {
          router.push("/dashboard/seller")
        } else if (userType === "buyer") {
          router.push("/dashboard/buyer")
        } else {
          router.push("/dashboard")
        }
      } else {
        throw new Error("No token received from server")
      }
    } catch (err) {
      console.error("OTP verification error:", err)
      setError(err instanceof Error ? err.message : "Failed to verify OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>Enter the 6-digit code sent to {email || "your email"}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="otp-input">Verification Code</Label>
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-xl"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Time remaining: <span className="font-medium">{formatTime(timeLeft)}</span>
            </p>
            {timeLeft <= 0 && (
              <p className="text-sm text-destructive mt-1">OTP has expired. Please request a new one.</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading || timeLeft <= 0 || otp.some((digit) => !digit)}>
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={() => router.push("/auth/register")}>
            Back to Registration
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
