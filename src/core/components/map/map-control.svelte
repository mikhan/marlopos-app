<script lang="ts">
  import type { IControl, Map } from 'mapbox-gl'
  import { mapContext } from './map.svelte'
  import { createEventDispatcher, onMount } from 'svelte'
  import type { MapControlAction, MapControlPosition } from './map-utils'

  let content: HTMLElement

  const { addControl, removeControl, getMap } = mapContext.get()
  const dispatch = createEventDispatcher<{
    add: null
    remove: null
  }>()

  export let position: MapControlPosition = 'top-right'
  export let action: MapControlAction = () => {}
  let map: Map

  onMount(() => {
    map = getMap()

    let actionUnload: ((map: Map) => void) | void

    const control: IControl = {
      onAdd(map) {
        actionUnload = action(map)

        return content
      },
      onRemove(map) {
        actionUnload?.(map)
      },
    }

    addControl(control, position)
    dispatch('add')

    return () => {
      removeControl(control)
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
