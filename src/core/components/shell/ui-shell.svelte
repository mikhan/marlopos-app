<script lang="ts" context="module">
  import { createContext } from '$core/services/context'
  import { writable, type Writable } from 'svelte/store'

  export const uiShellContext = createContext<{
    layoutTopbarHeight: Writable<number>
  }>('uiShellContext')
</script>

<script lang="ts">
  uiShellContext.set({
    layoutTopbarHeight: writable(0),
  })
</script>

<div>
  <slot />
</div>

<style lang="postcss">
  div {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    isolation: isolate;
  }
</style>
