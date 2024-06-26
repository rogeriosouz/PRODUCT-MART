'use client'
import { api } from '@/lib/axios'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import Cookies from 'js-cookie'
import { UseMutationResult, useMutation } from 'react-query'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/navigation'
import { ErrorResponse } from '@/types/ErrorResponse'

type UserType = {
  id: string
  name: string
  email: string
}

interface authResponse {
  token: string
  message: string
}

interface authContextProps {
  user: UserType | null
  isAuthenticate: boolean
  signIn: ({ email, password }: { email: string; password: string }) => void
  authSignInMutation: UseMutationResult<
    authResponse,
    ErrorResponse,
    {
      email: string
      password: string
    },
    unknown
  >
  logout: () => void
}

const authContext = createContext({} as authContextProps)

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)
  const { push } = useRouter()
  const authUser = Cookies.get('authUser')

  useEffect(() => {
    if (authUser) {
      api.get('/user/recoveryInformation').then((res) => {
        const data = res.data as { user: UserType }
        setUser({
          id: data.user.name,
          name: data.user.name,
          email: data.user.email,
        })
      })
    }
  }, [authUser])

  const authSignInMutation = useMutation<
    authResponse,
    ErrorResponse,
    { email: string; password: string },
    unknown
  >(
    async ({ email, password }) => {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      return response.data
    },
    {
      onSuccess: (data) => {
        const tokenUser = jwt.decode(data.token) as {
          name: string
          email: string
          userId: string
          exp: number
        }

        const expirationTimestampInSeconds = tokenUser.exp
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000)

        const timeRemainingInSeconds =
          expirationTimestampInSeconds - currentTimestampInSeconds
        const timeRemainingInMilliseconds = timeRemainingInSeconds * 1000

        Cookies.set('authUser', data.token, {
          expires: new Date(Date.now() + timeRemainingInMilliseconds),
        })

        api.defaults.headers.authorization = `Bearer ${data.token}`

        setUser({
          id: tokenUser.name,
          name: tokenUser.name,
          email: tokenUser.email,
        })

        setTimeout(() => {
          push('/products')
        }, 3000)
      },
    },
  )

  function signIn({ email, password }: { email: string; password: string }) {
    authSignInMutation.mutate({ email, password })
  }

  function logout() {
    Cookies.remove('authUser')
    push('/auth/signin')
  }

  const isAuthenticate = !!user

  const values = { user, isAuthenticate, signIn, authSignInMutation, logout }

  return <authContext.Provider value={values}>{children}</authContext.Provider>
}

export function useAuth() {
  const context = useContext(authContext)
  return context
}
