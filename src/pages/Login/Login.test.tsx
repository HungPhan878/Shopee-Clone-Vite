import { screen, waitFor } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { expect, describe, test } from 'vitest'

// components
import { renderWithRoute } from 'src/utils/testUtils'
import path from 'src/constants/path'

expect.extend(matchers)

describe('Login', () => {
  test('Hiển thị lỗi required when do not enter form', async () => {
    const { user } = renderWithRoute({ route: path.login })

    // Hàm waiFor
    // + Ngưng khi hết time out or expect pass
    // + Đối số thứ 2 là một {timeout, interval}
    // + Default timeout = 1000ms, interval = 50ms
    // + Hàm expect sau mỗi 50ms sẽ chạy cho đến khi trả về true or hết timout
    // + Trả về một promise nên dùng await

    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email/Số điện thoại/Tên đăng nhập')).toBeInTheDocument()
    })

    const submitForm = document.querySelector('form button[type="submit"]') as Element
    user.click(submitForm)

    expect(await screen.findByText('Vui lòng điền email')).toBeTruthy()
    expect(await screen.findByText('Vui lòng điền password')).toBeTruthy()

    // await logScreen() : Dùng để debug có render ra được hay không
  })
})
