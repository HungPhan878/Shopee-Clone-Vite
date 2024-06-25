/* eslint-disable import/no-named-as-default */
/* eslint-disable prettier/prettier */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as matchers from '@testing-library/jest-dom/matchers'
import { expect, describe, test } from 'vitest'

// components
import App from './App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
// import { logScreen } from './utils/testUtils'

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
  })

  test('Not found', async () => {
    const badRoute = '/some/bad/route'
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    )
    // Verify trang not found
    await waitFor(() => {
      expect(screen.getByText('The stuff you were looking for does not exist')).toBeInTheDocument()
    })

    // screen.debug(document.body.parentElement as HTMLElement, 888888)

    // await logScreen()
  })
})
