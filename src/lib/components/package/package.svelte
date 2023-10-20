<script lang="ts">
  import type { Api } from '$lib/api'
  import SectionHeader from '../common/section-header.svelte'
  import ShareMenu from '../share/share-menu.svelte'
  import PackageAttachments from './package-attachments.svelte'
  import PackageContent from './package-content.svelte'
  import PackageCover from './package-cover.svelte'
  import PackageDestinations from './package-destinations.svelte'
  import PackageDetails from './package-details.svelte'
  import PackageGallery from './package-gallery.svelte'
  import PackageNotes from './package-notes.svelte'

  export let data: Api.Package
</script>

<div class="relative h-[54rem] max-h-[100svh]">
  <PackageCover data={data.cover} />
</div>

<div class="layout-lg z-[1] -mt-96">
  <header class="px-4 max-w-prose text-shadow">
    <h1 class="font-display text-4xl-fluid text-surface-2-fg">{data.name}</h1>
    <div class="mt-4 text-xl text-surface-2-fg">{data.description}</div>
  </header>
  <div class="flex flex-col gap-8 mt-8 lg:flex-row">
    <div class="flex flex-col gap-4">
      <PackageContent {data} />
      <PackageNotes {data} />
    </div>
    <div class="flex flex-col gap-4">
      <PackageDetails {data} />
      <ShareMenu />
    </div>
  </div>
</div>

{#if data.gallery.length}
  <PackageGallery {data} />
{/if}

{#if data.destinations.length}
  <div class="px-4 layout-lg">
    <SectionHeader class="mt-8" id="destinations-list-header">Destinos incluídos</SectionHeader>
  </div>
  <div class="layout-2xl">
    <PackageDestinations data={data.destinations} />
  </div>
{/if}

{#if data.attachments.length}
  <div class="px-4 layout-lg">
    <SectionHeader class="mt-8" id="destinations-list-header">Más información</SectionHeader>
  </div>
  <div class="layout-lg">
    <PackageAttachments {data} />
  </div>
{/if}
