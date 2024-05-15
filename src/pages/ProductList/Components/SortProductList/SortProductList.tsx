/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'

//scss
import style from './SortProductList.module.scss'

const cx = classNames.bind(style)

export default function SortProductList() {
  return (
    <div className={cx('sort__wrap')}>
      <div className={cx('sort__inner')}>
        <div className={cx('sort__row')}>
          <div className={cx('sort__label')}>sắp xếp theo</div>
          <button className={cx('sort__btn')}>phổ biến</button>
          <button className={cx('sort__btn', 'sort__btn--active')}>mới nhất</button>
          <button className={cx('sort__btn')}>bán chạy</button>
          <select className={cx('sort__section')} value=''>
            <option value='' className={cx('sort__option')} disabled>
              giá
            </option>
            <option value='price:asc' className={cx('sort__option')}>
              giá: thấp đến cao
            </option>
            <option value='price:desc' className={cx('sort__option')}>
              giá: cao đến thấp
            </option>
          </select>
        </div>

        <div className={cx('sort__row')}>
          <div className={cx('sort__name-page')}>
            <span className={cx('sort__name-page-current')}>1</span>/5
          </div>
          <div className={cx('sort__btns-switch')}>
            <button className={cx('sort__btn-switch', 'disable')}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className={cx('sort__btn-switch-icon')}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 19.5L8.25 12l7.5-7.5'
                />
              </svg>
            </button>
            <button className={cx('sort__btn-switch')}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className={cx('sort__btn-switch-icon')}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
