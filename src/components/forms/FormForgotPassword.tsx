'use client'
import { AlertCircle, Check, CircleDashed } from 'lucide-react'
import { Input } from '../input'
import { z } from 'zod'
import { useForm } from '@/hooks/useForm'
import { Button } from '../ui/button'
import clsx from 'clsx'

const schemaForgotPassword = z.object({
  email: z.string().email(),
})

type ForgotPasswordType = z.infer<typeof schemaForgotPassword>

export function FormForgotPassword() {
  const { Submit, handleSubmit, errors, mutation, register } = useForm<
    ForgotPasswordType,
    { message: string }
  >({
    configMutation: {
      url: '/auth/forgotPassword',
      method: 'POST',
    },
    schemaZod: schemaForgotPassword,
  })

  return (
    <form
      onSubmit={handleSubmit(Submit)}
      className="flex w-full flex-col gap-2"
    >
      {mutation.status === 'error' && (
        <div className="flex w-full items-center gap-2 rounded bg-red-500/40 px-3 py-2 ">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">
            {mutation.error.response.data.message}
          </p>
        </div>
      )}

      {mutation.status === 'success' && (
        <div className="flex w-full items-center gap-3 rounded bg-green-500/40 px-3 py-2 ">
          <div className="h-5 w-5">
            <Check className="h-5 w-5 text-green-900" />
          </div>
          <p className="text-sm text-green-900">{mutation.data.message}</p>
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

      <Button
        disabled={
          mutation.status === 'loading' || mutation.status === 'success'
        }
        variant={'default'}
        className={clsx('', {
          'bg-green-500': mutation.status === 'success',
        })}
      >
        {mutation.status === 'loading' ? (
          <CircleDashed className="h-7 w-7 animate-spin" />
        ) : (
          <>{mutation.status !== 'success' && 'To send'}</>
        )}

        {mutation.status === 'success' && (
          <div className="flex items-center gap-2">
            <p className="text-white">SENT</p>
          </div>
        )}
      </Button>
    </form>
  )
}
