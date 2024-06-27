import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import authRequests from './src/msw/auth.msw'
import userRequests from './src/msw/user.msw'
import productRequests from './src/msw/product.msw'

const server = setupServer(...authRequests, ...userRequests, ...productRequests)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
