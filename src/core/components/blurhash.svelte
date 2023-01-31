<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { renderBlurhash } from '../utils/image'

  let blurhash: string
  let width: number = 32
  let height: number = 32
  let punch: number | undefined = undefined

  let canvas: HTMLCanvasElement
  let image: HTMLImageElement | null

  function hideImage() {
    if (!image || image.complete) return

    image.style.setProperty('opacity', '0')
    image.addEventListener('load', () => showImage(), { once: true })
  }

  function showImage() {
    image?.style.removeProperty('opacity')
  }

  onMount(() => {
    const renderingContext = canvas.getContext('2d')
    renderingContext && renderBlurhash(renderingContext, blurhash, { width, height, punch })
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
