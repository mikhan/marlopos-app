<script lang="ts" context="module">
  export const mapContext = createContext<{
    getMap: () => Map
    getMarkers: () => Marker[]
    addMarker: (marker: Marker) => void
    removeMarker: (marker: Marker) => void
    getControls: () => IControl[]
    addControl: (control: IControl, position?: MapControlPosition) => void
    removeControl: (control: IControl) => void
  }>('map-context')
</script>

<script lang="ts">
  import { Map, Marker, type IControl, type MapboxOptions } from 'mapbox-gl'
  import { onMount } from 'svelte'
  import 'mapbox-gl/dist/mapbox-gl.css'
  import type { MapControlPosition } from './map-utils'
  import { createContext } from '$core/services/context'

  export let options: Omit<MapboxOptions, 'container'>

  const markers: Marker[] = []
  const controls: IControl[] = []
  let container: HTMLElement
  let map: Map

  export function getMap() {
    return map
  }

  export function getMarkers() {
    return markers
  }

  export function addMarker(marker: Marker) {
    marker.addTo(map)
    markers.push(marker)
  }

  export function removeMarker(marker: Marker) {
    marker.remove()
    markers.splice(markers.indexOf(marker), 1)
  }

  export function getControls() {
    return controls
  }

  export function addControl(control: IControl, position?: MapControlPosition) {
    map.addControl(control, position)
    controls.push(control)
  }

  export function removeControl(control: IControl) {
    map.removeControl(control)
    controls.splice(controls.indexOf(control), 1)
  }

  mapContext.set({ getMap, getMarkers, addMarker, removeMarker, getControls, addControl, removeControl })

  onMount(() => {
    map = new Map({ ...options, container })

    return () => map.remove()
  })
</script>

<div bind:this={container} {...$$restProps}>
  {#if map}
    <slot />
  {/if}
</div>

<style lang="postcss">
  div {
    width: 100%;
    height: 100%;
  }
</style>
