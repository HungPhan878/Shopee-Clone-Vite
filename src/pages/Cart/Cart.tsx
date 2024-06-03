/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { useEffect, useState } from 'react'

// scss
import style from './Cart.module.scss'

// components
import purchasesApi from 'src/apis/purchases.api'
import { purchasesStatus } from 'src/constants/purchases'
import { Link } from 'react-router-dom'
import { formatCurrency } from 'src/utils/util'
import QuantityController from 'src/Components/QuantityController'
import Button from 'src/Components/Button'
import { Purchases } from 'src/types/purchases.type'

const cx = classNames.bind(style)

// logic checkAll
// 1.làm checked cho mỗi input trước đã
// 2.tạo ra một biến isCheckAll để test xem tất cả item
// trong map đã check hết chưa nếu rùi isCheckAll = true
// 3. khi click vào nut chọn tất cả sẽ !isCheckAll

interface ExtendedPurchases extends Purchases {
  checked: boolean
  disable: boolean
}

export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([])
  // b2
  const isCheckAll = extendedPurchases.every((purchases) => purchases.checked)

  // [GET] Purchases List
  const getPurchasesList = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesApi.getPurchasesList({ status: purchasesStatus.inCart })
  })
  const purchasesList = getPurchasesList.data?.data.data

  useEffect(() => {
    if (purchasesList) {
      setExtendedPurchases(
        purchasesList.map((purchases) => ({
          ...purchases,
          checked: false,
          disable: false
        })) || []
      )
    }
  }, [purchasesList])

  // handler function
  const handleChecked =
    (purchasesIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setExtendedPurchases(
        produce((draft) => {
          // Mutate trong react js là cấm nhưng dùng immerjs mutate thì lại rất an toàn.
          draft[purchasesIndex].checked = event.target.checked
        })
      )
    }

  const handleCheckedAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchases) => ({
        ...purchases,
        checked: !isCheckAll
      }))
    )
  }

  return (
    <section className={cx('cart__wrapper')}>
      <div className='container'>
        {/* top */}
        <div className={cx('cart__scroll')}>
          <div className={cx('cart__inner')}>
            <div className={cx('cart__row')}>
              <div className='row row-cols-2'>
                <div className='col'>
                  <div className={cx('cart-checkbox__wrap')}>
                    <div className={cx('cart-checkbox__inner')}>
                      <input
                        type='checkbox'
                        className={cx('cart-checkbox')}
                        checked={isCheckAll}
                        onChange={handleCheckedAll}
                      />
                    </div>
                    <span className={cx('cart-checkbox__label')}>Sản phẩm</span>
                  </div>
                </div>

                <div className='col'>
                  <div className='row'>
                    <div className='col col-4'>Đơn giá</div>
                    <div className='col col-8'>
                      <div className='row row-cols-3'>
                        <div className='col '>Số lượng</div>
                        <div className='col '>Số tiền</div>
                        <div className='col '>Thao tác</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* purchases list */}

            <div className={cx('cart__row', 'mt-12', 'mb-12')}>
              {extendedPurchases?.map((purchasesItem, index) => (
                <article className={cx('cart-item__wrap')} key={purchasesItem._id}>
                  <div className={cx('row', 'row-cols-2', 'align-center')}>
                    <div className='col'>
                      <div className={cx('cart-item__row')}>
                        <div className={cx('cart-checkbox__inner')}>
                          <input
                            type='checkbox'
                            className={cx('cart-checkbox')}
                            checked={purchasesItem.checked}
                            onChange={handleChecked(index)}
                          />
                        </div>
                        <Link to='#' className={cx('cart-item__link')}>
                          <img
                            src={purchasesItem.product.image}
                            alt={purchasesItem.product.name}
                            className={cx('cart-item__thumb')}
                          />

                          <h3 className={cx('cart-item__title')}>{purchasesItem.product.name}</h3>
                        </Link>
                      </div>
                    </div>
                    <div className='col'>
                      <div className={cx('row', 'align-center')}>
                        <div className='col-4'>
                          <div className={cx('cart-item__price')}>
                            <span className={cx('cart-item__price-discount')}>
                              ₫{formatCurrency(purchasesItem.product.price_before_discount)}
                            </span>
                            <span>₫{formatCurrency(purchasesItem.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-8'>
                          <div className={cx('row', 'row-cols-3', 'align-center')}>
                            <div className='col'>
                              <QuantityController
                                max={purchasesItem.product.quantity}
                                value={purchasesItem.buy_count}
                              />
                            </div>
                            <div className='col'>
                              <span className={cx('cart-item__price-total')}>
                                ₫
                                {formatCurrency(
                                  purchasesItem.product.price * purchasesItem.buy_count
                                )}
                              </span>
                            </div>
                            <div className='col'>
                              <button className={cx('cart-item__btn-delete')}>Xóa</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className={cx('cart-bottom', 'mt-32')}>
          <div className={cx('cart__row', 'flex-center', 'cart__bottom-row')}>
            <div className={cx('cart-btns_wrap')}>
              <div className={cx('cart-checkbox__inner')}>
                <input
                  type='checkbox'
                  className={cx('cart-checkbox')}
                  checked={isCheckAll}
                  onChange={handleCheckedAll}
                />
              </div>
              <button className={cx('cart-btn')} onClick={handleCheckedAll}>
                Chọn tất cả ({purchasesList?.length})
              </button>
              <button className={cx('cart-btn')}>Xóa Tất Cả </button>
            </div>

            <div className={cx('cart-buy__purchases')}>
              <div>
                <div className={cx('cart-buy__purchases-total')}>
                  <span>Tổng thanh toán :</span>
                  <span className={cx('cart-buy__purchases-price-total')}>₫0</span>
                </div>

                <div className={cx('cart-buy__purchases-price-saving')}>
                  <span>Tiết kiệm</span>
                  <span className={cx('cart-buy__purchases-number')}>₫0</span>
                </div>
              </div>

              <Button className={cx('cart-buy_purchases-btn')}>
                <span>Mua hàng</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
