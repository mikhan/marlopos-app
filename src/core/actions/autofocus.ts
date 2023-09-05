import type { Action } from 'svelte/action'

export const autofocus: Action<HTMLElement, boolean | undefined> = (element, autofocus) => {
  if (autofocus !== false) {
    element.focus()
  }

  return { update: (focus) => focus && element.focus() }
}
