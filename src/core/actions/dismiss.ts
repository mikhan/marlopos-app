import type { Action } from 'svelte/action'

export type DismissOptions = {
  clickOutside?: boolean
  scroll?: boolean
  keys?: string[] | false
  restoreFocus?: boolean
}

export function onDismiss(element: HTMLElement, callback: (event: Event) => void, options: DismissOptions = {}) {
  const controller = new AbortController()
  const clickOutside = options.clickOutside ?? true
  const scroll = options.scroll ?? false
  const keys = options.keys ?? ['Escape']
  const restoreFocus = options.restoreFocus ?? true
  const previousActiveElement = document.activeElement as HTMLElement | null

  if (clickOutside) {
    document.addEventListener('pointerdown', onPointerDown, { signal: controller.signal })
  }

  if (scroll) {
    window.addEventListener('scroll', onScroll, { signal: controller.signal, passive: true })
  }

  if (keys && keys.length) {
    document.addEventListener('keydown', onKeyDown, { signal: controller.signal })
  }

  function dismiss(event: Event) {
    callback(event)

    if (event.defaultPrevented) return

    controller.abort()

    if (previousActiveElement && restoreFocus) {
      previousActiveElement.focus()
    }
  }

  function onPointerDown(event: MouseEvent) {
    event.target && !element.contains(<Node>event.target) && dismiss(event)
  }

  function onScroll(event: Event) {
    dismiss(event)
  }

  function onKeyDown(event: KeyboardEvent) {
    keys && keys.includes(event.key) && dismiss(event)
  }

  return controller
}

export const dismiss: Action<
  HTMLElement,
  DismissOptions | undefined,
  { 'on:dismiss': (event: CustomEvent) => void }
> = (node, options) => {
  function notify() {
    const event = new CustomEvent('dismiss')
    node.dispatchEvent(event)
  }

  const controller = onDismiss(node, notify, options)

  return { destroy: () => controller.abort() }
}
