import type { Action } from 'svelte/action'

export type ShortcutConfig = {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
}

type Shortcut = {
  config: ShortcutConfig
  handler: (event: KeyboardEvent) => void
}

const index = new Map<HTMLElement, Shortcut[]>()

function onKeyPress(event: KeyboardEvent) {
  const element = event.currentTarget as HTMLElement
  const shortcuts = index.get(element)

  if (!shortcuts?.length) return

  for (const { config, handler } of shortcuts) {
    if (
      config.key === event.key &&
      config.ctrl === event.ctrlKey &&
      config.shift == event.shiftKey &&
      config.alt === event.altKey
    ) {
      handler(event)
    }
  }
}

function registerListeners(element: HTMLElement, shortcuts: Shortcut[]) {
  if (shortcuts.length) {
    index.set(element, shortcuts)
    element.addEventListener('keypress', onKeyPress)
  } else {
    index.delete(element)
    element.removeEventListener('keypress', onKeyPress)
  }
}

export const shortcut: Action<HTMLElement, Shortcut> = (element, shortcut) => {
  shortcut.config = { ctrl: false, shift: false, alt: false, ...shortcut.config }
  const shortcuts = (index.get(element) ?? []).concat(shortcut)
  registerListeners(element, shortcuts)

  return {
    destroy: () => {
      const shortcuts = (index.get(element) ?? []).filter((s) => s === shortcut)
      registerListeners(element, shortcuts)
    },
  }
}
