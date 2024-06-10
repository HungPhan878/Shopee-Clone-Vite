/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames/bind'

// scss
import style from './DateSelect.module.scss'
import range from 'lodash/range'
import { useState } from 'react'

const cx = classNames.bind(style)

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ onChange, value, errorMessage }: Props) {
  // state local to manage form
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    const newDate = {
      ...date,
      [name]: value
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className={cx('date-form__row')}>
      <label className={cx('date-label')}>Date of Birth</label>
      <div className={cx('date-input__wrap')}>
        <div className={cx('date-select__inner')}>
          <select
            name='date'
            value={value?.getDate() || date.date}
            onChange={handleChange}
            className={cx('date-select')}
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            name='month'
            value={value?.getMonth() || date.month}
            onChange={handleChange}
            className={cx('date-select')}
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>

          <select
            name='year'
            value={value?.getFullYear() || date.year}
            onChange={handleChange}
            className={cx('date-select')}
          >
            <option disabled>Năm</option>
            {range(1990, 2025).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <p className={cx('date-input__msg')}>{errorMessage}</p>
      </div>
    </div>
  )
}
