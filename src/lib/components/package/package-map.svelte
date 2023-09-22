<script lang="ts">
  import {
    faArrowsToCircle,
    faCompress,
    faExpand,
    faLocationCrosshairs,
    faLocationDot,
    faMinus,
    faPlus,
    faSpinner,
  } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { PUBLIC_MAPBOX_ACCESS_TOKEN, PUBLIC_MAPBOX_STYLE, PUBLIC_MAPBOX_USER } from '$env/static/public'
  import MapControl from '$core/components/map/map-control.svelte'
  import MapMarker from '$core/components/map/map-marker.svelte'
  import { getBoundingBox, getCurrentPosition, isGeolocationEnabled } from '$core/components/map/map-utils'
  import InteractiveMap from '$core/components/map/map.svelte'
  import { slugify } from '$core/utils/string'

  export let data: Api.Destination[]
  export let isFullscreen = false
  let highlightedDestination: Api.Destination | undefined
  let map: InteractiveMap
  const geolocationEnabled = isGeolocationEnabled()
  let currentPosition: { coordinates: [number, number]; accuracyCoordinates: [number, number][] } | null = null
  let gettingCurrentPosition = false
  let pristine = true

  $: coordinates = data.map(({ coordinates }) => coordinates)
  $: boundingBox = getBoundingBox(coordinates, { padding: 0.5 })
  $: mapOptions = {
    accessToken: PUBLIC_MAPBOX_ACCESS_TOKEN,
    style: `mapbox://styles/${PUBLIC_MAPBOX_USER}/${PUBLIC_MAPBOX_STYLE}`,
    bounds: boundingBox,
    attributionControl: false,
    scrollZoom: false,
  }

  const getDestinationById = (id: string) => data.find((destination) => id === destination.id)

  export function zoomTo(delta: number) {
    map.getMap().zoomTo(map.getMap().getZoom() + delta)
  }

  export function toggleFullscreen() {
    isFullscreen = !isFullscreen
    isFullscreen ? map.getMap().scrollZoom.enable() : map.getMap().scrollZoom.disable()
  }

  export function highlightDestination(id = '') {
    highlightedDestination = getDestinationById(id)
  }

  export function focusDestination(id = '') {
    highlightDestination(id)

    if (highlightedDestination) {
      map.getMap().flyTo({ center: highlightedDestination.coordinates })
    }
  }

  export async function focusCurrentPosition() {
    if (!geolocationEnabled) return

    gettingCurrentPosition = true

    if (!currentPosition) {
      const geolocationPosition = await getCurrentPosition({ enableHighAccuracy: true })
      const { longitude, latitude, accuracy } = geolocationPosition.coords

      const distanceX = accuracy / 1000 / (111.32 * Math.cos((latitude * Math.PI) / 180))
      const distanceY = accuracy / 1000 / 110.574
      const accuracyCoordinates = Array.from({ length: 64 }, (_, i) => {
        const theta = (i / 64) * (2 * Math.PI)
        const x = distanceX * Math.cos(theta)
        const y = distanceY * Math.sin(theta)
        return [longitude + x, latitude + y] as [number, number]
      })
      accuracyCoordinates.push(accuracyCoordinates[0]!)
      currentPosition = { coordinates: [longitude, latitude], accuracyCoordinates }

      map
        .getMap()
        .addSource('currentLocationAccuracy', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [accuracyCoordinates] } },
            ],
          },
        })
        .addLayer({
          id: 'currentLocationAccuracy',
          type: 'fill',
          source: 'currentLocationAccuracy',
          paint: { 'fill-color': '#5b94c6', 'fill-opacity': 0.25 },
        })
    }

    const boundingBox = getBoundingBox(currentPosition.accuracyCoordinates, { padding: 0.5 })
    gettingCurrentPosition = false
    map.getMap().fitBounds(boundingBox)
  }

  export function reset() {
    map.getMap()?.fitBounds(boundingBox)
    pristine = true
  }

  onMount(() => {
    const mapbox = map.getMap()
    mapbox.on('zoomstart', () => (pristine = false))
    mapbox.on('movestart', () => (pristine = false))
  })
</script>

<section {...$$restProps}>
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
    {#if geolocationEnabled}
      <MapControl>
        <button
          class="_map-button"
          title="Mostrar mi ubicación"
          disabled={gettingCurrentPosition}
          on:click={() => focusCurrentPosition()}>
          <Fa
            icon={gettingCurrentPosition ? faSpinner : faLocationCrosshairs}
            spin={gettingCurrentPosition}
            pulse={gettingCurrentPosition} />
        </button>
      </MapControl>
    {/if}
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
          <span class="sr-only">{name}</span>
        </a>
      </MapMarker>
    {/each}
    {#if currentPosition}
      <MapMarker coordinates={currentPosition.coordinates}>
        <div class="_map_currentposition">
          <Fa size="2x" icon={faLocationCrosshairs} />
        </div>
      </MapMarker>
    {/if}
  </InteractiveMap>
</section>

<style lang="postcss">
  section {
    position: relative;
    width: 100%;
    height: 100%;

    & :global(canvas) {
      outline: none;
    }
  }

  ._map_currentposition {
    color: theme('colors.primary.200');
    filter: drop-shadow(2px 2px 2px #0006);
  }

  ._map-marker {
    font-size: theme('fontSize.base');
    color: theme('colors.primary.200');
    filter: drop-shadow(2px 2px 2px #0006);
    translate: 0 -50%;
    outline: none;

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
    animation: bounce 500ms 5;
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

    @media (pointer: coarse) {
      width: theme('spacing.10');
      height: theme('spacing.10');
    }

    &:focus-visible:not(:disabled) {
      outline-color: theme('colors.ring');
      outline-offset: 2px;
    }

    &:hover:not(:disabled) {
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
