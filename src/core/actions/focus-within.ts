import type { Action } from 'svelte/action'

type Attributes = {
  'on:focusenter': (event: CustomEvent<FocusEvent>) => void
  'on:focusleave': (event: CustomEvent<FocusEvent>) => void
}

export const focusWithin: Action<HTMLElement, undefined, Attributes> = (element) => {
  let focused = false

  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '0')
  }

  element.addEventListener('focusin', (event) => {
    if (focused) return
    focused = true
    element.dispatchEvent(new CustomEvent('focusenter', { detail: event }))
  })

  element.addEventListener('focusout', () => {
    if (element.matches(':focus-within')) return
    focused = false
    element.dispatchEvent(new CustomEvent('focusleave', { detail: event }))
  })
}
