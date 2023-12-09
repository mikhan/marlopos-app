<script lang="ts">
  import {
    faArrowsToCircle,
    faCheckSquare,
    faCompress,
    faExpand,
    faLocationCrosshairs,
    faLocationDot,
    faMinus,
    faPlus,
    faSpinner,
    faSquare,
  } from '@fortawesome/free-solid-svg-icons'
  import type { MapboxOptions } from 'mapbox-gl'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { PUBLIC_MAPBOX_ACCESS_TOKEN, PUBLIC_MAPBOX_STYLE, PUBLIC_MAPBOX_USER } from '$env/static/public'
  import { dismiss } from '$core/actions/dismiss'
  import { focusWithin } from '$core/actions/focus-within'
  import MapControl from '$core/components/map/map-control.svelte'
  import MapMarker from '$core/components/map/map-marker.svelte'
  import {
    type MapBoundingBox,
    type MapPoint,
    getBoundingBox,
    getCurrentPosition,
    isGeolocationEnabled,
  } from '$core/components/map/map-utils'
  import InteractiveMap from '$core/components/map/map.svelte'
  import { slugify } from '$core/utils/string'
  import type { Api } from '$lib/api'

  export let data: Api.Destination[]
  export let isFullscreen = false
  let highlightedDestination: Api.Destination | undefined
  let map: InteractiveMap
  const geolocationEnabled = isGeolocationEnabled()
  let currentPosition: { coordinates: MapPoint; accuracyCoordinates: MapPoint[] } | null = null
  let gettingCurrentPosition = false
  let pristine = true
  let multiple: boolean
  let coordinates: MapPoint[]
  let bounds: MapBoundingBox
  let zoom: number
  let center: MapPoint
  let mapOptions: Omit<MapboxOptions, 'container'>
  let style: keyof typeof styles = 'default'

  const styles = {
    default: `mapbox://styles/${PUBLIC_MAPBOX_USER}/${PUBLIC_MAPBOX_STYLE}`,
    satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
  }

  $: multiple = data.length > 1
  $: coordinates = data.map(({ coordinates }) => coordinates)
  $: bounds = getBoundingBox(coordinates, { padding: 0.5 })
  $: zoom = 12
  $: center = coordinates[0] as MapPoint
  $: mapOptions = {
    accessToken: PUBLIC_MAPBOX_ACCESS_TOKEN,
    style: styles[style],
    attributionControl: false,
    scrollZoom: false,
    ...(multiple ? { bounds } : { zoom, center }),
  }

  const getDestinationById = (id: string) => data.find((destination) => id === destination.id)

  export function zoomTo(delta: number) {
    map.getMap().zoomTo(map.getMap().getZoom() + delta)
  }

  export function changeStyle(type: keyof typeof styles) {
    style = type
    map.getMap().setStyle(styles[style])
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
        return [longitude + x, latitude + y] as MapPoint
      })
      accuracyCoordinates.push(accuracyCoordinates[0] as MapPoint)
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
    if (multiple) map.getMap().fitBounds(bounds)
    else map.getMap().flyTo({ center, zoom })
    pristine = true
    map.getMap().getCanvas().focus()
  }

  function enableInteraction() {
    map.getMap().scrollZoom.enable()
  }

  function disableInteraction() {
    map.getMap().scrollZoom.disable()
  }

  function onDismiss() {
    const activeElement = document.activeElement as HTMLElement | null
    activeElement?.blur()
  }

  onMount(() => {
    const mapbox = map.getMap()
    mapbox.on('zoomstart', () => (pristine = false))
    mapbox.on('movestart', () => (pristine = false))
  })
</script>

<section
  {...$$restProps}
  tabindex="-1"
  style:--map-marker-color={style !== 'default' ? '#db4336' : undefined}
  use:focusWithin
  use:dismiss={{ clickOutside: false, scroll: false }}
  on:focusenter={enableInteraction}
  on:focusleave={disableInteraction}
  on:dismiss={onDismiss}>
  <InteractiveMap options={mapOptions} bind:this={map}>
    <MapControl position="top-left">
      <button
        class="_map-button"
        title="Mostrar todos los destinos"
        on:click={() => changeStyle(style === 'default' ? 'satellite' : 'default')}>
        <span class="flex items-center gap-2">
          <Fa icon={style === 'default' ? faSquare : faCheckSquare} />
          <span>Vista satelital</span>
        </span>
      </button>
    </MapControl>
    <MapControl>
      <button
        class="_map-button"
        title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        on:click={() => toggleFullscreen()}>
        <Fa fw icon={isFullscreen ? faCompress : faExpand} />
      </button>
    </MapControl>
    <MapControl>
      <button class="_map-button" title="Acercar el mapa" on:click={() => zoomTo(+1)}>
        <Fa fw icon={faPlus} />
      </button>
      <button class="_map-button" title="Alejar el mapa" on:click={() => zoomTo(-1)}>
        <Fa fw icon={faMinus} />
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
            fw
            icon={gettingCurrentPosition ? faSpinner : faLocationCrosshairs}
            spin={gettingCurrentPosition}
            pulse={gettingCurrentPosition} />
        </button>
      </MapControl>
    {/if}
    {#if !pristine}
      <MapControl>
        <button class="_map-button" title="Mostrar todos los destinos" on:click={() => reset()}>
          <Fa fw icon={faArrowsToCircle} />
        </button>
      </MapControl>
    {/if}
    {#each data as { id, name, coordinates } (id)}
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
    --map-marker-color: theme('colors.primary.200');
    position: relative;
    width: 100%;
    height: 100%;

    & :global(canvas) {
      outline: none;
    }
  }

  ._map_currentposition {
    filter: drop-shadow(2px 2px 2px #0006);
    color: theme('colors.primary.200');
  }

  ._map-marker {
    display: block;
    transform-origin: bottom center;
    translate: 0 -50%;
    filter: drop-shadow(2px 2px 2px #0006);
    outline: none;
    color: var(--map-marker-color);
    font-size: theme('fontSize.base');

    &:before {
      position: absolute;
      bottom: -5px;
      left: 0;
      z-index: -1;
      background-image: radial-gradient(closest-side, rgb(0 0 0 / 40%) 10%, rgb(0 0 0 / 5%));
      width: 100%;
      height: 10px;
      content: '';
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
    display: grid;
    place-content: center;
    transition-duration: 150ms, 150ms, 250ms;
    transition-property: background-color, outline-color, outline-offset;
    box-sizing: content-box;
    outline: 2px solid transparent;
    outline-offset: 8px;
    box-shadow: theme('boxShadow.md');
    border: 1px solid theme('colors.surface-1.fg / 25%');
    border-radius: theme('borderRadius.DEFAULT');
    background-color: theme('colors.surface-2.bg');
    padding: theme('spacing.2');
    min-width: theme('spacing.5');
    height: theme('spacing.5');
    color: theme('colors.surface-2.fg');

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
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }

    & + &:not(:first-child) {
      border-top: none;
    }

    &:has(+ &) {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
</style>
