<script lang="ts" context="module">
  import { createContext } from '$core/services/context'

  interface AppContentContext {
    getContainer: () => HTMLElement
  }

  export const [getAppContentContext, setAppContentContext] = createContext<AppContentContext>()
</script>

<script lang="ts">
  import { fly } from 'svelte/transition'

  export let pageId: string
  export let className = ''
</script>

{#key pageId}
  <main
    class="layout-container layout-padding {className}"
    {...$$restProps}
    in:fly={{ y: -200, duration: 300, delay: 300 }}
    out:fly={{ y: -200, duration: 300 }}>
    <slot />
  </main>
{/key}

<style lang="postcss">
  main {
    width: 100%;
    height: 100%;
    box-shadow: theme('elevation.hight');
    flex: 1;
    margin-top: calc(var(--layout-topbar-height) * -1);
    background-color: theme('colors.canvas.bg');
  }
</style>
