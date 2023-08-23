<script lang="ts">
  import DynamicContent from '$lib/components/common/dynamic-content.svelte'
  import SectionHeader from '$lib/components/common/section-header.svelte'
  import DestinationPreview from '$lib/components/destination/destination-preview.svelte'
  import PackageCover from '$lib/components/package/package-cover.svelte'
  import { metadataStore } from '$lib/stores/metadata.store'
  import type { PageData } from './$types'
  import InteractiveMap from '$lib/components/map/map.svelte'
  import MapMarker from '$lib/components/map/map-marker.svelte'
  import { getBoundingBox } from '$lib/components/map/map-utils'

  export let data: PageData

  $: metadataStore.set(data.meta)
  const boundingBox = getBoundingBox(data.page.destinations.map(({ coordinates: [lng, lat] }) => ({ lng, lat })))
</script>

<main class="-mt-16 bg-neutral-100">
  <PackageCover data={data.page.cover} />
  <article
    class="relative border border-neutral-100 flow-root max-w-3xl mx-auto layout rounded-md py-8 -mt-8 mb-8 bg-neutral-50 shadow-md">
    <header class="space-y-4">
      <h1 class="text-4xl font-serif">{data.page.name}</h1>
      <div class="text-xl">{data.page.description}</div>
    </header>
    <DynamicContent html={data.page.content} />

    <div>
      <SectionHeader class="my-4" id="destinations-list-header">Destinos incluídos</SectionHeader>
      <ul
        class="grid grid-cols-[repeat(auto-fill,_minmax(12rem,_1fr))] gap-4 mt-4"
        role="listbox"
        aria-labelledby="destinations-list-header">
        {#each [...data.page.destinations] as destination}
          <li>
            <DestinationPreview data={destination} />
          </li>
        {/each}
      </ul>
    </div>
    <InteractiveMap {boundingBox}>
      {#each data.page.destinations as { name, description, coordinates, cover }}
        <MapMarker {name} {description} {coordinates}>
          <div class="group flex items-center">
            <div
              class="w-8 h-8 relative overflow-hidden rounded-full border-2 bg-primary-500 border-primary-500-fg group-hover:w-8 group-hover:h-8 transition-all">
              <img src={`/api/assets/${cover.id}?w=32&h=32?fo-auto`} alt={cover.title} width="32" height="32" />
            </div>
            <div
              class="absolute font-sans text-sm left-10 font-bold text-primary-500-fg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              {name}
            </div>
          </div>
        </MapMarker>
      {/each}
    </InteractiveMap>
  </article>
</main>
