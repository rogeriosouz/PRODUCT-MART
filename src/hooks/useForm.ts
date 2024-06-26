import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, UseMutationOptions } from 'react-query'
import { AxiosRequestConfig } from 'axios'
import { FieldValues, useForm as useFormHook } from 'react-hook-form'
import { api } from '@/lib/axios'

type TypeErrorResponse = {
  response: {
    data: {
      message: string
    }
  }
}

export function useForm<Z extends FieldValues, R>({
  schemaZod,
  configMutation,
  resultMutation,
}: {
  schemaZod: any
  configMutation: AxiosRequestConfig
  resultMutation?: UseMutationOptions<R, TypeErrorResponse, Z, unknown>
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useFormHook<Z>({
    resolver: zodResolver(schemaZod),
  })

  const mutation = useMutation<R, TypeErrorResponse, Z, unknown>(
    async (data) => {
      const response = await api({
        data,
        ...configMutation,
      })
      return response.data
    },
    resultMutation,
  )

  function Submit(data: Z) {
    mutation.mutate(data)
  }

  return {
    mutation,
    register,
    handleSubmit,
    errors,
    Submit,
    watch,
    setValue,
  }
}
