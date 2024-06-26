type PromotionType = {
  id: string
  discount: number
}

type ItemCartType = {
  id: string
  name: string
  slug: string
  type: string
  price: number
  discountPrice: number
  image: string
  quant: number
  priceTotalQuant: number
  Promotion: null | PromotionType
}

export type ResponseCartType = {
  cart: {
    totalPrice: 3000
    itemsCarts: ItemCartType[]
  }
}
