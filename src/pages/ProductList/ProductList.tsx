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
import productApi from 'src/apis/product.api'
import Pagination from './Components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import categoriesApi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

const cx = classNames.bind(style)

const slides = [
  'https://cf.shopee.vn/file/vn-50009109-7a39522ed87cf07fc399dc600fb0587d_xxhdpi',
  'https://cf.shopee.vn/file/vn-50009109-fb6981047fd0fb38c526ec567aa6071b_xxhdpi',
  'https://cf.shopee.vn/file/vn-50009109-3ea9262b135bdb95adf248cfcf63b204_xxhdpi',
  'https://cf.shopee.vn/file/vn-50009109-0fc7dda14ad435b3daff36b6c864bc8d_xxhdpi'
]

export default function ProductList() {
  const queryConfig = useQueryConfig()

  //Get Products
  const getProducts = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProductList(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData
  })

  const products = getProducts.data?.data.data

  // get categories
  const getCategories = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getCategories
  })

  const categories = getCategories.data?.data.data

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
              <AsideFilter categories={categories || []} queryConfig={queryConfig} />
            </div>
            {products && (
              <div className='col col-9'>
                <SortProductList
                  queryConfig={queryConfig}
                  pageSize={products.pagination.page_size}
                />

                <div className={cx('product-list__products')}>
                  <div className='row row-cols-5 row-cols-xxl-4 gy-1 gx-1'>
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
