<script lang="ts">
  import { browser } from '$app/environment'
  import Lazy from '$core/components/lazy.svelte'
  import { matchMedia } from '$core/stores/match-media'
  import type { Api } from '$lib/api'
  import SectionHeader from '../common/section-header.svelte'
  import PackageDestination from './package-destination.svelte'
  import type PackageMapDynamic from './package-map-dynamic.svelte'
  import PackageMapStatic from './package-map-static.svelte'

  export let data: Api.PackageDestination[]
  let packageMap: PackageMapDynamic | undefined
  let container: HTMLElement
  let mapContainer: HTMLElement
  let isFullscreen = false
  const showInteractiveMap = matchMedia('(min-width: 768px)')

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

<section class="layout-container">
  <SectionHeader class="px-4 mb-8 layout-lg" id="destinations-list-header">Destinos incluídos</SectionHeader>

  <div class="_wrapper layout-2xl" class:_fullscreen={isFullscreen} bind:this={container}>
    <ul class="_destinations" role="tablist" aria-labelledby="destinations-list-header">
      {#each data as destination (destination.id)}
        <PackageDestination data={destination} {packageMap} />
      {/each}
    </ul>
    <button
      class="sticky h-12 px-4 m-4 -mb-20 rounded w-max bottom-4 elevation-low bg-surface-2-bg md:hidden"
      on:click={() => mapContainer.scrollIntoView({ behavior: 'smooth' })}>Mostrar Mapa</button>
    <div class="_map-container" bind:this={mapContainer}>
      <div class="_map">
        {#if $showInteractiveMap || isFullscreen}
          <Lazy this={() => import('./package-map-dynamic.svelte')} let:Component={PackageMapDynamic}>
            <PackageMapDynamic class="w-full h-full" {data} bind:this={packageMap} bind:isFullscreen />
          </Lazy>
        {:else}
          <PackageMapStatic {data} on:click={() => (isFullscreen = true)} />
        {/if}
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  ._wrapper {
    display: flex;
    flex-direction: column;
    gap: theme('spacing.4');

    @media (min-width: theme('screens.md')) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-block: calc(theme('spacing.4') * -1);
    }

    @media (min-width: theme('screens.md')) {
      grid-template-columns: theme('spacing.96') 1fr;
    }

    &:fullscreen {
      background-color: theme('colors.canvas.bg');
      overflow-y: auto;

      @media (min-width: theme('screens.md')) {
        padding-inline: theme('spacing.4');
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
      gap: theme('spacing.4');
      margin-left: auto;
      padding-block: theme('spacing.4');
      max-width: theme('maxWidth.screen-sm');
    }

    ._wrapper:fullscreen & {
      display: none;

      @media (min-width: theme('screens.md')) {
        display: flex;
      }
    }
  }

  ._map-container {
    aspect-ratio: 1;
    width: 100%;
    max-height: calc(100vh - var(--layout-topbar-height) - theme('spacing.2') - theme('spacing.2'));
    scroll-margin-block-start: calc(var(--layout-topbar-height) + theme('spacing.2'));

    @media (min-width: theme('screens.md')) {
      position: sticky;
      top: theme('spacing.16');
      padding-block: theme('spacing.4');
      aspect-ratio: auto;
      height: 100%;
      max-height: calc(100vh - var(--layout-topbar-height));
    }

    ._wrapper:fullscreen & {
      top: 0;
      width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 100vh;
    }
  }

  ._map {
    position: relative;
    box-shadow: theme('elevation.low');
    border: 1px solid theme('colors.surface-1.border');
    border-radius: theme('borderRadius.DEFAULT');
    background-color: theme('colors.surface-1.bg');
    width: 100%;
    height: 100%;
    overflow: hidden;
    @apply focusable-within focusable-ring;
  }
</style>
