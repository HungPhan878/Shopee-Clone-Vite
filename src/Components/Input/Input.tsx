/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

//scss
import style from './Input.module.scss'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

const cx = classNames.bind(style)

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  rules?: RegisterOptions
  register?: UseFormRegister<any>
  errorMessage?: string
  name?: string
  classNameInput?: string
  classNameError?: string
}

// eslint-disable-next-line prettier/prettier
export default function Input({
  className,
  classNameInput,
  classNameError,
  name,
  rules,
  register,
  errorMessage,
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : null
  const newClassName = className ? cx(className, 'input-form__wrap') : cx('input-form__wrap')
  const newClassInput = classNameInput ? classNameInput : cx('input-form__input')
  const newClassError = classNameError ? classNameError : cx('input-form__msg')
  return (
    <div className={newClassName}>
      <input className={newClassInput} {...registerResult} {...rest} />
      <p className={newClassError}>{errorMessage}</p>
    </div>
  )
}
