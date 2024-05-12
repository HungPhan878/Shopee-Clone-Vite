/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LoginSchemaType, loginSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

//scss
import style from './Login.module.scss'

// components
// import { getRules } from 'src/utils/rules'
import Input from 'src/Components/Input'
import { useMutation } from '@tanstack/react-query'
import { login } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/util'
import { ErrorResponsiveApi } from 'src/types/util.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

const cx = classNames.bind(style)

type FormData = LoginSchemaType

export default function Login() {
  const navigate = useNavigate()
  const { setAuthenticated } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(loginSchema)
  })

  // const rules = getRules()
  // react query
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })

  // handler function
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        setAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        // console.log(error)
        if (isAxiosUnprocessableEntityError<ErrorResponsiveApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) =>
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            )
          }
        }
      }
    })
  })

  return (
    <section className={cx('login')}>
      <div className={cx('container', { 'login-container': true })}>
        <div className={cx('login-wrap')}>
          <div className='row'>
            <div className='offset-7 offset-lg-2 offset-md-0 col-5 col-lg-8 col-md-12'>
              <div className={cx('login-inner')}>
                <h2 className={cx('login-title')}>Đăng Nhập</h2>

                {/* form */}
                <form action='' className={cx('login-form')} noValidate onSubmit={onSubmit}>
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

                  <button className={cx('login-form__btn')}>đăng nhập</button>
                </form>

                <div className={cx('login-row')}>
                  <Link to='#' className={cx('login-text')}>
                    Quên mật khẩu
                  </Link>
                  <Link to='#' className={cx('login-text')}>
                    Đăng nhập với SMS
                  </Link>
                </div>

                <div className={cx('login-link')}>
                  Bạn mới biết đến Shopee?{' '}
                  <Link to='/register' className={cx('login-link__text')}>
                    Đăng ký
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
