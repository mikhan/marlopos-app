<script lang="ts">
  import { onMount } from 'svelte'
  import { uiShellContext } from './ui-shell.svelte'

  export let height = 0
  let className = ''
  export { className as class }

  const { layoutTopbarHeight } = uiShellContext.get()
  if (height) layoutTopbarHeight.set(height)

  onMount(() => {
    const unsubscribe = layoutTopbarHeight.subscribe((height) =>
      document.documentElement.style.setProperty('scroll-padding-top', height + 'px'),
    )

    return () => unsubscribe()
  })
</script>

<nav class="topbar layout {className}" bind:clientHeight={$layoutTopbarHeight}>
  <div class="topbar-area layout-start"><slot name="lead" /></div>
  <div class="topbar-area"><slot /></div>
  <div class="topbar-area layout-end"><slot name="trail" /></div>
</nav>

<style lang="postcss">
  .topbar {
    cursor: default;
  }

  .topbar-area {
    display: flex;
    align-items: stretch;
  }
</style>
