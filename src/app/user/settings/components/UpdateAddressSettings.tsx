import { AddressType } from '@/app/checkout/components/Address'
import { Input } from '@/components/input'
import { querryClient } from '@/lib/querryClient'
import { useEffect, useState } from 'react'
import { useForm } from '@/hooks/useForm'
import { z } from 'zod'
import { AlertCircle, Check, CircleDashed } from 'lucide-react'
import { Button } from '@/components/ui/button'

const schemaUpdateAddress = z.object({
  fistName: z.string().optional(),
  lastName: z.string().optional(),
  streetAddress: z.string().optional(),
  aptNumber: z.number().optional(),
  state: z.string().optional(),
  zipcode: z.number().min(8).optional(),
})

type TypeUpdateAddress = z.infer<typeof schemaUpdateAddress>

interface UpdateAddressSettingsProps {
  address: AddressType
  closeUpdateAddressSettings: () => void
}

export function UpdateAddressSettings({
  address,
  closeUpdateAddressSettings,
}: UpdateAddressSettingsProps) {
  const [mutationSuccess, setMutationSuccess] = useState(false)

  const { Submit, handleSubmit, register, errors, setValue, mutation } =
    useForm<TypeUpdateAddress, { message: string }>({
      schemaZod: schemaUpdateAddress,
      configMutation: {
        url: `/address/${address.id}`,
        method: 'PUT',
      },
      resultMutation: {
        onSuccess: (_, params) => {
          const cachedData = querryClient.getQueryData(['/address']) as {
            address: AddressType[]
          }

          const updatedData = cachedData.address.map((item) => {
            if (item.id === address.id) {
              return { ...item, ...params }
            }

            return item
          })

          querryClient.setQueryData(['/address'], { address: updatedData })
          setMutationSuccess(true)

          setTimeout(() => {
            setMutationSuccess(false)
          }, 3000)
        },
        onError: () => {
          setMutationSuccess(false)
        },
      },
    })

  useEffect(() => {
    setValue('fistName', address.fistName)
    setValue('lastName', address.lastName)
    setValue('streetAddress', address.streetAddress)
    setValue('aptNumber', address.aptNumber)
    setValue('state', address.state)
    setValue('zipcode', address.zipcode)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <div className="space-y-2">
      {mutation.status === 'error' && (
        <div className="flex w-full items-center gap-2 rounded bg-red-500/40 px-3 py-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">
            {mutation.error.response.data.message}
          </p>
        </div>
      )}

      {mutationSuccess && (
        <div className="flex w-full items-center gap-2 rounded bg-green-500/40 px-3 py-2 ">
          <Check className="h-5 w-5 text-green-500" />
          <p className="text-sm text-green-500">
            {mutation.data ? mutation.data.message : ''}
          </p>
        </div>
      )}

      <div className="flex w-full items-start gap-2 md:flex-col">
        <label className="block w-full">
          <p className="mb-1 text-sm font-normal text-zinc-800">Fist Name</p>
          <Input.Root>
            <Input.Input
              register={register}
              nameRegister="fistName"
              placeholder="Fist Name"
              isErro={!!errors.fistName}
              typeInput="text"
            />

            {errors.fistName && (
              <Input.MessageError message={errors.fistName.message as string} />
            )}
          </Input.Root>
        </label>

        <label className="block w-full">
          <p className="mb-1 text-sm font-normal text-zinc-800">Last Name</p>
          <Input.Root>
            <Input.Input
              register={register}
              nameRegister="lastName"
              placeholder="Last Name"
              isErro={!!errors.lastName}
              typeInput="text"
            />

            {errors.lastName && (
              <Input.MessageError message={errors.lastName.message as string} />
            )}
          </Input.Root>
        </label>
      </div>

      <div className="flex w-full items-start gap-2 md:flex-col">
        <label className="block w-full">
          <p className="mb-1 text-sm font-normal text-zinc-800">
            Street Address
          </p>

          <Input.Root>
            <Input.Input
              register={register}
              nameRegister="streetAddress"
              placeholder="Street Address"
              isErro={!!errors.streetAddress}
              typeInput="text"
            />

            {errors.streetAddress && (
              <Input.MessageError
                message={errors.streetAddress.message as string}
              />
            )}
          </Input.Root>
        </label>

        <label className="block w-full">
          <p className="mb-1 text-sm font-normal text-zinc-800">Apt Number</p>
          <Input.Root>
            <Input.Input
              register={register}
              nameRegister="aptNumber"
              placeholder="Apt Number"
              isErro={!!errors.aptNumber}
              typeInput="number"
            />

            {errors.aptNumber && (
              <Input.MessageError
                message={errors.aptNumber.message as string}
              />
            )}
          </Input.Root>
        </label>
      </div>

      <label className="block w-full">
        <p className="mb-1 text-sm font-normal text-zinc-800">State</p>
        <Input.Root>
          <Input.Input
            register={register}
            nameRegister="state"
            placeholder="State"
            isErro={!!errors.state}
            typeInput="text"
          />

          {errors.state && (
            <Input.MessageError message={errors.state.message as string} />
          )}
        </Input.Root>
      </label>

      <label className="block w-full">
        <p className="mb-1 text-sm font-normal text-zinc-800">Zip Code</p>
        <Input.Root>
          <Input.Input
            register={register}
            nameRegister="zipcode"
            placeholder="Zip Code"
            isErro={!!errors.zipcode}
            typeInput="text"
          />

          {errors.zipcode && (
            <Input.MessageError message={errors.zipcode.message as string} />
          )}
        </Input.Root>
      </label>

      <div className="flex w-full items-center gap-3 pt-5">
        <Button variant={'default'} onClick={handleSubmit(Submit)}>
          {mutation.status === 'loading' ? (
            <CircleDashed className="animate-spin" />
          ) : (
            'Edit'
          )}
        </Button>

        <Button
          variant={'destructive'}
          type="button"
          onClick={closeUpdateAddressSettings}
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}
