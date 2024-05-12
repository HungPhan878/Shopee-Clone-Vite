/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

// components
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'
import { clearLocalStorage, getAccessTokenFromLS, setAccessTokenFromLS } from './auth'
import { AuthResponsive } from 'src/types/auth.type'

export class Http {
  instance: AxiosInstance
  private access_token: string
  // funtion constructor chỉ chạy một lần duy nhất khi được render f5 lại thì sẽ chạy lại
  constructor() {
    this.access_token = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token && config.headers) {
          config.headers.Authorization = this.access_token
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
        console.log(response)
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          this.access_token = (response.data as AuthResponsive).data.access_token
          setAccessTokenFromLS(this.access_token)
        } else if (url === '/logout') {
          this.access_token = ''
          clearLocalStorage()
        }
        return response
      },
      function (error) {
        if (error.response.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response.data
          const message = data.message || error.message

          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
