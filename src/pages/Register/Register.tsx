/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'

//scss
import style from './Register.module.scss'

// components
// import { getRules } from 'src/utils/rules'
import { schema, SchemaType } from 'src/utils/rules'
import Input from 'src/Components/Input'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/util'
import { ErrorResponsiveApi } from 'src/types/util.type'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/Components/Button'
import path from 'src/constants/path'
import { Helmet } from 'react-helmet-async'

const cx = classNames.bind(style)

type FormData = SchemaType

export default function Register() {
  const navigate = useNavigate()
  const { setAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    // getValues,
    setError
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver(schema)
  })

  // react query
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  // handler function
  const onSubmit = handleSubmit(
    (data) => {
      const body = omit(data, ['confirm_password'])

      registerAccountMutation.mutate(body, {
        onSuccess: (data) => {
          setAuthenticated(true)
          setProfile(data.data.data.user)
          navigate('/')
        },
        onError: (error) => {
          // console.log(error)
          if (
            isAxiosUnprocessableEntityError<ErrorResponsiveApi<Omit<FormData, 'confirm_password'>>>(
              error
            )
          ) {
            const formError = error.response?.data.data
            if (formError) {
              Object.keys(formError).forEach((key) =>
                setError(key as keyof Omit<FormData, 'confirm_password'>, {
                  message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                  type: 'Server'
                })
              )
            }
          }
        }
      })
    }
    // ,
    // () => {
    //   const password = getValues('password')
    //   console.log(password)
    // }
  )

  return (
    <section className={cx('register')}>
      <Helmet>
        <title>Shopee Clone | Đăng Ký</title>
        <meta name='description' content='Trang đăng ký của Shopee Clone.' />
      </Helmet>
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

                  <Button
                    isLoading={registerAccountMutation.isPending}
                    disabled={registerAccountMutation.isPending}
                    className={cx('register-form__btn')}
                  >
                    đăng ký
                  </Button>
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
                  <Link to={path.login} className={cx('register-link__text')}>
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
