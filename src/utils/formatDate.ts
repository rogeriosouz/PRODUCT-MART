export function formatDate(date: string) {
  const newDate = new Date(date)
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
  }).format(newDate)
}
