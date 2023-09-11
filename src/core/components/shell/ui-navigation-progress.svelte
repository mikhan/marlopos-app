<script lang="ts">
  import { beforeNavigate, afterNavigate } from '$app/navigation'
  import { writable } from 'svelte/store'

  const isNavigating = writable(false)

  beforeNavigate(({ willUnload }) => {
    if (!willUnload) $isNavigating = true
  })

  afterNavigate(() => {
    $isNavigating = false
  })
</script>

{#if $isNavigating}
  <div {...$$restProps} />
{/if}

<style lang="postcss">
  :where(div) {
    width: 100%;
    height: 4px;
    margin-bottom: -4px;
    overflow: clip;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-color: theme('colors.ring');
      animation: indeterminate-status 1.5s infinite linear;
      transform-origin: 0% 50%;
      border-radius: 2px;
    }
  }

  @keyframes indeterminate-status {
    0% {
      translate: 0 0;
      scale: 0 1;
    }

    40% {
      scale: 0.4 1;
    }

    100% {
      translate: 100% 0;
      scale: 0.5 1;
    }
  }
</style>
