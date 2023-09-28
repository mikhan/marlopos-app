<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { getResourceHref } from '$core/services/resource-provider'
  import type { Api } from '$lib/api'

  export let data: Api.Image
</script>

<picture class="_image">
  <Image
    class="w-full h-full"
    fit="cover"
    src={getResourceHref(data.id)}
    width={data.width}
    height={data.height}
    alt={data.title}
    color={data.color}
    priority={true}
    srcset={[
      { w: 480, h: 640, q: 50 },
      { w: 960, h: 640, q: 75 },
      { w: 1280, h: 640, q: 100 },
    ]}>
    <Blurhash
      class="object-cover w-full h-full"
      hash={data.blurhash}
      renderSize={64}
      width={data.width}
      height={data.height} />
  </Image>
</picture>

<style lang="postcss">
  ._image {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 4/3;
    min-height: min(40rem, 75vh);
    max-height: min(40rem, 100vh);
    mask: linear-gradient(0deg, transparent, white 30%);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: radial-gradient(
        circle farthest-side at left bottom,
        theme('colors.canvas.bg / 50%') 30%,
        transparent 75%
      );
    }
  }
</style>
