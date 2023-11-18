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
    flex: 1;
    flex-direction: column;
    margin-top: calc(var(--layout-topbar-height) * -1);
    box-shadow: theme('elevation.hight');
    background-color: theme('colors.canvas.bg');
    width: 100%;
    height: 100%;
  }
</style>
