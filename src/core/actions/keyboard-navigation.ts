import { KeyboardKeys } from '../constants/keyboard-keys'

export type KeyboardNavigation = {
  [K in KeyboardKeys]?: (event: KeyboardEvent) => void
}

export function useKeyboardNavigation(node: HTMLElement, handlers: KeyboardNavigation) {
  const abortController = new AbortController()
  const listener = (event: KeyboardEvent) => {
    const keyboardKey = KeyboardKeys[event.key as keyof typeof KeyboardKeys]
    const handle = handlers[keyboardKey]

    if (handle) {
      handle(event)
      event.preventDefault()
      event.stopPropagation()
    }
  }

  node.addEventListener('keydown', listener, { signal: abortController.signal })

  return {
    destroy() {
      abortController.abort()
    },
  }
}
