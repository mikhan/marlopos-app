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

  function focus() {
    element.focus()
  }

  function onKeyDown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.currentTarget.click()
        uiMenuContext.hide()
        event.stopPropagation()
        event.preventDefault()
        break
    }
  }

  const uiMenuitemContext = setUiMenuitemContext({ focus })

  onMount(() => {
    const unregister = uiMenuContext.registerItem(element, uiMenuitemContext)

    return () => unregister()
  })
</script>

<li
  class="flex items-center w-full p-2 rounded text-surface-2-fg hocus:bg-surface-2-hover hocus:text-surface-2-fg focusable-visible focusable-ring focusable-inner"
  role="menuitem"
  bind:this={element}
  on:click
  on:click={uiMenuContext.hide}
  on:keydown={onKeyDown}>
  <slot />
</li>
