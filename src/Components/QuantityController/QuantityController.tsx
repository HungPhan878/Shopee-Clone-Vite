/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'

// scss
import style from './QuantityController.module.scss'

// components
import InputNumber, { InputNumberProps } from 'src/Components/InputNumber'

const cx = classNames.bind(style)

interface Props extends InputNumberProps {
  onDecrease?: (value: number) => void
  onIncrease?: (value: number) => void
  // Đặt type không đặt change vì sẽ trùng với tên type bên inputNumber
  onType?: (value: number) => void
  max?: number
  classNameWrap?: string
}

export default function QuantityController({
  onDecrease,
  onIncrease,
  onType,
  value,
  max,
  classNameWrap,
  ...rest
}: Props) {
  const newClassName = classNameWrap
    ? cx('product-qty__btns', classNameWrap)
    : cx('product-qty__btns')

  // handler function
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
  }

  const handleIncrease = () => {
    let _value = Number(value) + 1

    if (max !== undefined && _value > max) {
      _value = max
    }

    onIncrease && onIncrease(_value)
  }

  // chỉ có input có handle thì dùng event lấy ra value thoi
  // còn button thì onClick thì lấy ra đầu value mà truyền vào input nên
  // dùng state nha.
  const handleDecrease = () => {
    let _value = Number(value) - 1

    if (_value < 1) {
      _value = 1
    }

    onDecrease && onDecrease(_value)
  }

  return (
    <div className={newClassName}>
      <button className={cx('product-qty__btn-minos')} onClick={handleDecrease}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className={cx('product-qty__btn-icon')}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>

      <InputNumber
        // chỉ khi truyền value number vào thì hàm handleChange trong InputNumber mới hoạt động đúng nha
        className={cx('product-qty__input-wrap')}
        classNameInput={cx('product-qty__input')}
        classNameError={cx('product-qty__input-err')}
        // chúng ta không truyền từ react hf thì truyền f tự custom thôi
        onChange={handleChange}
        value={value}
        {...rest}
      />

      <button className={cx('product-qty__btn-plus')} onClick={handleIncrease}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className={cx('product-qty__btn-icon')}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
