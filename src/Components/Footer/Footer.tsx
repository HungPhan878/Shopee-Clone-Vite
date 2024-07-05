/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

//scss
import style from './Footer.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(style)

export default function Footer() {
  const { t } = useTranslation(['home'])
  return (
    <footer className={cx('footer')}>
      <div className={cx('container')}>
        {/* top */}
        <div className={cx('row row-cols-5 row-cols-lg-2 row-cols-md-1')}>
          {/* col1 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>{t('footer.CUSTOMER SERVICE')}</h3>

            <ul className={cx('footer-list')}>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Help Centre')}
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  Shopee blog
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  shopee mall
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.How To Buy')}
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.How To Sell')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Payment')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Shopee Coins')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Shipping')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Return & Refund')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Contact Us')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Warranty Policy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* col2 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>{t('footer.ABOUT SHOPEE')}</h3>
            <ul className={cx('footer-list')}>
              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.About Us')}
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.Shopee Careers')}
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.Shopee Policies')}
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.Seller Centre')}
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.Flash Deals')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.Shopee Ambassador Programme')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.Media Contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* col3 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>{t('footer.Payment')}</h3>
            <h3 className={cx('footer-title')}>{t('footer.LOGISTICS')}</h3>
          </div>

          {/* col4 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>{t('footer.FOLLOW US')}</h3>

            <ul className={cx('footer-list')}>
              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  facebook
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  instagram
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  linkedln
                </Link>
              </li>
            </ul>
          </div>

          {/* col5 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>{t('footer.SHOPEE APP DOWNLOAD')}</h3>
          </div>
        </div>

        <div className={cx('footer-separate')}></div>

        {/* bottom */}
        <div className={cx('footer-bottom')}>
          <div className={cx('footer-row__wrap')}>
            <div className='row'>
              <div className='col-4 col-xl-12'>
                <p className={cx('footer-label')}>
                  © 2024 Shopee. {t('footer.All rights reserved')}.
                </p>
              </div>
              <div className='col-8 col-xl-12'>
                <p className={cx('footer-label')}>
                  {t(
                    'footer.Country & Region: Singapore Indonesia Thailand Malaysia Vietnam Philippines Brazil Mexico Colombia Chile Taiwan'
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className={cx('footer-bottom__wrap')}>
            <ul className={cx('footer-bottom__list', 'd-md-none')}>
              <li className={cx('footer-bottom__item')}>
                <Link to='#' className={cx('footer-bottom__item-link')}>
                  {t('footer.PRIVACY POLICY')}
                </Link>
              </li>

              <li className={cx('footer-bottom__item')}>
                <Link to='#' className={cx('footer-bottom__item-link')}>
                  {t('footer.OPERATION REGULATIONS')}
                </Link>
              </li>

              <li className={cx('footer-bottom__item')}>
                <Link to='#' className={cx('footer-bottom__item-link')}>
                  {t('footer.SHIPPING POLICY')}
                </Link>
              </li>

              <li className={cx('footer-bottom__item')}>
                <Link to='#' className={cx('footer-bottom__item-link')}>
                  {t('footer.RETURN AND REFUND POLICY')}
                </Link>
              </li>
            </ul>

            <p className={cx('footer-bottom__text', 'footer-bottom__text-mb')}>
              {t('footer.Shopee Company Limited')}
            </p>
            <p className={cx('footer-bottom__text')}>
              {t(
                'footer.Address: Floor 4-5-6, Capital Place Building, 29 Lieu Giai Street, Ngoc Khanh Ward, Ba Dinh District, Hanoi City, Vietnam. Support switchboard: 19001221 - Email: cskh@hotro.shopee.vn'
              )}
            </p>
            <p className={cx('footer-bottom__text')}>
              {t(
                'footer.Responsible for Content Management: Nguyen Duc Tri - Contact phone: 024 73081221 (ext 4678)'
              )}
            </p>
            <p className={cx('footer-bottom__text')}>
              {t(
                'footer.Business code: 0106773786 issued by Hanoi Department of Planning and Investment for the first time on February 10, 2015'
              )}
            </p>
            <p className={cx('footer-bottom__text')}>
              {t('footer.© 2015 - Copyright belongs to Shopee Company Limited')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
