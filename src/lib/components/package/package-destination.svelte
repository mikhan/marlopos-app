<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { slugify } from '$core/utils/string'
  import DynamicContent from '$lib/components/common/dynamic-content.svelte'
  import type PackageMap from './package-map.svelte'

  export let data: Api.Destination
  export let packageMap: PackageMap
</script>

<div
  id={`destination-${slugify(data.name)}`}
  tabindex="0"
  role="tab"
  class="relative flex flex-col gap-4 p-4 focusable focusable-inner _card sm:max-md:flex-row sm:max-md:items-start rounded-3xl"
  on:mouseover={() => packageMap.highlightDestination(data.id)}
  on:mouseout={(event) => !event.currentTarget.matches(':focus') && packageMap.highlightDestination()}
  on:focus={() => packageMap.focusDestination(data.id)}
  on:blur={() => packageMap.focusDestination()}>
  <picture
    class="block border rounded-2xl aspect-video sm:max-md:aspect-square sm:max-md:w-40 shrink-0 overflow-clip border-canvas-border">
    <Image
      class="w-full h-full"
      src={`/api/assets/${data.cover.id}?w=320&h=180?q=50`}
      width={320}
      height={180}
      fit="cover"
      color={data.cover.color}
      alt={data.cover.title}>
      <Blurhash class="object-cover w-full h-full" hash={data.cover.blurhash} width={320} height={180} />
    </Image>
  </picture>
  <div class="flex flex-col gap-4 p-4">
    <h1 class="text-2xl">{data.name}</h1>
    <DynamicContent html={data.description} />
  </div>
</div>

<style lang="postcss">
  ._card {
    border: 1px solid transparent;

    &:hover {
      color: theme('colors.surface-1.fg');
      background-color: theme('colors.surface-1.bg');
      border-color: theme('colors.surface-1.border');
    }
  }
</style>
