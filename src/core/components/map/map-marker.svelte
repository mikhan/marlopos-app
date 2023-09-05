<script lang="ts">
  import { Marker } from 'mapbox-gl'
  import { onMount } from 'svelte'
  import { mapContext } from './map.svelte'

  const { getMarkers, addMarker, removeMarker } = mapContext.get()

  export let coordinates: [number, number]
  export let color = ''

  let marker: Marker
  let markerElement: HTMLDivElement

  onMount(() => {
    marker = new Marker($$slots.default ? { element: markerElement } : { color })
    marker.setLngLat(coordinates)
    addMarker(marker)

    return () => removeMarker(marker)
  })

  export function highlight(marker: Marker | undefined, hightlight: boolean) {
    if (!marker) return

    for (const m of getMarkers()) {
      m.getElement().children[0]?.classList.toggle('animate-bounce', m === marker && hightlight)
    }
  }

  export function getMarker() {
    return marker
  }

  export function openMarker(marker: Marker | undefined) {
    if (!marker) return

    for (const m of getMarkers()) {
      const isOpen = m.getPopup().isOpen()
      if ((m === marker && !isOpen) || (m !== marker && isOpen)) m.togglePopup()
    }
  }
</script>

<div bind:this={markerElement}>
  <slot />
</div>
