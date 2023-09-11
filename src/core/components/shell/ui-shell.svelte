<script lang="ts" context="module">
  import { createContext } from '$core/services/context'
  import { writable, type Writable } from 'svelte/store'

  export type UiShellContext = {
    layoutTopbarHeight: Writable<number>
  }

  export const [getUiShellContext, setUiShellContext] = createContext<UiShellContext>()
</script>

<script lang="ts">
  setUiShellContext({
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
