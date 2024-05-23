import classNames from 'classnames/bind'

// scss
import style from './ProductDetail.module.scss'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'

const cx = classNames.bind(style)

export default function ProductDetail() {
  const { id } = useParams()

  // Get productDetail
  const productDetail = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetail?.data?.data.data

  console.log(product)

  return <section className={cx('product-wrap')}>ProductDetail</section>
}
