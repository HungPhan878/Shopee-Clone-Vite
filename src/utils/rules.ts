/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}
//Cấu hình type cho key của getRules lỡ khi bâm nhầm key required còn báo lỗi để cho ta sửa chữa

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Vui lòng điền email'
    },
    maxLength: {
      value: 160,
      message: 'Vui lòng nhập không quá 160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Vui lòng nhập không dưới 5 kí tự'
    },
    pattern: {
      value: /.*@[a-z0-9.-]*/i,
      message: 'Nhập email không đúng'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Vui lòng điền password'
    },
    maxLength: {
      value: 160,
      message: 'Vui lòng nhập không quá 160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Vui lòng nhập không dưới 6 kí tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Vui lòng điền lại password'
    },
    maxLength: {
      value: 160,
      message: 'Vui lòng nhập không quá 160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Vui lòng nhập không dưới 6 kí tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại mật khẩu không đúng'
        : undefined
  }
})

export const schema = yup.object().shape({
  email: yup
    .string()
    .required('Vui lòng điền email')
    .min(5, 'Vui lòng nhập không dưới 5 kí tự')
    .max(160, 'Vui lòng nhập không quá 160 kí tự')
    .email('Nhập email không đúng'),
  password: yup
    .string()
    .required('Vui lòng điền password')
    .min(6, 'Vui lòng nhập không dưới 6 kí tự')
    .max(160, 'Vui lòng nhập không quá 160 kí tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng điền lại password')
    .min(6, 'Vui lòng nhập không dưới 6 kí tự')
    .max(160, 'Vui lòng nhập không quá 160 kí tự')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp')
})
export const loginSchema = schema.pick(['email', 'password'])

export type LoginSchemaType = yup.InferType<typeof loginSchema>
export type SchemaType = yup.InferType<typeof schema>