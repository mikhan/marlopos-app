<script lang="ts">
  import { Marker } from 'mapbox-gl'
  import { onMount } from 'svelte'
  import { getMapContext } from './map.svelte'

  const mapContext = getMapContext()

  export let coordinates: [number, number]
  export let color = ''

  let marker: Marker
  let markerElement: HTMLDivElement

  export function highlight(marker: Marker | undefined, hightlight: boolean) {
    if (!marker) return

    for (const marker of mapContext.getMarkers()) {
      marker.getElement().children[0]?.classList.toggle('animate-bounce', marker === marker && hightlight)
    }
  }

  export function getMarker() {
    return marker
  }

  export function openMarker(marker: Marker | undefined) {
    if (!marker) return

    for (const m of mapContext.getMarkers()) {
      const isOpen = m.getPopup().isOpen()
      if ((m === marker && !isOpen) || (m !== marker && isOpen)) m.togglePopup()
    }
  }

  onMount(() => {
    marker = new Marker($$slots.default ? { element: markerElement } : { color })
    marker.setLngLat(coordinates)
    mapContext.addMarker(marker)

    return () => mapContext.removeMarker(marker)
  })
</script>

<div bind:this={markerElement}>
  <slot />
</div>
