import { type ApiResponse } from './types'

const successSingle: ApiResponse = {
  message: 'Success',
  data: {
    id: 10,
    name: 'shirt',
    color: 'red',
    price: '$23'
  }
}

const successList: ApiResponse = {
  message: 'Success',
  data: {
    current: 5,
    total: 64,
    size: 20,
    hasNext: true,
    hasPrevious: true,
    data: [
      {
        id: 10,
        name: 'shirt',
        color: 'red',
        price: '$123'
      },
      {
        id: 11,
        name: 'coat',
        color: 'black',
        price: '$2300'
      }
    ]
  }
}

const successCreate: ApiResponse = {
  message: 'The item was created successfully'
}

const successDelete: ApiResponse = {
  message: 'The item was deleted successfully'
}

const successUpdateEntity: ApiResponse = {
  message: 'The item was updated successfully',
  data: {
    id: 10,
    name: 'shirt',
    color: 'red',
    price: '$23'
  }
}

const successUpdateBlank: ApiResponse = {
  message: 'Success'
}

const failureNotFound: ApiResponse = {
  message: 'The item does not exist' /* skip or optional error message */,
  error: {
    code: 'ERR_NOT_FOUND',
    message: 'The item does not exist'
  }
}

const failureInvalidInput: ApiResponse = {
  message: 'The item does not exist',
  error: {
    code: 'ERR_INVALID_INPUT',
    message: 'Invalid input data.',
    details: {
      email: [
        {
          message: 'Oops! The value is invalid',
          code: 34
        }
      ],
      phoneNumber: [
        {
          message: 'Oops! The format is not correct',
          code: 35
        }
      ]
    }
  }
}

const failureUnauthorized: ApiResponse = {
  error: {
    code: 'ERR_INCORRECT_CREDENTIAL',
    message: 'Incorrect authentication credentials'
  }
}

const failureConflict: ApiResponse = {
  error: {
    code: 'ERR_CONFLICT',
    message: 'Any message which should help the user to resolve the conflict'
  }
}

const failureRateLimit: ApiResponse = {
  error: {
    code: 'ERR_RATE_LIMIT',
    message:
      'The request cannot be served due to the rate limit having been exhausted for the resource'
  }
}

const failureForbidden: ApiResponse = {
  error: {
    code: 'ERR_FORBIDDEN',
    message:
      'The request is understood, but it has been refused or access is not allowed'
  }
}

const failureInternal: ApiResponse = {
  error: {
    code: 'ERR_INTERNAL_SERVER',
    message: 'Something is broken'
  }
}

const failureBadGateway: ApiResponse = {
  error: {
    code: 'ERR_SERVICE_UNAVAILABLE',
    message: 'The server is up, but overloaded with requests. Try again later!'
  }
}
interface MockResponse {
  success: Record<
  string,
  { data: ApiResponse, status: number, method: string[] }
  >
  failure: Record<
  string,
  { data: ApiResponse, status: number, method: string[] }
  >
}

export const mockResponse: MockResponse = {
  success: {
    single: {
      data: successSingle,
      status: 200,
      method: ['GET']
    },
    list: {
      data: successList,
      status: 200,
      method: ['GET']
    },
    create: {
      data: successCreate,
      status: 201,
      method: ['POST']
    },
    updateEntity: {
      data: successUpdateEntity,
      status: 200,
      method: ['PATCH']
    },
    updateBlank: {
      data: successUpdateBlank,
      status: 204,
      method: ['PATCH']
    },
    delete: {
      data: successDelete,
      status: 204,
      method: ['DELETE']
    }
  },
  failure: {
    notFound: {
      data: failureNotFound,
      status: 404,
      method: ['GET', 'DELETE', 'PATCH']
    },
    invalidInput: {
      data: failureInvalidInput,
      status: 400,
      method: ['POST', 'PATCH']
    },
    unauthorized: {
      data: failureUnauthorized,
      status: 401,
      method: ['GET', 'POST', 'PATCH', 'DELETE']
    },
    forbidden: {
      data: failureForbidden,
      status: 403,
      method: ['GET', 'POST', 'PATCH', 'DELETE']
    },
    conflict: {
      data: failureConflict,
      status: 409,
      method: ['GET', 'POST', 'PATCH', 'DELETE']
    },
    rateLimit: {
      data: failureRateLimit,
      status: 429,
      method: ['GET', 'POST', 'PATCH', 'DELETE']
    },
    internal: {
      data: failureInternal,
      status: 500,
      method: ['GET', 'POST', 'PATCH', 'DELETE']
    },
    badGateway: {
      data: failureBadGateway,
      status: 503,
      method: ['GET', 'POST', 'PATCH', 'DELETE']
    }
  }
}
