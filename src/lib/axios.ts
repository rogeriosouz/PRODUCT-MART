import { env } from '@/env/local'
import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_URL_API,
})

const token = Cookies.get('authUser')

if (token) {
  api.defaults.headers.authorization = `Bearer ${token}`
}

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response && [401, 403].includes(error.response.status)) {
      if (!window.location.pathname.includes('/auth')) {
        Cookies.remove('authUser')

        window.location.href = '/auth/signin'
      }
    }

    return Promise.reject(error)
  },
)
