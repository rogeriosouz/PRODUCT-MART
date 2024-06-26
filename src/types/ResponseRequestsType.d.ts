export type ItemsRequests = {
  ItemsRequests: {
    id: string
    name: string
    price: number
    priceTotalQuant: number
    type: string
    image: string
    quant: number
    usersId: string
    create_at: string
  }
}

export type Address = {
  id: string
  state: string
  usersId: string
  streetAddress: string
  fistName: string
  aptNumber: number
  zipcode: number
}

export type Request = {
  id: string
  numberId: number
  totalPrice: number
  paymentMethod: string
  status: string
  items: ItemsRequests[]
  address: Address
  create_at: string
}

export type ResponseRequestType = {
  totalPages: number
  nextPage: boolean
  prevPage: boolean
  requests: Request[]
}
