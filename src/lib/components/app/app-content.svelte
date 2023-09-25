<script lang="ts" context="module">
  import { createContext } from '$core/services/context'

  interface AppContentContext {
    getContainer: () => HTMLElement
  }

  export const [getAppContentContext, setAppContentContext] = createContext<AppContentContext>()
</script>

<script lang="ts">
  export let className = ''
</script>

<main class="layout-container layout-padding {className}" {...$$restProps}>
  <slot />
</main>

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
