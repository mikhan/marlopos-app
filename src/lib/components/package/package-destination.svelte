<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { breakpoints } from '$core/constants/breakpoints'
  import { getResourceHref } from '$core/services/resource-provider'
  import { matchMedia } from '$core/stores/match-media'
  import { slugify } from '$core/utils/string'
  import type { Api } from '$lib/api'
  import DynamicContent from '../common/dynamic-content.svelte'
  import Prose from '../common/prose.svelte'
  import type PackageMap from './package-map-dynamic.svelte'

  export let data: Api.PackageDestination
  export let packageMap: PackageMap | undefined
  const isLgScreen = matchMedia(`(min-width: ${breakpoints.md}px)`, true)
</script>

<li
  id={`destination-${slugify(data.name)}`}
  tabindex={$isLgScreen ? 0 : undefined}
  role="tab"
  on:mouseover={() => packageMap?.highlightDestination(data.id)}
  on:mouseout={(event) => packageMap && !event.currentTarget.matches(':focus') && packageMap.highlightDestination()}
  on:focus={() => packageMap?.focusDestination(data.id)}
  on:blur={() => packageMap?.focusDestination()}>
  <div class="_image">
    <Image
      src={getResourceHref(data.cover.id)}
      fit="cover"
      color={data.cover.color}
      alt={data.cover.title}
      srcset={[
        { w: 128, h: 128, q: 50 },
        { w: 384, h: 216 },
      ]}
      sizes="(min-width: 768px) 384px, (min-width: 480px) 120px, 384px">
      <Blurhash class="object-cover w-full h-full" hash={data.cover.blurhash} width={320} height={180} />
    </Image>
  </div>
  <div class="content">
    <Prose>
      <h3>{data.name}</h3>
      <div>
        {#if data.days}
          <small>{data.days} días</small>
        {/if}
        {#if data.nights}
          <small>{data.nights} noches</small>
        {/if}
      </div>
      <div class="description">
        <DynamicContent source={data.description} />
      </div>
    </Prose>
  </div>
</li>

<style lang="postcss">
  li {
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    gap: theme('spacing.4');
    border: 1px solid theme('colors.surface-1.border');
    border-radius: theme('borderRadius.DEFAULT');
    background-color: theme('colors.surface-1.bg');
    padding: theme('spacing.4');
    color: theme('colors.surface-1.fg');
    @apply focusable focusable-ring;
    transition-duration: 150ms, 250ms, 250ms, 250ms;
    transition-property: outline-color, outline-offset, background-color, color;
    transition-timing-function: theme('transitionTimingFunction.in-out');
    box-shadow: theme('boxShadow.xl');
    overflow: hidden;

    @media (min-width: theme('screens.sm')) {
      grid-template-columns: theme('spacing.32') 1fr;
    }

    @media (min-width: theme('screens.md')) {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }

  ._image {
    display: block;
    flex-shrink: 0;
    border-radius: theme('borderRadius.DEFAULT');
    aspect-ratio: 16/9;
    overflow: hidden;

    @media (min-width: theme('screens.sm')) {
      aspect-ratio: 1/1;
      width: theme('spacing.32');
    }

    @media (min-width: theme('screens.md')) {
      border-radius: 0;
      aspect-ratio: 16/9;
      width: auto;
    }
  }

  .content {
    position: relative;
    overflow: hidden;

    @media (min-width: theme('screens.md')) {
      padding: theme('spacing.4');
    }
  }
</style>
