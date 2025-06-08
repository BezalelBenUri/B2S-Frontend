/**
 * Dataset service for handling dataset operations
 */
import api from "../api"
import { DATASET_ENDPOINTS } from "../api-endpoints"

// Types
interface Dataset {
  id: string
  title: string
  description: string
  category: string
  price: number
  seller: {
    id: string
    name: string
    rating: string
  }
  rating: string
  reviews: number
  tags: string[]
  sampleAvailable: boolean
  createdAt: string
  updatedAt: string
}

interface DatasetListResponse {
  results: Dataset[]
  count: number
  next: string | null
  previous: string | null
}

interface DatasetFilterParams {
  category?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  tags?: string[]
  format?: string
  sortBy?: string
}

interface DatasetCreateData {
  title: string
  description: string
  category: string
  price: number
  tags: string[]
  dataFormat: string
  sampleFile?: File
  dataFile: File
}

// Dataset service methods
const DatasetService = {
  // Get all datasets with pagination
  getDatasets: (page = 1, pageSize = 10) =>
    api.get<DatasetListResponse>(DATASET_ENDPOINTS.LIST + `?page=${page}&page_size=${pageSize}`),

  // Get dataset by ID
  getDataset: (datasetId: string | number) => api.get<Dataset>(DATASET_ENDPOINTS.DETAIL(datasetId)),

  // Search datasets
  searchDatasets: (query: string, page = 1, pageSize = 10) =>
    api.get<DatasetListResponse>(DATASET_ENDPOINTS.SEARCH(query) + `&page=${page}&page_size=${pageSize}`),

  // Filter datasets
  filterDatasets: (filters: DatasetFilterParams, page = 1, pageSize = 10) =>
    api.get<DatasetListResponse>(DATASET_ENDPOINTS.FILTER({ ...filters, page, page_size: pageSize })),

  // Get featured datasets
  getFeaturedDatasets: () => api.get<Dataset[]>(DATASET_ENDPOINTS.FEATURED),

  // Get dataset categories
  getCategories: () => api.get<string[]>(DATASET_ENDPOINTS.CATEGORIES),

  // Get dataset tags
  getTags: () => api.get<string[]>(DATASET_ENDPOINTS.TAGS),

  // Create a new dataset
  createDataset: (datasetData: DatasetCreateData) => {
    const formData = new FormData()

    // Append text fields
    formData.append("title", datasetData.title)
    formData.append("description", datasetData.description)
    formData.append("category", datasetData.category)
    formData.append("price", datasetData.price.toString())
    formData.append("dataFormat", datasetData.dataFormat)

    // Append tags as JSON string
    formData.append("tags", JSON.stringify(datasetData.tags))

    // Append files
    formData.append("dataFile", datasetData.dataFile)
    if (datasetData.sampleFile) {
      formData.append("sampleFile", datasetData.sampleFile)
    }

    return api.upload<Dataset>(DATASET_ENDPOINTS.CREATE, formData)
  },

  // Update a dataset
  updateDataset: (datasetId: string | number, datasetData: Partial<DatasetCreateData>) => {
    const formData = new FormData()

    // Append text fields if they exist
    if (datasetData.title) formData.append("title", datasetData.title)
    if (datasetData.description) formData.append("description", datasetData.description)
    if (datasetData.category) formData.append("category", datasetData.category)
    if (datasetData.price) formData.append("price", datasetData.price.toString())
    if (datasetData.dataFormat) formData.append("dataFormat", datasetData.dataFormat)

    // Append tags as JSON string if they exist
    if (datasetData.tags) formData.append("tags", JSON.stringify(datasetData.tags))

    // Append files if they exist
    if (datasetData.dataFile) formData.append("dataFile", datasetData.dataFile)
    if (datasetData.sampleFile) formData.append("sampleFile", datasetData.sampleFile)

    return api.upload<Dataset>(DATASET_ENDPOINTS.UPDATE(datasetId), formData)
  },

  // Delete a dataset
  deleteDataset: (datasetId: string | number) => api.delete(DATASET_ENDPOINTS.DELETE(datasetId)),

  // Get dataset preview
  getDatasetPreview: (datasetId: string | number) => api.get(DATASET_ENDPOINTS.PREVIEW(datasetId)),

  // Download dataset
  downloadDataset: (datasetId: string | number) => {
    // This will trigger a file download
    window.location.href = DATASET_ENDPOINTS.DOWNLOAD(datasetId)
    return Promise.resolve()
  },

  // Get dataset sample
  getDatasetSample: (datasetId: string | number) => api.get(DATASET_ENDPOINTS.SAMPLE(datasetId)),
}

export default DatasetService
