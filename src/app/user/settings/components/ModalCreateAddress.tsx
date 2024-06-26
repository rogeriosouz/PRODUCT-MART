import { Input } from '@/components/input'
import { Button } from '@/components/ui/button'
import { useForm } from '@/hooks/useForm'
import { querryClient } from '@/lib/querryClient'
import { AlertCircle, Check, CircleDashed, X } from 'lucide-react'
import { z } from 'zod'

interface ModalCreateAddressProps {
  closeModal: () => void
}

const schemaCreateAddress = z.object({
  fistName: z.string().min(2),
  lastName: z.string().min(2),
  streetAddress: z.string().min(2),
  aptNumber: z
    .string()
    .min(1)
    .transform((value) => Number(value)),
  state: z.string().min(2),
  zipcode: z
    .string()
    .min(8)
    .transform((value) => Number(value)),
})

type CreateAddressType = z.infer<typeof schemaCreateAddress>

export function ModalCreateAddress({ closeModal }: ModalCreateAddressProps) {
  const { Submit, handleSubmit, register, errors, mutation } = useForm<
    CreateAddressType,
    { message: string }
  >({
    schemaZod: schemaCreateAddress,
    configMutation: {
      url: '/address',
      method: 'POST',
    },
    resultMutation: {
      onSuccess: () => {
        querryClient.invalidateQueries(['/address'])
        setTimeout(() => {
          closeModal()
        }, 3000)
      },
    },
  })

  return (
    <div className="animate__animated animate__fadeIn fixed bottom-0 left-0 right-0 top-0 z-[999999999] flex items-center justify-center bg-zinc-500/20 px-5">
      <div className="animate__animated animate__slideInDown  w-[550px] rounded bg-white p-7">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900">
            Create address
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

        <div className="mt-5 w-full">
          <div className="mb-2 flex w-full items-start gap-2">
            <label className="block w-full">
              <p className="mb-1 text-sm font-normal text-zinc-800">
                Fist Name
              </p>
              <Input.Root>
                <Input.Input
                  register={register}
                  nameRegister="fistName"
                  placeholder="Fist Name"
                  isErro={!!errors.fistName}
                  typeInput="text"
                />

                {errors.fistName && (
                  <Input.MessageError
                    message={errors.fistName.message as string}
                  />
                )}
              </Input.Root>
            </label>

            <label className="block w-full">
              <p className="mb-1 text-sm font-normal text-zinc-800">
                Last Name
              </p>
              <Input.Root>
                <Input.Input
                  register={register}
                  nameRegister="lastName"
                  placeholder="Last Name"
                  isErro={!!errors.lastName}
                  typeInput="text"
                />

                {errors.lastName && (
                  <Input.MessageError
                    message={errors.lastName.message as string}
                  />
                )}
              </Input.Root>
            </label>
          </div>

          <div className="mb-2 flex w-full items-start gap-2">
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

            <label className="mb-2 block w-full">
              <p className="mb-1 text-sm font-normal text-zinc-800">
                Apt Number
              </p>
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

          <label className="mb-2 block w-full">
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

          <label className="mb-5 block w-full">
            <p className="mb-1 text-sm font-normal text-zinc-800">Zip Code</p>
            <Input.Root>
              <Input.Input
                register={register}
                nameRegister="zipcode"
                placeholder="Zip Code"
                isErro={!!errors.zipcode}
                typeInput="number"
              />

              {errors.zipcode && (
                <Input.MessageError
                  message={errors.zipcode.message as string}
                />
              )}
            </Input.Root>
          </label>

          <Button type="button" onClick={handleSubmit(Submit)}>
            {mutation.status === 'loading' ? (
              <CircleDashed className="animate-spin" />
            ) : (
              'Create address'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
