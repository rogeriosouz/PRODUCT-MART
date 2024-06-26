import { Input } from '@/components/input'
import { Button } from '@/components/ui/button'
import { useForm } from '@/hooks/useForm'
import { AlertCircle, Check, CircleDashed, X } from 'lucide-react'
import { z } from 'zod'

interface ModalChangePassword {
  closeModal: () => void
}

const schemaUpdatePassword = z
  .object({
    password: z.string().min(4),
    newPassword: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmPassword
    },
    {
      path: ['confirmPassword'],
      message: 'As senha precisam ser iguais',
    },
  )

type UpdatePasswordType = z.infer<typeof schemaUpdatePassword>

export function ModalChangePassword({ closeModal }: ModalChangePassword) {
  const { Submit, handleSubmit, register, errors, mutation } = useForm<
    UpdatePasswordType,
    { message: string }
  >({
    schemaZod: schemaUpdatePassword,
    configMutation: {
      url: '/user/updatePassword',
      method: 'PUT',
    },
    resultMutation: {
      onError: (error) => {
        console.log(error.response.data)
      },
    },
  })

  return (
    <div className="animate__animated animate__fadeIn fixed bottom-0 left-0 right-0 top-0 z-[99999] flex items-center justify-center bg-zinc-500/20 px-5">
      <div className="animate__animated animate__slideInDown  w-[550px] rounded bg-white p-7">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900">
            Changer password
          </h1>
          <Button variant={'ghost'} onClick={closeModal}>
            <X className="h-full w-full text-zinc-900" />
          </Button>
        </div>

        {mutation.status === 'error' && (
          <div className="my-2 flex w-full items-center gap-2 rounded bg-red-500/40 px-3 py-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              {mutation.error.response.data.message}
            </p>
          </div>
        )}

        {mutation.status === 'success' && (
          <div className="my-2 flex w-full items-center gap-2 rounded bg-green-500/40 px-3 py-2 ">
            <Check className="h-5 w-5 text-green-500" />
            <p className="text-sm text-green-500">
              {mutation.data ? mutation.data.message : ''}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(Submit)} className="mt-5 w-full">
          <label className="mb-2 block space-y-1">
            <p className="text-sm font-normal text-zinc-900">Password</p>
            <Input.Root>
              <Input.Input
                register={register}
                nameRegister="password"
                isErro={!!errors.password}
                typeInput="password"
                placeholder="*****"
              />

              {errors.password && (
                <Input.MessageError
                  message={errors.password.message as string}
                />
              )}
            </Input.Root>
          </label>

          <label className="mb-2 block space-y-1">
            <p className="text-sm font-normal text-zinc-900">New password</p>
            <Input.Root>
              <Input.Input
                register={register}
                nameRegister="newPassword"
                isErro={!!errors.newPassword}
                typeInput="password"
                placeholder="****"
              />

              {errors.newPassword && (
                <Input.MessageError
                  message={errors.newPassword.message as string}
                />
              )}
            </Input.Root>
          </label>

          <label className="mb-5 block space-y-1">
            <p className="text-sm font-normal text-zinc-900">
              Confirm password
            </p>
            <Input.Root>
              <Input.Input
                register={register}
                nameRegister="confirmPassword"
                isErro={!!errors.confirmPassword}
                typeInput="password"
                placeholder="****"
              />

              {errors.confirmPassword && (
                <Input.MessageError
                  message={errors.confirmPassword.message as string}
                />
              )}
            </Input.Root>
          </label>

          <Button>
            {mutation.status === 'loading' ? (
              <CircleDashed className="animate-spin" />
            ) : (
              'SAVE EDITIONS'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
