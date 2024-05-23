/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { Link, createSearchParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

// scss
import style from './AsideFilter.module.scss'

// components
import Button from 'src/Components/Button'
import { Category } from 'src/types/category.type'
import { QueryConfig } from '../../ProductList'
import path from 'src/constants/path'
import InputNumber from 'src/Components/InputNumber'
import { Controller, useForm } from 'react-hook-form'
import { SchemaType, schema } from 'src/utils/rules'

const cx = classNames.bind(style)

interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}

type FormData = Pick<SchemaType, 'price_min' | 'price_max'>

const priceSchema = schema.pick(['price_min', 'price_max'])

// Rule validates of price
// th1: nếu có cả hai giá trị price(min and max) thì max > min
// th2: nếu chỉ có một giá trị min or max thì được(min or max !== '')

export default function AsideFilter(props: Props) {
  const { categories, queryConfig } = props
  const { category } = queryConfig

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  })
  const priceForm = watch()
  console.log(priceForm)
  console.log(errors)
  // handler function
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className={cx('aside-inner')}>
      <Link to={path.home} className={cx('aside-label', { 'aside-label--active': !category })}>
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
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className={cx('category-item')} key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={cx('category-link', { 'category-link--active': isActive })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className={cx('category-item__icon')}>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                <span>{categoryItem.name}</span>
              </Link>
            </li>
          )
        })}
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
          <form className={cx('aside-form')} onSubmit={onSubmit}>
            <div className={cx('aside-form__row')}>
              <Controller
                control={control}
                name='price_min'
                render={({ field }) => (
                  <InputNumber
                    type='text'
                    placeholder='₫ TỪ'
                    className={cx('aside-form__input-wrap')}
                    classNameInput={cx('aside-form__input')}
                    // truyền event của input vào react hook form để quản lý data
                    onChange={field.onChange}
                    // lấy value của react hf ta đã truyền từ trước qua event để
                    // truyền vào lại input để có giữ liệu
                    // cho form
                    value={field.value}
                  />
                )}
              />
              <div className={cx('aside-form__separate')}>-</div>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => (
                  <InputNumber
                    type='text'
                    placeholder='₫ ĐẾN'
                    className={cx('aside-form__input-wrap')}
                    classNameInput={cx('aside-form__input')}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </div>
            <Button type='submit'>Áp Dụng</Button>
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
