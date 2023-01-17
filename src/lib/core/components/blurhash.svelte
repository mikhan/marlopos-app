<script lang="ts">
  import { renderBlurhash } from '$lib/core/utils/image'
  import { onDestroy, onMount } from 'svelte'

  let blurhash: string
  let width = 32
  let height = 32
  let punch: number | undefined = undefined

  let canvas: HTMLCanvasElement

  let image: HTMLImageElement | null

  $: options = punch ? { width, height, punch } : { width, height }

  function hideImage() {
    if (!image || image.complete) return

    image.style.setProperty('opacity', '0')
    image.addEventListener('load', () => showImage(), { once: true })
  }

  function showImage() {
    if (!image) return

    image.style.removeProperty('opacity')
  }

  onMount(() => {
    const renderingContext = canvas.getContext('2d')
    renderingContext && renderBlurhash(renderingContext, blurhash, options)

    image = canvas.parentElement?.querySelector('img') ?? null
    hideImage()
  })

  onDestroy(() => {
    showImage()
  })

  export { blurhash, width, height, punch }
</script>

<canvas {width} {height} bind:this={canvas} />

<style lang="scss">
  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
</style>
