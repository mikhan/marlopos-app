<script lang="ts">
  import Fa from 'svelte-fa'
  import {
    faArrowsToCircle,
    faCompress,
    faExpand,
    faLocationDot,
    faMinus,
    faPlus,
  } from '@fortawesome/free-solid-svg-icons'
  import InteractiveMap from '$core/components/map/map.svelte'
  import MapMarker from '$core/components/map/map-marker.svelte'
  import { getBoundingBox } from '$core/components/map/map-utils'
  import MapControl from '../../../core/components/map/map-control.svelte'
  import { PUBLIC_MAPBOX_ACCESS_TOKEN, PUBLIC_MAPBOX_STYLE, PUBLIC_MAPBOX_USER } from '$env/static/public'
  import { slugify } from '$core/utils/string'
  import { onMount } from 'svelte'

  export let data: Api.Destination[]
  let isFullscreen = false
  let highlightedDestination: Api.Destination | undefined
  let container: HTMLElement

  $: coordinates = data.map(({ coordinates: [lng, lat] }) => ({ lng, lat }))
  $: boundingBox = getBoundingBox(coordinates, { padding: 0.5 })
  $: mapOptions = {
    accessToken: PUBLIC_MAPBOX_ACCESS_TOKEN,
    style: `mapbox://styles/${PUBLIC_MAPBOX_USER}/${PUBLIC_MAPBOX_STYLE}`,
    bounds: boundingBox,
    attributionControl: false,
    scrollZoom: false,
  }

  let map: InteractiveMap

  const getDestinationById = (id: string) => data.find((destination) => id === destination.id)

  const onFullscreenChange = () => (isFullscreen = document.fullscreenElement === container)

  export const zoomTo = (delta: number) => map.getMap().zoomTo(map.getMap().getZoom() + delta)

  export const toggleFullscreen = () =>
    !document.fullscreenElement ? container.requestFullscreen() : document.exitFullscreen()

  export const highlightDestination = (id = '') => {
    highlightedDestination = getDestinationById(id)
  }

  export const focusDestination = (id = '') => {
    highlightDestination(id)

    if (highlightedDestination) {
      map.getMap().flyTo({ center: highlightedDestination.coordinates })
    }
  }

  export const reset = () => {
    map.getMap().fitBounds(boundingBox)
    pristine = true
  }

  let pristine = true

  onMount(() => {
    map.getMap().on('zoomstart', () => (pristine = false))
    map.getMap().on('movestart', () => (pristine = false))
  })
</script>

<svelte:document on:fullscreenchange={onFullscreenChange} />

<section {...$$restProps} bind:this={container}>
  <InteractiveMap options={mapOptions} bind:this={map}>
    <MapControl>
      <button
        class="_map-button"
        title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        on:click={() => toggleFullscreen()}>
        <Fa icon={isFullscreen ? faCompress : faExpand} />
      </button>
    </MapControl>
    <MapControl>
      <button class="_map-button" title="Acercar el mapa" on:click={() => zoomTo(+1)}>
        <Fa icon={faPlus} />
      </button>
      <button class="_map-button" title="Alejar el mapa" on:click={() => zoomTo(-1)}>
        <Fa icon={faMinus} />
      </button>
    </MapControl>
    {#if !pristine}
      <MapControl>
        <button class="_map-button" title="Mostrar todos los destinos" on:click={() => reset()}>
          <Fa icon={faArrowsToCircle} />
        </button>
      </MapControl>
    {/if}
    {#each data as { id, name, coordinates }}
      <MapMarker {coordinates}>
        <a
          href={'#destination-' + slugify(name)}
          class="_map-marker"
          class:_map-marker-bounce={id === highlightedDestination?.id}
          on:focus={() => focusDestination(id)}
          on:blur={() => focusDestination()}>
          <Fa size="2x" icon={faLocationDot} />
        </a>
      </MapMarker>
    {/each}
  </InteractiveMap>
</section>

<style lang="postcss">
  section {
    width: 100%;
    height: 100%;

    & :global(canvas) {
      outline: none;
    }
  }

  ._map-marker {
    display: block;
    font: initial;
    position: relative;
    filter: drop-shadow(2px 2px 2px #0006);
    translate: 0 -50%;
    outline: none;
    color: theme('colors.primary.200');

    &:hover,
    &:focus {
      animation: bounce 500ms infinite;
    }

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 10px;
      left: 0;
      bottom: -5px;
      background-image: radial-gradient(closest-side, rgb(0 0 0 / 40%) 10%, rgb(0 0 0 / 5%));
      z-index: -1;
    }
  }

  ._map-marker-bounce {
    animation: bounce 500ms infinite;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0) scale(1);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      color: theme('colors.primary.200');
    }
    50% {
      transform: translateY(-25%) scale(1.25);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      color: theme('colors.primary.50');
    }
  }

  ._map-button {
    font: initial;
    display: grid;
    place-content: center;
    width: theme('spacing.8');
    height: theme('spacing.8');
    color: theme('colors.surface-2.fg');
    background-color: theme('colors.surface-2.bg');
    border-radius: theme('borderRadius.DEFAULT');
    box-shadow: theme('boxShadow.md');
    border: 1px solid theme('colors.surface-1.fg / 25%');
    outline: 2px solid transparent;
    outline-offset: 8px;
    transition-property: background-color, outline-color, outline-offset;
    transition-duration: 150ms, 150ms, 250ms;

    &:focus-visible {
      outline-color: theme('colors.ring');
      outline-offset: 2px;
    }

    &:hover {
      background-color: theme('colors.surface-2.hover');
    }

    & + & {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    & + &:not(:first-child) {
      border-top: none;
    }

    &:has(+ &) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
</style>
