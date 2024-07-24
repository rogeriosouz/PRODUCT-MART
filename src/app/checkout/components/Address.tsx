import { api } from '@/lib/axios'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useQuery } from 'react-query'
import { UpdateAddress } from './UpdateAddress'
import { MapPin } from '@/components/icons'
import { ModalCreateAddress } from '@/app/user/settings/components/ModalCreateAddress'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { data } from 'autoprefixer'
import { Controller } from 'react-hook-form'

export type AddressType = {
  id: string
  fistName: string
  lastName: string
  streetAddress: string
  aptNumber: number
  state: string
  zipcode: number
  usersId: string
  create_at: string
}

export function Address() {
  const [openCreateAddressModal, setOpenCreateAddressModal] = useState(false)

  const { data, status } = useQuery<{ address: AddressType[] }>(
    ['/address'],
    async () => {
      const response = await api.get('/address')
      return response.data
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  )

  function closeModalCreateAddress() {
    setOpenCreateAddressModal(false)
  }

  function openModalCreateAddress() {
    setOpenCreateAddressModal(true)
  }

  return (
    <>
      {openCreateAddressModal && (
        <ModalCreateAddress closeModal={closeModalCreateAddress} />
      )}

      <div className="my-6 w-full">
        <h1 className="text-text-primary/90 text-2xl font-semibold">
          Shipping address
        </h1>

        {status === 'loading' && (
          <div className="mt-5 w-full space-y-2">
            <div className="flex h-[43px] w-full animate-pulse items-center justify-between rounded bg-zinc-200 px-3 shadow-2xl">
              <div className="flex w-full items-center gap-3">
                <div className="flex h-7 w-7 animate-pulse items-center justify-center rounded-full bg-zinc-50"></div>
                <div className="h-3 w-24 animate-pulse bg-zinc-50"></div>
              </div>
              <div className="h-3 w-14 animate-pulse bg-zinc-50"></div>
            </div>
            <div className="flex h-[43px] w-full animate-pulse items-center justify-between rounded bg-zinc-200 px-3 shadow-2xl">
              <div className="flex w-full items-center gap-3">
                <div className="flex h-7 w-7 animate-pulse items-center justify-center rounded-full bg-zinc-50"></div>
                <div className="h-3 w-24 animate-pulse bg-zinc-50"></div>
              </div>
              <div className="h-3 w-14 animate-pulse bg-zinc-50"></div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <>
            {data.address.length <= 0 && (
              <div className="mt-5 w-full">
                <div className="rounded bg-white px-4 py-2 shadow-2xl">
                  <Button
                    onClick={openModalCreateAddress}
                    type="button"
                    className="gap-2"
                  >
                    <MapPin className="h-5 w-5 fill-white" />
                    Create address
                  </Button>
                </div>
              </div>
            )}

            {data.address.length >= 1 && (
              <div className="mt-5 w-full space-y-3">
                <Controller
                  name="address"
                  render={({ field: { ref, value, onChange } }) => (
                    <RadioGroup.Root
                      value={value}
                      onValueChange={onChange}
                      className="space-y-2"
                      ref={ref}
                    >
                      {data.address.map((item) => (
                        <div
                          key={item.id}
                          className="relative w-full rounded bg-white px-4 py-2 shadow-2xl "
                        >
                          <label className="flex cursor-pointer items-center gap-3">
                            <RadioGroup.Item
                              className="flex h-7 w-7 items-center justify-center rounded bg-zinc-200"
                              value={item.id}
                            >
                              <RadioGroup.Indicator asChild>
                                <div className="h-3 w-3 rounded bg-primary"></div>
                              </RadioGroup.Indicator>
                            </RadioGroup.Item>
                            <p className="text-base font-medium text-zinc-900">
                              {item.state}
                            </p>

                            <p className="text-base font-medium text-zinc-900">
                              |
                            </p>

                            <p className="text-sm font-normal text-zinc-500">
                              {item.zipcode}
                            </p>
                          </label>

                          <UpdateAddress address={item} />
                        </div>
                      ))}
                    </RadioGroup.Root>
                  )}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
