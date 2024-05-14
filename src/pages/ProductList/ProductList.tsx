import classNames from 'classnames/bind'

// scss
import style from './ProductList.module.scss'
import AsideFilter from './Components/AsideFilter'
import SortProductList from './Components/SortProductList'
import Product from './Components/Product'

const cx = classNames.bind(style)

export default function ProductList() {
  return (
    <div>
      <div className={cx('product-list__wrap')}>
        <div className='container'>
          <div className='row'>
            <div className='col col-3'>
              <AsideFilter />
            </div>
            <div className='col col-9'>
              <SortProductList />

              <div className={cx('product-list__products')}>
                <div className='row row-cols-5'>
                  {/* tạo ra một mảng 30 phần tử nhưng empty thì phải cho fill vào để đổ đầy giá trị là 0 
                  và dùng index để render ra */}
                  {Array(30)
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
