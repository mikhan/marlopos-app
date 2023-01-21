<script lang="ts">
  import { blurhashImage } from '$lib/utils/image'

  let blurhash: string
  let width = 32
  let height = 32
  let punch: number | undefined = undefined

  $: options = punch ? { width, height, punch } : { width, height }

  function getBlurhashImage(canvas: HTMLCanvasElement, blurhash: string) {
    const imageData = blurhashImage(blurhash, options)
    canvas.getContext('2d')!.putImageData(imageData, 0, 0)
  }

  export { blurhash, width, height, punch }
</script>

<canvas {width} {height} use:getBlurhashImage={blurhash} />
