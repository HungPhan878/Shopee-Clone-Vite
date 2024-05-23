/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'
import { InputHTMLAttributes } from 'react'

//scss
import style from './InputNumber.module.scss'

const cx = classNames.bind(style)

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

// eslint-disable-next-line prettier/prettier
export default function InputNumber({
  className,
  classNameInput,
  classNameError,
  errorMessage,
  onChange,
  ...rest
}: Props) {
  const newClassName = className ? cx(className, 'input-form__wrap') : cx('input-form__wrap')
  const newClassInput = classNameInput ? classNameInput : cx('input-form__input')
  const newClassError = classNameError ? classNameError : cx('input-form__msg')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      onChange && onChange(event)
    }
  }

  return (
    <div className={newClassName}>
      <input className={newClassInput} {...rest} onChange={handleChange} />
      <p className={newClassError}>{errorMessage}</p>
    </div>
  )
}
