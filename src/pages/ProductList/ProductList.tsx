import classNames from 'classnames/bind'

// scss
import style from './ProductList.module.scss'

// components
import AsideFilter from './Components/AsideFilter'
import SortProductList from './Components/SortProductList'
import Product from './Components/Product'
import Carousel from 'src/Components/Carousel'

const cx = classNames.bind(style)

const slides = [
  'https://cf.shopee.vn/file/vn-50009109-7a39522ed87cf07fc399dc600fb0587d_xxhdpi',
  'https://cf.shopee.vn/file/vn-50009109-fb6981047fd0fb38c526ec567aa6071b_xxhdpi',
  'https://cf.shopee.vn/file/vn-50009109-3ea9262b135bdb95adf248cfcf63b204_xxhdpi',
  'https://cf.shopee.vn/file/vn-50009109-0fc7dda14ad435b3daff36b6c864bc8d_xxhdpi'
]

export default function ProductList() {
  return (
    <div>
      <section className={cx('product-slides__wrap')}>
        <div className='container'>
          <div className={cx('product-slides__inner')}>
            <Carousel autoSlides={true}>
              {slides.map((s, index) => (
                <img className={cx('product-slides__img')} src={s} key={index} alt='slides' />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      <div className={cx('product-list__wrap')}>
        <div className='container'>
          <div className='row'>
            <div className='col col-3'>
              <AsideFilter />
            </div>
            <div className='col col-9'>
              <SortProductList />

              <div className={cx('product-list__products')}>
                <div className='row row-cols-5 gy-3'>
                  {/* tạo ra một mảng 30 phần tử nhưng empty thì phải cho fill vào để đổ đầy giá trị là 0 
                  và dùng index để render ra */}
                  {Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index}>
                        <Product />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
