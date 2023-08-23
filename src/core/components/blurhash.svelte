<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import { getBlurhashUrl, renderBlurhash } from '../utils/image'
  import { browser } from '$app/environment'

  type Events = {
    load: HTMLCanvasElement
  }

  const dispatch = createEventDispatcher<Events>()

  let hash: string
  let width: number = 32
  let height: number = 32
  let punch: number | undefined = undefined
  let blurhashURL: string | null = null

  if (browser) blurhashURL = getBlurhashUrl(hash, { width, height, punch })

  let canvas: HTMLCanvasElement

  onMount(() => {
    const renderingContext = canvas.getContext('2d')
    renderingContext && renderBlurhash(renderingContext, hash, { width, height, punch })

    dispatch('load', canvas)
  })

  export { hash, width, height, punch }
</script>

<div {...$$restProps}>
  <canvas style="display:none" {width} {height} bind:this={canvas} />
  <img src={blurhashURL} aria-hidden="true" alt="" />
  <slot />
</div>

<style lang="scss">
  div {
    position: relative;
    isolation: isolate;
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
</style>
