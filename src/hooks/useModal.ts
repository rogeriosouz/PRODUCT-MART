import { useState } from 'react'

export function useModal() {
  const [openModal, setOpenModal] = useState(false)

  function open() {
    setOpenModal(true)
  }

  function close() {
    setOpenModal(false)
  }

  return {
    openModal,
    open,
    close,
  }
}
