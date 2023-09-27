<script lang="ts">
  import { browser } from '$app/environment'
  import PackageDestination from './package-destination.svelte'
  import PackageMap from './package-map.svelte'

  export let data: Api.Destination[]
  let packageMap: PackageMap
  let container: HTMLElement
  let isFullscreen = false

  function onFullscreenChange() {
    isFullscreen = document.fullscreenElement === container
  }

  function syncFullscreen(isFullscreen: boolean) {
    if (!browser) return

    if (isFullscreen && document.fullscreenElement !== container) {
      container.requestFullscreen()
    } else if (!isFullscreen && document.fullscreenElement === container) {
      document.exitFullscreen()
    }
  }

  $: syncFullscreen(isFullscreen)
</script>

<svelte:document on:fullscreenchange={onFullscreenChange} />

<div class="_wrapper" class:_fullscreen={isFullscreen} bind:this={container}>
  <ul class="_destinations" role="tablist" aria-labelledby="destinations-list-header">
    {#each data as destination}
      <PackageDestination data={destination} {packageMap} />
    {/each}
  </ul>
  <div class="_map">
    <div
      class="w-full h-full border rounded focusable-within focusable-ring bg-surface-1-bg border-surface-1-border overflow-clip elevation-low">
      <PackageMap class="w-full h-full" {data} bind:this={packageMap} bind:isFullscreen />
    </div>
  </div>
</div>

<style lang="postcss">
  ._wrapper {
    display: flex;
    flex-direction: column;
    gap: theme('spacing.2');
    margin-block: calc(theme('spacing.4') * -1);

    @media (min-width: theme('screens.md')) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: theme('spacing.4');
    }

    @media (min-width: theme('screens.md')) {
      grid-template-columns: theme('spacing.96') 1fr;
    }

    &._fullscreen {
      overflow-y: auto;
      padding-inline: theme('spacing.4');
      background-color: theme('colors.canvas.bg');

      ._destinations {
        display: none;

        @media (min-width: theme('screens.md')) {
          display: flex;
        }
      }

      ._map {
        top: 0;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100vh;
      }
    }
  }

  ._destinations {
    display: flex;
    flex-direction: column;
    gap: theme('spacing.2');

    & > :global(*) {
      scroll-margin-top: calc(var(--layout-topbar-height) + theme('spacing.4'));
    }

    @media (min-width: theme('screens.md')) {
      padding-block: theme('spacing.4');
      gap: theme('spacing.4');
      margin-left: auto;
      max-width: theme('maxWidth.screen-sm');
    }
  }

  ._map {
    width: 100%;
    height: theme('spacing.96');

    @media (min-width: theme('screens.md')) {
      height: 100%;
      max-height: calc(100vh - 64px);
      padding-block: theme('spacing.4');
      position: sticky;
      top: theme('spacing.16');
    }
  }
</style>
