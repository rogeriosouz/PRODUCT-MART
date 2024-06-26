import { QueryClient } from 'react-query'

export const querryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3000,
    },
  },
})
