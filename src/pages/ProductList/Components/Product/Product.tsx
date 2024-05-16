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
            src='https://cf.product-image.s.zigzag.kr/original/d/2023/5/5/17690_202305052315330237_88310.jpeg'
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
