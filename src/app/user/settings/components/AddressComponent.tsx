import { AddressType } from '@/app/checkout/components/Address'
import { UpdateAddressSettings } from './UpdateAddressSettings'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface AddressComponentProps {
  address: AddressType
}

export function AddressComponent({ address }: AddressComponentProps) {
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false)

  function closeUpdateAddressSettings() {
    setOpenUpdateAddress(false)
  }

  return (
    <div className="bg-bg-blue/10  w-full rounded px-5 py-5">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <p className="text-base font-normal capitalize text-zinc-900">
            {address.state}
          </p>
          <p className="text-sm font-normal text-zinc-900">
            {address.streetAddress}, NUMERO: {address.aptNumber}
          </p>
          <p className="text-sm font-normal text-zinc-900">
            CEP: {address.zipcode}
          </p>
        </div>

        {!openUpdateAddress && (
          <Button
            variant={'outline'}
            onClick={() => setOpenUpdateAddress(true)}
            className="font-normal text-zinc-900 transition-all hover:text-zinc-500"
          >
            Edit
          </Button>
        )}
      </div>

      {openUpdateAddress && (
        <>
          <div className="my-5 h-[1px] w-full bg-zinc-500/20"></div>
          <div className="my-5 w-full">
            <UpdateAddressSettings
              address={address}
              closeUpdateAddressSettings={closeUpdateAddressSettings}
            />
          </div>
        </>
      )}
    </div>
  )
}
