export interface LoginCredentials {
  email?: string
  phone?: string
  password: string
}

export interface RegisterData {
  email: string
  phone_number: string
  password: string
  user_type: "buyer" | "seller" | "both"
  username: string
}

export interface OTPVerificationData {
  email: string
  otp: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data?: {
    user: {
      id: string
      email: string
      phone_number: string
      user_type: "buyer" | "seller" | "both" | "admin"
      username: string
      is_verified: boolean
    }
    token: string
  }
}

export interface User {
  id: string
  email: string
  phone_number: string
  user_type: "buyer" | "seller" | "both" | "admin"
  username: string
  is_verified: boolean
}

class AuthServiceClass {
  private readonly TOKEN_KEY = "authToken"
  private readonly USER_KEY = "userData"
  private readonly PENDING_VERIFICATION_KEY = "pendingVerification"

  // Login method with temporary mock for UI testing
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // TODO: Replace this mock with real API call when endpoints are ready
      // const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials)

      // TEMPORARY MOCK FOR UI TESTING - Remove when real API is ready
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

      const mockResponse: AuthResponse = {
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: "buyer-123",
            email: credentials.email || "buyer@example.com",
            phone_number: credentials.phone || "+1234567890",
            user_type: "admin", // Always return buyer for UI testing
            username: "Test Buyer",
            is_verified: true,
          },
          token: "mock-jwt-token-" + Date.now(),
        },
      }

      if (mockResponse.success && mockResponse.data) {
        // Store token and user data
        this.setToken(mockResponse.data.token)
        this.setUser(mockResponse.data.user)
      }

      return mockResponse
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  // Register method with temporary mock for UI testing
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // TODO: Replace this mock with real API call when endpoints are ready
      // const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, data)

      // TEMPORARY MOCK FOR UI TESTING - Remove when real API is ready
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate network delay

      const mockResponse: AuthResponse = {
        success: true,
        message: "Registration successful. Please verify your email with the OTP sent to your email address.",
        data: {
          user: {
            id: "user-" + Date.now(),
            email: data.email,
            phone_number: data.phone_number,
            user_type: data.user_type,
            username: data.username,
            is_verified: false, // Require OTP verification
          },
          token: "temp-token-" + Date.now(),
        },
      }

      if (mockResponse.success) {
        // Store email for OTP verification
        this.setPendingVerification(data.email)
      }

      return mockResponse
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  // OTP Verification method with temporary mock
  async verifyOTP(data: OTPVerificationData): Promise<AuthResponse> {
    try {
      // TODO: Replace this mock with real API call when endpoints are ready
      // const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.VERIFY_OTP, data)

      // TEMPORARY MOCK FOR UI TESTING - Remove when real API is ready
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

      // Simple OTP validation for testing (accept any 6-digit code)
      if (data.otp.length !== 6) {
        throw new Error("Invalid OTP. Please enter a 6-digit code.")
      }

      const mockResponse: AuthResponse = {
        success: true,
        message: "OTP verified successfully",
        data: {
          user: {
            id: "user-" + Date.now(),
            email: data.email,
            phone_number: "+1234567890",
            user_type: "buyer", // Default to buyer for testing
            username: "Verified User",
            is_verified: true,
          },
          token: "verified-token-" + Date.now(),
        },
      }

      if (mockResponse.success && mockResponse.data) {
        // Store token and user data after successful verification
        this.setToken(mockResponse.data.token)
        this.setUser(mockResponse.data.user)
        // Clear pending verification
        this.clearPendingVerification()
      }

      return mockResponse
    } catch (error) {
      console.error("OTP verification error:", error)
      throw error
    }
  }

  // Token management
  setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.TOKEN_KEY, token)
    }
  }

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.TOKEN_KEY)
    }
    return null
  }

  // User data management
  setUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    }
  }

  getUser(): User | null {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem(this.USER_KEY)
      return userData ? JSON.parse(userData) : null
    }
    return null
  }

  // Get user role
  getUserRole(): "buyer" | "seller" | "both" | "admin" | null {
    const user = this.getUser()
    return user ? user.user_type : null
  }

  // Pending verification management
  setPendingVerification(email: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.PENDING_VERIFICATION_KEY, email)
    }
  }

  getPendingVerification(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.PENDING_VERIFICATION_KEY)
    }
    return null
  }

  clearPendingVerification(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.PENDING_VERIFICATION_KEY)
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  // Logout
  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.TOKEN_KEY)
      localStorage.removeItem(this.USER_KEY)
      localStorage.removeItem(this.PENDING_VERIFICATION_KEY)
    }
  }

  // Get redirect path based on user role
  getRedirectPath(userRole: "buyer" | "seller" | "both" | "admin"): string {
    switch (userRole) {
      case "admin":
        return "/dashboard"
      case "buyer":
        return "/dashboard"
      case "seller":
        return "/dashboard"
      case "both":
        // For users who are both buyers and sellers, redirect to role selection
        return "/dashboard/role-selection"
      default:
        return "/dashboard"
    }
  }
}

// Export as default to match existing imports
const AuthService = new AuthServiceClass()
export default AuthService
