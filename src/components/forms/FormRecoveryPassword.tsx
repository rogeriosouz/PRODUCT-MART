'use client'
import { AlertCircle, Check, CircleDashed } from 'lucide-react'
import { Input } from '../input'
import { z } from 'zod'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from '@/hooks/useForm'
import { Button } from '../ui/button'

const schemaRecoveryPassword = z
  .object({
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword
    },
    {
      path: ['confirmPassword'],
      message: 'Passwords need to be the same',
    },
  )

type recoveryPasswordType = z.infer<typeof schemaRecoveryPassword>

export function FormRecoveryPassword() {
  const { token } = useParams()
  const { push } = useRouter()

  const { Submit, handleSubmit, errors, mutation, register } = useForm<
    recoveryPasswordType,
    { message: string }
  >({
    configMutation: {
      url: `/auth/recoveryPassword/${token}`,
      method: 'PUT',
    },
    schemaZod: schemaRecoveryPassword,
    resultMutation: {
      onSuccess: () => {
        setTimeout(() => {
          push('/auth/signin')
        }, 1000)
      },
    },
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
        <p className="text-text-primary text-base font-normal">New password</p>
        <Input.Root>
          <Input.Input
            register={register}
            nameRegister={'password'}
            placeholder="New password"
            isErro={!!errors.password}
            typeInput="text"
          />

          {errors.password && (
            <Input.MessageError message={errors.password.message as string} />
          )}
        </Input.Root>
      </label>

      <label className="mb-3 block w-full">
        <p className="text-text-primary text-base font-normal">
          Confirm password
        </p>
        <Input.Root>
          <Input.Input
            register={register}
            nameRegister={'confirmPassword'}
            placeholder="Confirm password"
            isErro={!!errors.confirmPassword}
            typeInput="text"
          />

          {errors.confirmPassword && (
            <Input.MessageError
              message={errors.confirmPassword.message as string}
            />
          )}
        </Input.Root>
      </label>
      <Button
        disabled={
          mutation.status === 'success' || mutation.status === 'loading'
        }
      >
        {mutation.status === 'loading' || mutation.status === 'success' ? (
          <CircleDashed className="h-7 w-7 animate-spin" />
        ) : (
          'modify'
        )}
      </Button>
    </form>
  )
}
