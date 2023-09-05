<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { offset, flip, shift } from 'svelte-floating-ui/dom'
  import { createFloatingActions } from 'svelte-floating-ui'
  import { dismiss } from '$core/actions/dismiss'

  export let trigger: HTMLElement | string

  export let open = false

  let container: HTMLElement

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement: 'bottom-start',
    middleware: [offset(6), flip(), shift()],
  })

  // let controller: AbortController

  $: if (open) {
    // controller = onDismiss(container, )
  }

  let triggerElement: HTMLElement | null = null
  let abortController: AbortController | undefined

  async function show() {
    console.log('show')
    abortController?.abort()
    await Promise.resolve()
    open = true
  }

  async function hide() {
    console.log('hide')
    abortController?.abort()
    if (!triggerElement) return
    abortController = new AbortController()
    triggerElement.addEventListener(
      'click',
      (e) => {
        tick().then(() => (open ? hide() : show()))
        e.stopPropagation()
      },
      { signal: abortController.signal },
    )

    await Promise.resolve()
    open = false
  }

  onMount(() => {
    triggerElement = typeof trigger === 'string' ? document.querySelector(trigger) : trigger
    if (!triggerElement) return

    floatingRef(triggerElement)
    if (open) show()
    else hide()
  })
</script>

{#if open}
  <ul
    class="absolute p-1 mt-1 border rounded-lg shadow elevation-hight bg-surface-2-bg text-surface-2-fg border-surface-2-border"
    use:floatingContent
    use:dismiss={{ scroll: true }}
    bind:this={container}
    on:dismiss={() => hide()}>
    <slot />
  </ul>
{/if}
