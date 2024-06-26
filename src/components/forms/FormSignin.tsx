'use client'
import { AlertCircle, Check, CircleDashed } from 'lucide-react'
import { Input } from '../input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/context/authContext'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '../ui/button'

const schemaSignin = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

type SigninType = z.infer<typeof schemaSignin>

export function FormSignin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninType>({
    resolver: zodResolver(schemaSignin),
  })

  const { authSignInMutation, signIn } = useAuth()

  const onSubmit = async (data: SigninType) => {
    signIn({ email: data.email, password: data.password })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-2"
    >
      {authSignInMutation.status === 'error' && (
        <div className="flex w-full items-center gap-2 rounded bg-red-500/40 px-3 py-2 ">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">
            {authSignInMutation.error.response.data.message}
          </p>
        </div>
      )}

      {authSignInMutation.status === 'success' && (
        <div className="flex w-full items-center gap-2 rounded bg-green-500/40 px-3 py-2 ">
          <Check className="h-5 w-5 text-green-500" />
          <p className="text-sm text-green-500">
            {authSignInMutation.data.message}
          </p>
        </div>
      )}

      <label className="mb-1 block w-full">
        <p className="text-text-primary text-base font-normal">E-mail</p>
        <Input.Root>
          <Input.Input
            register={register}
            nameRegister={'email'}
            placeholder="E-mail"
            isErro={!!errors.email}
            typeInput="text"
          />

          {errors.email && (
            <Input.MessageError message={errors.email.message as string} />
          )}
        </Input.Root>
      </label>

      <label className="mb-3 block w-full">
        <p className="text-text-primary text-base font-normal">Password</p>
        <Input.Root>
          <Input.Input
            register={register}
            nameRegister={'password'}
            placeholder="Password"
            isErro={!!errors.password}
            typeInput="password"
          />
          {errors.password && (
            <Input.MessageError message={errors.password.message as string} />
          )}
        </Input.Root>
        <div className="mt-1 flex w-full items-center justify-end">
          <Link
            href={'/auth/forgotPassword'}
            className="text-sm font-normal text-zinc-900 transition-all hover:text-zinc-900/70 hover:underline"
          >
            Forgot password
          </Link>
        </div>
      </label>

      <Button
        disabled={
          authSignInMutation.status === 'success' ||
          authSignInMutation.status === 'loading'
        }
      >
        {authSignInMutation.status === 'loading' ||
        authSignInMutation.status === 'success' ? (
          <CircleDashed className="h-7 w-7 animate-spin" />
        ) : (
          'Log In'
        )}
      </Button>
    </form>
  )
}
