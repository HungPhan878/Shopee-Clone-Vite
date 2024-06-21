import { AxiosError, isAxiosError } from 'axios'
import { expect, describe, it } from 'vitest'

//decribe là mô tả các ngữ cánh hoặc tên của các component, funtion cần test
describe('isAxiosError', () => {
  // it : là dùng để ghi chú trường hợp cần test
  it('isAxiosError return boolean', () => {
    // expect : là dùng để kì vọng kết quả trả về
    // Khi thay đổi logic trong code thì phải thay đôi file test luôn nha
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})
