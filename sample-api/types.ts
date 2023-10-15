export interface PaginationResponse<T = unknown> {
  current: number
  total: number
  size: number
  hasNext: boolean
  hasPrevious: boolean
  data: T[]
}

export interface TError {
  code: string | number
  message: string
  details?: Record<string, TError[]>
}

export type ApiResponse<T = unknown> = {
  message?: string
} & (
  | {
    data?: T
  }
  | {
    error?: TError
  }
)
