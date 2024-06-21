/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, isAxiosError } from 'axios'
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'
import { expect, describe, it } from 'vitest'
import { isAxiosUnprocessableEntityError } from '../util'

//decribe là mô tả các ngữ cánh hoặc tên của các component, funtion cần test
describe('isAxiosError', () => {
  // it : là dùng để ghi chú trường hợp cần test
  it('isAxiosError return boolean', () => {
    // expect : là dùng để kì vọng kết quả trả về
    // Khi thay đổi logic trong code thì phải thay đôi file test luôn nha
    expect(isAxiosError(new AxiosError())).toBe(true)
    expect(isAxiosError(new Error())).toBe(false)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  it('isAxiosUnprocessableEntityError return boolean', () => {
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)

    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          // đầy là cách truyền responsize có mã lối (status) trả về 500
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false)
  })
})
