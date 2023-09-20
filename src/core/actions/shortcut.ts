import type { Action } from 'svelte/action'

export type ShortcutConfig = {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
}

export type Shortcut = [handler: (event: KeyboardEvent) => void, config: ShortcutConfig]

const index = new Map<HTMLElement, Shortcut[]>()

function onKeyPress(event: KeyboardEvent) {
  const element = event.currentTarget as HTMLElement
  const shortcuts = index.get(element)

  if (!shortcuts?.length) return

  for (const [handler, config] of shortcuts) {
    if (
      config.key === event.key &&
      config.ctrlKey === event.ctrlKey &&
      config.shiftKey == event.shiftKey &&
      config.altKey === event.altKey
    ) {
      handler(event)
      event.preventDefault()
    }
  }
}

function registerShortcuts(element: HTMLElement, shortcuts: Shortcut[]) {
  if (shortcuts.length) {
    index.set(element, shortcuts)
    element.addEventListener('keydown', onKeyPress)
  } else {
    index.delete(element)
    element.removeEventListener('keydown', onKeyPress)
  }
}

export const shortcut: Action<HTMLElement, Shortcut> = (element, [handler, config]) => {
  config = { ctrlKey: false, shiftKey: false, altKey: false, ...config, key: config.key.toLocaleLowerCase() }
  const shortcut: Shortcut = [handler, config]
  const shortcuts = [...(index.get(element) ?? []), shortcut]
  registerShortcuts(element, shortcuts)

  return {
    destroy: () => {
      const shortcuts = (index.get(element) ?? []).filter((s) => s !== shortcut)
      registerShortcuts(element, shortcuts)
    },
  }
}
