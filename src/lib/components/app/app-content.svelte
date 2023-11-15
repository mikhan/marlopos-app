<script lang="ts" context="module">
  import { createContext } from '$core/services/context'

  interface AppContentContext {
    getContainer: () => HTMLElement
  }

  export const [getAppContentContext, setAppContentContext] = createContext<AppContentContext>()
</script>

<main {...$$restProps}>
  <slot />
</main>

<style lang="postcss">
  main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-shadow: theme('elevation.hight');
    flex: 1;
    margin-top: calc(var(--layout-topbar-height) * -1);
    background-color: theme('colors.canvas.bg');
  }
</style>
