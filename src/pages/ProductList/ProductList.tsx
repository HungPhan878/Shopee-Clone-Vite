/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'

// scss
import style from './ProductList.module.scss'

// components
import AsideFilter from './Components/AsideFilter'
import SortProductList from './Components/SortProductList'
import Product from './Components/Product'
import Carousel from 'src/Components/Carousel'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useQueryParams from 'src/hooks/useQueryParams'
import productApi from 'src/apis/product.api'
import Pagination from './Components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import { isUndefined, omitBy } from 'lodash'

const cx = classNames.bind(style)

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

const slides = [
  'https://cf.shopee.vn/file/vn-50009109-7a39522ed87cf07fc399dc600fb0587d_xxhdpi',
  'https://cf.shopee.vn/file/vn-50009109-fb6981047fd0fb38c526ec567aa6071b_xxhdpi',
  'https://cf.shopee.vn/file/vn-50009109-3ea9262b135bdb95adf248cfcf63b204_xxhdpi',
  'https://cf.shopee.vn/file/vn-50009109-0fc7dda14ad435b3daff36b6c864bc8d_xxhdpi'
]

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  // omitBy dùng để loại trừ giá trị undefine cho queryconfig
  // tạo queryconfig để khi gán query params cho url thì vẫn giữ được những key value khác
  // Khi một biến phụ thuộc một biến thì không cần tạo ra undefine
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '10',
      order: queryParams.order,
      sort_by: queryParams.sort_by,
      category: queryParams.category,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )

  //Get Products
  const getProducts = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProductList(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData
  })

  const products = getProducts.data?.data.data
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
            {products && (
              <div className='col col-9'>
                <SortProductList
                  queryConfig={queryConfig}
                  pageSize={products.pagination.page_size}
                />

                <div className={cx('product-list__products')}>
                  <div className='row row-cols-5 gy-3'>
                    {/* tạo ra một mảng 30 phần tử nhưng empty thì phải cho fill vào để đổ đầy giá trị là 0 
                  và dùng index để render ra */}
                    {products.products.map((product) => (
                      <div key={product._id}>
                        <Product product={product} />
                      </div>
                    ))}
                  </div>
                </div>

                <Pagination queryConfig={queryConfig} pageSize={products.pagination.page_size} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
