'use client'
import { useAuth } from '@/context/authContext'
import { querryClient } from '@/lib/querryClient'
import { api } from '@/lib/axios'
import clsx from 'clsx'
import { CircleDashed } from 'lucide-react'
import { useRouter } from 'next13-progressbar'
import { useState } from 'react'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
interface TypeProductProps {
  types: string[]
  idProduct: string
  name: string
}

export function TypesProduct({ types, idProduct, name }: TypeProductProps) {
  const [typeSelect, setTypeSelect] = useState(0)
  const { isAuthenticate } = useAuth()

  const { push } = useRouter()

  const addProductCartMutation = useMutation<
    unknown,
    unknown,
    { idProduct: string; type: string },
    unknown
  >(
    async ({ idProduct, type }) => {
      const response = await api.post('/cart', {
        idProduct,
        type,
      })

      return response.data
    },
    {
      onSuccess(_, params) {
        toast.success(
          `Product (${name} - ${params.type}) successfully added to cart`,
          {
            style: {
              maxWidth: '700px',
            },
          },
        )
        querryClient.invalidateQueries(['/cart'])
        push('/cart')
      },
    },
  )

  function addProductCart() {
    if (!isAuthenticate) {
      push('/auth/signin')
    } else {
      addProductCartMutation.mutate({ idProduct, type: types[typeSelect] })
    }
  }

  const { status } = addProductCartMutation

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        {types.map((type, index) => (
          <Button
            onClick={() => setTypeSelect(index)}
            key={type}
            variant={'outline'}
            className={clsx(
              'flex h-10 items-center justify-center rounded border-2 px-8 hover:border-primary',
              {
                'text-bg-blue border-primary': typeSelect === index,
                'border-zinc-400/20': typeSelect !== index,
              },
            )}
          >
            {type}
          </Button>
        ))}
      </div>

      <Button
        disabled={status === 'loading' || status === 'success'}
        onClick={addProductCart}
        className="w-full py-6 disabled:cursor-progress disabled:bg-primary"
      >
        {status === 'loading' ? (
          <CircleDashed className="animate-spin" />
        ) : (
          'ADD CART'
        )}
      </Button>
    </>
  )
}
