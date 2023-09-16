<script lang="ts" context="module">
  import { createContext } from '$core/services/context'

  export type UiMenuContext = {
    show: () => Promise<void>
    hide: () => Promise<void>
    registerItem: (element: HTMLLIElement, context: UiMenuitemContext) => () => void
    focusFirstMenuitem: () => void
    focusLastMenuitem: () => void
    focusPreviousMenuitem: () => void
    focusNextMenuitem: () => void
    focusByFirstCharacter: (char: string) => void
  }

  export const [getUiMenuContext, setUiMenuContext] = createContext<UiMenuContext>()
</script>

<script lang="ts">
  import { type Placement, flip, offset, shift, size } from '@floating-ui/dom'
  import { onMount } from 'svelte'
  import { createFloatingActions } from '$core/actions/floating'
  import { generateUID } from '$core/utils/element'
  import type { UiMenuitemContext } from './ui-menu-item.svelte'

  export let trigger: string
  export let placement: Placement = 'bottom-start'
  export let label: string | undefined = undefined
  export let open = false
  let triggerElement: HTMLElement | null = null
  let abortController: AbortController | undefined
  let container: HTMLElement

  const id = generateUID()
  const menuitems: { element: HTMLLIElement; context: UiMenuitemContext }[] = []
  let currentMenuitem: { element: HTMLLIElement; context: UiMenuitemContext } | undefined = undefined

  const [referenceAction, contentAction] = createFloatingActions({
    strategy: 'fixed',
    placement,
    middleware: [
      offset(6),
      flip(),
      shift(),
      size({
        padding: 16,
        apply({ availableWidth, availableHeight, elements, rects }) {
          elements.floating.style.setProperty('min-width', `${rects.reference.width}px`)
          elements.floating.style.setProperty('max-width', `${availableWidth}px`)
          elements.floating.style.setProperty('max-height', `${availableHeight}px`)
        },
      }),
    ],
  })

  async function show() {
    abortController?.abort()
    open = true
    abortController = new AbortController()
    window.addEventListener('scroll', () => hide(), { signal: abortController?.signal })
  }

  async function hide(options = { restoreFocus: true }) {
    abortController?.abort()
    currentMenuitem = undefined

    if (!triggerElement) return

    open = false
    if (options.restoreFocus) triggerElement.focus()
  }

  const isPrintableCharacter = (string: string) => string.length === 1 && string.match(/\S/)

  function onKeyDown(event: KeyboardEvent) {
    let eventHandled = false

    switch (event.key) {
      case 'Esc':
      case 'Escape':
        hide()
        eventHandled = true
        break

      case 'ArrowDown':
      case 'Down':
        focusNextMenuitem()
        eventHandled = true
        break

      case 'Up':
      case 'ArrowUp':
        focusPreviousMenuitem()
        eventHandled = true
        break

      case 'Home':
      case 'PageUp':
        focusFirstMenuitem()
        eventHandled = true
        break

      case 'End':
      case 'PageDown':
        focusLastMenuitem()
        eventHandled = true
        break

      case 'Tab':
        hide()
        break

      default:
        if (isPrintableCharacter(event.key)) {
          focusByFirstCharacter(event.key)
          eventHandled = true
        }
        break
    }

    if (eventHandled) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  function onTriggerClick(event: MouseEvent) {
    show()
    event.stopPropagation()
  }

  function registerItem(element: HTMLLIElement, context: UiMenuitemContext) {
    const menuitem = { element, context }
    menuitems.push(menuitem)
    element.setAttribute('tabindex', '-1')

    return () => {
      menuitems.splice(menuitems.indexOf(menuitem), 1)
      if (currentMenuitem === menuitem) {
        currentMenuitem = undefined
      }
    }
  }

  function focusFirstMenuitem() {
    const menuitem = menuitems.at(0)

    if (menuitem) {
      currentMenuitem = menuitem
      currentMenuitem.context.focus()
    }
  }

  function focusLastMenuitem() {
    const menuitem = menuitems.at(-1)

    if (menuitem) {
      currentMenuitem = menuitem
      currentMenuitem.context.focus()
    }
  }

  function focusPreviousMenuitem() {
    const index = menuitems.findIndex(({ element }) => currentMenuitem?.element === element)
    const menuitem = menuitems.at(index - 1)

    if (menuitem) {
      currentMenuitem = menuitem
      currentMenuitem.context.focus()
    }
  }

  function focusNextMenuitem() {
    const index = menuitems.findIndex(({ element }) => currentMenuitem?.element === element)
    const menuitem = menuitems.at(index + 1)

    if (menuitem) {
      currentMenuitem = menuitem
      currentMenuitem.context.focus()
    }
  }

  function focusByFirstCharacter(char: string) {
    char = char.toLowerCase()

    let start = currentMenuitem ? menuitems.indexOf(currentMenuitem) + 1 : 0
    if (start >= menuitems.length) {
      start = 0
    }

    let index = getIndexFirstChars(start, char)

    if (index === -1) {
      index = getIndexFirstChars(0, char)
    }

    if (index > -1) {
      menuitems.at(index)?.context.focus()
    }
  }

  function getIndexFirstChars(startIndex: number, char: string) {
    for (let i = startIndex; i < menuitems.length; i++) {
      if (char === menuitems[i]?.element.textContent?.trim()[0]?.toLowerCase()) {
        return i
      }
    }

    return -1
  }

  setUiMenuContext({
    show,
    hide,
    registerItem,
    focusFirstMenuitem,
    focusLastMenuitem,
    focusPreviousMenuitem,
    focusNextMenuitem,
    focusByFirstCharacter,
  })

  function autofocus(element: HTMLElement) {
    element.focus()
  }

  onMount(() => {
    triggerElement = document.querySelector(trigger)
    document.body.append(container)

    if (triggerElement) {
      triggerElement.setAttribute('aria-haspopup', 'true')
      triggerElement.setAttribute('aria-controls', id)
      triggerElement.addEventListener('click', onTriggerClick)
      referenceAction(triggerElement)
    }

    return () => {
      abortController?.abort()
      container.remove()

      if (triggerElement) {
        triggerElement.removeAttribute('aria-haspopup')
        triggerElement.removeAttribute('aria-controls')
        triggerElement.removeEventListener('click', onTriggerClick)
      }
    }
  })
</script>

<div bind:this={container} style="display: contents">
  {#if open}
    <div class="_backdrop" on:pointerdown={() => hide({ restoreFocus: false })} />
    <ul
      class="_menu"
      role="menu"
      tabindex="-1"
      aria-label={label}
      aria-labelledby={label ? undefined : trigger}
      {id}
      use:autofocus
      use:contentAction
      on:keydown={onKeyDown}>
      <slot />
    </ul>
  {/if}
</div>

<style lang="postcss">
  ._backdrop {
    position: fixed;
    inset: 0;
    z-index: 1;
  }

  ._menu {
    position: fixed;
    padding: theme('spacing.1');
    box-shadow: theme('elevation.hight');
    border-radius: theme('borderRadius.md');
    color: theme('colors.surface-2.fg');
    background-color: theme('colors.surface-2.bg');
    overflow: auto;
    z-index: 1;
    user-select: none;
    outline: none;
  }
</style>
