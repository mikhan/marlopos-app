<script lang="ts" context="module">
  import { createContext } from '$core/services/context'

  export type MapContext = {
    getMap: () => Map
    getMarkers: () => Marker[]
    addMarker: (marker: Marker) => void
    removeMarker: (marker: Marker) => void
    getControls: () => IControl[]
    addControl: (control: IControl, position?: MapControlPosition) => void
    removeControl: (control: IControl) => void
  }

  export const [getMapContext, setMapContext] = createContext<MapContext>()
</script>

<script lang="ts">
  import { type IControl, Map, type MapboxOptions, Marker } from 'mapbox-gl'
  import 'mapbox-gl/dist/mapbox-gl.css'
  import { onMount } from 'svelte'
  import type { Unsubscriber } from 'svelte/store'
  import { languageStore } from '$lib/stores/language.store'
  import { type MapControlPosition, setMapLanguage } from './map-utils'

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

  setMapContext({ getMap, getMarkers, addMarker, removeMarker, getControls, addControl, removeControl })

  onMount(() => {
    let languageUnsubscribe: Unsubscriber | undefined

    map = new Map({ ...options, container })

    map.once('style.load', () => {
      languageUnsubscribe = languageStore.subscribe(({ code }) => {
        const style = setMapLanguage(map.getStyle(), code)
        map.setStyle(style)
      })
    })

    return () => {
      map.remove()
      languageUnsubscribe?.()
    }
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

  :global {
    .mapboxgl-map {
      --gap: theme('spacing.4');
      display: grid;
      grid-template:
        'tl tr' 1fr
        'bl br' 1fr / 1fr max-content;
      grid-gap: var(--gap);
      padding: var(--gap);

      & > * {
        grid-area: tl / tl / br / br;
      }
    }

    .mapboxgl-control-container {
      display: contents;
      font: initial;
      font-size: theme('fontSize.base');
      font-family: theme('fontFamily.sans');

      & > * {
        display: flex;
        position: absolute;
        gap: theme('spacing.4');
      }

      .mapboxgl-ctrl-top-right {
        grid-area: tr;
        flex-direction: column;
        align-self: flex-start;
      }

      .mapboxgl-ctrl-bottom-right {
        grid-area: br;
        flex-direction: column;
        align-self: flex-end;
      }

      .mapboxgl-ctrl-top-left {
        grid-area: tl;
        align-self: flex-start;
      }

      .mapboxgl-ctrl-bottom-left {
        grid-area: bl;
        align-self: flex-end;
      }
    }
  }
</style>
