export type PromotionType = {
  id: string
  discount: string
}

export type ProductType = {
  id: string
  name: string
  slug: string
  typesProduct: string[]
  price: number
  description: string
  discountPrice: number
  images: string[]
  Promotion: null | PromotionType
}

export type ResponseProductsType = {
  totalPages: number
  nextPage: boolean
  prevPage: boolean
  products: ProductType[]
}
