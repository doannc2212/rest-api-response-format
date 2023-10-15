import { mockResponse } from './mock'
import { type ApiResponse } from './types'

function transform ({
  data,
  status
}: {
  data: ApiResponse
  status: number
  method: string[]
}): Response {
  return new Response(JSON.stringify(data, null, 2), { status })
}

Bun.serve({
  fetch (req) {
    const response = new Response('Hello World!')
    const reqKey = req.url.split('/')
    const key = reqKey.pop()
    const type = reqKey.pop()
    if (key !== undefined && type !== undefined) {
      if (!Object.keys(mockResponse).includes(type)) {
        return response
      }
      if (
        !Object.keys(mockResponse[type as keyof typeof mockResponse]).includes(
          key
        )
      ) {
        return response
      }
      const result = mockResponse[type as keyof typeof mockResponse][key]
      if (result.method.includes(req.method)) {
        return transform(result)
      }
    }
    return response
  },
  port: 8000
})

console.log('Server is running on http://localhost:8000')
