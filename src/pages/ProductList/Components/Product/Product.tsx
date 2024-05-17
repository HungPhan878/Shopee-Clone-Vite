/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'

// scss
import style from './Product.module.scss'
import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/types/product.type'

const cx = classNames.bind(style)

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to='#'>
      <article className={cx('product-wrap')}>
        <div className={cx('product-inner')}>
          <img src={product.image} alt={product.name} className={cx('product-img')} />
        </div>

        <section className={cx('product-info')}>
          <h3 className={cx('product-heading')}>{product.name}</h3>
          <div className={cx('product-row')}>
            <div className={cx('product-price__old')}>
              <span>đ</span>
              <span>{product.price_before_discount}</span>
            </div>

            <div className={cx('product-price__curr')}>
              <span>đ</span>
              <span>{product.price}</span>
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
              <span>{product.sold}</span>
              <span>Đã bán</span>
            </div>
          </div>
          <div className={cx('product-national')}>US-UK</div>
        </section>
      </article>
    </Link>
  )
}
