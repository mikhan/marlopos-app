import type { Action } from 'svelte/action'

export type DismissOptions = {
  clickOutside?: boolean
  scroll?: boolean
  keys?: string[] | false
  restoreFocus?: boolean
}

export const dismiss: Action<
  HTMLElement,
  DismissOptions | undefined,
  { 'on:dismiss': (event: CustomEvent) => void }
> = (element, options = {}) => {
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
    notify()

    if (event.defaultPrevented) return

    if (previousActiveElement && restoreFocus) {
      previousActiveElement.focus()
    }
  }

  function onPointerDown(event: MouseEvent) {
    event.target && !element.contains(event.target as Node) && dismiss(event)
  }

  function onScroll(event: Event) {
    dismiss(event)
  }

  function onKeyDown(event: KeyboardEvent) {
    keys && keys.includes(event.key) && dismiss(event)
  }

  function notify() {
    const event = new CustomEvent('dismiss')
    element.dispatchEvent(event)
  }

  return { destroy: () => controller.abort() }
}
