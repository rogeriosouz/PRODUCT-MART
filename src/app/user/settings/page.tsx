'use client'
import { AddressType } from '@/app/checkout/components/Address'
import { MapPin, User } from '@/components/icons'
import { Input } from '@/components/input'
import { api } from '@/lib/axios'
import { useQuery } from 'react-query'
import { AddressComponent } from './components/AddressComponent'
import { z } from 'zod'
import { useForm } from '@/hooks/useForm'
import { AlertCircle, Check, CircleDashed } from 'lucide-react'
import { useAuth } from '@/context/authContext'
import { LoadingAddressComponent } from './components/LoadingAddressComponent'
import { ModalChangePassword } from './components/ModalChangePassword'
import { ModalCreateAddress } from './components/ModalCreateAddress'
import { useSettings } from '@/hooks/useSettings'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

const schemaUpdateUser = z.object({
  name: z.string().optional(),
})

type UpdateUserType = z.infer<typeof schemaUpdateUser>

export default function Settings() {
  const { user } = useAuth()

  const {
    closeModalChangePasswordModal,
    closeModalCreateAddress,
    openChangePasswordModal,
    openCreateAddressModal,
    openModalChangePasswordFn,
    openModalCreateAddressFn,
  } = useSettings()

  const { Submit, handleSubmit, mutation, register, setValue, errors } =
    useForm<UpdateUserType, { message: string }>({
      schemaZod: schemaUpdateUser,
      configMutation: {
        url: '/user/update',
        method: 'PUT',
      },
    })

  useEffect(() => {
    setValue('name', user?.name)
  }, [setValue, user])

  const { data, status } = useQuery<{ address: AddressType[] }>(
    ['/address'],
    async () => {
      const response = await api.get('/address')
      return response.data
    },
  )

  return (
    <div className="mx-auto mt-[135px] max-w-[1350px] md:px-5">
      <div className="my-5 flex items-center gap-2 rounded py-2">
        <User className="h-5 w-5 fill-zinc-900" />
        <h1 className="text-lg font-semibold uppercase text-zinc-900">
          Meus dados
        </h1>
      </div>

      {openChangePasswordModal && (
        <ModalChangePassword closeModal={closeModalChangePasswordModal} />
      )}

      {openCreateAddressModal && (
        <ModalCreateAddress closeModal={closeModalCreateAddress} />
      )}

      <div className="flex w-full items-start gap-10 py-5 md:flex-col">
        <div className="w-full rounded bg-white px-10 py-10 shadow-2xl">
          <Button variant={'outline'} onClick={openModalChangePasswordFn}>
            Change password
          </Button>

          <form
            onSubmit={handleSubmit(Submit)}
            className="my-5 w-full space-y-5"
          >
            {mutation.status === 'error' && (
              <div className="my-3 flex w-full items-center gap-2 rounded bg-red-500/40 px-3 py-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">
                  {mutation.error.response.data.message}
                </p>
              </div>
            )}

            {mutation.status === 'success' && (
              <div className="my-3 flex w-full  items-center gap-2 rounded bg-green-500/40 px-3 py-2 ">
                <Check className="h-5 w-5 text-green-500" />
                <p className="text-sm text-green-500">
                  {mutation.data ? mutation.data.message : ''}
                </p>
              </div>
            )}

            <label className="block">
              <p className="text-base font-normal text-zinc-900">Name:</p>
              <Input.Root>
                <Input.Input
                  register={register}
                  nameRegister="name"
                  isErro={!!errors.name}
                  typeInput="text"
                  placeholder="Name"
                />
                {errors.name && (
                  <Input.MessageError message={errors.name.message as string} />
                )}
              </Input.Root>
            </label>

            <Button type="submit">
              {mutation.status === 'loading' ? (
                <CircleDashed className="animate-spin" />
              ) : (
                'Edit'
              )}
            </Button>
          </form>
        </div>
        <div className="w-full rounded bg-white px-5 py-10 shadow-2xl">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 fill-zinc-900" />
            <h2 className="text-lg font-semibold capitalize text-zinc-900">
              Address
            </h2>
          </div>

          <div className="my-8 w-full space-y-3">
            {status === 'loading' && (
              <>
                <LoadingAddressComponent />
                <LoadingAddressComponent />
              </>
            )}
            {status === 'success' && (
              <>
                {data.address.map((address) => (
                  <AddressComponent key={address.id} address={address} />
                ))}
              </>
            )}
          </div>

          <Button variant={'default'} onClick={openModalCreateAddressFn}>
            Create new address
          </Button>
        </div>
      </div>
    </div>
  )
}
