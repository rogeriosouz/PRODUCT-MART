import { AddressType } from '@/app/checkout/components/Address'
import { api } from '@/lib/axios'
import { ResponseCartType } from '@/types/ResponseCartType'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import { querryClient } from '@/lib/querryClient'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import toast from 'react-hot-toast'

const schemaCheckout = z.object({
  address: z.string().uuid(),
})

type SchemaCheckout = z.infer<typeof schemaCheckout>

export function useCheckout() {
  const { push } = useRouter()

  const { data: dataAddress } = useQuery<{ address: AddressType[] }>(
    ['/address'],
    async () => {
      const response = await api.get('/address')
      return response.data
    },
  )

  const methods = useForm<SchemaCheckout>({
    resolver: zodResolver(schemaCheckout),
    values: {
      address:
        dataAddress?.address && dataAddress.address.length >= 1
          ? dataAddress?.address[0].id
          : '',
    },
  })

  const { data, status } = useQuery<ResponseCartType>(['/cart'], async () => {
    const response = await api.get('/cart')
    return response.data
  })

  const requestMutation = useMutation<
    { message: string; url: string },
    { response: { data: { message: string } } },
    { address: string }
  >(
    async ({ address }) => {
      const response = await api.post('/requests', {
        address,
      })

      return response.data
    },
    {
      onSuccess: (data) => {
        toast.success(data.message)

        setTimeout(() => {
          push(data.url)
        }, 1000)

        querryClient.invalidateQueries(['/cart'])
      },

      onError: (error) => {
        toast.error(error.response.data.message)
      },
    },
  )

  const itemRequestCreateMutation = useMutation<
    { message: string },
    { response: { data: { message: string } } },
    { address: string }
  >(
    async () => {
      const response = await api.post('/itemsRequest')

      return response.data
    },
    {
      onSuccess: (_, { address }) => {
        requestMutation.mutate({
          address,
        })
      },
      onError: (error) => {
        toast.error(error.response.data.message)
      },
    },
  )

  function onSubmit(data: SchemaCheckout) {
    if (!methods.watch('address')) {
      toast.error('You do not have a registered address register one now', {
        style: {
          maxWidth: '700px',
        },
      })

      return
    }

    itemRequestCreateMutation.mutate({
      address: data.address,
    })
  }

  return {
    data,
    status,
    methods,
    requestMutation,
    onSubmit,
  }
}
