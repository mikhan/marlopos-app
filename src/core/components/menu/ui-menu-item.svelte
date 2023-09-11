<script lang="ts" context="module">
  import { onMount } from 'svelte'
  import { createContext } from '$core/services/context'

  export type UiMenuitemContext = {
    focus: () => void
  }

  export const [getUiMenuitemContext, setUiMenuitemContext] = createContext<UiMenuitemContext>()
</script>

<script lang="ts">
  import { getUiMenuContext } from './ui-menu.svelte'

  const uiMenuContext = getUiMenuContext()
  let element: HTMLLIElement

  const isPrintableCharacter = (string: string) => string.length === 1 && string.match(/\S/)

  function focus() {
    element.focus()
  }

  function onKeyDown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) {
    let flag = false

    switch (event.key) {
      case ' ':
      case 'Enter':
        event.currentTarget.click()
        uiMenuContext.hide()
        flag = true
        break

      case 'Esc':
      case 'Escape':
        uiMenuContext.hide()
        flag = true
        break

      case 'ArrowDown':
      case 'Down':
        uiMenuContext.focusNextMenuitem()
        flag = true
        break

      case 'Up':
      case 'ArrowUp':
        uiMenuContext.focusPreviousMenuitem()
        flag = true
        break

      case 'Home':
      case 'PageUp':
        uiMenuContext.focusFirstMenuitem()
        flag = true
        break

      case 'End':
      case 'PageDown':
        uiMenuContext.focusLastMenuitem()
        flag = true
        break

      case 'Tab':
        uiMenuContext.hide()
        break

      default:
        if (isPrintableCharacter(event.key)) {
          uiMenuContext.focusByFirstCharacter(event.key)
          flag = true
        }
        break
    }

    if (flag) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  const uiMenuitemContext = setUiMenuitemContext({ focus })

  onMount(() => {
    const unregister = uiMenuContext.registerItem(element, uiMenuitemContext)

    return () => unregister()
  })
</script>

<li
  class="flex items-center w-full p-2 text-sm rounded text-surface-2-fg hocus:bg-surface-primary-bg hocus:text-surface-primary-fg focusable-visible focusable-ring"
  role="menuitem"
  bind:this={element}
  on:click
  on:click={uiMenuContext.hide}
  on:keydown={onKeyDown}>
  <slot />
</li>
