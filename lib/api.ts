// Default request headers
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  // In a real implementation, you would get the token from localStorage, cookies, or a state management solution
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null

  return token
    ? {
        ...DEFAULT_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    : DEFAULT_HEADERS
}

// Generic fetch function with error handling
async function fetchAPI<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
    })

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API request failed with status ${response.status}`)
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T
    }

    // Parse JSON response
    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// HTTP method wrappers
export const api = {
  get: <T,>(url: string, options: RequestInit = {}) => fetchAPI<T>(url, { ...options, method: "GET" }),

  post: <T,>(url: string, data: any, options: RequestInit = {}) =>
    fetchAPI<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T,>(url: string, data: any, options: RequestInit = {}) =>
    fetchAPI<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T,>(url: string, data: any, options: RequestInit = {}) =>
    fetchAPI<T>(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T,>(url: string, options: RequestInit = {}) => fetchAPI<T>(url, { ...options, method: "DELETE" }),

  // For file uploads
  upload: <T,>(url: string, formData: FormData, options: RequestInit = {}) => {
    // Don't set Content-Type header as the browser will set it with the boundary parameter
    const headers = getAuthHeaders()
    delete headers["Content-Type"]

    return fetchAPI<T>(url, {
      ...options,
      method: "POST",
      headers,
      body: formData,
    })
  },
}

export default api
