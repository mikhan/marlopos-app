<script lang="ts">
  import type { Api } from '$lib/api'
  import DynamicContent from '../common/dynamic-content.svelte'
  import SectionHeader from '../common/section-header.svelte'
  import ShareMenu from '../share/share-menu.svelte'
  import PackageCover from './package-cover.svelte'
  import PackageDestinations from './package-destinations.svelte'
  import PackageSchedule from './package-schedule.svelte'

  export let data: Api.Package
</script>

<div class="w-full mx-auto max-w-screen-3xl">
  <PackageCover data={data.cover} />
</div>
<div class="flex flex-col lg:flex-row gap-8 layout-2xl z-[1] justify-between -mt-36">
  <div class="max-w-screen-md">
    <header class="text-shadow">
      <h1 class="font-display text-4xl-fluid text-surface-1-fg">{data.name}</h1>
      <div class="my-8 text-xl text-surface-1-fg">{data.description}</div>
    </header>
    <DynamicContent html={data.content} />
  </div>
  <div class="flex flex-col gap-4 shrink-0">
    <PackageSchedule data={data.schedule} />
    <ShareMenu />
  </div>
</div>
<div class="layout-2xl">
  <SectionHeader class="mt-8" id="destinations-list-header">Destinos incluídos</SectionHeader>
</div>
<div class="layout-2xl">
  <PackageDestinations data={data.destinations} />
</div>
