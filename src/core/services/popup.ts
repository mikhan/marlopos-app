import { browser } from '$app/environment'

let locks = 0

const overflowTarget = getOverflowTarget(browser)

export function disableDocumentScrolling() {
  if (!overflowTarget) return

  locks++

  if (locks === 1) {
    document.documentElement.style.setProperty(
      'padding-block-end',
      `${window.innerHeight - document.body.clientHeight}px`,
    )
    document.documentElement.style.setProperty(
      'padding-inline-end',
      `${window.innerWidth - document.body.clientWidth}px`,
    )
    overflowTarget.style.setProperty('overflow', 'hidden')
  }
}

export function enableDocumentScrolling() {
  if (!overflowTarget) return

  locks = Math.max(0, locks - 1)

  if (locks === 0) {
    document.documentElement.style.removeProperty('padding-block-end')
    document.documentElement.style.removeProperty('padding-inline-end')
    overflowTarget.style.removeProperty('overflow')
  }
}

function getOverflowTarget(browser: boolean) {
  if (!browser) return null

  const computedStyle = getComputedStyle(document.body)

  return computedStyle.overflow === 'visible' ? document.documentElement : document.body
}
