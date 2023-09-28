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

  const src = getResourceHref(id)
</script>

<picture style:--color={color}>
  <Image
    class="w-full h-full"
    fit="cover"
    {src}
    alt={title}
    {width}
    {height}
    {color}
    {priority}
    srcset={[
      { w: 480, h: 640, q: 50 },
      { w: 960, h: 640, q: 75 },
      { w: 1280, h: 640, q: 100 },
    ]}>
    <Blurhash class="object-cover w-full h-full animate-pulse" hash={blurhash} {width} {height} renderSize={64} />
  </Image>
</picture>

<style lang="postcss">
  picture {
    display: block;
    position: absolute;
    inset: 0;
    background-color: var(--color);
    padding-left: max(0px, calc(100% - theme('screens.2xl')));

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
      background-image: linear-gradient(0deg, theme('colors.canvas.bg / 50%'), 5%, transparent 15%),
        linear-gradient(0deg, theme('colors.canvas.bg / 75%'), transparent 30%),
        linear-gradient(0deg, theme('colors.canvas.bg / 100%'), transparent 45%),
        radial-gradient(circle farthest-side at left bottom, theme('colors.canvas.bg / 50%') 30%, transparent 75%);
      mix-blend-mode: multiply;
      pointer-events: none;
    }
  }
</style>
