/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'

//scss
import style from './Footer.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(style)

export default function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('container')}>
        {/* top */}
        <div className={cx('row row-cols-5 row-cols-lg-2 row-cols-md-1')}>
          {/* col1 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>Chăm sóc khách hàng</h3>

            <ul className={cx('footer-list')}>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  trung tâm trợ giúp
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
                  hướng dẫn mua hàng
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  hướng dẫn bán hàng
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  thanh toán
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  shopee xu
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  vận chuyển
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  trả hàng & hoàn tiền
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  chăm sóc khách hàng
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  chính sách bảo hành
                </Link>
              </li>
            </ul>
          </div>

          {/* col2 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>về shopee</h3>
            <ul className={cx('footer-list')}>
              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  giới thiệu về shopee
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  tuyển dụng
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  chính sách bảo mật
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  chính hãng
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  kênh người bán
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  flash sales
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  chương trình tiếp thị liên kết shopee
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  liên hệ với truyền thông
                </Link>
              </li>
            </ul>
          </div>

          {/* col3 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>thanh toán</h3>
            <h3 className={cx('footer-title')}>đơn vị vận chuyển</h3>
          </div>

          {/* col4 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>theo dõi chúng tôi trên</h3>

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
            <h3 className={cx('footer-title')}>tải ứng dụng shoppe ngay</h3>
          </div>
        </div>

        <div className={cx('footer-separate')}></div>

        {/* bottom */}
        <div className={cx('footer-bottom')}>
          <div className={cx('footer-row__wrap')}>
            <div className='row'>
              <div className='col-4 col-xl-12'>
                <p className={cx('footer-label')}>© 2024 Shopee. Tất cả các quyền được bảo lưu.</p>
              </div>
              <div className='col-8 col-xl-12'>
                <p className={cx('footer-label')}>
                  Quốc gia & Khu vực: Singapore Indonesia Thái Lan Malaysia Việt Nam Philippines
                  Brazil México Colombia Chile Đài Loan
                </p>
              </div>
            </div>
          </div>

          <div className={cx('footer-bottom__wrap')}>
            <ul className={cx('footer-bottom__list', 'd-md-none')}>
              <li className={cx('footer-bottom__item')}>
                <Link to='#' className={cx('footer-bottom__item-link')}>
                  CHÍNH SÁCH BẢO MẬT
                </Link>
              </li>

              <li className={cx('footer-bottom__item')}>
                <Link to='#' className={cx('footer-bottom__item-link')}>
                  QUY CHẾ HOẠT ĐỘNG
                </Link>
              </li>

              <li className={cx('footer-bottom__item')}>
                <Link to='#' className={cx('footer-bottom__item-link')}>
                  CHÍNH SÁCH VẬN CHUYỂN
                </Link>
              </li>

              <li className={cx('footer-bottom__item')}>
                <Link to='#' className={cx('footer-bottom__item-link')}>
                  CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN
                </Link>
              </li>
            </ul>

            <p className={cx('footer-bottom__text', 'footer-bottom__text-mb')}>
              Công ty TNHH Shopee
            </p>
            <p className={cx('footer-bottom__text')}>
              Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh,
              Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email:
              cskh@hotro.shopee.vn
            </p>
            <p className={cx('footer-bottom__text')}>
              Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221
              (ext 4678)
            </p>
            <p className={cx('footer-bottom__text')}>
              Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày
              10/02/2015
            </p>
            <p className={cx('footer-bottom__text')}>
              © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
