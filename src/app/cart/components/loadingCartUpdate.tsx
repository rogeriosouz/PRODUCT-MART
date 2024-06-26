interface LoadingCartUpdateProps {
  loadingCartUpdate: boolean
}

export function LoadingCartUpdate({
  loadingCartUpdate,
}: LoadingCartUpdateProps) {
  return (
    <>
      {loadingCartUpdate && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[999999999] flex h-screen w-screen items-center justify-center bg-zinc-50/70">
          <div className="flex items-center gap-2">
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
