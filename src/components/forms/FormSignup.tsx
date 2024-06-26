'use client'
import { Input } from '../input'
import { z } from 'zod'
import { AlertCircle, Check, CircleDashed } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from '@/hooks/useForm'
import { Button } from '../ui/button'

const schemaSignup = z
  .object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
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

type SignupType = z.infer<typeof schemaSignup>

export function FormSignup() {
  const { push } = useRouter()

  const { Submit, handleSubmit, errors, mutation, register } = useForm<
    SignupType,
    { message: string }
  >({
    configMutation: {
      url: `/auth/register`,
      method: 'POST',
    },
    schemaZod: schemaSignup,
    resultMutation: {
      onSuccess: () => {
        setTimeout(() => {
          push('/auth/signin')
        }, 3000)
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
        <div className="flex w-full items-center gap-2 rounded bg-green-500/40 px-3 py-2 ">
          <Check className="h-5 w-5 text-green-500" />
          <p className="text-sm text-green-500">User created successfully</p>
        </div>
      )}

      <label className="mb-1 block w-full">
        <p className="text-text-primary text-base font-normal">Name</p>
        <Input.Root>
          <Input.Input
            register={register}
            nameRegister={'name'}
            placeholder="Name"
            isErro={!!errors.name}
            typeInput="text"
          />

          {errors.name && (
            <Input.MessageError message={errors.name.message as string} />
          )}
        </Input.Root>
      </label>

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
      <label className="mb-1 block w-full">
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
            typeInput="password"
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
          'Register'
        )}
      </Button>
    </form>
  )
}
