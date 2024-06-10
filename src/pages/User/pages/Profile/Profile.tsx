/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames/bind'
import { Controller, useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

// scss
import style from './Profile.module.scss'

import Button from 'src/Components/Button'
import userApi from 'src/apis/user.api'
import { userSchema, userType } from 'src/utils/rules'
import Input from 'src/Components/Input'
import InputNumber from 'src/Components/InputNumber'
import { useEffect } from 'react'

// components

const cx = classNames.bind(style)

type FormData = Pick<userType, 'name' | 'address' | 'phone' | 'date_of_birth'>
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth'])

export default function Profile() {
  const {
    register,
    control,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  //[GET] /me
  const getProfile = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = getProfile.data?.data.data

  // Cách để truyền data get from api to formData
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue(
        'date_of_birth',
        // vì date api gửi về dạng Iso 8610 nên để chuyển thành date thì đưa vào giá trị thôi
        profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1)
      )
    }
  }, [profile, setValue])
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
                <p className={cx('profile-email')}>{profile?.email.slice(0, 4)}******@gmail.com</p>
              </div>

              <div className={cx('profile-form__row')}>
                <label className={cx('profile-label')}>Tên</label>
                <div className={cx('profile-input__wrap')}>
                  <div className={cx('profile-input__inner')}>
                    <Input
                      type='text'
                      name='name'
                      placeholder='Tên'
                      classNameInput={cx('profile-input')}
                      className={cx('mb-0')}
                      register={register}
                      errorMessage={errors.name?.message}
                    />
                  </div>
                </div>
              </div>

              <div className={cx('profile-form__row')}>
                <label className={cx('profile-label')}>Số điện thoại</label>
                <div className={cx('profile-input__wrap')}>
                  <div className={cx('profile-input__inner')}>
                    <Controller
                      control={control}
                      name='phone'
                      render={({ field }) => (
                        <InputNumber
                          type='text'
                          placeholder='Số điện thoại'
                          classNameInput={cx('profile-input')}
                          className={cx('mb-0')}
                          errorMessage={errors.phone?.message}
                          {...field}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className={cx('profile-form__row')}>
                <label className={cx('profile-label')}>Địa chỉ</label>
                <div className={cx('profile-input__wrap')}>
                  <div className={cx('profile-input__inner')}>
                    <Input
                      type='text'
                      name='address'
                      placeholder='Địa chỉ'
                      classNameInput={cx('profile-input')}
                      className={cx('mb-0')}
                      register={register}
                      errorMessage={errors.address?.message}
                    />
                  </div>
                </div>
              </div>

              <div className={cx('profile-form__row')}>
                <label className={cx('profile-label')}>Date of Birth</label>
                <div className={cx('profile-input__wrap')}>
                  <div className={cx('profile-select__inner')}>
                    <select name='' id='' defaultValue='' className={cx('profile-select')}>
                      <option value='' disabled>
                        Ngày
                      </option>
                    </select>

                    <select name='' id='' defaultValue='' className={cx('profile-select')}>
                      <option value='' disabled>
                        Tháng
                      </option>
                    </select>

                    <select name='' id='' defaultValue='' className={cx('profile-select')}>
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
