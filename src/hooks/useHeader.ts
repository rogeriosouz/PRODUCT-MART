import { useState } from 'react'

export function useHeader() {
  const [openSearch, setOpenSearch] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  function closeSearch() {
    setOpenSearch(false)
  }

  function openAndCloseSearch() {
    setOpenSearch((v) => !v)
  }

  function closeMenu() {
    setOpenSearch(false)
  }

  function openAndCloseMenu() {
    setOpenMenu((v) => !v)
  }

  return {
    openSearch,
    openMenu,
    closeSearch,
    closeMenu,
    openAndCloseMenu,
    openAndCloseSearch,
  }
}
