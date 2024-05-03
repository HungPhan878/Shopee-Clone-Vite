/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

//scss
import style from './Register.module.scss'

// components
// import { getRules } from 'src/utils/rules'
import { schema, SchemaType } from 'src/utils/rules'
import Input from 'src/Components/Input'

const cx = classNames.bind(style)

type FormData = SchemaType

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver(schema)
  })

  // const rules = getRules(getValues)

  // handler function
  const onSubmit = handleSubmit(
    (data) => console.log(data),
    () => {
      const password = getValues('password')
      console.log(password)
    }
  )

  return (
    <section className={cx('register')}>
      <div className={cx('container', { 'register-container': true })}>
        <div className={cx('register-wrap')}>
          <div className='row'>
            <div className='offset-7 offset-lg-2 offset-md-0 col-5 col-lg-8 col-md-12'>
              <div className={cx('register-inner')}>
                <h2 className={cx('register-title')}>Đăng Ký</h2>

                {/* form */}
                <form action='' className={cx('register-form')} noValidate onSubmit={onSubmit}>
                  <Input
                    name='email'
                    type='email'
                    placeholder='Email/Số điện thoại/Tên đăng nhập'
                    register={register}
                    errorMessage={errors.email?.message}
                  />

                  <Input
                    name='password'
                    type='password'
                    placeholder='Mật Khẩu'
                    register={register}
                    autoComplete='on'
                    errorMessage={errors.password?.message}
                  />

                  <Input
                    name='confirm_password'
                    type='password'
                    placeholder='Nhập lại Mật Khẩu'
                    register={register}
                    autoComplete='on'
                    errorMessage={errors.confirm_password?.message}
                  />

                  <button className={cx('register-form__btn')}>đăng ký</button>
                </form>

                <div className={cx('register-row')}>
                  <Link to='#' className={cx('register-text')}>
                    Quên mật khẩu
                  </Link>
                  <Link to='#' className={cx('register-text')}>
                    Đăng nhập với SMS
                  </Link>
                </div>

                <div className={cx('register-link')}>
                  Bạn đã có tài khoản?{' '}
                  <Link to='/login' className={cx('register-link__text')}>
                    Đăng Nhập
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
