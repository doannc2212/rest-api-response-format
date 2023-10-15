export interface PaginationResponse<T = unknown> {
  current: number
  total: number
  size: number
  hasNext: boolean
  hasPrevious: boolean
  data: T[]
}

export interface ApiError {
  code: string | number
  message: string
  details?: Record<string, ApiError[]>
}

export interface ApiResponse<T = unknown> {
  message?: string
  data?: T
  error?: ApiError
}
