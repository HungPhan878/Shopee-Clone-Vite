/* eslint-disable prettier/prettier */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as matchers from '@testing-library/jest-dom/matchers'
import { expect, describe, test } from 'vitest'

// components
import App from './App'
import { BrowserRouter } from 'react-router-dom'

expect.extend(matchers)

describe('App', () => {
  test('render app và chuyển trang', async () => {
    const user = userEvent.setup()

    render(<App />, {
      wrapper: BrowserRouter
    })

    // Verify Trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Shopee Clone | Trang chủ')
      expect(screen.getByText('sắp xếp theo')).toBeInTheDocument()
    })

    // Verify trang login
    await user.click(screen.getByText(/đăng nhập/i))

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Shopee Clone | Đăng Nhập')
    })

    screen.debug(document.body.parentElement as HTMLElement, 888888)
  })
})
