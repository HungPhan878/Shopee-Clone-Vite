/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

// scss
import style from './AsideFilter.module.scss'
import Input from 'src/Components/Input'
import Button from 'src/Components/Button'

const cx = classNames.bind(style)

export default function AsideFilter() {
  return (
    <div className={cx('aside-inner')}>
      <Link to='#' className={cx('aside-label')}>
        <svg viewBox='0 0 12 10' className={cx('aside-icon')}>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        tất cả danh mục
      </Link>

      <div className={cx('aside-separate')}></div>

      <ul className={cx('category-list')}>
        <li className={cx('category-item')}>
          <Link to='#' className={cx('category-link')}>
            đồng hồ
          </Link>
        </li>
        <li className={cx('category-item')}>
          <Link to='#' className={cx('category-link')}>
            áo thun
          </Link>
        </li>
        <li className={cx('category-item')}>
          <Link to='#' className={cx('category-link')}>
            điện thoại
          </Link>
        </li>
      </ul>

      <div className={cx('aside-filter')}>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className={cx('aside-icon')}
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        bộ lọc tìm kiếm
      </div>

      <div className={cx('aside-filter__wrap')}>
        <div className={cx('aside-filter__price')}>
          <div>Khoảng giá</div>
          <form className={cx('aside-form')}>
            <div className={cx('aside-form__row')}>
              <Input
                type='text'
                name='from'
                placeholder='₫ TỪ'
                className={cx('aside-form__input-wrap')}
                classNameInput={cx('aside-form__input')}
              />
              <div className={cx('aside-form__separate')}>-</div>
              <Input
                type='text'
                name='to'
                placeholder='₫ ĐẾN'
                className={cx('aside-form__input-wrap')}
                classNameInput={cx('aside-form__input')}
              />
            </div>

            <Button>Áp Dụng</Button>
          </form>
        </div>
      </div>

      <div className={cx('aside-separate')}></div>

      <div className={cx('aside-filter__label')}>đánh giá</div>
      <ul className={cx('aside-stars')}>
        <li className={cx('aside-star')}>
          <Link to='#' className={cx('aside-star__link')}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <span key={index}>
                  <svg viewBox='0 0 9.5 8' className={cx('aside-star__icon')}>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g
                      fill='url(#ratingStarGradient)'
                      fillRule='evenodd'
                      stroke='none'
                      strokeWidth={1}
                    >
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              ))}
            <span>trở lên</span>
          </Link>
        </li>
      </ul>

      <div className={cx('aside-separate')}></div>

      <Button>Xóa tất cả</Button>
    </div>
  )
}
