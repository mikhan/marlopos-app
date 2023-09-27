<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { getResourceHref } from '$core/services/resource-provider'
  import { slugify } from '$core/utils/string'
  import DynamicContent from '$lib/components/common/dynamic-content.svelte'
  import type PackageMap from './package-map.svelte'

  export let data: Api.Destination
  export let packageMap: PackageMap
</script>

<li
  id={`destination-${slugify(data.name)}`}
  tabindex="0"
  role="tab"
  on:mouseover={() => packageMap.highlightDestination(data.id)}
  on:mouseout={(event) => !event.currentTarget.matches(':focus') && packageMap.highlightDestination()}
  on:focus={() => packageMap.focusDestination(data.id)}
  on:blur={() => packageMap.focusDestination()}>
  <picture>
    <Image
      class="w-full h-full"
      src={getResourceHref(data.cover.id)}
      width={320}
      height={180}
      fit="cover"
      color={data.cover.color}
      alt={data.cover.title}
      srcset={[
        { w: 120, h: 120, q: 50 },
        { w: 384, ar: '16-9' },
      ]}
      sizes="(min-width: 768px) 384px, (min-width: 384px) 120px, 384px">
      <Blurhash class="object-cover w-full h-full" hash={data.cover.blurhash} width={320} height={180} />
    </Image>
  </picture>
  <div class="_content">
    <h1 class="text-2xl">{data.name}</h1>
    <DynamicContent html={data.description} />
  </div>
</li>

<style lang="postcss">
  li {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: theme('spacing.4');
    padding: theme('spacing.4');
    color: theme('colors.surface-1.fg');
    background-color: theme('colors.surface-1.bg');
    border-radius: theme('borderRadius.DEFAULT');
    border: 1px solid theme('colors.surface-1.border');
    @apply focusable focusable-ring;
    transition-property: outline-color, outline-offset, background-color, color;
    transition-duration: 150ms, 250ms, 250ms, 250ms;
    transition-timing-function: theme('transitionTimingFunction.in-out');
    overflow: clip;
    box-shadow: theme('boxShadow.xl');

    @media (theme('screens.sm') <= width < theme('screens.md')) {
      flex-direction: row;
      align-items: flex-start;
    }

    @media (theme('screens.md') <= width) {
      padding: 0;
    }
  }

  picture {
    display: block;
    aspect-ratio: 16/9;
    flex-shrink: 0;
    overflow: clip;

    @media (theme('screens.sm') <= width < theme('screens.md')) {
      aspect-ratio: 1/1;
      width: theme('spacing.32');
    }

    @media (width < theme('screens.md')) {
      border-radius: theme('borderRadius.DEFAULT');
    }
  }

  ._content {
    display: flex;
    flex-direction: column;
    gap: theme('spacing.4');

    @media (theme('screens.md') <= width) {
      padding: theme('spacing.4');
    }
  }
</style>
