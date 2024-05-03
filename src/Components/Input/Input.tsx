/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

//scss
import style from './Input.module.scss'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

const cx = classNames.bind(style)

interface Props {
  className?: string
  placeholder?: string
  type: string
  name: string
  rules?: RegisterOptions
  register: UseFormRegister<any>
  errorMessage?: string
  autoComplete?: string
}

// eslint-disable-next-line prettier/prettier
export default function Input({
  className,
  placeholder,
  type,
  name,
  rules,
  register,
  errorMessage,
  autoComplete
}: Props) {
  return (
    <div className={cx('input-form__wrap')}>
      <input
        type={type}
        placeholder={placeholder}
        className={cx('input-form__input')}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <p className={cx('input-form__msg')}>{errorMessage}</p>
    </div>
  )
}
