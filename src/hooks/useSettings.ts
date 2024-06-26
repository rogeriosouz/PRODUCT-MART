import { useState } from 'react'

export function useSettings() {
  const [openCreateAddressModal, setOpenCreateAddressModal] = useState(false)
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false)

  function openModalChangePasswordFn() {
    setOpenChangePasswordModal(true)
  }

  function openModalCreateAddressFn() {
    setOpenCreateAddressModal(true)
  }

  function closeModalChangePasswordModal() {
    setOpenChangePasswordModal(false)
  }

  function closeModalCreateAddress() {
    setOpenCreateAddressModal(false)
  }

  return {
    closeModalCreateAddress,
    closeModalChangePasswordModal,
    openCreateAddressModal,
    openChangePasswordModal,
    openModalChangePasswordFn,
    openModalCreateAddressFn,
  }
}
