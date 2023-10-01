<script lang="ts" context="module">
  import { type Writable, writable } from 'svelte/store'
  import { createContext } from '$core/services/context'

  export type UiShellContext = {
    layoutTopbarHeight: Writable<number>
  }

  export const [getUiShellContext, setUiShellContext] = createContext<UiShellContext>()
</script>

<script lang="ts">
  const layoutTopbarHeight = writable(64)

  setUiShellContext({ layoutTopbarHeight })
</script>

<div style:--layout-topbar-height={$layoutTopbarHeight + 'px'}>
  <slot />
</div>

<style lang="postcss">
  div {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    isolation: isolate;
  }
</style>
