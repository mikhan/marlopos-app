<script lang="ts">
  import { uiShellContext } from '$core/components/shell/ui-shell.svelte'
  import DynamicContent from '$lib/components/common/dynamic-content.svelte'
  import SectionHeader from '$lib/components/common/section-header.svelte'
  import PackageCover from '$lib/components/package/package-cover.svelte'
  import ShareMenu from '../share/share-menu.svelte'
  import PackageDestination from './package-destination.svelte'
  import PackageMap from './package-map.svelte'
  import PackageSchedule from './package-schedule.svelte'

  export let data: Api.Package

  const { layoutTopbarHeight } = uiShellContext.get()
  let packageMap: PackageMap
  $: marginTop = `${$layoutTopbarHeight * -1}px`
</script>

<article class="mb-16 -mt-16 layout-container gap-y-4 layout-padding" style:margin-top={marginTop}>
  <div class="w-full mx-auto max-w-screen-2xl">
    <PackageCover data={data.cover} />
  </div>
  <div class="flex flex-col gap-4 layout-md relative z-[1]">
    <h1 class="font-display text-4xl-fluid">{data.name}</h1>
    <ShareMenu />
    <div class="text-xl">{data.description}</div>
    <DynamicContent html={data.content} />
  </div>
  <div class="layout-md">
    <SectionHeader class="mt-8" id="destinations-list-header">Salidas</SectionHeader>
  </div>
  <div class="relative layout-md">
    <PackageSchedule data={data.schedule} />
  </div>
  <div class="layout-md">
    <SectionHeader class="mt-8" id="destinations-list-header">Destinos incluídos</SectionHeader>
  </div>
  <div class="mt-4 flex flex-col px-4 gap-2 md:grid md:grid-cols-[1fr,1fr] md:gap-4 md:px-8">
    <ul class="flex flex-col gap-2 md:gap-4 md:ml-auto md:max-w-prose" aria-labelledby="destinations-list-header">
      {#each [...data.destinations] as destination}
        <li>
          <PackageDestination data={destination} {packageMap} />
        </li>
      {/each}
    </ul>
    <div
      class="focusable-within aspect-video sm:w-full sm:h-full max-h-[calc(100vh-64px-32px)] md:sticky md:top-20 md:max-w-prose bg-surface-1-bg border border-surface-1-border rounded-2xl overflow-clip elevation-low">
      <PackageMap class="w-full h-full" data={data.destinations} bind:this={packageMap} />
    </div>
  </div>
</article>
