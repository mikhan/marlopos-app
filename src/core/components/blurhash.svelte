<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { renderBlurhash } from '../utils/image'

  type Events = {
    load: HTMLCanvasElement
  }

  const dispatch = createEventDispatcher<Events>()

  let hash: string
  let renderSize = 32
  let width: number
  let height: number
  let punch = 1
  let canvas: HTMLCanvasElement

  onMount(() => {
    const renderingOptions = {
      width: renderSize,
      height: Math.round((renderSize * height) / width),
      punch,
    }

    canvas.width = renderingOptions.width
    canvas.height = renderingOptions.height
    const renderingContext = canvas.getContext('2d')
    renderingContext && renderBlurhash(renderingContext, hash, renderingOptions)
    canvas.style.setProperty('opacity', '1')

    dispatch('load', canvas)
  })

  export { hash, renderSize, width, height, punch }
</script>

<canvas {...$$restProps} bind:this={canvas} />

<style lang="postcss">
  canvas {
    opacity: 0;
    transition: opacity 250ms;
  }
</style>
