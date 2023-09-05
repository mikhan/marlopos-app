<script lang="ts">
  import { beforeNavigate, afterNavigate } from '$app/navigation'
  import { writable } from 'svelte/store'

  const isNavigating = writable(false)

  beforeNavigate(({ willUnload }) => !willUnload && ($isNavigating = true))

  afterNavigate(() => ($isNavigating = false))
</script>

{#if $isNavigating}
  <div class="_wrapper" />
{/if}

<style lang="postcss">
  ._wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-color: theme('colors.ring');
      animation: indeterminate-status 1s infinite linear;
      transform-origin: 0% 50%;
    }
  }

  @keyframes indeterminate-status {
    0% {
      transform: translateX(0) scaleX(0);
    }
    40% {
      transform: translateX(0) scaleX(0.4);
    }
    100% {
      transform: translateX(100%) scaleX(0.5);
    }
  }
</style>
