import { browser } from '$app/environment'
import { overrideProperties } from './element'

let restoreProperties: (() => void) | undefined

export function disableDocumentScrolling() {
  if (!browser) return

  restoreProperties = overrideProperties(document.body, {
    'padding-block-end': `${window.innerHeight - document.body.clientHeight}px`,
    'padding-inline-end': `${window.innerWidth - document.body.clientWidth}px`,
    'overflow': 'hidden',
  })
}

export function enableDocumentScrolling() {
  if (!browser || !restoreProperties) return

  restoreProperties()
}
