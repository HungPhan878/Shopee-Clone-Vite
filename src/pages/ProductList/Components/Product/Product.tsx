/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'

// scss
import style from './Product.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(style)

export default function Product() {
  return (
    <Link to='#'>
      <article className={cx('product-wrap')}>
        <div className={cx('product-inner')}>
          <img
            src='data:image/jpeg;base64,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'
            alt='voan'
            className={cx('product-img')}
          />
        </div>

        <section className={cx('product-info')}>
          <h3 className={cx('product-heading')}>
            Áo sơ mi voan tay phồng KABICO áo sơ mi nữ xẻ sau khoác ngoài mặc đi biển, du lịch form
            rộng dài tay mỏng nhẹ
          </h3>
          <div className={cx('product-row')}>
            <div className={cx('product-price__old')}>
              <span>đ</span>
              <span>990000</span>
            </div>

            <div className={cx('product-price__curr')}>
              <span>đ</span>
              <span>890000</span>
            </div>
          </div>

          <div className={cx('product-row')}>
            <div className={cx('product-rating')}>
              <div className={cx('product-star')}>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className={cx('product-star__icon')}
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                className={cx('product-star__icon--empty')}
              >
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>

            <div className={cx('product-sold')}>
              <span>7k</span>
              <span>Đã bán</span>
            </div>
          </div>
          <div className={cx('product-national')}>US-UK</div>
        </section>
      </article>
    </Link>
  )
}
