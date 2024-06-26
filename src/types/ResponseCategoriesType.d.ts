export type Category = {
  id: string
  name: string
  productsToCategory: [
    {
      id: string
    },
  ]
}

export type ResponseCategoriesType = {
  categories: Category[]
}
