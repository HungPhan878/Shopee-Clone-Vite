/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'

//scss
import style from './SortProductList.module.scss'

import { sortBy, order as orderConstant } from 'src/constants/product'
import { ProductListConfig } from 'src/types/product.type'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'

const cx = classNames.bind(style)

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  // handler function
  const handleSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className={cx('sort__wrap')}>
      <div className={cx('sort__inner')}>
        <div className={cx('sort__row')}>
          <div className={cx('sort__label')}>sắp xếp theo</div>
          <button
            className={cx('sort__btn', { 'sort__btn--active': isActiveSortBy(sortBy.view) })}
            onClick={handleSortBy(sortBy.view)}
          >
            phổ biến
          </button>
          <button
            className={cx('sort__btn', { 'sort__btn--active': isActiveSortBy(sortBy.createdAt) })}
            onClick={handleSortBy(sortBy.createdAt)}
          >
            mới nhất
          </button>
          <button
            className={cx('sort__btn', { 'sort__btn--active': isActiveSortBy(sortBy.sold) })}
            onClick={handleSortBy(sortBy.sold)}
          >
            bán chạy
          </button>
          <select
            className={cx('sort__section', {
              'sort__section--active': isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) =>
              handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)
            }
          >
            <option value='' className={cx('sort__option', 'sort__option--disable')} disabled>
              giá
            </option>
            <option value={orderConstant.asc} className={cx('sort__option')}>
              giá: thấp đến cao
            </option>
            <option value={orderConstant.desc} className={cx('sort__option')}>
              giá: cao đến thấp
            </option>
          </select>
        </div>

        <div className={cx('sort__row')}>
          <div className={cx('sort__name-page')}>
            <span className={cx('sort__name-page-current')}>{page}</span>/{pageSize}
          </div>
          <div className={cx('sort__btns-switch')}>
            {page === 1 ? (
              <span className={cx('sort__btn-switch', 'disable')}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className={cx('sort__btn-switch-icon')}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className={cx('sort__btn-switch')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className={cx('sort__btn-switch-icon')}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </Link>
            )}

            {page === pageSize ? (
              <span className={cx('sort__btn-switch', 'disable')}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className={cx('sort__btn-switch-icon')}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className={cx('sort__btn-switch')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className={cx('sort__btn-switch-icon')}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
