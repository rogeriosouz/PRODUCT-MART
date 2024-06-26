import { AddressType } from '@/app/checkout/components/Address'
import { api } from '@/lib/axios'
import { ResponseCartType } from '@/types/ResponseCartType'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import { methodsData } from '@/app/checkout/components/PaymentMethod'
import { querryClient } from '@/lib/querryClient'
import { redirectSuccessRequest } from '@/utils/redirectSuccessRequest'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function useCheckout() {
  const [addressID, setAddressId] = useState('0')
  const [methodSelect, setMethodSelect] = useState('0')
  const { push } = useRouter()

  useQuery<{ address: AddressType[] }>(
    ['/address'],
    async () => {
      const response = await api.get('/address')
      return response.data
    },
    {
      onSuccess: (data) => {
        if (data.address.length >= 1) {
          setAddressId(data.address[data.address.length - 1].id)
        }
      },
    },
  )

  const { data, status } = useQuery<ResponseCartType>(['/cart'], async () => {
    const response = await api.get('/cart')
    return response.data
  })

  const methods = useForm({
    resolver: zodResolver(methodsData[Number(methodSelect)].schema),
  })

  const requestMutation = useMutation<
    { message: string },
    unknown,
    { paymentMethod: string; address: string }
  >(
    async ({ address, paymentMethod }) => {
      const response = await api.post('/requests', {
        paymentMethod,
        address,
      })

      return response.data
    },
    {
      onSuccess: (data, params) => {
        const urlRedirect = redirectSuccessRequest({
          method: params.paymentMethod,
          tokenParams: '',
        })

        push(urlRedirect)

        toast.success(data.message)

        querryClient.invalidateQueries(['/cart'])
      },
    },
  )

  const itemRequestCreateMutation = useMutation<
    { message: string },
    unknown,
    { paymentMethod: string; address: string }
  >(
    async () => {
      const response = await api.post('/itemsRequest')
      return response.data
    },
    {
      onSuccess: (_, { address, paymentMethod }) => {
        requestMutation.mutate({
          address,
          paymentMethod,
        })
      },
    },
  )

  function onSubmit(data: any) {
    if (addressID === '0') {
      toast.error('You do not have a registered address register one now', {
        style: {
          maxWidth: '700px',
        },
      })

      return
    }

    const dataFormat = {
      paymentMethod: methodsData[Number(methodSelect)].paymentMethod,
      addressID,
      data,
    }

    itemRequestCreateMutation.mutate({
      address: dataFormat.addressID,
      paymentMethod: dataFormat.paymentMethod,
    })
  }

  function setValueMethodSelect(method: string) {
    setMethodSelect(method)
  }

  function setValueAddressId(addressId: string) {
    setAddressId(addressId)
  }

  return {
    data,
    status,
    addressID,
    methodSelect,
    methods,
    requestMutation,
    onSubmit,
    setValueMethodSelect,
    setValueAddressId,
  }
}
