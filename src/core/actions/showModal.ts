import type { Action } from 'svelte/action'
import { disableDocumentScrolling, enableDocumentScrolling } from '$core/services/popup'

export const showModal: Action<HTMLDialogElement, boolean | undefined> = function (dialog, isOpen) {
  function toggle(isOpen: boolean | undefined) {
    if (isOpen !== false) {
      disableDocumentScrolling()
      dialog.showModal()
    } else {
      enableDocumentScrolling()
      dialog.close()
    }
  }

  toggle(isOpen)

  return {
    update(isOpen) {
      toggle(isOpen)
    },
    destroy() {
      if (isOpen !== false) enableDocumentScrolling()
    },
  }
}
