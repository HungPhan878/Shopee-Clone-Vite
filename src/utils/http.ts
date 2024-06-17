/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

// components
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'
import {
  clearLocalStorage,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenFromLS,
  setProfileFromLS,
  setRefreshTokenFromLS
} from './auth'
import { AuthResponsive } from 'src/types/auth.type'
import config from 'src/constants/config'
import { URL_LOGIN, URL_LOGOUT, URL_REGISTER } from 'src/apis/auth.api'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  // funtion constructor chỉ chạy một lần duy nhất khi được render f5 lại thì sẽ chạy lại
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponsive
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenFromLS(this.accessToken)
          setRefreshTokenFromLS(this.refreshToken)
          setProfileFromLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLocalStorage()
        }
        return response
      },
      function (error) {
        if (error.response.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response.data
          const message = data?.message || error.message

          toast.error(message)
        }

        if (error.response.status === HttpStatusCode.Unauthorized) {
          clearLocalStorage()
          // c1: ta dùng trình lằng nghe sư kiên (EVENT TARGET) để set lại appcontext trả về UI khi chưa login
          //c2: dùng window.location.reload() reload lại UI lấy từ LS thì sẽ trả về UI LOGIN
          // Nhưng sẽ làm mất đi tính chất singlePage applicattion
        }

        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
