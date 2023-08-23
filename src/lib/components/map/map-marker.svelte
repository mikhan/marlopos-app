<script lang="ts">
  import { Marker, Popup } from 'mapbox-gl'
  import { getContext, onMount } from 'svelte'
  import { MAP_CONTEXT, type MapContext } from './map.svelte'

  const context = getContext<MapContext>(MAP_CONTEXT)

  export let coordinates: [number, number]
  export let name: string
  export let description: string
  export let color = ''

  let marker: Marker
  let markerElement: HTMLDivElement

  onMount(() => {
    const element = markerElement.firstElementChild as HTMLElement | null

    marker = new Marker(element ? { element } : { color })

    marker.setLngLat(coordinates)
    marker.getElement().style.cursor = 'pointer'

    const popup = new Popup({ offset: 15 })
    popup.setHTML(`<h1>${name}</h1>${description}`)
    popup.setMaxWidth('min(75%, 80ch)')
    marker.setPopup(popup)

    context.addMarker(marker)

    return () => context.removeMarker(marker)
  })

  export function highlight(marker: Marker | undefined, hightlight: boolean) {
    if (!marker) return

    for (const m of context.getMarkers()) {
      m.getElement().children[0]?.classList.toggle('animate-bounce', m === marker && hightlight)
    }
  }

  export function openMarker(marker: Marker | undefined) {
    if (!marker) return

    for (const m of context.getMarkers()) {
      const isOpen = m.getPopup().isOpen()
      if ((m === marker && !isOpen) || (m !== marker && isOpen)) m.togglePopup()
    }
  }
</script>

<div bind:this={markerElement}>
  <slot />
</div>
