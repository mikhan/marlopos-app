<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { breakpoints } from '$core/constants/breakpoints'
  import { getResourceHref, transformURL } from '$core/services/resource-provider'
  import type { Api } from '$lib/api'

  export let data: Api.Image
  export let priority = false

  $: images = {
    small: {
      src: transformURL(getResourceHref(data.id, { w: breakpoints.sm, h: 864, q: 50, fo: 'auto' })),
      breakpoint: breakpoints.sm,
    },
    medium: {
      src: transformURL(getResourceHref(data.id, { w: breakpoints.lg, h: 864, q: 75, fo: 'auto' })),
      breakpoint: breakpoints.lg,
    },
    large: {
      src: transformURL(getResourceHref(data.id, { w: breakpoints['2xl'], h: 864, q: 50 })),
    },
  }
</script>

<div>
  <Image
    fit="cover"
    src={images.large.src}
    width={data.width}
    height={data.height}
    alt={data.title}
    color={data.color}
    {priority}>
    <svelte:fragment slot="source">
      <source srcset={images.small.src} media="(max-width: {images.small.breakpoint}px)" />
      <source srcset={images.medium.src} media="(max-width: {images.medium.breakpoint}px)" />
    </svelte:fragment>
    <Blurhash
      class="object-cover w-full h-full animate-pulse"
      hash={data.blurhash}
      renderSize={64}
      width={data.width}
      height={data.height} />
  </Image>
</div>

<style lang="postcss">
  div {
    display: block;
    position: absolute;
    inset: 0;

    &::after {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(0deg, theme('colors.canvas.bg'), transparent 20rem),
        linear-gradient(0deg, theme('colors.canvas.bg'), transparent 10rem),
        radial-gradient(circle farthest-side at left bottom, theme('colors.canvas.bg / 50%') 15rem, transparent 30rem);
      pointer-events: none;
      content: '';
    }
  }
</style>
