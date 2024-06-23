import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as matchers from '@testing-library/jest-dom/matchers'
import { expect, describe, test } from 'vitest'

// components
import App from './App'
import { BrowserRouter } from 'react-router-dom'

expect.extend(matchers)

describe('App', async () => {
  test('render app và chuyển trang', () => {
    render(<App />, {
      wrapper: BrowserRouter
    })

    screen.debug()
  })
})
