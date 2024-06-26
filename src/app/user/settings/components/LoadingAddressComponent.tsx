export function LoadingAddressComponent() {
  return (
    <div className="bg-bg-blue/10 flex h-[128px] w-full animate-pulse rounded px-5">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-3 ">
          <div className="h-3 w-32  rounded bg-zinc-300"></div>
          <div className="h-2 w-20  rounded bg-zinc-300"></div>
          <div className="h-2 w-16  rounded bg-zinc-300"></div>
        </div>

        <div className="h-3 w-20 bg-zinc-200"></div>
      </div>
    </div>
  )
}
