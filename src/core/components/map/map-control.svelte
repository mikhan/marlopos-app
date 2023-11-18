<script lang="ts">
  import type { IControl, Map } from 'mapbox-gl'
  import { createEventDispatcher, onMount } from 'svelte'
  import type { MapControlPosition } from './map-utils'
  import { getMapContext } from './map.svelte'

  let content: HTMLElement

  const mapContext = getMapContext()
  const dispatch = createEventDispatcher<{
    add: null
    remove: null
  }>()

  export let position: MapControlPosition = 'top-right'
  let map: Map

  onMount(() => {
    map = mapContext.getMap()

    const control: IControl = {
      onAdd() {
        return content
      },
      onRemove() {},
    }

    mapContext.addControl(control, position)
    dispatch('add')

    return () => {
      mapContext.removeControl(control)
      dispatch('remove')
    }
  })
</script>

<div bind:this={content}>
  <slot {map} />
</div>

<style lang="postcss">
  div {
    pointer-events: auto;
  }

  :global(.mapboxgl-control-container) {
    font: initial;
    font-size: theme('fontSize.base');
    font-family: theme('fontFamily.sans');
  }

  :global(.mapboxgl-ctrl-top-left) div,
  :global(.mapboxgl-ctrl-top-right) div {
    margin-top: theme('spacing.4');
  }

  :global(.mapboxgl-ctrl-top-right) div,
  :global(.mapboxgl-ctrl-bottom-right) div {
    margin-right: theme('spacing.4');
  }

  :global(.mapboxgl-ctrl-bottom-right) div,
  :global(.mapboxgl-ctrl-bottom-left) div {
    margin-bottom: theme('spacing.4');
  }

  :global(.mapboxgl-ctrl-top-left) div,
  :global(.mapboxgl-ctrl-bottom-left) div {
    margin-left: theme('spacing.4');
  }
</style>
