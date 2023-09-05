<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import { renderBlurhash } from '../utils/image'

  type Events = {
    load: HTMLCanvasElement
  }

  const dispatch = createEventDispatcher<Events>()

  let hash: string
  let hashsize = 32
  let width: number
  let height: number
  let punch: number | undefined = undefined
  let canvas: HTMLCanvasElement

  $: renderingOptions = { width: hashsize, height: Math.round((hashsize * height) / width), punch }

  onMount(() => {
    canvas.width = renderingOptions.width
    canvas.height = renderingOptions.height
    const renderingContext = canvas.getContext('2d')
    renderingContext && renderBlurhash(renderingContext, hash, renderingOptions)
    canvas.style.setProperty('opacity', '1')

    dispatch('load', canvas)
  })

  export { hash, width, height, punch }
</script>

<canvas {...$$restProps} bind:this={canvas} />

<style lang="postcss">
  canvas {
    transition: opacity 250ms;
    opacity: 0;
  }
</style>
