<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { getResourceHref } from '$core/services/resource-provider'

  export let id: string
  export let title: string
  export let width: number
  export let height: number
  export let blurhash: string
  export let color: string
  export let priority: boolean
</script>

<picture>
  <Image
    class="w-full h-full"
    fit="cover"
    src={getResourceHref(id)}
    alt={title}
    {width}
    {height}
    {color}
    {priority}
    srcset={[
      { w: 480, h: 864, q: 50 },
      { w: 1024, h: 864, q: 75 },
      { w: 1536, h: 864, q: 100 },
    ]}>
    <Blurhash class="object-cover w-full h-full animate-pulse" hash={blurhash} {width} {height} renderSize={64} />
  </Image>
</picture>

<style lang="postcss">
  picture {
    display: block;
    position: absolute;
    inset: 0;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: linear-gradient(0deg, theme('colors.canvas.bg'), transparent 50%),
        linear-gradient(0deg, theme('colors.canvas.bg'), transparent 25%),
        radial-gradient(circle farthest-side at left bottom, theme('colors.canvas.bg / 50%') 30%, transparent 75%);
    }
  }
</style>
