import { useState } from 'react'

export function useModal(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen)
  const [payload, setPayload] = useState(null)

  return {
    open,
    payload,
    show(nextPayload = null) {
      setPayload(nextPayload)
      setOpen(true)
    },
    hide() {
      setOpen(false)
      setPayload(null)
    },
  }
}
