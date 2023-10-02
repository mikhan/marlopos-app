<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { getResourceHref } from '$core/services/resource-provider'
  import type { Api } from '$lib/api'

  export let data: Api.Image
</script>

<picture>
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
      { w: 480, h: 864, q: 50 },
      { w: 960, h: 864, q: 75 },
      { w: 1280, h: 864, q: 100 },
    ]}>
    <Blurhash
      class="object-cover w-full h-full animate-pulse"
      hash={data.blurhash}
      renderSize={64}
      width={data.width}
      height={data.height} />
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
      background-image: linear-gradient(0deg, theme('colors.canvas.bg'), transparent 30%),
        radial-gradient(circle farthest-side at left bottom, theme('colors.canvas.bg / 50%') 30%, transparent 75%);
    }
  }
</style>
