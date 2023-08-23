import type { Action } from 'svelte/action'

export const followFocus: Action<HTMLElement> = (element) => {
  const mutationObserver = new MutationObserver((records) => {
    for (const { target } of records) {
      if (target instanceof HTMLElement && target.getAttribute('tabindex') === '0') {
        target.focus()
        break
      }
    }
  })

  const focusIn = (element: HTMLElement) =>
    mutationObserver.observe(element, {
      attributes: true,
      attributeFilter: ['tabindex'],
      subtree: true,
    })

  const focusout = () => mutationObserver.disconnect()

  const abortController = new AbortController()
  const { signal } = abortController
  element.addEventListener('focusin', () => focusIn(element), { signal })
  element.addEventListener('focusout', () => focusout(), { signal })

  return { destroy: () => abortController.abort() }
}
