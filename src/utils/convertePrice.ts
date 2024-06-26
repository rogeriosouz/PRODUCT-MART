export function convertPrice(price: number): string {
  const newPrice = price / 100

  return newPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
