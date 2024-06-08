/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames/bind'

// scss
import style from './Profile.module.scss'
import Button from 'src/Components/Button'

// components

const cx = classNames.bind(style)

export default function Profile() {
  return (
    <div className={cx('profile-wrap')}>
      <div className={cx('profile-info')}>
        <h1 className={cx('profile-info__heading')}>Hồ Sơ Của Tôi</h1>
        <p className={cx('profile-info__desc')}>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>

      <form className={cx('profile-form')}>
        <div className='row'>
          <div className='col col-8'>
            <div className={cx('profile-form__info')}>
              <div className={cx('profile-form__row')}>
                <label className={cx('profile-label')}>Email</label>
                <p className={cx('profile-email')}>HungPhan******8@gmail.com</p>
              </div>

              <div className={cx('profile-form__row')}>
                <label className={cx('profile-label')}>Tên</label>
                <div className={cx('profile-input__wrap')}>
                  <div className={cx('profile-input__inner')}>
                    <input type='text' placeholder='Tên' className={cx('profile-input')} />
                    <p className={cx('profile-input__msg')}></p>
                  </div>
                </div>
              </div>

              <div className={cx('profile-form__row')}>
                <label className={cx('profile-label')}>Số điện thoại</label>
                <div className={cx('profile-input__wrap')}>
                  <div className={cx('profile-input__inner')}>
                    <input
                      type='text'
                      placeholder='Số điện thoại'
                      className={cx('profile-input')}
                    />
                    <p className={cx('profile-input__msg')}></p>
                  </div>
                </div>
              </div>

              <div className={cx('profile-form__row')}>
                <label className={cx('profile-label')}>Địa chỉ</label>
                <div className={cx('profile-input__wrap')}>
                  <div className={cx('profile-input__inner')}>
                    <input type='text' placeholder='Địa chỉ' className={cx('profile-input')} />
                    <p className={cx('profile-input__msg')}></p>
                  </div>
                </div>
              </div>

              <div className={cx('profile-form__row')}>
                <label className={cx('profile-label')}>Date of Birth</label>
                <div className={cx('profile-input__wrap')}>
                  <div className={cx('profile-select__inner')}>
                    <select name='' id='' value='' className={cx('profile-select')}>
                      <option value='' disabled>
                        Ngày
                      </option>
                    </select>

                    <select name='' id='' value='' className={cx('profile-select')}>
                      <option value='' disabled>
                        Tháng
                      </option>
                    </select>

                    <select name='' id='' value='' className={cx('profile-select')}>
                      <option value='' disabled>
                        Năm
                      </option>
                    </select>
                  </div>
                  <p className={cx('profile-input__msg')}></p>
                </div>
              </div>

              <div className={cx('profile-form__row')}>
                <div className={cx('profile-btn__wrap')}>
                  <Button className={cx('profile-btn__submit')}>Lưu</Button>
                </div>
              </div>
            </div>
          </div>

          <div className='col col-4'>
            <div className={cx('profile-form__image')}>
              <div className={cx('profile-image__wrap')}>
                <img
                  src='https://api-ecom.duthanhduoc.com/images/6a38bb64-32c2-492a-b729-bf0529bd7438.jpg'
                  alt='avatar'
                  className={cx('profile-image__avatar')}
                />
              </div>
              <input type='file' accept='.jpg,.jpeg,.png' hidden></input>
              <button className={cx('profile-image__btn')}>Chọn ảnh</button>
              <p className={cx('profile-image__desc')}>
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
