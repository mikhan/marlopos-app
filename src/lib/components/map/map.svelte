<script lang="ts" context="module">
  // your script goes here
  export const MAP_CONTEXT = Symbol('MAP_CONTEXT')
  export interface MapContext {
    getMap: () => Map
    getMarkers: () => Marker[]
    addMarker: (marker: Marker) => void
    removeMarker: (marker: Marker) => void
  }
</script>

<script lang="ts">
  import { Map, Marker } from 'mapbox-gl'
  import { onDestroy, onMount, setContext } from 'svelte'
  import 'mapbox-gl/dist/mapbox-gl.css'
  import { ResetBoundsControl, ToggleStyleControl, FullscreenControl } from './map-controls'
  import type { BoundingBox } from './map-utils'

  // export let markers: { name: string; description: string; coordinates: [number, number] }[]
  export let boundingBox: BoundingBox

  // console.log(boundingBox)
  // const markers: Marker[] = []
  // const popups: Popup[] = []

  let mapContainer: HTMLElement
  let map: Map
  let markers: Marker[] = []

  setContext<MapContext>(MAP_CONTEXT, {
    getMap: () => map,
    getMarkers: () => markers,
    addMarker(marker) {
      marker.addTo(map)
      markers.push(marker)
    },
    removeMarker(marker) {
      marker.remove()
      markers.splice(markers.indexOf(marker), 1)
    },
  })

  onMount(() => {
    map = new Map({
      accessToken: 'pk.eyJ1IjoibWlraGFuIiwiYSI6ImNsYzE5bGkzbzFra3QzeG1zZ2llZjdmam4ifQ.GTojV6q68P--p_6-BhMyfw',
      container: mapContainer,
      style: 'mapbox://styles/mikhan/clc1f6fqx002f14my61v8ue6l',
      bounds: boundingBox,
      attributionControl: false,
      // scrollZoom: false,
    }) //.fitBounds(boundingBox, { padding: 100 })

    map.addControl(new FullscreenControl())
    // map.addControl(new NavigationControl({ showCompass: false }))
    map.addControl(
      new ToggleStyleControl([
        'mapbox://styles/mikhan/clc1f6fqx002f14my61v8ue6l',
        'mapbox://styles/mapbox/satellite-streets-v12',
      ]),
    )
    map.addControl(new ResetBoundsControl(boundingBox))
  })

  onDestroy(() => {
    if (map) map.remove()
  })

  // function highlightMarker(marker: Marker | undefined, hightlight: boolean) {
  //   if (!marker) return

  //   for (const m of markers) {
  //     m.getElement().children[0]?.classList.toggle('animate-bounce', m === marker && hightlight)
  //   }
  // }

  // function openMarker(marker: Marker | undefined) {
  //   if (!marker) return

  //   for (const m of markers) {
  //     const isOpen = m.getPopup().isOpen()
  //     if ((m === marker && !isOpen) || (m !== marker && isOpen)) m.togglePopup()
  //   }
  // }
</script>

<div class="aspect-video" bind:this={mapContainer}>
  {#if map}
    <slot />
  {/if}
</div>

<!-- 
              on:click={() => openMarker(markers[index])}
              on:mouseover={() => highlightMarker(markers[index], true)}
              on:mouseout={() => highlightMarker(markers[index], false)}
              on:focus={() => highlightMarker(markers[index], true)}
              on:blur={() => highlightMarker(markers[index], false)} -->

<style lang="scss">
  :global(.mapboxgl-popup-close-button) {
    width: 1.5rem;
    height: 1.5rem;
  }

  :global(.mapboxgl-ctrl-group) {
    background: theme('colors.neutral.100');
    color: theme('colors.neutral.100-fg');
  }

  :global(.mapboxgl-ctrl-group button) {
    display: grid;
    place-content: center;
    padding: 4px;
  }

  :global(.mapboxgl-ctrl-group button svg) {
    width: 100%;
    height: 100%;
  }

  :global(.mapboxgl-ctrl-group button:not(:disabled):hover) {
    background: theme('colors.neutral.300');
    color: theme('colors.neutral.300-fg');
  }

  :global(.mapboxgl-popup) {
    font-family: theme('fontFamily.sans');
  }

  :global(.mapboxgl-popup h1) {
    font-size: theme('fontSize.lg');
  }

  :global(.mapboxgl-popup p) {
    margin: theme('spacing.4') 0;
  }
</style>
