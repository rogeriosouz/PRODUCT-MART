export function redirectSuccessRequest({
  method,
  tokenParams,
}: {
  method: string
  tokenParams: string
}): string {
  switch (method) {
    case 'Pix':
      return `/paymentPix/${tokenParams}`
    case 'Credit':
      return `/user`
  }

  return ''
}
