import { browser } from '$app/environment'

let locks = 0

export function disableDocumentScrolling() {
  if (!browser) return

  locks++

  if (locks === 1) {
    document.body.style.setProperty('padding-block-end', `${window.innerHeight - document.body.clientHeight}px`)
    document.body.style.setProperty('padding-inline-end', `${window.innerWidth - document.body.clientWidth}px`)
    document.body.style.setProperty('overflow', 'hidden')
  }
}

export function enableDocumentScrolling() {
  if (!browser) return

  locks = Math.max(0, locks - 1)

  if (locks === 0) {
    document.body.style.removeProperty('padding-block-end')
    document.body.style.removeProperty('padding-inline-end')
    document.body.style.removeProperty('overflow')
  }
}
