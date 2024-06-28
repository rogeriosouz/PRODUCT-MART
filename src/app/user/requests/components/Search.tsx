import { Input } from '@/components/input'

interface SearchProps {
  search: string
  debouncedSearch: (value: string) => void
}

export function Search({ search, debouncedSearch }: SearchProps) {
  return (
    <Input.Root>
      <Input.Input
        defaultValue={search}
        onChange={(event) => debouncedSearch(event.target.value)}
        isErro={false}
        typeInput="text"
        placeholder="Search"
      />
    </Input.Root>
  )
}
