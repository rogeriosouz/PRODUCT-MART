import { env } from '@/env/local'
import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_URL_API,
})

api.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any) => {
    console.log(error)
    if (error.response.status === 401) {
      if (
        !window.location.href.includes('/auth') &&
        !window.location.href.includes(`${env.NEXT_PUBLIC_URL_APPLICATION}/`) &&
        !window.location.href.includes('/products')
      ) {
        if (error.response?.data.message === 'Invalid token') {
          Cookies.remove('authUser')

          window.location.href = '/auth/signin'
        }
      }
    }

    return Promise.reject(error)
  },
)

const token = Cookies.get('authUser')

if (token) {
  api.defaults.headers.authorization = `Bearer ${token}`
}
