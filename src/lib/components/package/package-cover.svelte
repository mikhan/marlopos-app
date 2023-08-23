<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { getBlurhashAverageColor } from '$core/utils/image'

  interface Cover {
    id: string
    title: string
    width: number
    height: number
    blurhash: string
  }

  export let data: Cover
  $: averageColor = getBlurhashAverageColor(data.blurhash)
</script>

<div class="wrapper" style:--average-color={averageColor}>
  <div class="image">
    <picture class="block h-96">
      <Blurhash class="w-full h-full" hash={data.blurhash}>
        <Image
          class="w-full h-full object-cover"
          src={`/api/assets/${data.id}`}
          width={data.width}
          height={data.height}
          alt={data.title}
          priority={true} />
      </Blurhash>
    </picture>
  </div>
</div>

<style lang="scss">
  .wrapper {
    --average-color: hsl(0, 0%, 50%);
    position: relative;
    background-color: var(--average-color);
  }

  .image {
    max-width: theme('screens.lg');
    margin: 0 auto;
    // mask-image: linear-gradient(to right, transparent, black 25%, black 75%, transparent);
    // z-index: -1;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: linear-gradient(to bottom, var(app_surface_color), transparent 64px);
      pointer-events: none;
    }
  }
</style>
