<script lang="ts">
  import { browser } from '$app/environment'
  import Lazy from '$core/components/lazy.svelte'
  import { matchMedia } from '$core/stores/match-media'
  import type { Api } from '$lib/api'
  import { type CreateMapOptions, getStaticMapURL } from '$lib/services/map'
  import PackageDestination from './package-destination.svelte'
  import type PackageMap from './package-map.svelte'

  export let data: Api.PackageDestination[]
  let packageMap: PackageMap | undefined
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

  const showInteractiveMap = matchMedia('(min-width: 480px)')

  const mapConfig: CreateMapOptions = {
    center: 'auto',
    width: 480,
    height: 480,
    markers: data.map(({ coordinates: [lon, lat] }) => ({ lon, lat, label: 'circle', color: '8471b1' })),
  }

  const mapSrc = getStaticMapURL(mapConfig).href
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
      class="relative w-full h-full overflow-hidden border rounded focusable-within focusable-ring bg-surface-1-bg border-surface-1-border elevation-low">
      {#if $showInteractiveMap || isFullscreen}
        <Lazy this={() => import('./package-map.svelte')} let:Component={PackageMap}>
          <PackageMap class="w-full h-full" {data} bind:this={packageMap} bind:isFullscreen />
        </Lazy>
      {:else}
        <button class="absolute inset-0 outline-none" on:click={() => (isFullscreen = true)}>
          <img class="object-contain w-full h-full" src={mapSrc} alt="" loading="lazy" />
          <span class="sr-only">Mostrar mapa interactivo</span>
        </button>
      {/if}
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
      background-color: theme('colors.canvas.bg');

      @media (min-width: theme('screens.md')) {
        padding-inline: theme('spacing.4');
      }

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
    aspect-ratio: 1;

    @media (min-width: theme('screens.md')) {
      height: 100%;
      aspect-ratio: auto;
      max-height: calc(100vh - var(--layout-topbar-height));
      padding-block: theme('spacing.4');
      position: sticky;
      top: theme('spacing.16');
    }
  }
</style>
