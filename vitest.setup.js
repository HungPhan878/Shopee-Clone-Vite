import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import config from 'src/constants/config'

const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0yNlQxNDozMDoyMC4zMTFaIiwiaWF0IjoxNzE5NDEyMjIwLCJleHAiOjE3MTk0MjIyMjB9.w7AtSboxO8Lmwv6mQ8ix7jpuo9RuTf0euIBwYVr_qFU',
    expires: 10000,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0yNlQxNDozMDoyMC4zMTFaIiwiaWF0IjoxNzE5NDEyMjIwLCJleHAiOjE3Mjk0MTIyMjB9.TFdldAb-XmdZw4hbVjFgFVURImC_5Hxy8PQXyPs2P-Q',
    expires_refresh_token: 10000000,
    user: {
      _id: '660dfae7a71a6c029dec325b',
      roles: ['User'],
      email: 'hungphan@gmail.com',
      createdAt: '2024-04-04T00:57:11.695Z',
      updatedAt: '2024-06-14T14:03:38.619Z',
      __v: 0,
      avatar: '9b82bbf8-8df0-44f6-8ca3-15e1357877f8.jpg',
      name: 'Rich Grimers 7',
      address: 'Vũng thùng 1 khu B 107',
      date_of_birth: '1999-09-16T17:00:00.000Z',
      phone: '0934940535'
    }
  }
}

export const loginRequest = [
  http.post(`${config.baseURL}login`, () => {
    return HttpResponse.json(loginRes)
  })
]

const server = setupServer(...loginRequest)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
